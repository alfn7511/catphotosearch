console.log('app is running!')

class App {
  $target = null
  data = []

  constructor($target) {
    this.$target = $target
    this.data = []

    this.loading = new Loading({ $target, visible: false })

    this.theme = new Theme({ $target })

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        this.loading.render(true)
        const data = await api.fetchCats(keyword)
        this.setState(data)
        this.loading.render(false)
      },
    })
    this.randomImgList = new RandomImgList({ $target })

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (catid) => {
        this.loading.render(true)
        const data = await api.fetchCatInfo(catid)
        this.setImageInfo(data)
        this.loading.render(false)
      },
    })

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    })

    this.getCatRandom()
  }

  errMessage(err) {
    console.log(err)
    alert(err.message)
    this.loading.render(false)
  }
  setState(nextData) {
    this.data = nextData
    this.searchResult.setState(nextData)
    this.loading.render(false)
  }
  setImageInfo(image) {
    if (image) this.imageInfo.setState({ visible: true, image })
    this.loading.render(false)
  }
  async getCatRandom() {
    this.loading.render(true)
    const catsRandom = await api.fetchCats()
    let imgs = []
    if (catsRandom.length > 0) {
      for (let index = 0; index < 5; index++) {
        let rand = Math.floor(Math.random() * catsRandom.length) + 1
        console.log(rand, catsRandom[rand])
        imgs.push(catsRandom[rand])
      }
    }
    await this.randomImgList.render(imgs)
    this.loading.render(false)
  }
}

class Loading {
  constructor({ $target, visible }) {
    this.visible = visible
    const $loading = document.createElement('div')
    $loading.className = 'loading'
    this.$loading = $loading
    $target.appendChild($loading)
    this.render(this.visible)
  }
  render(visible) {
    this.visible = visible
    this.$loading.innerHTML = '<div></div>'
    this.$loading.style.display = this.visible ? 'block' : 'none'
  }
}

class Theme {
  constructor({ $target }) {
    this.theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const $themeEl = document.createElement('div')
    $themeEl.className = 'theme-select-box'
    this.$themeEl = $themeEl
    this.$themeEl.innerHTML = `<button>${this.theme === 'dark' ? 'light' : 'dark'} mode</button>`
    $target.appendChild($themeEl)

    this.$themeEl.querySelector('button').addEventListener('click', (e) => {
      document.body.classList.remove(this.theme)
      let themeClass = this.theme === 'dark' ? 'light' : 'dark'
      document.body.classList.add(themeClass)
      e.target.innerHTML = `${this.theme} mode`
      this.theme = themeClass
    })
  }
}

class RandomImgList {
  constructor({ $target }) {
    const $randomEI = document.createElement('div')
    $randomEI.className = 'random'
    this.$randomEI = $randomEI
    $target.appendChild($randomEI)
  }
  async randImgs() {
    const catsRandom = await api.fetchCats()
    let imgs = []
    if (catsRandom.length > 0) {
      for (let index = 0; index < 5; index++) {
        let rand = Math.floor(Math.random() * catsRandom.length) + 1
        imgs.push(catsRandom[rand])
      }
    }
    return await imgs
  }
  async render(data) {
    // let data = await this.randImgs()
    console.log(data)
    this.$randomEI.innerHTML = `
    <ul>
    ${data
      .map(
        (cat) => `
            <li class="item" data-id="${cat.id}">
              <img src="${cat.url}" alt="${cat.name}" loading="lazy"/>
            </li>
          `,
      )
      .join('')}
    </ul>
    <button class="prev-btn">←</button>
    <button class="next-btn">→</button>
    `
    const $imgsEI = this.$randomEI.querySelector('ul')
    let move = 0
    let imgW = this.$randomEI.querySelector('ul>li').offsetWidth
    $imgsEI.style.transform = `translateX(${move}px)`
    this.$randomEI.addEventListener('click', (e) => {
      if (e.target.closest('button')) {
        if (e.target.closest('.prev-btn')) {
          move = move > 0 ? 0 : move + imgW
        } else {
          move = move === 0 ? move - imgW : move - imgW
        }
        $imgsEI.style.transform = `translateX(${move}px)`
      }
    })
  }
}
