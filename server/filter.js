const nodejieba = require('nodejieba')

module.exports = function filter(wordsList, filterList) {
    nodejieba.load({
        dict: nodejieba.DEFAULT_DICT,
        hmmDict: nodejieba.DEFAULT_HMM_DICT,
        userDict: '../static/keyword.utf8',
        idfDict: nodejieba.DEFAULT_IDF_DICT,
        stopWordDict: nodejieba.DEFAULT_STOP_WORD_DICT
    })
    const list = nodejieba.extract(wordsList, 50)
    console.log(list)
    // TODO: 过滤关键词不准确
    // let newList = list.filter(item => {
    //     return filterList.indexOf(item.word) >= 0
    // })
    // return newList.map(item => {
    //     return [item.word, item.weight.toFixed()]
    // })
    return list.map(item => {
        return [item.word, parseInt(item.weight.toFixed())]
    })

}