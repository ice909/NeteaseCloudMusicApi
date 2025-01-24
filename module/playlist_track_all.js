// 通过传过来的歌单id拿到所有歌曲数据
// 支持传递参数limit来限制获取歌曲的数据数量 例如: /playlist/track/all?id=7044354223&limit=10

const createOption = require('../util/option.js')
module.exports = (query, request) => {
  const data = {
    id: query.id,
    n: 100000,
    s: query.s || 8,
  }
  //不放在data里面避免请求带上无用的数据
  let limit = parseInt(query.limit) || 1000
  let offset = parseInt(query.offset) || 0

  return request(`/api/v6/playlist/detail`, data, createOption(query)).then(
    async (res) => {
      let trackIds = res.body.playlist.trackIds
      let idsData = {
        c:
          '[' +
          trackIds
            .slice(offset, offset + limit)
            .map((item) => '{"id":' + item.id + '}')
            .join(',') +
          ']',
      }
      const response = await request(
        `/api/v3/song/detail`,
        idsData,
        createOption(query),
      )
      const songs = []
      for (const i of response.body.songs) {
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
      response.body.songs = songs
      return response
    },
  )
}
