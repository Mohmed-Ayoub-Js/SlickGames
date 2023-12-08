const express = require('express');
const fs = require('fs');
const cors = require('cors');
const data = require('./data.json');
const app = express();
const port = 3001;
const password = require('./password.json');
const uuid = require('uuid');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());



app.post("/add", (req, res, next) => {
    console.log("Hellooo from products");
    const { name, family, number, day, mounth, year, subject , Subscription} = req.body;
  
    fs.readFile("data.json", (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }
  
      const jsonData = JSON.parse(data);
      jsonData.data.push({
        id: uuid.v4(),
        name,
        family,
        number,
        day,
        mounth,
        year,
        subject,
        Subscription
      });
  
      fs.writeFile("data.json", JSON.stringify(jsonData), (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Internal Server Error");
        }
  
        console.log("done writing....");
        res.status(200).json({ message: "تم إرسال البيانات بنجاح" });
      });
    });
  });



app.get("/delete/:id", async (req, res, next) => {
    const idToDelete = parseInt(req.params.id, 10);

    const indexToDelete = data.findIndex(item => item.id === idToDelete);

    if (indexToDelete !== -1) {
        data.splice(indexToDelete, 1);

        fs.writeFile("data.json", JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log("done deleting....");
        });

        res.send({ success: true, message: "Data deleted successfully" });
    } else {
        res.status(404).send({ success: false, message: "Data not found" });
    }
});

app.get("/read/:id", (req, res) => {
    const idToRead = parseInt(req.params.id, 10);
    const item = data.find(item => item.id === idToRead);

    if (item) {
        res.send(item);
    } else {
        res.status(404).send({ success: false, message: "Data not found" });
    }
});

app.put("/update/:id", (req, res) => {
    const idToUpdate = parseInt(req.params.id, 10);
    const updatedItem = req.body;
    const indexToUpdate = data.findIndex(item => item.id === idToUpdate);
    if (indexToUpdate !== -1) {
        data[indexToUpdate] = updatedItem;

        fs.writeFile("data.json", JSON.stringify(data), (err) => {
            if (err) throw err;
            console.log("done updating....");
        });

        res.send({ success: true, message: "Data updated successfully" });
    } else {
        res.status(404).send({ success: false, message: "Data not found" });
    }
});

app.get("/read", async (req, res, next) => {
    console.log("Hellooo from products");
    res.send(data);
});



app.get("/read/:id", (req, res, next) => {
    const userId = req.params.id;

    fs.readFile("data.json", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Internal Server Error");
        }

        const jsonData = JSON.parse(data);
        const user = jsonData.data.find(user => user.id === userId);

        if (user) {
            console.log("User found:", user);
            res.status(200).json(user);
        } else {
            console.log("User not found.");
            res.status(404).json({ message: "المستخدم غير موجود" });
        }
    });
});

app.listen(port , () => {
    console.log(`=> http://localhost:${port}`);
})