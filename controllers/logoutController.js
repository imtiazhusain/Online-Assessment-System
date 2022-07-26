

const logoutController = (req,res)=>{
    try {
        req.session.destroy()
        res.redirect('login')
    } catch (error) {
        console.log(error);
    }
   
}

module.exports = logoutController