// 推荐新歌

const createOption = require('../util/option.js')
module.exports = async (query, request) => {
  const data = {
    type: 'recommend',
    limit: query.limit || 10,
    areaId: query.areaId || 0,
  }
  const res = await request(
    `/api/personalized/newsong`,
    data,
    createOption(query, 'weapi'),
  )
  const result = []
  for (const i of res.body.result) {
    const song = {}
    song.id = i.id.toString()
    song.name = i.name
    song.pic = i.picUrl
    song.ar = i.song.artists.map((item) => {
      return {
        name: item.name,
      }
    })
    song.al = i.song.album.name
    song.duration = i.song.duration
    result.push(song)
  }

  res.body.result = result
  return res
}
