const { MongoClient } = require('mongodb')

let dbConnection
let uri = "here connect to Mongodb user link";


// here we connect to server MongoDB
module.exports = {

    connectToDb: (cb) => {

        MongoClient.connect(uri)
            .then((client) => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbConnection
}