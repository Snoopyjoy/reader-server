/**
 * @fileOverview book
 * @createTime 2018-12-10 13:32
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */

exports.config = {
    name: "book",
    enabled: true,
    security: {
        //@list 获取图书列表
        "list":{ needLogin:false, checkParams:{}, optionalParams:{} },
    }
};
exports.list = async function( params, user, req ,res){
    return null;
}