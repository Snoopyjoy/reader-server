/**
 * @fileOverview EcosystemExt
 * @createTime 2018-12-04 15:23
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */

const ENV = global.VARS.env;

exports.init = function(){
    Ecosystem.listen( "game", "gameCreated", async function( data ){
        console.log(`${ENV} gameCreated:`, data);
    } );

    Ecosystem.listen( "app", "gameMatch", async function( data ){
        console.log(`${ENV} gameMatch:`, data);
    } );
}