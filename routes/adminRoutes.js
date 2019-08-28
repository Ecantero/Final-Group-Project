let repo = require('../data/repository');

exports.admin = async (req, res) => {

    let users = await repo.getAllScrubbedUsers();
    res.render('admin', { "users": users, "title": "Admin Page" })
}
exports.suspend = async (req, res) => {

    let formData = req.body;
    await repo.updateSuspension(formData.id, formData.suspend === 'on' ? true : false);
    res.redirect('/admin');
}