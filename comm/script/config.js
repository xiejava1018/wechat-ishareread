/*
备注
city: 城市（在程序载入时获取一次）
count: 返回结果数量
baiduAK: 百度地图AK
apiList: api列表
hotKeyword: 搜索页热门关键词关键词
hotTag: 搜索页热门类型
bannerList: 首页（热映页）轮播图列表列表
skinList: “我的”页面背景列表
shakeSound: 摇一摇音效地址（带url表示远程地址）
shakeWelcomeImg: 摇一摇欢迎图片
*/
var url = 'https://api.ishareread.com/ishareread/res'
module.exports = {
    city: '',
    count: 20,
    baiduAK: 'Y1R5guY8Y2GNRdDpLz7SUeM3QgADAXec',
    apiList: {
        bookclasslist: 'https://api.ishareread.com/ishareread/bookclass/parentclass',
        booklist: 'https://api.ishareread.com/ishareread/wxapi/book/booklist/',
        ebookSharelist:'https://api.ishareread.com/ishareread/wxapi/book/shareEbooks/',
        sendebookmail:'https://api.ishareread.com/ishareread/wxapi/book/sendebookmail',
        getopenid:'https://api.ishareread.com/ishareread/wxapi/user/getwxlogininfo',
        tologin:'https://api.ishareread.com/ishareread/wxapi/user/tologin',
        touserRegist:'https://api.ishareread.com/ishareread/wxapi/user/userRegist.do',
        dosharebook: 'https://api.ishareread.com/ishareread/wxapi/bookshare/sharebook.do',
        getcansharelist:'https://api.ishareread.com/ishareread/wxapi/bookshare/book/',
        getusercanshare:'https://api.ishareread.com/ishareread/wxapi/bookshare/',
        dosendmsg:'https://api.ishareread.com/ishareread/wxapi/bookshare/sendBorrowMsg',
        getBorrowMsg:'https://api.ishareread.com/ishareread/wxapi/bookshare/borrowMsgList/',
        getSimilarBookList:'https://api.ishareread.com/ishareread/wxapi/book/SimilarBook/',
        search: {
            byKeyword: 'https://api.ishareread.com/ishareread/wxapi/book/searchbook', 
            byTag: 'https://api.douban.com/v2/movie/search?tag='
        },
        filmDetail: 'https://api.ishareread.com/douban/movie/subject/',
        bookDetailbyId:'https://api.ishareread.com/ishareread/wxapi/book/doubanbook/',
        bookDetailbyISBN: 'https://api.ishareread.com/ishareread/wxapi/book/doubanbook/isbn/',
        personDetail: 'https://api.douban.com/v2/movie/celebrity/',
        baiduMap: 'https://api.map.baidu.com/geocoder/v2/'
    },
    hotKeyword: ['功夫熊猫', '烈日灼心', '摆渡人', '长城', '我不是潘金莲', '这个杀手不太冷', '驴得水', '海贼王之黄金城', '西游伏妖片', '我在故宫修文物', '你的名字'],
    hotTag: ['动作', '喜剧', '爱情', '悬疑'],
    bannerList: [
      { type: 'film', id: '26683290', imgUrl: url + '/images/index_gg/0.jpg'},
      { type: 'film', id: '25793398', imgUrl: url + '/images/index_gg/1.jpg'},
      { type: 'film', id: '26630781', imgUrl: url + '/images/index_gg/2.jpg'},
      { type: 'film', id: '26415200', imgUrl: url + '/images/index_gg/3.jpg'},
      { type: 'film', id: '3025375', imgUrl: url + '/images/index_gg/4.jpg'}
    ],
    skinList: [
        {title: '公路', imgUrl: url + '/images/user_bg/user_bg_1.jpg'},
        { title: '黑夜森林', imgUrl: url + '/images/user_bg/user_bg_2.jpg'},
        { title: '鱼与水', imgUrl: url + '/images/user_bg/user_bg_3.jpg'},
        { title: '山之剪影', imgUrl: url + '/images/user_bg/user_bg_4.jpg'},
        { title: '火山', imgUrl: url + '/images/user_bg/user_bg_5.jpg'},
        { title: '科技', imgUrl: url + '/images/user_bg/user_bg_6.jpg'},
        { title: '沙漠', imgUrl: url + '/images/user_bg/user_bg_7.jpg'},
        { title: '叶子', imgUrl: url + '/images/user_bg/user_bg_8.jpg'},
        { title: '早餐', imgUrl: url + '/images/user_bg/user_bg_9.jpg'},
        { title: '英伦骑车', imgUrl: url + '/images/user_bg/user_bg_10.jpg'},
        { title: '草原', imgUrl: url + '/images/user_bg/user_bg_11.jpg'},
        { title: '城市', imgUrl: url + '/images/user_bg/user_bg_12.jpg'}
    ],
    shakeSound: {
        startUrl: url + '/sound/shake.mp3',
        start: '',
        completeUrl: url + '/sound/shakeComplete.wav',
        complete: ''
    },
    shakeWelcomeImg: url + '/images/shake_welcome.png'
}