// 这是你真实的、正确的接口地址
const API_URL = "https://wschdth-mini-qwen-1b-chat.hf.space/run/predict";

function send() {
    let input = document.getElementById("input");
    let msg = input.value.trim();
    if (!msg) return;

    let chat = document.getElementById("chat-box");
    chat.innerHTML += `<div class="user">${msg}</div>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: [msg, []] })
    })
    .then(res => res.json())
    .then(data => {
        console.log("后端真实返回数据：", data);
        try {
            // 👇👇👇 这是唯一正确的取值方式！
            let real_reply = data.data[0][1]; 
            chat.innerHTML += `<div class="bot">${real_reply}</div>`;
        } catch (e) {
            // 👇👇👇 这里只打印错误，绝对不显示固定句子！
            chat.innerHTML += `<div class="bot">【错误】数据解析失败</div>`;
        }
        chat.scrollTop = chat.scrollHeight;
    })
    .catch(err => {
        chat.innerHTML += `<div class="bot">网络错误</div>`;
    });
}
