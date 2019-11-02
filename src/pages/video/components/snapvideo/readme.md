# snapvideo 小视频展示组件

### 介绍

`snapvideo` 用于展示小视频，一般是作为一个抽象节点和 `hswiper` 组件结合使用，可参考[抽象节点](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/generics.html)的使用

有关小程序滑屏 video 的一些问题可参考：[问题参考](https://blog.csdn.net/lqyygyss/article/details/87980540)

方案：
只有当前播放的 video 组件才显示，滑出屏幕的 video 不显示，这样可以避免在 iOS 上快速上下滑动视频导致当前视频处于暂停的窘境，
但是这样处理的话，上下滑动屏幕的时候，上下两屏 video 是空洞没有内容的，体验不好，可以考虑用视频的第一帧图片作为覆盖，
图片和视频的显示互斥。

