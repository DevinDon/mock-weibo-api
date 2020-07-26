# Mock Weibo API Server

一个模拟的微博开放平台服务器，实现了一部分可能需要的功能。

部署在 `https://mock.don.red/weibo` 上，模拟路径与原路径相同。

# Mock APIs

## Get Code

| 请求说明 | 获取用户 Code，用于换取 Token           |
| -------- | --------------------------------------- |
| 请求方式 | GET                                     |
| 请求路径 | oauth2/authorize                        |
| 请求参数 | redirect_uri，必选                      |
| 返回内容 | 302 跳转至 redirect_uri 并携带参数 code |

## Get Token

| 请求说明 | 获取 Token                  |
| -------- | --------------------------- |
| 请求方式 | POST                        |
| 请求路径 | oauth2/access_token         |
| 请求参数 | 无                          |
| 返回内容 | `{ access_token: 'token' }` |

## Get Public Timeline

| 请求说明 | 获取公共微博时间线                                           |
| -------- | ------------------------------------------------------------ |
| 请求方式 | GET                                                          |
| 请求路径 | 2/statuses/public_timeline.json                              |
| 请求参数 | count，可选，默认 20                                         |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/statuses/public_timeline) |

## 其他接口正在筹划中

敬请期待。

# [THE MIT LICENSE](https://raw.githubusercontent.com/DevinDon/license/master/THE%20MIT%20LICENSE)

Copyright © 2018+ Devin Don

LICENSE: MIT

Click https://raw.githubusercontent.com/DevinDon/license/master/THE%20MIT%20LICENSE to view a copy of this license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
