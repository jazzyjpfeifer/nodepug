const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to be logged in to do that');
    req.flash('success', 'You are now logged in');
    res.redirect('/login')
};

module.exports = middlewareObj;