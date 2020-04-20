/**
 * 支付方式
 */
const PaymentType = {

	// 支付宝 App 支付
	Alipay: "alipay",

	// 支付宝手机网站支付
	AlipayWap: "alipay_wap",

	// 支付宝扫码支付
	AlipayQr: "alipay_qr",

	// 支付宝条码支付
	AlipayScan: "alipay_scan",

	// 支付宝小程序支付
	AlipayLite: "alipay_lite",

	// 支付宝电脑网站支付
	AlipayPcDirect: "alipay_pc_direct",

	// 微信 App 支付
	Wx: "wx",

	// 微信 JSAPI 支付
	WxPub: "wx_pub",

	// 微信 Native 支付
	WxPubQr: "wx_pub_qr",      
	
	// 微信付款码支付
	WxPubScan: "wx_pub_scan",    
	
	// 微信 H5 支付
	WxWap: "wx_wap",     
	
	// 微信小程序支付
	WxLite: "wx_lite",     
	
	// QQ 钱包 App 支付
	QPay: "qpay",         
	
	// QQ 钱包公众号支付
	QPayPub: "qpay_pub",         
}

/**
 * 支付方式文本映射
 */
export const PaymentTypeMapping = {

	[PaymentType.Alipay]: "支付宝App支付",

	[PaymentType.AlipayWap]: "支付宝手机网站支付",

	[PaymentType.AlipayQr]: "支付宝扫码支付",

	[PaymentType.AlipayScan]: "支付宝条码支付",

	[PaymentType.AlipayLite]: "支付宝小程序支付",

	[PaymentType.AlipayPcDirect]: "支付宝电脑网站支付",

	[PaymentType.Wx]: "微信App支付",

	[PaymentType.WxPub]: "微信JSAPI支付",

	[PaymentType.WxPubQr]: "微信Native支付",      
	
	[PaymentType.WxPubScan]: "微信付款码支付",    
	
	[PaymentType.WxWap]: "微信H5支付",     
	
	[PaymentType.WxLite]: "微信小程序支付",     
	
	[PaymentType.QPay]: "QQ钱包App支付",         
	
	[PaymentType.QPayPub]: "QQ钱包公众号支付",         
}

export default PaymentType