import Base from "../base/Base.js"

const config = {
  baseurl: "http://192.168.0.96:3001/"
}

class Test extends Base {
  constructor(config) {
    super(config)
  }

  async testReq() {
    return await this.request("get", "category/list")
  }
}

const testInstance = new Test(config)

export default testInstance
