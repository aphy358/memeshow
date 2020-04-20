## quick start
1. 引用
```
import procedures from "${path_to_procedures}/procedures/index"
```
2. 打开
```
/**
 * type - procedures 的类型，例如 "select-topic"
 * args - 参数
 * onComplete, onError - 回调
 */
const instance = procedures.open(type, args, onComplete, onError)
```
3. 监听抛出的事件
```
const emitter = instance.asProcedure()
emitter.on('toCaller', data => { /* do sth */ })
```
4. 传递消息到 procedure
```
const emitter = instance.asCaller()
emitter.emit('toProcedure', data)
```
5. procedures 流程结束时要抛出结束事件
```
emitter.emit('complete', data)
```

- 在 procedure 中可以嵌套打开多个 procedure。
- 一个复杂的 procedure 可以有多个页面来处理，比如选择商品之后编辑商品，该过程分别需要两个页面。主页面传递 sid 给子页面，子页面向主页面传数据则通过实例抛出事件。
- 在 procedure 中，先在 onLoad 中取到 sid，然后再到 onReady 中注册。在真机中，onLoad 页面还没有注册。