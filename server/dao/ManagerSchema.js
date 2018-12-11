/**
 * @fileOverview ManagerSchema
 * @createTime 2018-12-11 18:03
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CODES = require("ecoweb/ErrorCodes");
const Utils = require('ecoweb/utils/Utils');
const Redis = require("ecoweb/model/Redis");

const COLLECTION_NAME = "Manager";


module.exports = function() {
    const schema = new Schema({
        _id: String,
        nickname: { type:String, required:true },     //书名
        username: { type:String, default: "" },      //选择人数
        pwd: { type:String, default: true },   //评分
        avatar: { type:String, default: "" },      //图片
        type: { type:Number, default: 1 },     //字数
    }, { collection:COLLECTION_NAME, strict: true });
    schema.index({ "username":1,"pwd":1 });

    return { name:COLLECTION_NAME, ref:schema };
}