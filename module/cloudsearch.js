// 搜索

const createOption = require('../util/option.js')
module.exports = async (query, request) => {
  const data = {
    s: query.keywords,
    type: query.type || 1, // 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
    limit: query.limit || 30,
    offset: query.offset || 0,
    total: true,
  }
  const result = []
  const res = await request(`/api/cloudsearch/pc`, data, createOption(query))
  for (const i of res.body.result.songs) {
    const song = {}
    song.id = i.id.toString()
    song.name = i.name
    song.pic = i.al.picUrl
    song.ar = i.ar.map((item) => {
      return {
        name: item.name,
      }
    })
    song.al = i.al.name
    song.duration = i.dt
    result.push(song)
  }
  res.body.result.songs = result
  return res
}
