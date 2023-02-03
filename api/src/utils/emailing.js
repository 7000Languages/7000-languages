const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

/***
 * Send an email
 * @param { String } from // sender address
 * @param { String } to // list of receivers
 * @param { String } subject // Subject of the email
 * @param { String } template // The html template file name to be used as the email body
 * @param { Object } context // Contains the data passed to the hyml template
 * @param { Array } attachments // This could contain files to add along the message or an image on the message as well
 */

const sendEmail = async (from = '"7000Languages" <app@7000.org>', to, subject, template, context) => {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS, // username for your mail server
      pass: process.env.EMAIL_PASSWORD, // password
    },
  });

  const handlebarsOptions = {
    viewEngine: {
        extName: '.handlebars',
        partialsDir: path.resolve('../'),
        defaultLayout: false
    },
    viewPath: path.resolve('./src/templates'),
    extName: '.handlebars'
  }

  transporter.use('compile', hbs(handlebarsOptions))

  transporter.sendMail({
    from,
    to,
    subject,
    template,
    context,
    attachments: [
      {
        filename: 'emailHeader.png',
        path: `${process.cwd()}/src/public/images/emailHeader.png`,
        cid: 'emailHeaderImage',
      },
      {
        filename: 'bottomLogo.png',
        path: `${process.cwd()}/src/public/images/bottomLogo.png`,
        cid: 'bottomLogo',
      },
    ],
  });
};

module.exports.sendEmail = sendEmail;
