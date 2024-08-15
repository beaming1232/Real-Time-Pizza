function auth(req, res, next) {
    if(req.isAuthenticated()) { //isAuthenticated  it is provided by  the passport show user is login or not if not then  restricts them
        return next()
    }
    return res.redirect('/login')
}

module.exports = auth