## 本地开发

先安装相关 node 模块 `npm i`

本地开发时启动

	1、`npm run server`
	
	2、`npm run watch`
	
访问 http://127.0.0.1:8237/page/demo 下相关开发页面

资源文件 ： c.resPath = '//localhost/s'




## 部署

1、编译前端资源 `npm run build`

2、[ 覆盖** tpl 目录到后端项目 ]

3、部署 build 目录里的前端资源



## 开发实践

创建一个名为 taskManage 的页面：

1、 **创建一个页面**  ：分别复制 src 与 tpl 目录里的 `/page/demo` 到 `/page `下, 改名目录与里边的文件为 taskManage.* , 并修改文件中的资源路径到 /taskManage

2、 **访问页面效果** ：在浏览器中访问 `http://127.0.0.1:8237/page/taskManage` 查看页面效果

3、 **创建一个 URL** ： 如果要访问 /taskManage 指向 taskManage.tpl, 就在 `src/urlHash.njs` 文件的 loadHashList 方法中添加一条路由代码： `_pri.add('/taskManage').to('/page/taskManage')`

4、 **开发页面 tpl** ： 修改 `src/page/taskManage/taskManage.json` 中的 v 的值，在 taskManage.tpl 中通过 `{{v.**}}` 来调用变量。（后端统一规范所有的变量都必须放在 v 这个 key 下供前端使用）

5、 **线上bug调试** ： 在线上的url后添加参数： `?_dump=1` ，可以得到线上该 url 的模版数据，复制到本地开发环境的模版数据中，就能在本地复现线上效果，进行开发调试

##  其他

后端模版系统 ： http://mozilla.github.io/nunjucks/templating.html

目录规划 ： 

| 目录 | 分类 |
|--|--|
| page | 页面 |
| common | 项目复用模块 |
| kit | 跨项目复用模块 |
| lib | 三方模块 |

