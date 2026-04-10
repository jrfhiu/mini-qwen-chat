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
    console.log("模型返回：", data);

    let reply = "模型回复异常";
    try {
      // Gradio 聊天接口标准格式
      reply = data.data[0][1][1];
    } catch (e) {
      try {
        reply = data.data[0][1];
      } catch {}
    }

    chat.innerHTML += `<div class="bot">${reply}</div>`;
    chat.scrollTop = chat.scrollHeight;
  })
  .catch(err => {
    console.error(err);
    chat.innerHTML += `<div class="bot">连接错误</div>`;
  });
}
