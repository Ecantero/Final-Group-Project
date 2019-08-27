let repo = require('../data/repository');

exports.admin = async (req, res) => {
    let users = await repo.getAllScrubbedUsers();
    //console.log(users);
    res.render('admin', { "users": users })
}
exports.suspend = async (req, res) => {
    let formData = req.body;
    let result = await repo.updateSuspension(formData.id, formData.suspend === 'on' ? true : false);
    console.log(result);
    res.redirect('/admin');
}