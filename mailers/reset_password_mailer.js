const nodemailer = require('../config/nodemailer')

exports.resetPassword = (resetPasswordUser) => {
    let htmlString = nodemailer.renderTemplate({resetPasswordUser: resetPasswordUser}, '/reset_password.ejs')

    nodemailer.transporter.sendMail({
        from: 'shantanup101@gmail.com',
        to: resetPasswordUser.user.email,
        subject: 'Please reset your password',
        html: htmlString
    }, (err, info) => {
        if(err) {
            console.log('error in sending reset password mail ', err)
            return
        }
        console.log('Mail delivered', info)
        return;
    })
}