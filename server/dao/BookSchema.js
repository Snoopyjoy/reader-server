/**
 * @fileOverview GoodSchema
 * @createTime 2018-10-29 13:07
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CODES = require("ecoweb/ErrorCodes");
const Utils = require('ecoweb/utils/Utils');
const Redis = require("ecoweb/model/Redis");

const COLLECTION_NAME = "Book";


module.exports = function() {
    const schema = new Schema({
        _id: String,
        name: { type:String, required:true },     //书名
        author: { type:String, default: "" },      //选择人数
        images: { type:String, default: "" },      //图片
        ratings: { type:Number, default: 0 },    //评分
        wordcount: { type:Number, default: 0 },     //字数
        type: { type:String, default: "" },     //类型
        intro: { type:String, default: "" },      //简介
        serialize: { type:String, default: "" },  //连载类型
        catalogue: { type:String, default: "" },  //目录
        like: { type:String, default: "" }      //点赞
    }, { collection:COLLECTION_NAME, strict: true });
    return { name:COLLECTION_NAME, ref:schema };
}