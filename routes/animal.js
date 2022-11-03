const express = require(`express`)//get,post we use now
const { connectToDb, getDb } = require("../db")
const { ObjectId } = require("mongodb")
const cors = require(`cors`)




let infoanimal = express.Router();


let app = express();
app.use(cors());
app.use(express.json());



let db;


connectToDb((err) => {
    if (!err) {
        app.listen(3002, () => {
            console.log('app on port 5000(animal info)')
        })
        db = getDb();
    }
})




// here show all data animals

infoanimal.get('/', (req, res) => {

    let books = []

    db.collection('dataanimal')
        .find()
        .sort({ author: 1 })
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books)
        })
        .catch(() => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




// here show animal with id

infoanimal.get('/:id', (req, res) => {


    if (ObjectId.isValid(req.params.id)) {

        db.collection('dataanimal')
            .findOne({ _id: ObjectId(req.params.id) })

            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json({ error: "not fetch the file" })
            })
    }

    else {
        res.status(500).json({ error: "Not a valid doc id" })
    }

})




// here we add a new info animal to data base

infoanimal.post('/add', (req, res) => {

    const book = req.body

    db.collection('dataanimal')

        .insertOne(book)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({ error: "not fetch the file" })
        })
})




// here we delete info animal with id

infoanimal.delete('/:id', (req, res) => {


    if (ObjectId.isValid(req.params.id)) {

        db.collection('dataanimal')
            .deleteOne({ _id: ObjectId(req.params.id) })

            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: "not fetch the file" })
            })
    }

    else {
        res.status(500).json({ error: "Not a valid doc id" })
    }
})




// here we updates a data animal info with id

infoanimal.patch('/:id', (req, res) => {

    const updates = req.body

    if (ObjectId.isValid(req.params.id)) {

        db.collection('dataanimal')
            .updateOne({ _id: ObjectId(req.params.id) }, { $set: updates })

            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({ error: "not fetch the file" })
            })
    }

    else {
        res.status(500).json({ error: "Not a valid doc id" })
    }
})





module.exports = infoanimal;