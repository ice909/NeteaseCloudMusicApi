// 歌手热门 50 首歌曲
const createOption = require('../util/option.js')
module.exports = async (query, request) => {
  const data = {
    id: query.id,
  }
  const res = await request(
    `/api/artist/top/song`,
    data,
    createOption(query, 'weapi'),
  )
  console.log(res.body)
  const songs = []
  for (const i of res.body.songs) {
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
    songs.push(song)
  }
  res.body.songs = songs
  return res
}
