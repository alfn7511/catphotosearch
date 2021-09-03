const TEMPLATE = '<input type="text">'

class SearchInput {
  constructor({ $target, onSearch }) {
    const $searchInput = document.createElement('input')
    this.$searchInput = $searchInput
    this.$searchInput.placeholder = '고양이를 검색해보세요.|'
    this.$searchInput.autocomplete = 'off'
    $searchInput.className = 'SearchInput'
    $target.appendChild($searchInput)

    const $btn = document.createElement('button')
    $btn.textContent = '전체보기'
    $btn.addEventListener('click', (e) => {
      onSearch()
    })
    $target.appendChild($btn)
    this.keyword = []
    const $keywordLog = document.createElement('ul')
    this.$keywordLog = $keywordLog
    $target.appendChild($keywordLog)

    $searchInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        let keyword = e.target.value
        this.renderKeyword(keyword)
        onSearch(keyword)
      }
    })
    $searchInput.addEventListener('click', (e) => {
      e.target.value = ''
    })
    $searchInput.focus()
    //console.log('SearchInput created.', this)
  }
  renderKeyword(keyword) {
    if (keyword && !this.keyword.includes(keyword)) this.keyword.unshift(keyword)
    this.$keywordLog.innerHTML = this.keyword
      .slice(0, 5)
      .map((text) => `<li>${text}</li>`)
      .join('')
  }
}
