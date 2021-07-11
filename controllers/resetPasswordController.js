module.exports.resetPasswordPage = (req,res) => {
    return res.render('reset_password', {
        title: "Reset Password"
    })
}