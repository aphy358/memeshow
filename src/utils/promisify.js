const promisify = obj => {
	while (obj) {
		Object.getOwnPropertyNames(obj).forEach(name => {
			// 过滤掉__xxx__
			if (name.startsWith("__") && name.endsWith("__")) return
			const desc = Object.getOwnPropertyDescriptor(obj, name)
			if (!desc) return

			// 过滤掉非函数
			let fn
			if (typeof desc.value === 'function') fn = obj[name]
			else if (typeof desc.get === 'function') fn = obj[name]
			if (!fn) return

			// 包装一个Promise函数 xxxAsync
			Object.defineProperty(obj, `${name}Async`, {
				value: function () {
					const args = Array.prototype.slice.call(arguments)
					const lastArgIdx = Math.max(0, args.length - 1)
					const lastArg = args[lastArgIdx]

					// 不符合微信callback规范，直接调用原函数
					if (lastArg !== undefined && typeof lastArg !== 'object') {
						return fn.call(this, ...args)
					}

					// 符合微信callback规范promisify
					const that = this
					return new Promise(function (resolve, reject) {
						args[lastArgIdx] = Object.assign(lastArg || {}, {
							success: function () { resolve(...arguments) },
							fail: function () { reject(...arguments) }
						})
						fn.call(that, ...args)
					})
				}
			})
		})

		// 原型链向上查找
		obj = Object.getPrototypeOf(obj)
	}
}
module.exports = promisify