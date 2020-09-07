# Mock Weibo API

一个模拟的微博开放平台服务器，实现了一部分可能需要的功能。

部署在 `http://mock.don.red/weibo` 上，模拟路径与原路径相同。

> 本项目仅供学习使用，如有侵权，请联系作者。

# Usage

将请求地址中的 `https://api.weibo.com` 替换为 `http://mock.don.red/weibo` 即可，如：

```http
https://api.weibo.com/2/statuses/public_timeline.json
```

替换后：

```http
http://mock.don.red/weibo/2/statuses/public_timeline.json
```

# Contents

[TOC]

# Mock APIs

> 提示：请在所有请求头中加入 `Authorization: OAuth2 ${token}` 字段

## Authorization

### Code

| 请求说明 | 获取用户 Code，用于换取 Token           |
| -------- | --------------------------------------- |
| 请求方式 | GET                                     |
| 请求路径 | oauth2/authorize                        |
| 请求参数 | `redirect_uri` 授权回调地址，必填       |
| 返回内容 | 302 跳转至 redirect_uri 并携带参数 code |

### Token

| 请求说明 | 获取 Token                  |
| -------- | --------------------------- |
| 请求方式 | POST                        |
| 请求路径 | oauth2/access_token         |
| 请求参数 | `code` 用户 Code，必填      |
| 返回内容 | `{ access_token: 'token' }` |

### Get UID

| 请求说明 | 获取当前用户的 UID       |
| -------- | ------------------------ |
| 请求方式 | GET                      |
| 请求路径 | 2/account/get_uid.json   |
| 请求参数 |                          |
| 返回内容 | `{ uid: 1231231312321 }` |

## Status

### Public Timeline

| 请求说明 | 返回最新的公共微博                                           |
| -------- | ------------------------------------------------------------ |
| 请求方式 | GET                                                          |
| 请求路径 | 2/statuses/public_timeline.json                              |
| 请求参数 | `count` 单页返回的记录条数，可选，默认为 20，最大 200        |
|          | `page` 分页，可选，默认为 1                                  |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/statuses/public_timeline) |

### Home Timeline

| 请求说明 | 获取当前登录用户及其所关注（授权）用户的最新微博             |
| -------- | ------------------------------------------------------------ |
| 请求方式 | GET                                                          |
| 请求路径 | 2/statuses/home_timeline.json                                |
| 请求参数 | `count` 单页返回的记录条数，可选，默认为 20，最大 200        |
|          | `page` 分页，可选，默认为 1                                  |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/statuses/home_timeline) |

### Show Status

| 请求说明 | 根据微博 ID 返回某条微博内容                                 |
| -------- | ------------------------------------------------------------ |
| 请求方式 | GET                                                          |
| 请求路径 | 2/statuses/show.json                                         |
| 请求参数 | `id` 指定的微博 ID                                           |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/statuses/show) |

## Comment

### Create Comment

| 请求说明 | 评论某条微博                                                 |
| -------- | ------------------------------------------------------------ |
| 请求方式 | POST                                                         |
| 请求路径 | 2/comments/create.json                                       |
| 请求参数 | `id` 需要评论的微博 ID                                       |
|          | `comment` 评论内容，最多 140 字，超出会被截取                |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/comments/create) |

### Reply Comment

| 请求说明 | 回复某条评论                                                 |
| -------- | ------------------------------------------------------------ |
| 请求方式 | POST                                                         |
| 请求路径 | 2/comments/reply.json                                        |
| 请求参数 | `id` 对应的微博 ID                                           |
|          | `cid` 需要回复的微博 ID                                      |
|          | `comment` 评论内容，最多 140 字，超出会被截取                |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/comments/reply) |

### Destroy Comment

| 请求说明 | 删除某条评论，仅限当前用户                                   |
| -------- | ------------------------------------------------------------ |
| 请求方式 | POST                                                         |
| 请求路径 | 2/comments/destroy.json                                      |
| 请求参数 | `cid` 需要删除的评论 ID                                      |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/comments/destroy) |

### Show Comments

| 请求说明 | 根据微博 ID 返回某条微博的评论列表                           |
| -------- | ------------------------------------------------------------ |
| 请求方式 | GET                                                          |
| 请求路径 | 2/comments/show.json                                         |
| 请求参数 | `id` 指定的微博 ID                                           |
|          | `count` 单页返回的记录条数，可选，默认为 20，最大 200        |
|          | `page` 分页，可选，默认为 1                                  |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/comments/show) |

## User

### Show User

| 请求说明 | 根据用户 ID 返回用户信息                                   |
| -------- | ---------------------------------------------------------- |
| 请求方式 | GET                                                        |
| 请求路径 | 2/users/show.json                                          |
| 请求参数 | `uid` 指定的用户 ID                                        |
| 返回内容 | 见[微博开放平台](https://open.weibo.com/wiki/2/users/show) |

## 其他接口正在筹划中

敬请期待。

# Open Source

项目开源在 [Github: DevinDon/mock-weibo-api](https://github.com/DevinDon/mock-weibo-api)，服务器框架 [Rester](https://github.com/DevinDon/rester-core)，欢迎 star。

# [THE MIT LICENSE](https://raw.githubusercontent.com/DevinDon/license/master/THE%20MIT%20LICENSE)

Copyright © 2018+ Devin Don

LICENSE: MIT

Click <https://raw.githubusercontent.com/DevinDon/license/master/THE%20MIT%20LICENSE> to view a copy of this license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
