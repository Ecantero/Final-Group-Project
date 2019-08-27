let repo = require('../data/repository');

exports.admin = async (req, res) => {
    let users = await repo.getAllScrubbedUsers();
    //console.log(users);
    res.render('admin', { "users": users })
}