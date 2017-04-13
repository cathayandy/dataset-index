# Dataset Index

Index page for [a specific dataset](http://cathayandy.com:8000). Built using [Ant Design](https://ant.design) & [Koa.js](http://koajs.com/).

## Prerequisite

*   [Node.js v7](https://nodejs.org)
    
    It is recommanded using [Node Version Manager](https://github.com/creationix/nvm) aka nvm to install Node.js on your server.

    1.  Install nvm

            curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

    2.  Using nvm to install Node.js v7

            nvm install v7
            nvm alias default v7

*   [PM2](http://pm2.keymetrics.io/) (optional)

    It is recommanded using PM2 to manage node apps.

        npm install pm2 -g

## Installation

    git clone git@github.com:cathayandy/dataset-index.git
    cd dataset-index
    npm install

*   For development:
            
        npm run build
    
*   For production:

        npm run dist

## Config

You need a `config.js` file in the project root directory and a `index.md` file in `static` folder to run the app. You can use the following command to generate the files for the first time. Cerntainly, You can manually generate the files as well.

    npm run config

The `config.js` file looks like this:

    module.exports = {
        login: {
            host: 'smtp.yourserver.com',
            port: 25, // 465, 587
            secure: false, // true for 465, false for others
            auth: {
                user: 'username', // may have @yourserver.com suffix or not
                pass: 'password',
            },
        },
        blacklist: [],
        template: function({ name, institude, link }) {
            return (
    `Dear ${name}, open this <a href="${link}">link</a> to download the dataset.`
            );
        },
        title: 'XXX Dataset',
        link: 'http://your.dataset.link',
        ip: '127.0.0.1',
        port: 80,
    };

You need to re-run the app to use the new `config.js` file when there's a running one.

The `index.md` file looks like this:

    ## Description

    Just a simple `.md` file.

    ## Note

    Edit it, re-build the app and see the change.

You need to re-build the app to use the new `index.md` file. You don't need to re-run the app.

## Run

*   For development:
            
        npm run dev
    
*   For production with PM2 installed (recommanded):

    start:

        npm start
    
    stop:

        npm stop
    
    restart:

        npm restart

*   For production without PM2:

        npm serve

    To stop it, just kill the process. (e.g. use `ps aux | grep node` to find the `pid`, and then use `kill -9 pid` to kill the process)

## Deploy Static Resource

You can deploy the static resource independently by copying the `public` directory to your static resource server(e.g. [Github Pages](https://pages.github.com/)).

## Lisence

[MIT](https://tldrlegal.com/license/mit-license)