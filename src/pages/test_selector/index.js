import procedures from '../procedures/index'

Page({
  selectProduct() {
    const instance = procedures.open('select-product', { id: 'product-id' }, result => console.log('procedure result: ', result))
    const emitter = instance.asCaller()
    emitter.on('toCaller', data => console.log('from selector: ', data))
    setTimeout(() => emitter.emit('toSelector', { id: instance.id }), 3000)
  },
  selectTopic() {
    const instance = procedures.open('select-topic', null, result => console.log('selector result: ', result))
  },
  selectRelation() {
    const instance = procedures.open('select-relation', null, result => console.log('selector result: ', result))
  },
  selectLocation() {
    procedures.open('select-location', null, result => console.log('location select-selector result: ', result))
  }
})