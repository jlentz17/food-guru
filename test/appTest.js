const assert = require("chai").assert
const app = require("../utils/app")

describe("App", function(){
  it("app should return hello", function(){
    assert.equal(app(), "hello")
  })
})
