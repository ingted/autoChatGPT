// 全局变量定义
let your_url_for_next_entry;  // 用于获取下一个要发送Prompt的URL
let your_submit_url;  // 提交ChatGPT返回结果的URL

// 一些用于从DOM中选择需要元素的常量
const regenerate_selector = 'button.btn:nth-child(1) > div:nth-child(1)'
const continue_selector = '.justify-end > div:nth-child(2) > button:nth-child(1) > div:nth-child(1)'
const content_classname = 'markdown'
const submit_classname = 'md:bottom-3'

var waiting_count = 0  // 设置一个等待计数器

// 主函数
function main(url_for_next_entry) {
    // 从指定的URL获取下一个条目
    fetch(url_for_next_entry).then(data=>{
        return data.json()
    }).then(res=>{
        // 键入Prompt并发送
        typePrompt(res.prompt); // **********注意**********请保证您的url返回的结果中'prompt'键的值为您希望接下来发送的prompt, 或者修改此处代码**********
        sendPrompt(submit_classname);
        // 检查响应是否完成并进行处理
        setTimeout(() => checkResponseAndProcess(regenerate_selector, content_classname), 30000);
        waiting_count = 0
    })
}

// 初始运行
main(your_url_for_next_entry);
setInterval(click_continue, 1000);

// 根据元素类名获取页面上的最后一个元素
function getLastElementByClassName(className) {
    let elements = document.getElementsByClassName(className);
    return elements[elements.length - 1];
}

// 点击继续按钮
function click_continue() {
    try {
        document.querySelector(continue_selector).click() 
    } catch {}
}

// 检查响应是否已经完成
function isResponseCompleted(cssSelector) {
    let element = document.querySelector(cssSelector);
    if (element && element.innerText == 'Regenerate') {
        console.log(element)
        return true;
    } else {
        console.log('waiting...')
        return false;
    }
}

// 遍历一个div中的所有子元素，将所有<p>元素以及不包含<p>子元素的<li>元素的文本编制成Array
function getTextContentArray(divElement) { 
    let textContentArray = [];
    divElement.querySelectorAll('p, li').forEach((element) => {
        if (element.tagName === 'P' || (element.tagName === 'LI' && element.querySelectorAll('p').length === 0)) {
            textContentArray.push(element.textContent);
        }
    });
    return textContentArray;
}

// 处理响应和处理
function checkResponseAndProcess(selector, classname) {
    if (!isResponseCompleted(selector)) {
        setTimeout(() => checkResponseAndProcess(regenerate_selector, content_classname), 30000);
        waiting_count += 1
    } else {
        let reply = getLastElementByClassName(classname);
        let result = {
            reply: getTextContentArray(reply)
        };
        console.log(JSON.stringify(result));
        sendJsonData(your_submit_url, result).then(res=>{
            console.log('sendJsonDataRes: ', res)
            setTimeout(() => main(your_url_for_next_entry), 216000 - waiting_count*30000);
        }).catch(err=>{
            console.error(err)
        })
    }
}

// 输入Prompt
function typePrompt(prompt_text) {
    let prompt_textarea = document.getElementById('prompt-textarea')
    prompt_textarea.value = prompt_text
    prompt_textarea.dispatchEvent(new Event('input', { bubbles: true }));
}

// 发送Prompt
function sendPrompt(submit_classname) {
    getLastElementByClassName(submit_classname).click()
}

// 发送Json数据
async function sendJsonData(submit_url, jsonData) {
    console.log(submit_url)
    let response = await fetch(submit_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        return response;  // 返回服务器的响应
    }
}
