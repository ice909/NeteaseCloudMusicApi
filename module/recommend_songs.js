// 每日推荐歌曲

const createOption = require('../util/option.js')
module.exports = async (query, request) => {
  const data = {}
  const res = await request(
    `/api/v3/discovery/recommend/songs`,
    data,
    createOption(query, 'weapi'),
  )
  const m_data = []
  for (const i of res.body.data.dailySongs) {
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
    m_data.push(song)
  }

  res.body.data = m_data
  return res
}
