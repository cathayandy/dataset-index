const Koa = require('koa');
const cors = require('kcors');
const serve = require('koa-static');
const logger = require('koa-logger');
const mailer = require('koa-mailer');
const bodyParser = require('koa-bodyparser');
const config = require('./config.js');
const emailRegExp = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/;
const app = new Koa();

// x-response-time
app.use(async function (ctx, next) {
    const start = new Date();
    console.log(start);
    await next();
    const ms = new Date() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// cors
app.use(cors());

// bodyParser
app.use(bodyParser({
    enableTypes: 'json',
}));

// logger
app.use(logger());

// mailer
app.use(mailer({
    email: config.login,
    prefix: '/mail',
    validate: function (ctx) {
        const { email, name, institude } = ctx.request.body;
        return typeof email === 'string' && emailRegExp.test(email) &&
            typeof name === 'string' && name !== '' &&
            typeof institude === 'string' && institude !== '' &&
            config.blacklist.indexOf(email) < 0;
    },
    handlers: {
        '/request': function (ctx) {
            const { email, name, institude } = ctx.request.body;
            const { link, title } = config;
            console.log(`${name}(${email}) from ${institude} requests the dataset.`);
            return {
                to: email,
                subject: title,
                html: config.template({ name, institude, link }),
            };
        },
    },
}));

// static
app.use(serve('./public'));

// response
app.listen(config.port);