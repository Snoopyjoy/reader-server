/**
 * @fileOverview BookGroupSchema
 * @createTime 2018-12-13 15:39
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const COLLECTION_NAME = "BookGroup";

module.exports = function() {
    const schema = new Schema({
        _id: String,
        title: { type:String, required:true },    //标题
        type: { type:Number, required:true },     //类型
        books: { type:[String], default: [] },    //书列表
    }, { collection:COLLECTION_NAME, strict: true });

    schema.static( "addGroup", async function( { type, title } ){
        const id = await genID();
        const groupData = {
            _id: id,
            type: type,
            title: title
        };
        await this.findOneAndUpdate( { _id : id }, { $set: groupData },  {"upsert": true } );
    } );

    schema.static("addBook", async function( { id, book } ){
        const ups = { $set:{ _id:id }, $addToSet:{ books: book }};
        await this.update( { _id:id }, ups );
    });

    schema.static("removeBook", async function( { id, book } ){
        const ups = { $pull:{ books: book } };
        await this.update( { _id:id }, ups );
    });

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