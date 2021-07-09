const nodemailer = require('../config/nodemailer')

exports.newComment = (comment) => {
    console.log('inside newComment mailer')

    nodemailer.transporter.sendMail({
        from: '<the hex />',
        to: comment.user.email,
        subject: 'New comment published',
        html: '<h1>Yup, your comment is now published! </h1>'
    }, (err, info) => {
        if(err) {
            console.log('error in sending comment mail ', error)
            return
        }
        console.log('Mail delivered', info)
        return;
    })
}