const log4js = require("log4js");
const config = require("config");
const Koa = require('koa');
const fs = require('fs');
const https = require('https');
const bodyParser = require('koa-bodyparser'); 
const Router = require('koa-router');


log4js.configure(config.get("log4js"));
const logger = log4js.getLogger("Configured the logger.");
  
const portNum = config.get("secure-port"); // getting port from config file
logger.info(`The port number is: ${portNum}`);


//console.log("hello");
logger.error("Cheese is too ripe!");

const app = new Koa();
const genreRouter = new Router(
  {
    prefix: '/genre'
  }
);

genreRouter.get('/', async (ctx, next) => {
  ctx.response.body = "Not yet implemented!";
  ctx.status = 501;
});

genreRouter.get('/:genre_id', async (ctx, next) => {
  ctx.response.body = "Not yet implemented!";
  ctx.status = 501;
})



const options = {
    key: fs.readFileSync('certs/private-key.pem'),
    cert: fs.readFileSync('certs/certificate.pem'),
  };

app.use(bodyParser());

// response
app.use(async (ctx, next) => {
    //ctx.body = 'Hello Koa';

    var timestamp1 = Date.now();
    await next()
    //await wait(5000);
    var elapsed_time = Date.now() - timestamp1;

    console.log(`It took ${elapsed_time} ms to complete the request.`)
  });

 app.use(genreRouter.routes());

// app.use(async (ctx) => {
//     const content = fs.readFileSync('src/public/index.html');
//     ctx.headers['content-type'] = 'text/html';
//     ctx.status = 201;
//     ctx.body = content.toString();
// });

try {
    const server = https.createServer(options, app.callback());
    server.on('error', httpErrorHandler);
    server.listen(portNum, () => {logger.info(`Listening on port: ${portNum}`);});
    //const server = app.listen(portNum, () => {logger.info(`Listening on port: ${portNum}`);});
} catch(error) {
    logger.error(`Encountered an error: ${error}`);
}


// Function declarations

function wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

function httpErrorHandler (err) {
    logger.error("(in httepErrorHandler) Encountered an error: ");
    console.error(err.message);
}
