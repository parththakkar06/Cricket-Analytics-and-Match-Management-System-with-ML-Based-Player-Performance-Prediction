const mailer = require('nodemailer')


const sendingMail = async(to,text,subject) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth:{
            user:"panpatel9379@gmail.com",
            pass:"kjet dpyd lbno dath"
        }
    })

    const mailOptions = {
        from: 'panpatel9379@gmail.com',
        to: to,
        subject: subject,
        // text: text
        html:text
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;

}

module.exports={
    sendingMail
}
// sendingMail("vidhi222@yopmail.com","testmail","mail is recevicce...")