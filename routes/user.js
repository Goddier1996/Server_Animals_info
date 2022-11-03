const express = require(`express`)//get,post we use now
const { connectToDb, getDb } = require("../db")
const cors = require(`cors`)


let admin = express.Router();


let app = express();
app.use(cors());
app.use(express.json());



let db;


connectToDb((err) => {
    if (!err) {
        app.listen(3001, () => {
            console.log('app on port 5000(admin data)')
        })
        db = getDb();
    }
})




// show a admin , we create this for connect to Admin Options in Client web site

admin.get('/', (req, res) => {

    let users = []

    db.collection('user')
        .find()
        .sort({ author: 1 })
        .forEach(user => users.push(user))
        .then(() => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})



module.exports = admin;