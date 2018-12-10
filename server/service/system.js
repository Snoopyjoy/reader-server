/**
 * @fileOverview service
 * @createTime 2018-12-04 15:19
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */

exports.config = {
    name: "system",
    enabled: true,
    security: {
        //@notice 获取公告 @game 游戏类型
        "notice":{ needLogin:false, checkParams:{}, optionalParams:{ game:"number" } },
        //@callGame 获取公告 @game 游戏类型
        "callGame":{ needLogin:false, checkParams:{}, optionalParams:{} },
        //@callApp 获取公告 @game 游戏类型
        "callApp":{ needLogin:false, checkParams:{}, optionalParams:{} }
    }
};

const ENV = global.VARS.env;
exports.notice = async function( params, user ){
    console.log( `${ENV} recieve msg` , params );
    if( ENV === "test" ){
        Ecosystem.app.fire("gameCreated", {"aa":111})
    }
};

exports.callGame = async function( params, user ){
    await Ecosystem.game.callAPI( "system.notice", {} );
};

exports.callApp = async function( params, user ){
    await Ecosystem.app.callAPI( "system.notice", {} );
};