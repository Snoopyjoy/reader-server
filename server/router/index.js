/**
 * @fileOverview index.js
 * @createTime 2018-12-06 18:12
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */
async function renderRoot(req, res, output, user){
    output({
        title:"my title",
        payload:"hello world!"
    });
}
exports.getRouterMap = function() {
    return [
        { url: "/", view: "index", handle: renderRoot, needLogin:false },
        { url: "/index", view: "index", handle: renderRoot, needLogin:false }
    ];
}