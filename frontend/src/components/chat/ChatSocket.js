let socket;
let chatContainer;
let currentUser;
function connect(nickname) {
  if (socket == undefined) {
    socket = new WebSocket("ws://localhost:9999/happyhouse/chat");
    currentUser = nickname;
  }
  socket.addEventListener("open", function(event) {
    chatContainer = document.querySelector("#start");
    console.log(event);
    let connectMessage = ` <div class="text-center" style="margin-top : 10px">
    <span class="between">연결되었습니다.</span>
  </div>`;
    chatContainer.insertAdjacentHTML("beforeend", connectMessage);
  });

  // Listen for messages
  socket.addEventListener("message", function(e) {
    let message = JSON.parse(e.data);
    let { nickname, chatData } = message;

    let receiveMessage = "";
    if (nickname === currentUser) {
      receiveMessage = `<div class="d-flex align-items-center text-right justify-content-end" style="margin-top : 10px">
                          <div class="pr-2" >
                            <p class="msg rounded" style = "background-color:yellow">${chatData}</p>
                          </div>
                        </div>`;
    } else {
      receiveMessage = `<div class="d-flex align-items-center" style="margin-top : 10px">
                          <div class="pr-2 pl-1">
                            <p class="msg rounded" style = "background-color:#fff">${chatData}</p>
                          </div>
                        </div>`;
    }
    chatContainer.insertAdjacentHTML("beforeend", receiveMessage);
    chatContainer.lastChild.focus({ preventScroll: false });
  });
}

function sendMessage(nickname, chatData) {
  let message = {
    nickname,
    chatData,
  };
  // 서버에 보낼 때 문자열로 바꿔서 보내는 작업 = > JSON.stringify();
  if (socket != undefined)
    //socket.send(chatInput.value);
    socket.send(JSON.stringify(message));
}
export default { connect, sendMessage };
