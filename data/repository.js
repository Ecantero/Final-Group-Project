const mongo = require('mongodb').MongoClient;
const mongoConnection = 'mongodb://localhost:27017/';
const bcrypt = require('bcryptjs');
const User = require('./user');
const salt = 10;

class Repository {
    constructor(){
        this.mongodb = require('mongodb');
        this.mongo = require('mongodb').MongoClient;
        this.mongoConnection = 'mongodb+srv://dbappuser:3vPLgIyigQcsjpTs@cluster0-ouwzy.mongodb.net/test?retryWrites=true&w=majority';
        this.mongoDatabase = 'Expressive';
        this.mongoCollection = 'Users-testing'; //change to users for non testing purposes
        this.mongoOptions = { "useUnifiedTopology": "true", "useNewUrlParser": "true" };
    }

    /**
     * Gets all users based on a given query
     * @param {*} query
     *  The mongodb query object to user. Example: {"username": "Bob"}. An empty object gives all results.
     * @returns
     *  A Promise for an array of Users matching the given query, or an empty array if nothing matches
     */
    async getUsers(query){
        let data = [];
        let client = null;
        try{
            client = await this.mongo.connect(this.mongoConnection, this.mongoOptions);
            let db = client.db(this.mongoDatabase);
            data = db.collection(this.mongoCollection).find(query).toArray();
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
     * Finds a user(s) by a given Username
     * @param {String} username 
     *  The Username to search by
     * @returns
     *  A Promise<User[]> for the results
     */
    async getUserByUsername(username){
        return this.getUsers({"username": username});
    }

    /**
     * Finds a user by a given id
     * @param {String} id 
     *  The id to search for
     * @returns
     *  A Promise<User[]> for the results
     */
    async getUserById(id){
        return this.getUsers({"_id": new this.mongodb.ObjectId(id)});
    }

    /**
     * Verifies a User. The password should be plaintext for hash comparison
     * @param {User} user 
     *  The user object to verify. Should have a username and a non hashed password
     * @returns
     *  A Promise for a bool indicating succes. True for successful, false for failure
     */
    async verifyLogin(user){
        if(!user || !user.username){
            return false;
        }
        let result = await this.getUsers({"username": user.username});
        if(!result[0] || result[0].suspended){
            return false;
        }
        else {
            return bcrypt.compare(user.password, result[0].password);
        }
    }

    /**
     * Verifies that a User is a valid login and is an admin
     * @param {User} user 
     *  The User object to verify
     * @returns
     *  A Promise resolving to true on success, or false for failure
     */
    async verifyAdmin(user){
        return new Promise(async (resolve, reject) => {
            if(user && await this.verifyLogin(user) && user['role'] === 'admin' ){
                resolve(true);
            }
            else {
                resolve(false);
            }
        });
    }

    /**
     * Gets the aggregated data for user's answers
     * @returns
     *  A Promise for a 2d array of numbers representing the amount of users who votes for that question, or false if it fails
     */
    async getQuestionData(){
        return new Promise(async (resolve, reject) => {
            try {
                let answersAggregate = [[0,0,0,0],[0,0,0,0],[0,0,0,0]];
                let usersArr = await this.getAllUsers();
                for(var i = 0; i < usersArr.length; i++){
                    let user = usersArr[i];
                    answersAggregate[0][user.choices[0]]++;
                    answersAggregate[1][user.choices[1]]++;
                    answersAggregate[2][user.choices[2]]++;
                }
                resolve(answersAggregate);
            } catch(e){
                reject(false);
            }
        });
    }

    /**
     * Adds a single user to the database.
     * @param {User} user 
     *  A User object to add to the database
     * @returns
     *  A Promise for a InsertOneWriteOpResult object, or false if it the user is invalid
     */
    async addUser(user){
        let client = null;
        let result = false;
        try{
            client = await this.mongo.connect(this.mongoConnection, this.mongoOptions);
            let db = client.db(this.mongoDatabase);
            if(user && user.password){
                //user.password = await bcrypt.hash(user.password, salt);
                result = db.collection(this.mongoCollection).insertOne(user);
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

    /**
     * Gets all users from the Mongo db instance
     * @returns
     *  A Promise for an array of all user objects from the db. The passwords are hashed.
     */
    async getAllUsers(){
        return this.getUsers({});
    }

    /**
     * Gets all users with role 'user' and scrubs away sensitive and nonadministrative data from the objects
     * @returns
     *  A Promise for all the users with role 'user' and sensitive and nonadministrative data removed
     */
    async getAllScrubbedUsers(){
        
        return new Promise(async (resolve, reject) => {
            let users = await this.getUsers({role: 'user'});
            for(var i = 0; i < users.length; i++){
                delete users[i].password;
                delete users[i].role;
                delete users[i].choices;
                delete users[i].age;
            }
            resolve(users);
        });
    }

    
    /**
     * Updates a user based on a given query
     * @param {*} query 
     *  The query object
     * @param {*} value 
     *  The update query to use for updating
     * @returns
     *  A Promise for an UpdateResult object, or false if it fails
     */
    async updateUser(query, value){
        return new Promise(async (resolve, reject) => {
            let client = null;
            let result = false;
            try{
                client = await this.mongo.connect(this.mongoConnection, this.mongoOptions);
                let db = client.db(this.mongoDatabase);
                result = db.collection(this.mongoCollection).updateOne(query, value);
            } catch(e){
                console.log(e);
            } finally {
                if(client) {
                    client.close();
                }
                resolve(result);
            }
        });
    }

    /**
     * Updates the suspension status of a user
     * @param {String} id 
     *  The id of the user
     * @param {Boolean} suspended
     *  The new suspension status to use
     * @returns
     *  A Promise of the Update result, or false if it fails 
     */
    async updateSuspension(id, suspended){
        return new Promise(async (resolve, reject) => {
            let user = await this.getUserById(id);
            if(!user){
                resolve(false);
            }
            else {
                user[0].suspended = suspended;
                resolve(this.updateUser({"_id": new this.mongodb.ObjectId(id) }, { "$set": {"suspended": suspended} }));
            }
        });
    }
}

module.exports = new Repository();