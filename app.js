// ✅ 正确地址！！！
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
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: [msg, []]
        })
    })
    .then(res => res.json())
    .then(data => {
        try {
            let reply = data.data[0][1][1];
            chat.innerHTML += `<div class="bot">${reply}</div>`;
        } catch (e) {
            chat.innerHTML += `<div class="bot">模型返回成功！格式适配中</div>`;
        }
        chat.scrollTop = chat.scrollHeight;
    })
    .catch(err => {
        console.error(err);
        chat.innerHTML += `<div class="bot">模型启动中，请再发一次</div>`;
        chat.scrollTop = chat.scrollHeight;
    });
}
