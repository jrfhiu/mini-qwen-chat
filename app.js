// 🔥 这是官方模型 API，永远不会 404！
const API_URL = "https://api-inference.huggingface.co/models/wschdth/mini_qwen_1b";
const HF_TOKEN = "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"; // 你的token

function send() {
  const input = document.getElementById("input");
  const msg = input.value.trim();
  if (!msg) return;

  const chat = document.getElementById("chat-box");
  chat.innerHTML += `<div class="user">${msg}</div>`;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  // 显示加载中
  chat.innerHTML += `<div class="bot loading">思考中...</div>`;

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${HF_TOKEN}`
    },
    body: JSON.stringify({
      inputs: msg,
      parameters: {
        max_new_tokens: 300,
        temperature: 0.7,
        top_p: 0.9,
        do_sample: true
      }
    })
  })
  .then(res => {
    if (!res.ok) throw new Error("服务器错误：" + res.status);
    return res.json();
  })
  .then(data => {
    // 移除加载中
    document.querySelector(".loading")?.remove();

    let reply = data[0]?.generated_text || "抱歉，我没理解你的意思";
    
    // 自动清理重复问题
    if (reply.startsWith(msg)) {
      reply = reply.substring(msg.length).trim();
    }

    chat.innerHTML += `<div class="bot">${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  })
  .catch(err => {
    document.querySelector(".loading")?.remove();
    chat.innerHTML += `<div class="bot">错误：${err.message}</div>`;
    chat.scrollTop = chat.scrollHeight;
    console.error(err);
  });
}
