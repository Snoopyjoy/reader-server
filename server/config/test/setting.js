/**
 * @fileOverview setting.js
 * @createTime 2018-12-04 14:54
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */
module.exports = {
    env:"test",
    host:"0.0.0.0",
    port: 6404,
    model: {
        redis: {
            host:"127.0.0.1",
            port:6379,
            maxLockTime: 15000, //最大锁时间
            prefix:{
                "*": "game_dm_",
                common: "game_common_"
            },
            ttl:24 * 60 * 60,  //sec,
            pass:"",
            cache: {
                group_sep: "->"
            }
        }
    },
    ecosystem:{
        name: "game",
        timeout: 60000,
        reqTimeout: 15000,
        pingTime: 30000
    },
    cdn: {
        res : ""
    }
};