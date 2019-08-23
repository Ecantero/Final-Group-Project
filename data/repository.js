const mongo = require('mongodb').MongoClient;
const mongoConnection = 'mongodb://localhost:27017/';
const bcrypt = require('bcryptjs');
const User = require('./user');
const salt = 10;

class Repository {
    constructor(){
        this.mongo = require('mongodb').MongoClient;
        this.mongoConnection = 'mongodb+srv://dbappuser:VerySecure123@cluster0-ouwzy.mongodb.net/test?retryWrites=true&w=majority';
        this.mongoDatabase = 'Expressive';
        this.mongoCollection = 'Users-testing'; //change to users for non testing purposes
        this.mongoOptions = { "useUnifiedTopology": "true", "useNewUrlParser": "true" };
    }

    /**
     * Gets all users based on a given query
     * @param {*} query
     *  The mongodb query object to user. Example: {"username": "Bob"}. An empty object gives all results.
     * @returns
     *  An array of Users matching the given query, or an empty array if nothing matches
     */
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

    /**
     * The user to verify. The password should be plaintext for hash comparison
     * @param {User} user 
     */
    async verifyLogin(user){
        let result = await this.getUsers({"username": user.username, "email": user.email})
        if(!result[0]){
            return false;
        }
        else {
            return await bcrypt.compare(user.password, result[0].password);
        }
    }

    /**
     * Adds a single user to the database.
     * @param {User} user 
     *  The User object. The supplied password will be hashed before being inserted to the database
     */
    async addUser(user){
        let client = null;
        let result = false;
        try{
            client = await this.mongo.connect(this.mongoConnection, this.mongoOptions);
            let db = client.db(this.mongoDatabase);
            if(user && user.password){
                user.password = await bcrypt.hash(user.password, salt);
                result = await db.collection(this.mongoCollection).insertOne(user);
            }
            else {
                result = false;
            }
        } catch(e){
            console.log(e);
        } finally {
            if(client) {
                client.close();
            }
        }
        return result;
    }

    async getAllUsers(){
        return await this.getUsers({});
    }
}

module.exports = new Repository();