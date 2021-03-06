/**
 * @fileOverview book
 * @createTime 2018-12-10 13:32
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */

exports.config = {
    name: "book",
    enabled: true,
    security: {
        //@info 获取图书 @id 图书id
        "info":{ needLogin:false, checkParams:{ id:"string" }, optionalParams:{} },
        //@infoList 批量获取图书 @books 图书id数组
        "infoList":{ needLogin:false, checkParams:{ books:"array" }, optionalParams:{} },
        //@recommendBooks 根据图书id获取推荐图书列表 @id 图书id
        "recommendBooks":{ needLogin:false, checkParams:{ id:"string" }, optionalParams:{} },
        //@content 获取内容 @id 图书id @chapter
        "content":{ needLogin:false, checkParams:{ id:"string", chapter:"string" }, optionalParams:{} },
        //@chapters 获取目录 @id 图书id
        "chapters":{ needLogin:false, checkParams:{ id:"string" }, optionalParams:{} },
        //@search 搜索 @keywords 搜索关键字 @index 页码 @num 每页数量
        "search":{ needLogin:false, checkParams:{ keywords:"string"}, optionalParams:{index:"number", num:"number" } },
        //@hotwords 搜索关键字
        "hotwords":{ needLogin:false, checkParams:{}, optionalParams:{} }
    }
};
exports.info = async function( params, user, req ,res){
    return await Book.findOne( {"_id":params.id}, { "author":1, "images":1, "wordcount":1, "intro":1, "name":1, "type":1, "serialize": 1} )
}

exports.infoList = async function( params, user, req ,res ){
    return await Book.findAll( { "_id": {$in:params.books} }, { "author":1, "images":1, "wordcount":1, "intro":1, "name":1, "type":1, "serialize": 1}  );
}

exports.recommendBooks = async function( params, user, req ,res ){
    const bookData = await Book.findOne( {"_id":params.id}, { "like":1 } );
    const books = bookData.like.split("-");
    return await exports.infoList( { books: books } )
}

exports.content = async function( params, user, req ,res ){
    const bookID = params.id;
    const chapter = params.chapter;
    return await BookContent.findOne( {"_id":`book_${bookID}_${chapter}`}, {title:1, content:1, book:1, chapter:1 } );
}

exports.chapters = async function( params, user, req ,res ){
    const bookData = await Book.findOne( {"_id":params.id}, { "catalogue":1 } ) || { "catalogue":"" };
    return bookData.catalogue.split("-");
}

exports.search = async function( params, user, req ,res ){
    const index = params.index || 0;
    const num = params.num || 10;
    const keywords = params.keywords;
    const result = await Book.search({ $or: [{name:{ $regex:keywords }},
            {author:{ $regex:keywords }},
            {type:{ $regex:keywords }}
        ] },
        {needTotal:true,fields:{"author":1, "images":1, "wordcount":1, "intro":1, "name":1, "type":1, "serialize": 1},
            pagination:{index:index,num:num}});
    return result;
}

exports.hotwords = async function( params, user, req ,res  ){
    return [{"word":"玄幻"},{"word":"科幻"},{"word":"历史"}];
}