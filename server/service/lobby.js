/**
 * @fileOverview lobby
 * @createTime 2018-12-11 14:55
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */

exports.config = {
    name: "lobby",
    enabled: true,
    security: {
        //@banner 获取滚动展示内容
        "banner":{ needLogin:false, checkParams:{}, optionalParams:{} }
    }
};

exports.banner = async function( params, user, req ,res){

    return null;
}