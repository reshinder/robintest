let helper ={
    getQueryString:function(key){
        let t = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i"),
            n = window.location.search.substr(1).match(t);
        return null != n ? unescape(n[2]) : "";
    }
};

export default helper;