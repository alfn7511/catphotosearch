class ImageInfo {
  $imageInfo = null
  data = null

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div')
    $imageInfo.className = 'ImageInfo'
    this.$imageInfo = $imageInfo
    $target.appendChild($imageInfo)
    this.$imageInfo.addEventListener('click', (e) => {
      // console.log(e.target, document.querySelector(".content-wrapper").contains(e.target))
      if (!document.querySelector('.content-wrapper').contains(e.target)) this.setState({ visible: false })
    })

    this.data = data

    this.render()
  }

  setState(nextData) {
    this.data = nextData
    this.render()
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin, width, height } = this.data.image
      this.$imageInfo.innerHTML = `
          <div class="content-wrapper">
            <div class="title">
              <span>${name}</span>
              <div class="close" id="btn-catinfo-close">x</div>
            </div>
            <img src="${url}" alt="${name}" width="${width / 2}"/>        
            <div class="description">
              <div>성격: ${temperament}</div>
              <div>태생: ${origin}</div>
            </div>
          </div>`
      let $closeBtn = document.querySelector('#btn-catinfo-close')
      $closeBtn.addEventListener('click', () => {
        this.setState({ visible: false })
      })
      this.$imageInfo.style.display = 'block'
      this.$imageInfo.className = 'ImageInfo'
    } else {
      this.$imageInfo.className = 'ImageInfo hide'
      setTimeout(() => {
        this.$imageInfo.style.display = 'none'
      }, 1100)
    }
  }
}
