/**
 * @fileOverview lobby
 * @createTime 2018-12-11 14:55
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */

exports.config = {
    name: "lobby",
    enabled: true,
    security: {
        //@banner 获取滚动展示内容
        "banner":{ needLogin:false, checkParams:{}, optionalParams:{} },
        //@group 获取分组内容
        "group":{ needLogin:false, checkParams:{}, optionalParams:{} },
        //@notice 公告
        "notice":{ needLogin:false, checkParams:{}, optionalParams:{} },
    }
};

exports.banner = async function( params, user, req ,res){
    return await Banner.findAll({},{ title:1, book:1, img:1, _id:1 });
}

exports.group = async function( params, user ){
    let groupList = await BookGroup.findAll( {}, { title:1, books:1, _id:1, type:1 } );
    const result = [];
    for (let i = 0; i < groupList.length; i++) {
        let groupData = groupList[i];
        if( groupData.toObject ) groupData = groupData.toObject();
        const books = groupData.books || [];
        let bookDetails = await Book.findAll( {_id:{$in : books }}, { _id:1, images:1, name:1 } );
        if( bookDetails.toObject ) bookDetails = bookDetails.toObject();
        groupData.books = bookDetails;
        result.push( groupData );
    }
    return result;
}

exports.notice = async function( params, user ){
    const now = Date.now();
    return await Notice.findAll( { startTime: { "$lt":now }, endTime: { "$gte": now } }, { content:1, _id:1 } );
}