const API_URL = "https://wschdth-mini-qwen-1b-chat.hf.space/api/predict";

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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [msg, []] })
  })
  .then(res => {
    if (!res.ok) throw new Error("状态码：" + res.status);
    return res.json();
  })
  .then(data => {
    const reply = data.data[0];
    chat.innerHTML += `<div class="bot">${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  })
  .catch(err => {
    chat.innerHTML += `<div class="bot">错误：${err.message}</div>`;
    chat.scrollTop = chat.scrollHeight;
  });
}
