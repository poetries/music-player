var api = require('NeteaseCloudMusicApi').api
api.search('年度之歌',function(data){
    console.log(data)
})