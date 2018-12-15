/**
 * @fileOverview NoticeSchema
 * @createTime 2018-12-15 11:16
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CODES = require("ecoweb/ErrorCodes");
const Utils = require('ecoweb/utils/Utils');
const Redis = require("ecoweb/model/Redis");

const COLLECTION_NAME = "Notice";


module.exports = function() {
    const schema = new Schema({
        _id: String,
        content: { type:String, default: "" },      //选择人数
        startTime: { type:Number, default: 0 },    //评分
        endTime: { type:Number, default: 0 },     //字数
    }, { collection:COLLECTION_NAME, strict: true });

    schema.static( "add", async function( { content, startTime, endTime } ){
        const id = await genID();
        const noticeData = {
            _id: id,
            content: content,
            startTime: startTime,
            endTime: endTime,
        };
        await this.findOneAndUpdate( { _id : id }, { $set: noticeData },  {"upsert": true } );
    } );

    async function genID(){
        const id = uuidv4();
        const exist = await BookGroup.exist( { "_id" : id} );
        if( exist ){
            return await genID();
        }else {
            return id;
        }
    }

    return { name:COLLECTION_NAME, ref:schema };
}