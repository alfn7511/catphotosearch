class SearchResult {
  $searchResult = null
  data = null
  onClick = null

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement('div')
    this.$searchResult.className = 'SearchResult'
    $target.appendChild(this.$searchResult)

    this.data = initialData
    this.onClick = onClick

    this.render()
  }

  setState(nextData) {
    this.data = nextData
    this.render()
  }

  render() {
    if (this.data.length === 0) {
      this.$searchResult.className = 'SearchResult nodata'
      this.$searchResult.innerHTML = '<p>검색결과가 없습니다.</p>'
      return false
    }
    this.$searchResult.className = 'SearchResult'
    this.$searchResult.innerHTML = this.data
      .map(
        (cat) => `
              <div class="item" data-id="${cat.id}">
                <img src="${cat.url}" alt="${cat.name}" loading="lazy"/>
              </div>
            `,
      )
      .join('')
    this.$searchResult.addEventListener('click', (e) => {
      if (e.target.closest('.item')) {
        let { id } = e.target.closest('.item').dataset
        this.onClick(id)
      }
    })
  }
}
