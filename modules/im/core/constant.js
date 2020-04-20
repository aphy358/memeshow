
export default Object.freeze({

	// IM事件
	IMEvent: {
		Ready: 'Ready',
		Unready: 'Unready',
		Error: 'Error',
		KickedOut: 'KickedOut',
		Groups: 'Groups',
		Sessions: 'Sessions',
		Messages: 'Messages'
	},

	// 加入群组状态
	IMJoinGroupResult: {
		// 加入成功
		Success: 0,
		// 等待审核
		WaitApproval: 1,
		// 重复加入
		AlreadyJoined: 2
	},

	// 被踢原因
	IMKickedOutReason: {
		// 其它所有原因都是未知原因
		Unknown: 0,
		// 同一端重复登录被踢
		MultiLogin: 1,
		// 多端登录被踢
		MultiDevice: 2,
		// 签名过期被踢
		SignExpired: 3
	}

})