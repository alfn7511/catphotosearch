const API_ENDPOINT = 'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev/api/cats'

const request = async (url) => {
  try {
    const result = await fetch(url)
    return result.json()
  } catch (e) {
    console.warn(e)
  }
}

const api = {
  fetchCats: async (keyword) => {
    let url = keyword ? `${API_ENDPOINT}/search?q=${keyword}` : `${API_ENDPOINT}/random50`
    const res = await request(url)
    return res ? res.data : []
  },
  fetchCatInfo: async (id) => {
    const res = await request(`${API_ENDPOINT}/${id}`)
    return res ? res.data : ''
  },
}
