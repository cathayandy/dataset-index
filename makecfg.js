const prompt = require('prompt');
const fs = require('fs');
const template = (result) =>
`module.exports = {
    login: {
        host: '${result.smtphost}',
        port: ${result.smtpport}, // 465, 587
        secure: ${result.smtpsecure}, // true for 465, false for others
        auth: {
            user: '${result.username}', // may have @yourserver.com suffix or not
            pass: '${result.password}',
        },
    },
    blacklist: [],
    template: function({ name, institude, link }) {
        return (
\`Dear \${name}, open this <a href="\${link}">link</a> to download the dataset.\`
        );
    },
    link: '${result.link}',
    title: '${result.title}',
    ip: '${result.ip}',
    port: ${result.port},
};`;
const md =
`---
imports:
  Download: './download.jsx'
---

## Description

Just a simple \`.md\` file.

## Note

Edit it, re-build the app and see the change.

Aha! It changes!

## Download

Enter your personal information, and then we will send the download link to your e-mail.

\`\`\`render html
<Download />
\`\`\`

## Another Section

Under the Download Section`;

console.log('Warning! This script will override config.js & static/index.md');
prompt.message = '> ';
prompt.delimiter = '';
prompt.start();
prompt.get({
    properties: {
        smtphost: {
            description: 'Enter your smtp server address: ',
            type: 'string',
            default: 'smtp.yourserver.com',
        },
        smtpport: {
            description: 'Enter your smtp server port: ',
            type: 'number',
            default: 25,
        },
        smtpsecure: {
            description: 'Use secure mode?(usually true for port 465, false for others)[t/f] ',
            type: 'boolean',
            default: false,
        },
        username: {
            description: 'Enter your username at the above server address: ',
            type: 'string',
            default: 'username',
        },
        password: {
            description: 'Enter your password: ',
            type: 'string',
            hidden: true,
            default: 'password',
        },
        link: {
            description: 'Enter the dataset link: ',
            type: 'string',
            default: 'http://your.dataset.link',
        },
        title: {
            description: 'Enter the dataset name: ',
            type: 'string',
            default: 'XXX Dataset',
        },
        ip: {
            description: 'Enter your app\'s ip: ',
            type: 'string',
            default: '127.0.0.1',
        },
        port: {
            description: 'Enter your app\'s port: ',
            type: 'number',
            default: 80,
        },
        genmd: {
            description: 'Regenerate static/index.md?[t/f] ',
            type: 'boolean',
            default: true,
        }
    },
}, function (err, result) {
    if (err) throw err;
    const text = template(result);
    fs.writeFile('config.js', text, function(err) {
        if (err) throw err;
        console.log('The new config file have been generated! Open config.js to see the details.');
        if (result.genmd) {
            fs.writeFile('static/index.md', md, function(err) {
                if (err) throw err;
                console.log('The new index template have been generated! Open static/index.md to see the details.');
            });
        }
    });
});