import axios from 'axios'
import axiosAdapter from 'axios-miniprogram-adapter'

// 全局业务错误处理，错误码 => 错误处理列表
const failedHandlers = {}
// 默认业务错误处理
let defaultFailedHandler = async response => {
	console.error(`未处理业务错误。错误码：${response.data.code}，错误消息：${response.data.msg}`)
}
// 全局HTTP异常处理，http status => 错误处理列表
const errorHandlers = {}
// 默认HTTP异常处理
let defaultErrorHandler = async error => {
	console.error(`未处理HTTP错误：${error}`)
}

// 请求时回传的HTTP头部
const echoHeaderValues = {}

/**
 * API基类，公共接口，拦截处理错误等
 */
export default class BaseApi {

	/**
	 * 初始化API
	 * 
	 * @param {*} options 配置参数
	 * 	{
	 * 		onFailed: response => {},				// 默认业务错误回调
	 * 		onError: error => {},						// 默认HTTP异常回调
	 * 		echoHeaders: ['X-Authorization]	// 请求时回传给服务端的http头
	 * 	}
	 */
	static init(options = {}) {
		if (options.onFailed) defaultFailedHandler = options.onFailed
		if (options.onError) defaultErrorHandler = options.onError

		// 委托小程序request进行http请求
		axios.defaults.adapter = axiosAdapter

		// 标识ajax请求
		axios.defaults.headers.common['HTTP_X_REQUESTED_WITH'] = 'XMLHttpRequest'
		axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

		// HTTP头回传
		const echoHeaders = options.echoHeaders || ['X-Authorization']
		axios.interceptors.response.use(response => {
			// 获取头
			echoHeaders.forEach(it => {
				if (!!response.headers[it]) {
					echoHeaderValues[it] = response.headers[it]
				}
			})
			return response
		})
		axios.interceptors.request.use(config => {
			// 设置头
			Object.keys(echoHeaderValues).forEach(it => {
				if (!!echoHeaderValues[it]) {
					config.headers[it] = echoHeaderValues[it]
				}
			})
			return config
		})

		// 拦截错误处理
		axios.interceptors.response.use(async response => {
			// HTTP 200：检查业务错误码
			const data = response.data
			const code = data.code
			if (code === 0) {
				// 请求成功
				return response
			}
			if (failedHandlers[code]) {
				// 拦截处理业务错误
				for (const handler of failedHandlers[code]) {
					await handler(response)
				}
			} else {
				// 默认业务错误处理
				await defaultFailedHandler(response)
			}
			throw response

		}, async error => {
			// HTTP 403/404/500...
			if (!error.response) {
				// 没有返回内容，按默认方式处理
				await defaultErrorHandler(error)
				throw error
			}
			const response = error.response
			const status = response.status
			const data = response.data
			const code = data && data.code
			// 优先作为处理业务错误
			if (!!code) {
				if (failedHandlers[code]) {
					for (const handler of failedHandlers[code]) {
						await handler(response)
					}
				} else {
					await defaultFailedHandler(response)
				}
				throw error
			}
			// 没有业务错误信息，作为HTTP错误处理
			if (errorHandlers[status]) {
				// 拦截http错误
				for (const handler of errorHandlers[status]) {
					await handler(error)
				}
			} else {
				await defaultErrorHandler(error)
			}
			throw error
		})
	}

	/**
	 * 注册全局业务错误处理
	 * 
	 * @param {*} code 			错误码
	 * @param {*} onFailed 	错误处理
	 */
	static onFailed(code, handler) {
		failedHandlers[code] = failedHandlers[code] || []
		failedHandlers[code].push(handler)
	}

	/**
	 * 注册全局HTTP错误处理
	 * 
	 * @param {*} status		http status
	 * @param {*} onError 	错误处理
	 */
	static onError(status, handler) {
		errorHandlers[status] = errorHandlers[status] || []
		errorHandlers[status].push(handler)
	}

	constructor(baseUrl) {
		this.baseUrl = baseUrl
	}

	async post(path, body) {
		try {
			const response = await axios.post(`${this.baseUrl}${path}`, body || {})
			return this._result(response)
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	async get(path, query) {
		try {
			const response = await axios.get(`${this.baseUrl}${path}`, { params: query })
			return this._result(response)
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	_result(response) {
		return response.data.data
	}

}