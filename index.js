var cheerio = require('cheerio');
var https = require('https');
var iconv = require('iconv-lite');
var async = require('async')

var baseUrl = 'https://tieba.baidu.com/f?kw=%E7%BD%91%E6%98%93%E9%98%B4%E9%98%B3%E5%B8%88&ie=utf-8&pn='
let urlList = []
for (let i = 0; i < 10; i++) {
    urlList.push(baseUrl + 10 * i)
}
let count = 0

async function getTitle(url) {
    return new Promise((resolve) => {
        https.get(url, function (res) {
            var chunks = []
            res.on('data', function (data) {
                chunks.push(data)
            });
            res.on('end', function () {
                var titles = [];
                var html = iconv.decode(Buffer.concat(chunks), 'utf-8');
                var $ = cheerio.load(html, {
                    decodeEntities: false
                });
                $('.j_thread_list .threadlist_title .j_th_tit ').each(function (idx, element) {
                    var $element = $(element);
                    titles.push({
                        title: $element.text()
                    })
                })
                console.log(count)
                resolve(titles) 
            });
        })
    })
    
}

async function concurrent(url, callback) {
    count ++
    console.log('现在的并发数是:' + count + ',正在抓取的url是:' + url)
    let res = await getTitle(url)
    count --
    console.log(count)
    callback(null, res)
}

async.mapLimit(urlList, 5, function (url, callback) {
    concurrent(url, callback)
}, function (err, result) {
    console.log(err)
    console.log('final:');
    console.log(result);
})


