const express = require('express');
const cors = require('cors');
const app = express();
const port = 100;
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
app.use(cors());

app.use(express.json());
const con = mysql.createConnection({
    host: 'b3rfzhomvvjj9sabwkqj-mysql.services.clever-cloud.com',
    user: 'uyuolcdppeeatjsb',
    password: 'FkbA0051ysTHJzXCrWmW',
    database: 'b3rfzhomvvjj9sabwkqj',
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/'));
});
app.get('/user/:id' , (req, res) => {
   res.status(404).send('Not Found'); 
    const id = req.params.id;
    con.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})
app.get('/user' , (req, res) => {
   res.status(404).send('Not Found'); 
    const id = req.params.id;
    con.query('SELECT * FROM users ', (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})
app.post('/api/register', (req, res) => {
   res.status(404).send('Not Found'); 
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    bcrypt.hash(password, 10 , (error, hash) => {
        if(error) throw error;
        else {
            con.query('INSERT INTO users (username , email , password) VALUES (?, ? , ?)', [username,email, hash], (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    res.status(500).json({
                        message: 'حدث خطأ ما في انشاء الحساب يرجى التواصل مع صاحب المنصة'
                    });
                } else {
                    console.log('User registered');
                    res.json({
                        message: 'تم انشاء الحساب '
                    });
                }
            });
        }

    })
});

app.post('/api/login', (req, res) => {
   res.status(404).send('Not Found'); 
    const email = req.body.email;
    const password = req.body.password;
  
    con.query('SELECT * FROM `users` WHERE email =? ', [email], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'حدث خطأ أثناء الاستعلام عن قاعدة البيانات' });
      }
  
    
      if (result.length > 0) {
        const hashedPasswordFromDatabase = result[0].password;
          bcrypt.compare(password, hashedPasswordFromDatabase, (err, passwordMatch) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'حدث خطأ أثناء المقارنة' });
          }
          if (passwordMatch) {
            const id = result[0].id;
            const token = jwt.sign({ id }, 'jwtSecretKey', { expiresIn: 300 });
            return res.json({ token , id ,message: 'تم تسجيل الدخول بنجاح',})

          } else {
            return res.json({ message: ' اسم المستخدم أو كلمة المرور غير صحيحة' });
          }
        });
      } else {
        return res.json({ message: ' اسم المستخدم أو كلمة المرور غير صحيحة' });
      }
    });
  });
  
const verfiyJwt = (req, res , next) => {
  const token = req.headers['my-token'];
  if (!token){
    res.json({Message:'ستحتاج الى توكن التسجيل من فضلك قم بذلك وارجع لاحقا'});
  } else{
    jwt.verify(token, 'jwtSecretKey', (err, decoded) => {
      if (err) {
        res.json({Message: 'التوكن غير صحيح' });
      } else{
        req.userId = decoded.userId;
        next();
      }
    });
  }
}
app.get('/check/' ,verfiyJwt, (req , res) => {
   res.status(404).send('Not Found'); 
  return res.json({message: 'good!'})
})



app.post('/game' , (req , res) => {
  res.status(404).send('Not Found'); 
    const gameName = req.body.gameName;
    const imageLink = req.body.imageLink;
    const description = req.body.description;
    const GameLink = req.body.GameLink;
    const size = req.body.size;
    const isPublic = false;
    const userId = req.body.userId;
    con.query('INSERT INTO games (developer,game, des, image, size, download , isPublic) VALUES (?,?,?,?,?,?,?)', [userId,gameName,description, imageLink, size, GameLink, isPublic], (err , res) => {
      if (err) {
        console.error(err);
      } else {
        console.log('good')
      }
    })

})



app.get('/api/game' , (req , res) =>{
   res.status(404).send('Not Found'); 
  con.query('SELECT * FROM games ', (err, result) => {
    if (err) throw err;
    res.json(result);
  })
})

app.listen(port , () => {
    console.log('server listening on port'+port);
});
