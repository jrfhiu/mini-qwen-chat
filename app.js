const API_URL = "https://wschdth-mini-qwen-1b-chat.hf.space/run/predict";

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
      data: [msg, []]
    })
  })
  .then(res => {
    if (!res.ok) throw new Error("HTTP 错误：" + res.status);
    return res.json();
  })
  .then(data => {
    // 直接把真实返回结构显示出来
    const reply = JSON.stringify(data);
    chat.innerHTML += `<div class="bot">${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  })
  .catch(err => {
    // 只显示真实错误
    chat.innerHTML += `<div class="bot">错误：${err.message}</div>`;
    chat.scrollTop = chat.scrollHeight;
  });
}
