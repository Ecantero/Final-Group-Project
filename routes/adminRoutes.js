let repo = require('../data/repository');

exports.admin = async (req, res) => {
    if(await repo.verifyAdmin(req.session.user)){
        let users = await repo.getAllScrubbedUsers();
        res.render('admin', { "users": users, "title": "Admin Page" });
    }
    else {
        res.redirect('/login');
    }
}
exports.suspend = async (req, res) => {
    if(await repo.verifyAdmin(req.session.user)){
        let formData = req.body;
        await repo.updateSuspension(formData.id, formData.suspend === 'on' ? true : false);
        res.redirect('/admin');
    }
    else {
        res.redirect('/login');
    }
}