const Koa = require('koa');
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
    await next();
    const ms = new Date() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

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
        return emailRegExp.test(ctx.request.body.addr) &&
            config.blacklist.indexOf(ctx.ip) < 0;
    },
    handlers: {
        '/request': function (ctx) {
            console.log(`${ctx.request.body.addr} requests the dataset.`);
            return {
                to: ctx.request.body.addr,
                subject: 'Dataset',
                html: `Open this link to download the dataset: <br/>` +
                    `<a href="${config.link}">${config.link}</a>`,
            };
        },
    },
}));

// static
app.use(serve('./public'));

// response
app.listen(config.port);