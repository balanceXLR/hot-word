const fs = require('fs')

const getNames = require('./name')
const getHotWords = require('./hot-word')
const filter = require('./filter')

async function getHotShiShen() {
    let nameList = await getNames()
    let hotWords = await getHotWords()
    let result = filter(hotWords, nameList)
    fs.writeFile('../static/data.json', 'getData(' + JSON.stringify(result) + ')', 'utf-8', (err) => {
        console.log(err)
    })
}
getHotShiShen()




