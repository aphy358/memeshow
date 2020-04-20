import XIM from "@/im"
import { IMPlatforms } from "im"

// 引入配置，打包时会resolve为指定环境的配置，配置文件位于 ./configs
import Config from "config"

// IM系统
wx.X.IM = wx.X.IM || new XIM(IMPlatforms.Tim, Config.tim)