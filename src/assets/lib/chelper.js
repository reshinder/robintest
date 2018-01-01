let helper = {
    getQueryString: function (key) {
        let t = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i"),
            n = window.location.search.substr(1).match(t);
        return null != n ? unescape(n[2]) : "";
    },
    getItem: function (key) {
        return JSON.parse(localStorage.getItem(key))
    },
    setItem: function (key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    },
    removeItem: function (key) {
        localStorage.removeItem(key);
    }
};
export default helper;