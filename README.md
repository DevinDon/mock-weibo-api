# Mock Weibo API

一个模拟的微博开放平台服务器，实现了一部分可能需要的功能。

部署在 `https://mock.don.red/weibo` 上，模拟路径与原路径相同。

> 本项目仅供学习使用，如有侵权，请[联系作者](mailto:I.INF@Outlook.com)。

## Usage

将请求地址中的 `https://api.weibo.com` 替换为 `https://mock.don.red/weibo` 即可，如：

<https://api.weibo.com/2/statuses/public_timeline.json>

替换后：

<https://mock.don.red/weibo/2/statuses/public_timeline.json>

## Contents

[TOC]

## Mock APIs

> 提示：请在所有请求头中加入 `Authorization: OAuth2 ${token}` 字段，其中的 `token` 可以通过 [Authorization > Token 接口](#Token)获取。

### Authorization

#### Code

> 模拟登录界面，用户可以跳转到本页实现模拟登录，然后携带 `code` 跳转回 App 内的登录处理页面。

| 请求说明 | 获取用户 Code，用于换取 Token                                                                           |
| -------- | ------------------------------------------------------------------------------------------------------- |
| 请求方式 | GET                                                                                                     |
| 请求路径 | oauth2/authorize                                                                                        |
| 请求参数 | `redirect_uri` 授权回调地址，必填                                                                       |
|          | 数据格式：路径参数                                                                                      |
| 返回内容 | 302 跳转至 redirect_uri 并携带路径参数 code                                                             |
| 预览     | [点击预览](https://mock.don.red/weibo/oauth2/authorize?redirect_uri=https%3A%2F%2Fmock.don.red%2Fweibo) |

#### Token

| 请求说明 | 获取 Token                                           |
| -------- | ---------------------------------------------------- |
| 请求方式 | POST                                                 |
| 请求路径 | oauth2/access_token                                  |
| 请求参数 | `code` 用户 Code，必填                               |
|          | 数据格式：请求体 JSON / Form Data / Form URL Encoded |
| 返回内容 | `{ access_token: 'token' }`                          |

#### Get UID

| 请求说明 | 获取当前用户的 UID     |
| -------- | ---------------------- |
| 请求方式 | GET                    |
| 请求路径 | 2/account/get_uid.json |
| 请求参数 |                        |
| 返回内容 | `{ uid: 1234567 }`     |

### Status

#### Public Timeline

| 请求说明 | 返回最新的公共微博                                                       |
| -------- | ------------------------------------------------------------------------ |
| 请求方式 | GET                                                                      |
| 请求路径 | 2/statuses/public_timeline.json                                          |
| 请求参数 | `count` 单页返回的记录条数，可选，默认为 20，最大 200                    |
|          | `page` 分页，可选，默认为 1                                              |
|          | 数据格式：路径参数                                                       |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/statuses/public_timeline) |
| 预览     | [点击预览](http://mock.don.red/weibo/2/statuses/public_timeline.json)    |

#### Home Timeline

| 请求说明 | 获取当前登录用户及其所关注（授权）用户的最新微博                       |
| -------- | ---------------------------------------------------------------------- |
| 请求方式 | GET                                                                    |
| 请求路径 | 2/statuses/home_timeline.json                                          |
| 请求参数 | `count` 单页返回的记录条数，可选，默认为 20，最大 200                  |
|          | `page` 分页，可选，默认为 1                                            |
|          | 数据格式：路径参数                                                     |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/statuses/home_timeline) |
| 预览     | [点击预览](http://mock.don.red/weibo/2/statuses/home_timeline.json)    |

#### Show Status

| 请求说明 | 根据微博 ID 返回某条微博内容                                                   |
| -------- | ------------------------------------------------------------------------------ |
| 请求方式 | GET                                                                            |
| 请求路径 | 2/statuses/show.json                                                           |
| 请求参数 | `id` 指定的微博 ID                                                             |
|          | 数据格式：路径参数                                                             |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/statuses/show)                  |
| 预览     | [点击预览](https://mock.don.red/weibo/2/statuses/show.json?id=160126590171282) |

### Comment

#### Create Comment

| 请求说明 | 评论某条微博                                                    |
| -------- | --------------------------------------------------------------- |
| 请求方式 | POST                                                            |
| 请求路径 | 2/comments/create.json                                          |
| 请求参数 | 放置在请求体中：`id` 需要评论的微博 ID                          |
|          | `comment` 评论内容，最多 140 字，超出会被截取                   |
|          | 数据格式：请求体 JSON / Form Data / Form URL Encoded            |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/comments/create) |

#### Reply Comment

| 请求说明 | 回复某条评论                                                   |
| -------- | -------------------------------------------------------------- |
| 请求方式 | POST                                                           |
| 请求路径 | 2/comments/reply.json                                          |
| 请求参数 | `id` 对应的微博 ID                                             |
|          | `cid` 需要回复的微博 ID                                        |
|          | `comment` 评论内容，最多 140 字，超出会被截取                  |
|          | 数据格式：请求体 JSON / Form Data / Form URL Encoded           |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/comments/reply) |

#### Destroy Comment

| 请求说明 | 删除某条评论，仅限当前用户                                       |
| -------- | ---------------------------------------------------------------- |
| 请求方式 | POST                                                             |
| 请求路径 | 2/comments/destroy.json                                          |
| 请求参数 | `cid` 需要删除的评论 ID                                          |
|          | 数据格式：请求体 JSON / Form Data / Form URL Encoded             |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/comments/destroy) |

#### Show Comments

| 请求说明 | 根据微博 ID 返回某条微博的评论列表                            |
| -------- | ------------------------------------------------------------- |
| 请求方式 | GET                                                           |
| 请求路径 | 2/comments/show.json                                          |
| 请求参数 | `id` 指定的微博 ID                                            |
|          | `count` 单页返回的记录条数，可选，默认为 20，最大 200         |
|          | `page` 分页，可选，默认为 1                                   |
|          | 数据格式：路径参数                                            |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/comments/show) |

### User

#### Show User

| 请求说明 | 根据用户 ID 返回用户信息                                   |
| -------- | ---------------------------------------------------------- |
| 请求方式 | GET                                                        |
| 请求路径 | 2/users/show.json                                          |
| 请求参数 | `uid` 指定的用户 ID                                        |
|          | 数据格式：路径参数                                         |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/users/show) |

### 其他接口正在筹划中

敬请期待。

## Contact

[GitHub: Mock Weibo API](https://github.com/DevinDon/mock-weibo-api)

[Email: I.INF@Outlook.com](mailto:I.INF@Outlook.com)

[Blog: What The Rooftop](https://blog.don.red)

## [THE MIT LICENSE](https://raw.githubusercontent.com/DevinDon/license/master/THE%20MIT%20LICENSE)

Copyright © 2018+ Devin Don

LICENSE: MIT

Click <https://raw.githubusercontent.com/DevinDon/license/master/THE%20MIT%20LICENSE> to view a copy of this license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
