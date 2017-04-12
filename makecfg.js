const prompt = require('prompt');
const fs = require('fs');
const template = (result) =>
`module.exports = {
    login: {
        host: '${result.server}',
        port: 25,
        secure: false,
        auth: {
            user: '${result.username}',
            pass: '${result.password}',
        },
    },
    blacklist: [],
    link: '${result.link}',
    port: 80,
};`;
const md =
`## Description

Just a simple \`.md\` file.

## Note

Edit it, re-build the app and see the change.`;

console.log('Warning! This script will override config.js & static/index.md');
prompt.message = '> ';
prompt.delimiter = '';
prompt.start();
prompt.get({
    properties: {
        server: {
            description: 'Enter your smtp server address(e.g. smtp.126.com): ',
            type: 'string',
            required: true,
        },
        username: {
            description: 'Enter your username at the above server address(e.g. wzm_andy@126.com): ',
            type: 'string',
            required: true,
        },
        password: {
            description: 'Enter your password: ',
            type: 'string',
            hidden: true,
            required: true,
        },
        link: {
            description: 'Enter the dataset link: ',
            type: 'string',
            required: true,
        },
    },
}, function (err, result) {
    if (err) throw err;
    const text = template(result);
    fs.writeFile('config.js', text, function(err) {
        if (err) throw err;
        console.log('The new config file have been generated! Open config.js to see the details.');
        fs.writeFile('static/index.md', md, function(err) {
            if (err) throw err;
            console.log('The content sample have been generated! Open static/index.md to see the details.');
        });
    });
});