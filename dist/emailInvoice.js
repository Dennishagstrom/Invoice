"use strict";
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
    to: 'test@example.com',
    from: 'test@example.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail
    .send(msg)
    .then(() => {
    console.log('Email sent');
});
