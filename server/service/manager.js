/**
 * @fileOverview manager
 * @createTime 2018-12-11 17:55
 * @author 何小亮<hel13140302@126.com>
 * @version 0.0.1
 */
exports.config = {
    name: "manager",
    enabled: true,
    security: {
        //@login 登录
        "login":{ needLogin:false, checkParams:{ username:"string", pwd:"string" }, optionalParams:{} },
        //@addBanner 增加首页滚动展示页 @book 书id @img 展示图片 @title 展示描述
        "addBanner":{ needLogin:true, checkParams:{ book:"string", img:"string", title:"string" }, allow:[["userType", 1]] },
        //@removeBanner 删除banner @id bannerid
        "removeBanner":{ needLogin:true, checkParams:{ id: "string"}, allow:[["userType", 1]] },
        //@addGroup 添加组 @type 类型 @title 分组描述
        "addGroup":{ needLogin:true, checkParams:{ type:"number", title:"string" }, allow:[["userType", 1]] },
        //@addBook2Group 将书添加到分组 @book 书id @group 分组id
        "addBook2Group":{ needLogin:true, checkParams:{ book:"string", group:"string" }, allow:[["userType", 1]] },
        //@removeBookFromGroup 从分组中移除书记 @book 书id @group 分组id
        "removeBookFromGroup":{ needLogin:true, checkParams:{ book:"string", group:"string" }, allow:[["userType", 1]] },
    }
};

const Session = require("ecoweb/model/Session");

exports.login = async function( params, user, req, res ){
    const username = params.username;
    const pwd = params.pwd;
    const managerData = await Manager.findOne( { username:username } , { _id:1, nickname: 1, pwd:1, avatar:1, type:1 });
    if( isEmpty( managerData ) ){       //用户不存在
        throw new Error("用户名或密码不对");
    }
    if( managerData.pwd !== pwd ){
        throw new Error("用户名或密码不对");
    }
    delete managerData.pwd;
    const token = $saveUserSession(managerData);
    return {
        token: token
    };
}

exports.addBanner = async function( params, user ){
    await Banner.add( params );
}

exports.removeBanner = async function( params, user ){
    await Banner.remove( { "_id": params.id } );
}

exports.addGroup = async function( params, user ){
    await BookGroup.addGroup( params );
}

exports.addBook2Group = async function( params, user ){
    const bookExist = await Book.exist( { "_id": params.book } );
    if( !bookExist ){
        throw new Error( "书籍不存在" )
    }
    const groupExist = await BookGroup.exist( { "_id": params.group } );
    if( !groupExist ){
        throw new Error( "分组不存在" )
    }
    await BookGroup.addBook( { id: params.group, book: params.book } );
}

exports.removeBookFromGroup = async function( params, user ){
    await BookGroup.removeBook( { id: params.group, book: params.book } );
}

function $saveUserSession(user) {
    const extra = {
        type: user.type,
        nickname: user.nickname,
        avatar: user.avatar
    };
    const sess = Session.getSharedInstance().save(user, extra );
    return sess;
}