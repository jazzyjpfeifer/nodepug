const middlewareObj = {};

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return(next);
    }
    res.redirect('/register/login')
}

module.exports = middlewareObj;