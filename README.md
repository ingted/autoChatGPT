# README

这是一个运行于浏览器中的网页端 ChatGPT 自动化工具，用于自动键入和发送 Prompt，将 ChatGPT 返回的文字结果提交到后端保存。

## 如何使用

1. 运行您需要的后端服务，提供两个接口，一个用于脚本 GET 下一个待发送的 Prompt, 另一个用于脚本将 ChatGPT 返回的文字结果 POST 提交。
2. 修改`in_browser.js`开头处的`your_url_for_next_entry`和`your_submit_url`为你接口的URL.
3. 根据情况运行本脚本：
   - 如果您的后端支持 https, 您可以选择填入 https url 后直接将`in_browser.js`内容复制到浏览器开发者工具的 console 中运行；
   - 其余情况，您可以通过`manifest.json`将本工具加载为火狐浏览器的插件运行：
     - 原因是 ChatGPT 网页是完全 https 化的，浏览器不允许直接在当前页面中发送未加密的 http 请求；
     - 具体加载运行方法可以参照[这篇教程](https://zhuanlan.zhihu.com/p/390304772#%E4%BB%A5%E8%B0%83%E8%AF%95%E6%A8%A1%E5%BC%8F%E5%8A%A0%E8%BD%BD%E6%89%A9%E5%B1%95)中的“以调试模式加载扩展”部分；
     - 目前未试验过在其它浏览器中运行情况，如果您打算尝试欢迎分享您的经验，或者直接通过 Pull Request 提交相关配置文件和流程等。
4. 理论上本工具可配合 autoGPT 使用以绕开其对 GPT API 的需求，如果您打算这样使用并且愿意将相关集成代码开源，请告知我在此处引用您的 repo~


## 注意事项

1. 本脚本仅用于合法学习与开发目的，使用时请符合相关法律法规。

















---



#### 小彩蛋

本脚本大多数代码、注释和一些说明由 ChatGPT 进行编写，可谓"of the GPT, by the GPT ,for the GPT", 而且还藏着掖着不让 GPT 知道它编写的东西是要用来折腾它的←_←