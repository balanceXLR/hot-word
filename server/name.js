const cheerio = require('cheerio');
const http = require('http');
const iconv = require('iconv-lite');

module.exports = function getNames() {
    return new Promise(resolve => {
        let url = 'http://news.4399.com/yyssy/shishenlu/'
        http.get(url, function (res) {
            var chunks = []
            res.on('data', function (data) {
                chunks.push(data)
            });
            res.on('end', function () {
                var names = []
                var html = iconv.decode(Buffer.concat(chunks), 'gb2312');
                var $ = cheerio.load(html, {
                    decodeEntities: false
                });
                $('.clist a').each(function (idx, element) {
                    var $element = $(element);
                    names.push($element.text())
                })
                resolve(names)
            });
        })
    })
   
}



    

