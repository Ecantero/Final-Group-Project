/**
 * Represents a user in the MongoDB instance
 */
class User{
    /**
     * Default constructor
     */
    constructor(){
        this.username = '';
        this.password = '';
        this.email = '';
        this.age = 0;
        this.role = 'user';
        this.choices = [];
    }
}

module.exports = User;