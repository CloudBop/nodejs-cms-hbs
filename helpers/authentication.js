module.exports={
    userAuthenticated: function(req,res,next){
        // passport method
        if(req.isAuthenticated()){
            return next()
        }

        res.redirect('/login')
    }
}