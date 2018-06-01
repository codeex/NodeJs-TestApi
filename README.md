### 最终Api测试结果
![](http://codeex.cn/wp-content/uploads/2018/05/ad6c0f9e2234c611756c7f51fa811db6.png)
### 萌生Api测试想法
> 由于前端的同学一直催促后端的Api进度，并对Api的质量提出质疑，虽然我已经在PostMan中进行了测试，然而测试后并没有结果可参考，并且由于需要动态获取Token，没学会设置变量。考虑到js调用api很方便，萌生了采用js调用api来做接口检查。搜索了下github类库，果然有[SuperTest](https://github.com/visionmedia/supertest "SuperTest")这样的精华类库存在。
> 题外话，相关测试的同事已经采用XUnit实现了自动测试，这个... 自己做感觉有点**鸡肋**了，幸亏该测试写起来不费力，速度快，自用还是杠杠的。
### 安装mocha
> mocha是nodejs下的自动化测试框架，可以大大简化异步测试的复杂度，并且提供相关的报告。

安装:
```
npm install --global mocha
```
调用方式
```
var assert = require('assert');
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1,2,3].indexOf(4), -1);
    });
  });
});
```
**特别注意，在windows下如果想敲命令 mocha使得系统运行测试，需要全局安装mocha**
### 安装superTest
> [superTest](https://github.com/visionmedia/supertest "superTest")是一个Http封装的测试库，其简化了Http的请求和测试。

安装方式
```
npm install supertest --save-dev
```
简单的例子如下：
```
const request = require('supertest');
const express = require('express');

const app = express();

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

request(app)
  .get('/user')
  .expect('Content-Type', /json/)
  .expect('Content-Length', '15')
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });
```
### shoude类库安装
> [should 类库](https://github.com/tj/should.js "should 类库")是nodejs下的测试断言库

安装
```
npm install should --save-dev
```
用法如下：
```
var should = require('should');

var user = {
    name: 'tj'
  , pets: ['tobi', 'loki', 'jane', 'bandit']
};

user.should.have.property('name', 'tj');
user.should.have.property('pets').with.lengthOf(4);

// if the object was created with Object.create(null)
// then it doesn't inherit `Object` and have the `should` getter
// so you can do:

should(user).have.property('name', 'tj');
should(true).ok;

someAsyncTask(foo, function(err, result){
  should.not.exist(err);
  should.exist(result);
  result.bar.should.equal(foo);
});
```
### 安装完毕，依赖库基本安装完毕，可以开始工作了
在项目目录建立一个目录，例如：abc
在abc目录下建立一个test.js，以及data.js 。
我们的目标是测试一个微服务下的api，理论上这两个文件就足够了。

在vs code的命令行执行 mocha，啊哈，一个个api逐步测试，一切OK！！




