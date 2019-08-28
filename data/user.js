/**
 * Represents a user in the MongoDB instance
 */
class User{
    /**
     * Default constructor
     */
    constructor(userObj){
        /**
         * Username of this user
         * @type String
         */
        this.username = userObj.username;
        /**
         * Password of the user. If fetched from the database, this will be a hash
         * @type String
         */
        this.password = userObj.password;
        /**
         * The email of the user
         * @type String
         */
        this.email = userObj.email;
        /**
         * Age of the user
         * @type Number
         */
        this.age = userObj.age;
        /**
         * Role of the user
         * @type String
         */
        this.role = 'user';
        /**
         * A Number array of the choice index of each question
         * @type Number[]
         */
        this.choices = userObj.choices;
        /**
         * A bool if this user was suspended or not
         * @type Boolean
         */
        this.suspended = false;
    }
}

module.exports = User;