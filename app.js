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
    // 只打印真实返回，不做任何默认文案
    console.log(data);
    let reply = data.data[0][1][1];
    chat.innerHTML += `<div class="bot">${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  })
  .catch(err => {
    console.error(err);
    chat.innerHTML += `<div class="bot">出错：${err.message}</div>`;
    chat.scrollTop = chat.scrollHeight;
  });
}
