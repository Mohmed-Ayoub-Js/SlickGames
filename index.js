const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const port = 3001;
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'app',
});

if(!con){
    console.log('error creating connection');
}
app.post('/', (req, res) => {
   const name = req.body.name;
   const size = req.body.size;
   const image = req.body.image;
   const developer = req.body.developer;
   const type = req.body.type;
   const des = req.body.des;
   const moreImage = req.body.moreImage;
   const link = req.body.link;
   const sql = 'INSERT INTO software  (name, size, image, developer, type, des, moreImage , link) VALUES (?, ?, ?, ?, ?, ?, ? , ?)';
   con.query(sql, [name, size, image, developer, type, des, moreImage , link], (err, results) => {
    if (err) {
      console.error('خطأ في إدراج البيانات:', err);
    } else {
      console.log('تم إدراج البيانات بنجاح');
    }
  });
});


app.get('/software', (req, res) => {
    const sql = 'SELECT * FROM software';
    con.query(sql, (err, results) => {
      if (err) {
        console.error('خطأ في استعراض البيانات:', err);
        res.status(500).json({ error: 'خطأ في استعراض البيانات' });
      } else {
        res.json(results);
      }
    });
  });


  app.get('/app', (req, res) => {
    const sql = 'SELECT * FROM software WHERE type = "application"';
    con.query(sql, (err, results) => {
      if (err) {
        console.error('خطأ في استعراض البيانات:', err);
        res.status(500).json({ error: 'خطأ في استعراض البيانات' });
      } else {
        res.json(results);
      }
    });
  });
  app.get('/game', (req, res) => {
    const sql = 'SELECT * FROM software WHERE type = "game"';
    con.query(sql, (err, results) => {
      if (err) {
        console.error('خطأ في استعراض البيانات:', err);
        res.status(500).json({ error: 'خطأ في استعراض البيانات' });
      } else {
        res.json(results);
      }
    });
  });
app.listen(port , () => {
    console.log('login at port ' + port);
});
