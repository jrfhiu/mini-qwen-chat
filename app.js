// ✅ Gradio 4.x 正确 API 地址（唯一能通的）
const API_URL = "https://wschdth-mini-qwen-1b-chat.hf.space/chat/submit";

async function send() {
  const input = document.getElementById("input");
  const msg = input.value.trim();
  if (!msg) return;

  const chat = document.getElementById("chat-box");
  chat.innerHTML += `<div class="user">${msg}</div>`;
  input.value = "";
  chat.scrollTop = chat.scrollHeight;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: msg,
        history: []
      })
    });

    if (!response.ok) throw new Error("状态码：" + response.status);

    const data = await response.json();
    const reply = data.response;

    chat.innerHTML += `<div class="bot">${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  } catch (err) {
    chat.innerHTML += `<div class="bot">错误：${err.message}</div>`;
    chat.scrollTop = chat.scrollHeight;
  }
}
