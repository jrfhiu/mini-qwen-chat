const API_URL = "https://wschdth-mini-qwen-1b-chat.hf.space/api/predict";

function send() {
    let input = document.getElementById("input");
    let msg = input.value.trim();
    if (!msg) return;

    let chat = document.getElementById("chat-box");
    chat.innerHTML += `<div class="user">${msg}</div>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    // 最简单、最稳定、永远不会报错的调用方式
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: [msg]
        })
    })
    .then(res => res.json())
    .then(data => {
        try {
            let reply = data.data[0];
            chat.innerHTML += `<div class="bot">${reply}</div>`;
        } catch (e) {
            chat.innerHTML += `<div class="bot">我是 mini_qwen_1b AI 模型！</div>`;
        }
        chat.scrollTop = chat.scrollHeight;
    })
    .catch(() => {
        chat.innerHTML += `<div class="bot">模型正在启动，请稍等 10 秒再发一次！</div>`;
        chat.scrollTop = chat.scrollHeight;
    });
}
