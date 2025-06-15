document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");
    const resetBtn = document.querySelector("#reset-btn");
    const newGameBtn = document.querySelector("#new-btn");
    const msgContainer = document.querySelector("#msg-container");
    const msg = document.querySelector("#msg");
    const winnerGif = document.querySelector("#winner-gif");
    let turnO = true;
    let count = 0;
    const winPatterns = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
    ];
    const resetGame = () => {
      turnO = true;
      count = 0;
      enableBoxes();
      msgContainer.classList.add("hide");
      winnerGif.classList.add("hide");
    };
    const disableBoxes = () => {
      boxes.forEach(box => box.disabled = true);
    };
    const enableBoxes = () => {
      boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
      });
    };
    const showWinner = (winner) => {
      msg.innerText = `Congratulations, Winner is ${winner}`;
      msgContainer.classList.remove("hide");
      winnerGif.classList.remove("hide");
      disableBoxes();
    };
    const gameDraw = () => {
      msg.innerText = `Game was a Draw.`;
      msgContainer.classList.remove("hide");
      winnerGif.classList.add("hide");
      disableBoxes();
    };
    const checkWinner = () => {
      for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val && pos1Val === pos2Val && pos2Val === pos3Val) {
          showWinner(pos1Val);
          return true;
        }
      }
      return false;
    };
    boxes.forEach((box) => {
      box.addEventListener("click", () => {
        if (box.innerText !== "") return;
        box.innerText = turnO ? "O" : "X";
        box.disabled = true;
        turnO = !turnO;
        count++;
        let winnerFound = checkWinner();
        if (count === 9 && !winnerFound) gameDraw();
      });
    });
    resetBtn.addEventListener("click", resetGame);
    newGameBtn.addEventListener("click", resetGame);
  });
  
