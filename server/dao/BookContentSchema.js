/**
 * @fileOverview BookContentSchema
 * @createTime 2018-12-10 16:14
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CODES = require("ecoweb/ErrorCodes");
const Utils = require('ecoweb/utils/Utils');
const Redis = require("ecoweb/model/Redis");

const COLLECTION_NAME = "BookContent";


module.exports = function() {
    const schema = new Schema({
        _id: String,
        book: { type:String, required:true },     //书id
        chapter: { type:String, required:true },     //章节编号
        title: { type:String, default: "" },      //章节名
        content: { type:String, default: "" },    //内容
    }, { collection:COLLECTION_NAME, strict: true });
    return { name:COLLECTION_NAME, ref:schema };
}