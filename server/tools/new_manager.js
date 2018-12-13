/**
 * Created by Jay on 3/21/2016.
 */
const DAOFactory = require("ecoweb/dao/DAOFactory");
const Utils = require("ecoweb/utils/Utils");

var proc;

exports.init = function(invoker) {
    proc = invoker;
}

exports.do = function(username, nickname, pwd, type) {

    if (arguments.length < 3) {
        proc.done("invalid arguments");
        return;
    }

    const data = {
        _id: `m_${Date.now()}`,
        username: username,
        nickname: nickname,
        pwd:Utils.md5(pwd),
        type: 1
    }
    if (type) data.type = Number(type);


    const model = DAOFactory.create("Manager", data);
    model.save(function(err) {
        console.log(arguments);
        setTimeout(()=>{ proc.done(err) }, 200);
    });
}