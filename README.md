### 安装
```
git clone https://github.com/shanshandev/security-demo.git
```
### XSS 示例使用
1. 改变目录到 demo1
```
cd demo1
```
2. 运行项目，并访问`http://localhost:3000/static/index.html`
```
node server.js
```
3. 输入 XSS 攻击脚本(如下)并查看结果
```
<img src="http://image2.sina.com.cn/home/images/sina_logo2.gif" width="0" height="0" border="0" onload="javascript:alert(document.cookie);">
```
### CSRF 示例使用
1. 改变目录到 demo2
```
cd demo2
```
2. 运行项目，并访问`http://localhost:3001/static/index.html`,点击登录获取登录态
```
node server.js
```
3. 访问 demo1 中的`http://localhost:3000/static/csrf-attack.html`页面，查看是有 del 请求。

