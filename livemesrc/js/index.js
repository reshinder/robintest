var KEWLApp = require('./lib/kewl.js');
var axios  = require('./lib/axios.min.js');
var UI  = require('./common/ui.js');
var UA = window.navigator.userAgent,
    IsAndroid = /Android|HTC/i.test(UA),
    IsIPad = !IsAndroid && /iPad/i.test(UA),
    IsIPhone = !IsAndroid && /iPod|iPhone/i.test(UA),
    isMac = navigator.userAgent.indexOf("Mac OS X") > 0,
    isWeixin = /MicroMessenger/i.test(navigator.userAgent),
    IsIOS = (IsIPhone || IsIPad),
    isIOSMac = (IsIPhone || IsIPad || isMac),
    isAndroid = /Android/i.test(navigator.userAgent),
    IOSLINK = 'https://app.appsflyer.com/id1089836344?pid=Activity&c=Emoji_Challenge',
    ARDLINK = 'https://play.google.com/store/apps/details?id=com.cmcm.live&referrer=utm_source%3D340006';
const helpObj ={
    getQueryString:function(key){
        var t = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i"),
            n = window.location.search.substr(1).match(t),q,
            r = "";

        if(n){
            if(n[2].indexOf("?")>-1){
                r = n[2].split("?")[0];
            }else{
                q = unescape(n[2]).split("=");
                r = q[q.length-1];
            }
        }
        console.log(r);
        return r;
    }
};
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8;';
axios.defaults.baseURL = 'http://live.ksmobile.net';
//axios.defaults.baseURL = 'http://qa.live.ksmobile.net';
var app = new Vue({
    el: '#app',
    data: {
        shareConf:{
            "url": location.origin + location.pathname,
            "title": "TPE 48 團員選拔",
            "desc": "日系鄰家偶像AKB48姊妹團TPE48成員開選！你的一票決定直播人氣王！",
            "img": "http://www.liveme.com/images/share_week.ico",
            "downloadTip": "Download Live.me to watch live video streaming.",
            "cancel": "Cancel",
            "go": "Go"
        },
        showSelf:false,
        isReflesh:false,
        test:0,
        selfTop:0,
        paraObj1:{
            act_id:217,
            page:1,
            pagesize:100,
            isLoading:false,
            loadMore:true,
            listData:[]
        },
        self1:{
            nickname:'',
            uid:'',
            face:'',
            showTag:false,
            level:'',
            cnt:0,
            rank:'999+'
        }
    },
    created:function(){},
    mounted:function () {
        this.init();
    },
    methods: {
        changeActive:function(index){
            this.isActive = index;
            this.cutIndex = index;
        },
        init: function () {
            var self = this;
            if (KEWLApp.isKEWLApp && ((IsIOS && KEWLApp.getVerCode() >= 10400000) || (IsAndroid && typeof window.android === 'object' && window.android.hasOwnProperty('getUserInfo')))) {
                KEWLApp.getUserInfo(function (data) {
                    var userInfo = typeof data === 'string' && data !== 'null' && data !== '' ? JSON.parse(data) : data;
                    if (typeof userInfo == 'object' && userInfo.userId && userInfo.token && userInfo.deviceId) {
                        self.isLogin = true;
                        self.loginInfo = userInfo;
                        self.userInfo = userInfo;
                        self.isInApp = true;
                    }
                    self.initData();
                });
            } else {
                this.initData();
            }
        },
        initData: function () {
            var self = this;
            this.test = helpObj.getQueryString("test")!=""?helpObj.getQueryString("test"):this.test;
            if(this.test) {
                axios.defaults.baseURL = 'http://qa.live.ksmobile.net';
            }
            this.paraObj1.act_id = helpObj.getQueryString("activity_id")!=''?helpObj.getQueryString("activity_id"):this.paraObj1.act_id;
            this.getData(self.paraObj1);
            this.getDataself();
            this.initFooter();
            this.bindEvent();
        },
        closeDetail:function(){
            $(".detail").hide();
        },
        showDetail:function(){
            $(".detail").show();
        },
        getData:function(arg,r){
            var self = this;
            var dataP = self.userInfo ? {
                token: self.userInfo.token,
                androidid: self.userInfo.deviceId,
                uid:self.userInfo.userId,
                page: arg.page,
                limit: 100,
                act_id: arg.act_id

            } : {
                uid:helpObj.getQueryString("uid"),
                page: arg.page,
                limit: 100,
                act_id: arg.act_id
            };
            if (arg['isLoading']) {
                return;
            }
            arg['isLoading'] = true;
            axios.get('/ComRankH5/receiver_value_rank',{params:dataP})
                .then(function (response) {
                    var cuData =  response.data;
                    if(r==='r'){
                        self.isReflesh=false;
                        arg.listData=[];
                    }

                    arg['listData'] = arg['listData'].concat(cuData.data);
                    arg['isLoading']=false;
                    if (cuData.status == 200&&cuData.data.length >0) {
                        arg['page']+=1;
                    }
                    if (cuData.data.length == 100){
                        arg['loadMore']=true;
                    } else {
                        arg['loadMore']=false;
                    }
                    setTimeout(function () {
                        $("#loading").hide();
                    }, 300);
                })
                .catch(function (error) {
                    console.info(error)
                });
        },
        getDataself:function(){
            var self = this;
            var dataP = self.userInfo ? {
                token: self.userInfo.token,
                androidid: self.userInfo.deviceId,
                uid:self.userInfo.userId,
                act_id: self.paraObj1.act_id

            } : {
                uid:helpObj.getQueryString("uid"),
                act_id: self.paraObj1.act_id
            };
            axios.get('/ComRankH5/receiver_value_self',{params:dataP})
                .then(function (response) {
                    var cuData =  response.data;
                    if (cuData.status == 200&&cuData.data.nickname!=undefined) {
                        self.self1.nickname = cuData.data.nickname;
                        self.self1.uid = cuData.data.uid;
                        self.self1.face = cuData.data.face;
                        self.self1.is_verified = cuData.data.is_verified;
                        self.self1.level = cuData.data.level;
                        self.self1.cnt = cuData.data.cnt;
                        self.showSelf = true;
                        if(cuData.data.rank!=-1){
                            self.self1.rank = cuData.data.rank;
                        }
                    }
                })
                .catch(function (error) {
                    console.info(error)
                });
        },
        showForm:function(){
            if(this.isInApp){
                $('.shadow').show();
                $('.sign-in').show();
            }else{
                this.try_open("");
            }

        },
        initFooter: function () {
            var self = this;
            if (!!self.userInfo) {
                self.setShareHtml();
            } else {
                var htmlS = '<div class="footer" style="direction:ltr">' +
                    '<span class="app-icon">' +
                    '</span>' +
                    '<div class="txt">' +
                    '<span class="app-name "></span>' +
                    '<span class="signature">社交直播平台</span>' +
                    '</div>' +
                    '<a href="https://play.google.com/store/apps/details?id=com.cmcm.live&amp;referrer=utm_source%3D340006" id="download" class="download">&nbsp; 加入 &nbsp;</a>' +
                    '</div>';
                $('body').append(htmlS);
                $('.wrap').css("paddingBottom", '1.8rem');
                $('.back-top').css("bottom", '1.6rem');
                if (isIOSMac) {
                    $('.footer a').attr('href', IOSLINK);
                } else {
                    $('.footer a').attr('href', ARDLINK);
                }
            }
        },
        setShareHtml: function () {
            var html = '',
                url = window.location.origin + window.location.pathname;
            html += '<span class="bottom-bar"><a href="';

            html += '" class="logo"></a><a href="javascript:;" class="share"></a></span>';

            html += '<div class="layer"><div class="layer-box"><div class="share-button">';
            html += '<a href="https://www.facebook.com/sharer.php?u=' + encodeURIComponent(url) + '" class="fb"><i class="icon icon-fb"></i>Facebook</a>';
            html += '<a href="https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(this.shareConf.desc) + '" class="tw"><i class="icon icon-tw"></i>Twitter</a>';
            html += '</div><a href="javascript:;" class="layer-btn">CANCEL</a></div></div>';
            $('body').append(html);
            if (!KEWLApp.isKEWLApp) {
                if (IsIOS) {
                    $('.logo').attr('href', IOSLINK);
                } else {
                    $('.logo').attr('href', ARDLINK);
                }
            } else {
                html += 'javascript:;';
            }
        },
        downloadTip: function () {
            UI.confirm(this.shareConf.downloadTip, function () {
                if (isIOSMac) {
                    window.location.href = IOSLINK;
                } else {
                    window.location.href = ARDLINK;
                }
            }, function () {}, [{
                type: 'cancel',
                text: this.shareConf.cancel,
                style: ''
            }, {
                type: 'sure',
                text: this.shareConf.go,
                style: ''
            }]);
        },
        followHandler:function(uid,e){
            var target = $(e.target), self =this;
            if (target.hasClass('follow') || target.parents('.follow').length > 0) {
                if (target.hasClass('followed') || target.parents('.followed').length > 0) {
                    return false;
                }
                if (KEWLApp.isKEWLApp) {
                    try {
                        ga("send", "event", 'twrank', "click", "follow-app", 1);
                    } catch (e) {}
                } else {
                    try {
                        ga("send", "event", 'twrank', "click", "follow-web", 1);
                    } catch (e) {}
                }
                if (!!self.userInfo) {
                    var dataP={
                        uid: self.userInfo.userId,
                        token: self.userInfo.token,
                        androidid: self.userInfo.deviceId,
                        open_id: uid
                    };
                    axios.get('/follow/followingUsersH5',{params:dataP})
                        .then(function (response) {
                            var cuData =  response.data;
                            if (cuData.status == 200) {
                                $("li[data-uid='"+uid+"'].item").find(".follow").addClass('followed');
                            }
                        })
                        .catch(function (error) {
                            console.info(error)
                        });
                } else {
                    this.try_open(uid);
                }
            }
        },
        reflshHandler:function(){
            var self = this;
            this.leftTime=0;
            this.isReflesh = true;
            this.paraObj1.page=1;
            this.paraObj1.isLoading=false;
            this.paraObj1.loadMore=true;
            this.getData('r');
        },
        openHandler:function(uid,e){
            var self =this;
            if (!!self.userInfo) {
                if (KEWLApp.isKEWLApp) {
                    ga('send', 'event', "twrank", 'click', 'openBoZhuPage_' + uid, 1);
                    KEWLApp.openBoZhuPage(uid);
                } else {
                    ga('send', 'event', "twrank", 'click', 'openBoZhuPage_' + uid, 1);
                    if (isWeixin && isIOSMac) {
                        UI.alert("請點選右上角，選擇以瀏覽器開啟，並下載我們的 App！");
                    } else {
                        self.downloadTip();
                    }
                }
            }else{
                self.try_open(uid);
            }

        },
        try_open:function(uid) {
            var self= this;
            KEWLApp.androidTryOpenAppOrDownload({
                other: {
                    fn: 'openBoZhuPage',
                    param: [uid]
                },
                success: function () {
                    if (IsIOS) {
                        self.downloadTip();
                    }
                },
                fail: function () {
                    self.downloadTip();
                }
            });
        },
        bindEvent: function () {
            var self = this,topBtn = $('.back-top');
            $(window).scroll(function () {
                var top = document.body.scrollTop || document.documentElement.scrollTop;
                if (top > 0) {
                    topBtn.show();
                } else {
                    topBtn.hide();
                }
            });
            topBtn.on('click', function (e) {
                var toTop = function(){
                    var top = document.body.scrollTop || document.documentElement.scrollTop;
                    if (top > 0) {
                        window.scrollTo(0, top / 1.8);
                        setTimeout(toTop, 10);
                    }
                };
                toTop()
            });
            $('.share').on('click', function (e) {
                if (KEWLApp.hasShare) {
                    KEWLApp.openShareMenu({
                        "shareTypes": "0",
                        "url": self.shareConf.url,
                        "content": self.shareConf.desc,
                        "image": self.shareConf.img,
                        "subject": self.shareConf.title
                    }, function (data) {
                        if (data.shareType.toLowerCase() == 'facebook') {
                            if (data.success == 1) {
                                ga("send", "event", "fiesta", "click", "share-facebook-app", 1);
                            }
                        }
                    });
                    ga("send", "event", "twrank", "click", "share-app", 1);

                } else {
                    $('.layer').show();
                }
            });

            $('.layer-box').on('click', function (e) {
                e.stopPropagation();
            });

            $('.layer-btn,.layer').on('click', function (e) {
                $('.layer').hide();
            });
            $(document).scroll(function () {
                var tarObj = null;
                var pageHeight = Math.max(document.body.scrollHeight,document.body.offsetHeight);
                var viewportHeight = window.innerHeight ||
                    document.documentElement.clientHeight ||
                    document.body.clientHeight || 0;
                var scrollHeight = window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop || 0;
                tarObj = self.paraObj1;
                console.log(tarObj['loadMore'])
                if (pageHeight - viewportHeight - scrollHeight < 33 &&tarObj['loadMore']) {
                    console.log(self.paraObj1)
                    self.getData(self.paraObj1);
                    return true;
                }
            });
        }
    }
})
