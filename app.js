function send() {
    const input = document.getElementById("input");
    const msg = input.value.trim();
    if (!msg) return;

    const chatBox = document.getElementById("chat-box");

    // 添加用户消息
    const userMsg = document.createElement("div");
    userMsg.className = "user";
    userMsg.textContent = msg;
    chatBox.appendChild(userMsg);

    input.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;

    // 模拟机器人回复（可后续对接真实模型）
    setTimeout(() => {
        const botMsg = document.createElement("div");
        botMsg.className = "bot";
        botMsg.textContent = "我是mini_qwen_1b，由你训练的AI对话模型，很高兴为你服务！";
        chatBox.appendChild(botMsg);
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 800);
}
