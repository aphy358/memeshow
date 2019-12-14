// 接口 '/mapi/users/appMobileLogin'
// 参数
var params = {
  weixinData: { 
    "encryptedData": "ODdQLeNNOxuyuDQr4fRi98tBqGPN3qbtS3ijt24D7PEz+IPt1ujQUloibkCXFD4toH06BX5HJMe+FIuhBGuXoM0E7lnbJVAkaFiRWtFlcGoU554UA6pTAQ6pjrNtkPZyWYAYief2NvLn8Iz4ba4FCaUgm47WS5lUSlAjQ8P/IUlRO0qpupqVTBeUQh1qi8ilw0b8NvhH/lN9Cv5Nwr04dg==",
    "iv": "/kVkfGM9MHdpUcnw2y/jMg==" 
  },
  token: '1176f5679b37222762e9ab76974c6d4e',
  sign: '8eab055deeafbc9a83b53a6c2782ea9c'
}

// 返回结果
var res = {
	"status": 200,
	"msg": "\u6210\u529f",
	"data": {
		"next": 1,
		"userInfo": {
			"userId": 124871088,
			"userName": "du_5def54d11d7f9",
			"icon": "https:\/\/du.hupucdn.com\/equip1440055005",
			"sex": 1,
			"idiograph": "",
			"formatTime": "42\u5206\u949f\u524d",
			"banned": 0,
			"vip": 0,
			"group": [],
			"gid": [],
			"code": "",
			"amount": 0,
			"amountSign": "",
			"isOlder": 0,
			"isQuestionExpert": 0,
			"isAdmin": 0,
			"isBindMobile": 1,
			"isComplete": "1",
			"joinDays": 1,
			"isCommunityAgreements": 0,
			"countryCode": "86",
			"specialList": "",
			"isMerchant": 0,
			"isReadProtocol": "1",
			"isCertify": 0
		},
		"loginInfo": {
			"loginToken": "d7e82f36|449c8f88ef374424277ed9a23c46f8dc|991a5a67|54dd3419"
		},
		"openId": "ouhDM4iZevDn88aEAdSSkGjkF0cc",
		"isRegister": 0
	},
	"timestamp": 0.015992164611816,
	"log": null
}


// 接口 '/api/v1/h5/index/fire/userInfo?sign=b5727493487d369bcda16838ddb2e32d'
// 请求头部如下：
// :method	GET
// :scheme	https
// :path	/api/v1/h5/index/fire/userInfo?sign=b5727493487d369bcda16838ddb2e32d
// :authority	app.poizon.com
// accept	*/*
// content-type	application/x-www-form-urlencoded
// referer	https://servicewechat.com/wx3c12cdd0ae8b1a7b/79/page-frame.html
// appid	wxapp
// appversion	4.4.0
// wxapp-login-token	d7e82f36|449c8f88ef374424277ed9a23c46f8dc|991a5a67|54dd3419
// accept-language	zh-cn
// user-agent	Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79 MicroMessenger/7.0.8(0x17000820) NetType/WIFI Language/zh_CN
// accept-encoding	br, gzip, deflate

// 返回结果
var res = {
	"data": {
		"userInfo": {
			"userId": 124871088,
			"userName": "du_5def54d11d7f9",
			"icon": "https://du.hupucdn.com/equip1440055005",
			"sex": 1,
			"formatTime": "42分钟前",
			"banned": 0,
			"idiograph": "",
			"group": [],
			"gid": [],
			"vip": 0,
			"code": "",
			"amount": 0,
			"amountSign": "001b2c7edee2a1cba4ebab1677f80541",
			"isOlder": 0,
			"isQuestionExpert": 0,
			"isBindMobile": 1,
			"joinDays": 1,
			"isReadProtocol": 1,
			"isComplete": 1,
			"isCertify": 0,
			"isMerchant": 0,
			"isAdmin": 0,
			"mobile": "159****9410",
			"mobileMd5": "c058892782e88eab774f545872999a9d",
			"isIdentifyExpert": 0,
			"addTime": 1575965904,
			"account": "",
			"accountType": 0,
			"isCommunityAgreements": 0
		},
		"total": {
			"remindNum": 0,
			"identifyNum": 0,
			"questionNum": 0,
			"buyNum": 0,
			"soldNum": 0,
			"couponNum": 0,
			"redPacketBalance": 0,
			"amount": 0
		},
		"noticeStatus": null,
		"cardButtonText": null,
		"redPacketInviteText": null,
		"cashBalanceInfo": {
			"cashBalance": 0,
			"cashFreezeBalance": 0
		},
		"usersNums": null,
		"collectProductList": null,
		"redPacketInviteUrl": null,
		"isSellRecord": null,
		"manualCertifyStatus": null,
		"isKol": null,
		"unionList": null,
		"customerServiceCenterUrl": "https://m.poizon.com/hybird/h5customerService/serviceCenter?faqGroup=1&v=4.11.0",
		"postUserInfo": null,
		"bountyInfo": null
	},
	"code": 200,
	"status": 200,
	"msg": "ok",
	"error": false,
	"tradeNotice": null
}
