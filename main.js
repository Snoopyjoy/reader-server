/**
 * @fileOverview main.js
 * @createTime 2018-12-03 18:58
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */
const App = require("ecoweb/App");
const app = new App();
const PATH = require("path");
const Model = require("ecoweb/model/Model");
const Ecosystem = require("ecoweb/eco/Ecosystem");
const Setting = global.SETTING;

app.addTask(function(cb) {
    Model.init(Setting.model, function(err) {
        if (err) cb(err);
        else {
            cb();
        }
    });
});

app.addTask(function(cb){
    Ecosystem.init(null,function(){
        const EcosystemExt = require('./server/EcosystemExt');
        EcosystemExt.init();
        cb();
    })
});

app.addTask(function(cb) {
    //suppoty CORS
    require("ecoweb/web/WebRequestPreprocess").inject("head", function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        next();
    });
    require("ecoweb/web/WebApp").start(Setting, function(webApp) {
        cb();
    });
});

app.run();