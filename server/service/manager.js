/**
 * @fileOverview manager
 * @createTime 2018-12-11 17:55
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */
exports.config = {
    name: "manager",
    enabled: true,
    security: {
        //@login 登录
        "login":{ needLogin:true, checkParams:{ username:"string", pwd:"string" }, optionalParams:{} },
        //@setBanner 设置首页滚动展示
        "setBanner":{ needLogin:true, checkParams:{}, optionalParams:{ game:"number" }, allow:[["userType", 1]] }
    }
};

exports.login = async function( params, user, req, res ){
    const username = params.username;
    const pwd = params.pwd;
    const managerData = await Manager.findOne( { username:username, pwd:pwd } );
    if( isEmpty( managerData ) ){       //用户不存在
        throw new Error("用户不存在");
    }



}

exports.setBanner = function( params, user ){

}