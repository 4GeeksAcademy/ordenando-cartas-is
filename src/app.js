const cardContainer = document.getElementById("cardContainer");
const logContainer = document.getElementById("logContainer");
const drawBtn = document.getElementById("drawBtn");
const sortBtn = document.getElementById("sortBtn");

const suits = ["♠", "♥", "♣", "♦"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let cards = [];
let sortLog = [];

function getRandomCard() {
  const value = values[Math.floor(Math.random() * values.length)];
  const suit = suits[Math.floor(Math.random() * suits.length)];
  return { value, suit };
}

function cardValue(card) {
  return values.indexOf(card.value);
}

function displayCards(cardsArray) {
  cardContainer.innerHTML = "";
  cardsArray.forEach(card => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    const isRed = card.suit === "♥" || card.suit === "♦";
    cardDiv.innerHTML = `
      <div class="top ${isRed ? "red" : ""}">${card.suit}</div>
      <div class="middle ${isRed ? "red" : ""}">${card.value}</div>
      <div class="bottom ${isRed ? "red" : ""}">${card.suit}</div>
    `;
    cardContainer.appendChild(cardDiv);
  });
}

function displayLog(logArray) {
  logContainer.innerHTML = "";
  logArray.forEach((step, i) => {
    const logEntry = document.createElement("div");
    logEntry.className = "log-entry";
    logEntry.innerText = `Paso ${i + 1}: ${step.map(c => c.value + c.suit).join(", ")}`;
    logContainer.appendChild(logEntry);
  });
}

drawBtn.addEventListener("click", () => {
  const count = parseInt(document.getElementById("cardCount").value);
  if (!count || count <= 0) return;

  cards = [];
  sortLog = [];
  for (let i = 0; i < count; i++) {
    cards.push(getRandomCard());
  }
  displayCards(cards);
  logContainer.innerHTML = "";
});

sortBtn.addEventListener("click", () => {
  let arr = [...cards];
  sortLog = [];

  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (cardValue(arr[j]) < cardValue(arr[min])) min = j;
    }
    if (i !== min) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
      sortLog.push([...arr]);
    }
  }

  cards = arr;
  displayCards(cards);
  displayLog(sortLog);
});
