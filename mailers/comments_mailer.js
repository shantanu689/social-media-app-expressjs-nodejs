const nodemailer = require('../config/nodemailer')

exports.newComment = (comment) => {
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs')

    nodemailer.transporter.sendMail({
        from: 'shantanup101@gmail.com',
        to: comment.user.email,
        subject: 'New comment published',
        html: htmlString
    }, (err, info) => {
        if(err) {
            console.log('error in sending comment mail ', err)
            return
        }
        console.log('Mail delivered', info)
        return;
    })
}