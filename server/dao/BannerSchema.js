/**
 * @fileOverview BannerSchema
 * @createTime 2018-12-10 18:25
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const COLLECTION_NAME = "Banner";

module.exports = function() {
    const schema = new Schema({
        _id: String,
        book: { type:String, required:true },    //书id
        img: { type:String, required:true },     //展示图片url
        title: { type:String, default: "" },     //标题
    }, { collection:COLLECTION_NAME, strict: true });

    schema.static( "add", async function( { book, img, title } ){
        const bannerData = {
            _id: book,
            book: book,
            img: img,
            title: title
        };
        await this.findOneAndUpdate( { _id : book }, { $set: bannerData },  {"upsert": true } );
    } );

    return { name:COLLECTION_NAME, ref:schema };
}