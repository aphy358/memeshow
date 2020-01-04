import _ from 'lodash'

// 选择器实例
const instanceMap = {}

// 选择器管理
const procedures = {

	/**
	 * 获取选择器实例
	 *
	 * @param {Number} id
	 */
	get(id) {
		return instanceMap[id]
	},

	/**
	 * 打开选择器
	 *
	 * @param {String} type 类型
	 * @param {Object} args 参数
	 * @param {Function} onComplete 完成回调
	 * @param {Function} onError 错误处理回调 TODO: 找到可能出现的错误
	 */
	open(type, args, onComplete, onError) {

		// 选择器数据
		const instanceData = {
			id: new Date().getTime(),
			caller: {
				channel: null,
				waitEmit: {},
				waitOn: {},
				wiatOnce: {}
			},
			procedure: {
				channel: null,
				waitEmit: {},
				waitOn: {},
				wiatOnce: {}
			}
		}

		// 通信渠道，允许发送用户数据
		const callerEmitter = createEmmiter(instanceData.caller)
		const procedureEmitter = createEmmiter(instanceData.procedure)

		// 选择器实例
		const instance = {

			get id() {
				return instanceData.id
			},

			get args() { return args },

			register(page) {
				const channel = page.getOpenerEventChannel()
				setEmmiterChannel(channel, instanceData.procedure)
				return this
			},

			asCaller() {
				return callerEmitter
			},

			asProcedure() {
				return procedureEmitter
			}
		}

		// 打开选择器页面
		wx.navigateTo({
			url: `/pages/procedures/${type}/index?sid=${instance.id}`,
			success: res => {
				instanceMap[instance.id] = instance

				const channel = res.eventChannel
				setEmmiterChannel(channel, instanceData.caller)

				// 选择结果
				channel.once('complete', result => {
					delete instanceMap[instance.id]
					onComplete && onComplete(result)
				})

				// 错误处理
				channel.once('error', err => {
					delete instanceMap[instance.id]
					onError && onError(err)
				})
			},
			fail: err => onError(err)
		})

		return instance
	}
}

const createEmmiter = function (emitterData) {

	return {

		emit(evt, data) {
			const channel = emitterData.channel
			const waitEmit = emitterData.waitEmit
			if (channel) {
				channel.emit(evt, data)
			} else {
				waitEmit[evt] = waitEmit[evt] || []
				waitEmit[evt].push(data)
			}
			return this
		},

		off(evt, fn) {
			const channel = emitterData.channel
			const waitOn = emitterData.waitOn
			const waitOnce = emitterData.waitOnce
			if (channel) {
				channel.off(evt, fn)
			} else {
				if (!fn) {
					delete waitOn[evt]
					delete waitOnce[evt]
				} else {
					waitOn[evt] && _.remove(waitOn[evt], it => it === fn)
					waitOnce[evt] && _.remove(waitOnce[evt], it => it === fn)
				}
			}
			return this
		},

		on(evt, fn) {
			const channel = emitterData.channel
			const waitOn = emitterData.waitOn
			if (channel) {
				channel.on(evt, fn)
			} else {
				waitOn[evt] = _.uniq(_.concat(waitOn[evt] || [], [fn]))
			}
			return this
		},

		once(evt, fn) {
			const channel = emitterData.channel
			const waitOnce = emitterData.waitOnce
			if (channel) {
				channel.once(evt, fn)
			} else {
				waitOnce[evt] = _.uniq(_.concat(waitOnce[evt] || [], [fn]))
			}
			return this
		}
	}

}

const setEmmiterChannel = function (channel, emitterData) {
	emitterData.channel = channel

	const waitOn = emitterData.waitOn
	for (const evt in waitOn) {
		waitOn[evt].forEach(it => channel.on(evt, it))
	}
	emitterData.waitOn = {}

	const waitOnce = emitterData.wiatOnce
	for (const evt in waitOnce) {
		waitOnce[evt].forEach(it => channel.once(evt, it))
	}
	emitterData.waitOnce = {}

	const waitEmit = emitterData.waitEmit
	for (const evt in waitEmit) {
		waitEmit[evt].forEach(it => channel.emit(evt, it))
	}
	emitterData.waitEmit = {}
}

export default procedures
