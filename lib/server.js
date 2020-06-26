const express       = require('express');
const app           = express();
const createError   = require('http-errors');
const path          = require('path');
const logger        = require('morgan');

class Server{
    constructor(){}

    initApp(){
        console.log("===== init app =====")
        app.use(logger('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use(express.static(path.join(process.cwd()+'/views/public')));  
    }
    
    initMiddleware(){}

    initTemplateEngine(){
        console.log("===== init template engine =====")

        app.set('views', path.join(process.cwd()+'/views'));
        app.set('view engine', 'hbs');
    }

    initRoute(){
        console.log("===== init route =====")

        app.use("/",require('../src/routes/index'))
        app.use(function(req, res, next) {
            next(createError(404));
        });
        app.use(function(err, req, res, next) {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            res.status(err.status || 500);
            res.render('error');
        });
    }

    async serve(){
        console.log("===== serve =====")
        await app.listen(2000)
    }
}

module.exports = new Server