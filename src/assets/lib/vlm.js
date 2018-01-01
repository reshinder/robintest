
var vlm={};
if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    define(function() {
        vlm.coinType={
                 "coin-usd-btc":["BTC","USD"]
                ,"coin-usd-eth":["ETH","USD"]
                ,"coin-usd-ltc":["LTC","USD"]
                ,"coin-usd-etc":["ETC","USD"]
                ,"coin-usd-bch":["BCH","USD"]
               }
        return vlm;
    });

} else if (typeof module !== 'undefined' && module.exports) {
    module.exports.vlm = vlm;
} else {
    window.vlm = vlm;
}
