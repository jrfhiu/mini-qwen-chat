// 🌟 关键：去掉了 Token，公开 Space 直接能用
const API_URL = "https://wschdth-mini-qwen-1b-chat.hf.space/run/predict";

function send() {
    let input = document.getElementById("input");
    let msg = input.value.trim();
    if (!msg) return;

    let chat = document.getElementById("chat-box");
    
    // 显示用户消息
    chat.innerHTML += `<div class="user">${msg}</div>`;
    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    // 调用模型（不带Token，公开接口可用）
    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            // 已移除敏感信息
        },
        body: JSON.stringify({
            data: [msg, []]
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("服务器错误");
        return res.json();
    })
    .then(data => {
        let reply = data.data[0][1][1];
        chat.innerHTML += `<div class="bot">${reply}</div>`;
        chat.scrollTop = chat.scrollHeight;
    })
    .catch(err => {
        chat.innerHTML += `<div class="bot">❌ 连接失败，请检查 Hugging Face Space 是否运行</div>`;
        chat.scrollTop = chat.scrollHeight;
        console.error(err);
    });
}
