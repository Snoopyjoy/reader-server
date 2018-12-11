/**
 * @fileOverview setting.js
 * @createTime 2018-12-04 14:54
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */
module.exports = {
    env:"localdev",
    host:"0.0.0.0",
    port: 6403,
    model: {
        db: {
            host:"127.0.0.1",
            port:27017,
            name:"book",
            option: {
                driver:"mongoose",  //or "native"
                server: {
                    reconnectTries: Number.MAX_VALUE,
                    poolSize: 20,
                    socketOptions: { keepAlive: 120 }
                }
            }
        },
        //Redis配置
        /*redis: {
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
        }*/
    },
    session: {
        onePointEnter:false,
        cookiePath:"/",
        secret:"reader@2018",
        tokenExpireTime: 2400,  //sec
    },
    ecosystem:{
        name: "app",
        timeout: 60000,
        reqTimeout: 15000,
        pingTime: 30000
    },
    cdn: {
        res : ""
    }
};