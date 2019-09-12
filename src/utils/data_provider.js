
class DataProvider {
  constructor() {
    this.items = []
  }

  push(items) {
    items.forEach(it => {
      this.items.push(it)
    })
  }

  get(idx) {
    this.items[idx]
  }
}

module.exports = DataProvider