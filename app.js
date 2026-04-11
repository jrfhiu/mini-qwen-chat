// 完全不带 Token！！！
const API_URL = "https://api-inference.huggingface.co/models/wschdth/mini_qwen_1b";

function send() {
  const input = document.getElementById("input");
  const msg = input.value.trim();
  if (!msg) return;

  const chat = document.getElementById("chat-box");
  chat.innerHTML += `<div class="user">${msg}</div>`;
  input.value = "";

  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // 这里彻底空着，不放任何 Token！！！
    },
    body: JSON.stringify({
      inputs: msg
    })
  })
  .then(res => res.json())
  .then(data => {
    let reply = data[0]?.generated_text || "抱歉，无法回答";
    chat.innerHTML += `<div class="bot">${reply}</div>`;
  });
}
