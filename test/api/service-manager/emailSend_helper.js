const fs    = require('fs');
const path  = require('path');
const email = require('emailjs/email');

const server = email.server.connect({
    user: '',
    password: '',
    host: 'smtp.gmail.com',
    ssl: true
});

const message = {
    text: 'Auto Test Report: '+ Date(),
    from: '',
    to: '',
    subject: 'Auto Test Report: '+ Date(),
    attachment: [
        {data: fs.readFileSync(path.resolve('.', 'full_report.html')), alternative: true},
        {path: path.resolve('.', 'full_report.html'), type:"html", name:`Auto Test Report ${Date()}.html`
    }]
};

server.send(message, err => {
    if (err) {
        console.error(err);
    }
});

