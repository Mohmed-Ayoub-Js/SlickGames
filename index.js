const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();
app.use(cors();

app.use(express.json());
const con = mysql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  port: process.env.MYSQL_ADDON_PORT
});
app.use(express.static(path.join(__dirname, 'public')));
app.post('/api/app' , (req , res) => {
  const appName = req.body.appName;
  const image = req.body.imageLink;
  const description = req.body.description;
  const appLink = req.body.appLink;
  const size = req.body.size;
  const userId = req.body.userId;
  con.query('INSERT INTO apps (appDeveloper,appName, appDes, appImage, appSize, appDownload, appIsPublic , rating) VALUES (? ,? ,? ,? ,? ,? ,? , ?)', [userId, appName, description, image, size, appLink, 'no' , '0'], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'حدث خطأ أثناء إضافة التطبيق' });
    } else {
      res.json({ success: true, message: 'تم إضافة التطبيق بنجاح' });
    }
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/'));
});
app.post('/game' , (req , res) => {
 
  const gameName = req.body.gameName;
  const imageLink = req.body.imageLink;
  const description = req.body.description;
  const GameLink = req.body.GameLink;
  const size = req.body.size;
  const isPublic = 'no';
  const userId = req.body.userId;
  con.query('INSERT INTO games (developer,game, des, image, size, download , isPublic , rating) VALUES (? ,? ,? ,? ,? ,? ,? ,?)', [userId,gameName,description, imageLink, size, GameLink, isPublic ,  '0'], (err , res) => {
    if (err) {
      console.error(err);
    } else {
      console.log('good')
    }
  })

});

app.post('/api/register', (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  con.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
      if (err) {
          console.error('Database error:', err);
          res.json({
              message: 'حدث خطأ ما في انشاء الحساب يرجى التواصل مع صاحب المنصة'
          });
      } else {
          if (result.length > 0) {
              res.json({
                  message: 'اسم الحساب او البريد الالكتروني موجود بالفعل'
              });
          } else {
              bcrypt.hash(password, 10, (error, hash) => {
                  if (error) throw error;
                  else {
                      con.query('INSERT INTO users (username , email , password , token) VALUES (?, ? , ? , ?)', [username, email, hash , 'local'], (err, result) => {
                          if (err) {
                              console.error('Database error:', err);
                              res.status(500).json({
                                  message: 'حدث خطأ ما في انشاء الحساب يرجى التواصل مع صاحب المنصة'
                              });
                          } else {
                              console.log('User registered');
                              res.json({
                                  message: 'تم انشاء الحساب'
                              });
                          }
                      });
                  }
              });
          }
      }
  });
});

app.post('/api/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  con.query('SELECT * FROM `users` WHERE username = ?', [username], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'حدث خطأ أثناء الاستعلام عن قاعدة البيانات' });
      }

      if (result.length > 0) {
          // إذا لم يكن هناك بريد إلكتروني موجودًا، قم بمقارنة كلمة المرور والإجراءات الأخرى
          const hashedPasswordFromDatabase = result[0].password;
          bcrypt.compare(password, hashedPasswordFromDatabase, (err, passwordMatch) => {
              if (err) {
                  console.error(err);
                  return res.status(500).json({ message: 'حدث خطأ أثناء المقارنة' });
              }
              if (passwordMatch) {
                  const id = result[0].id;
                  const token = jwt.sign({ id }, 'jwtSecretKey', { expiresIn: 300 });
                  return res.json({ token, id, message: 'تم تسجيل الدخول بنجاح' });
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
  return res.json({message: 'good!'})
})


app.get('/api/game' , (req , res) =>{
  con.query('SELECT * FROM games ', (err, result) => {
    if (err) throw err;
    res.json(result);
  })
});


app.get('/api/games/:user' , (req , res) => {
  const user = req.params.user;
  con.query('SELECT * FROM games WHERE developer =?', [user], (err, result) => {
    if (err) throw err;
    res.json(result);
  })
})






app.get('/api/getApp' , (req , res) => {
  con.query('SELECT * FROM apps WHERE appIsPublic ="yes" ', (err, result) => {
    if(err){
      res.json(err)
    } else {
      res.json(result)
    }
  });
})

app.get('/product/Game/:id', (req, res) => {
  const id = req.params.id;
  con.query('SELECT * FROM games WHERE game_id =?', [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  })
});


app.get('/product/Apps/:id', (req, res) => {
  const id = req.params.id;
  con.query('SELECT * FROM apps WHERE appId = ?', [id], (err, result) => {
    if (err) throw err;
    res.json(result);
  })
});




app.get('/api/all/' , (req, res) => {
  const sql = `
  SELECT game_id AS ID, developer AS developer, game AS itemName, des AS des, image AS image, size AS size, download AS download, isPublic AS isPublic, rating AS rating, 'Game' AS type FROM games WHERE isPublic = 'yes' UNION ALL SELECT appId AS ID, appDeveloper AS developer, appName AS itemName, appDes AS des, appSize AS size, appImage AS image, appDownload AS download, appIsPublic AS isPublic, rating AS rating, 'App' AS type FROM apps WHERE appIsPublic = 'yes'; 
  `
  con.query(sql , (err , result) => {
    if (err) throw err;
    res.json(result);
  })
});


app.get('/api/all/:name' , (req, res) => {
  const nameUserFOR = req.params.name;
  const sql = `
  SELECT game_id AS ID, developer AS developer, game AS itemName, des AS des, image AS image, size AS size, download AS download, isPublic AS isPublic, rating AS rating, 'Game' AS type FROM games WHERE developer = '${nameUserFOR}' UNION ALL SELECT appId AS ID, appDeveloper AS developer, appName AS itemName, appDes AS des, appSize AS size, appImage AS image, appDownload AS download, appIsPublic AS isPublic, rating AS rating, 'App' AS type FROM apps WHERE appDeveloper = '${nameUserFOR}'; 
  `
  con.query(sql ,  (err , result) => {
    if (err) throw err;
    res.json(result);
  })
});



app.get('/user/:id' , (req, res) => {
    const id = req.params.id;
    con.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})
app.get('/user' , (req, res) => {
    const id = req.params.id;
    con.query('SELECT * FROM users ', (err, result) => {
        if (err) throw err;
        res.json(result);
    })
})

app.listen(port , () => {
    console.log('server listening on port'+port)
})
