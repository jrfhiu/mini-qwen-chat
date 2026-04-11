// 这就是你自己的模型！！！
const API_URL = "https://api-inference.huggingface.co/models/wschdth/mini_qwen_1b";

function send() {
  const input = document.getElementById("input");
  const msg = input.value.trim();
  if (!msg) return;

  const chat = document.getElementById("chat-box");
  chat.innerHTML += `<div class="user">${msg}</div>`;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: msg
    })
  })
  .then(response => {
    if (!response.ok) throw new Error("模型正在启动，请稍等...");
    return response.json();
  })
  .then(data => {
    const reply = data[0]?.generated_text || "模型回复";
    chat.innerHTML += `<div class="bot">${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  })
  .catch(err => {
    chat.innerHTML += `<div class="bot">${err.message}</div>`;
    chat.scrollTop = chat.scrollHeight;
  });
}
