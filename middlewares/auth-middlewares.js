
// MIDDLERE para saber si el usuario tiene sesion iniciada o no.

const isLoggedIn = (req, res, next) => {
    if(req.session.activeUser === undefined){
        res.redirect("/auth/login")
    } else {
        next()
    }
}

const isSessionOn = (req, res, next) => {
    if(req.session.activeUser !== undefined){
        res.redirect("/profile")
    } else {
        next()
    }
}


module.exports = {
    isLoggedIn:isLoggedIn,
    isSessionOn: isSessionOn
}