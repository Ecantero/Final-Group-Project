const mongo = require('mongodb').MongoClient;
const mongoConnection = 'mongodb://localhost:27017/';

class Repository {
    constructor(){
        this.mongo = require('mongodb').MongoClient;
        this.mongoConnection = 'mongodb+srv://dbappuser:VerySecure123@cluster0-ouwzy.mongodb.net/test?retryWrites=true&w=majority';
        this.mongoDatabase = 'Expressive';
        this.mongoCollection = 'Users-testing'; //change to users for non testing purposes
        this.mongoOptions = { "useUnifiedTopology": "true", "useNewUrlParser": "true" };
    }

    async getUsers(query){
        let data = [];
        let client = null;
        try{
            client = await this.mongo.connect(this.mongoConnection, this.mongoOptions);
            let db = client.db(this.mongoDatabase);
            data = await db.collection(this.mongoCollection).find(query).toArray();
        } catch(e){
            console.log(e);
        } finally {
            if(client) {
                client.close();
            }
        }
        return data;
    }

    async getAllUsers(){
        return await this.getUsers({});
    }
}

module.exports = new Repository();