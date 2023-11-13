const labelsArray = ["a", "b", "c", "d", "e", "f", "g", "h"];
const body = document.querySelector("body");
const movingsArray: string[] = [];

function createRow(r: number) {
  const row = document.createElement("div"); // создаём горизонтальный ряд клеток
  row.classList.add("row");
  const rowIndex = document.createElement("div"); // цифровая подпись 1-8 слева от ряда
  rowIndex.classList.add("rowIndex");
  rowIndex.innerText = String(r + 1);
  row.appendChild(rowIndex);
  labelsArray.forEach((_, c) => {
    // поочерёдно создаём 8 ячеек шахматной доски и добавляем их в ряд row.
    const cell = document.createElement("div");
    cell.classList.add("cell");
    (r + c) % 2 === 0
      ? cell.classList.add("dark")
      : cell.classList.add("light");
    cell.id = `${r}${c}`;
    row.appendChild(cell);
  });
  body?.appendChild(row);
}

function createLetterLabels() {
  //ряд labelsRow содержит подписи a - h по горизонтали
  const labelsRow = document.createElement("div");
  labelsRow.classList.add("row");
  labelsArray.forEach((letter) => {
    const labelCell = document.createElement("div");
    labelCell.classList.add("letter");
    labelCell.innerText = letter;
    labelsRow.appendChild(labelCell);
  });
  body?.appendChild(labelsRow);
}

function createChessboard() {
  labelsArray.forEach((_, r) => {
    createRow(7 - r);
  });
  createLetterLabels();
}

function createMovings(x: number, y: number) {
  // создаём массив возможных передвижений коня

  // удаляем с доски предыдущие передвижения
  movingsArray.forEach((id) => {
    const moving = document.getElementById(id);
    if (moving) moving.classList.remove("moving");
  });

  //очищаем массив передвижений с прошлого раза
  if (movingsArray.length) movingsArray.length = 0;

  const distanses = [1, 2].reduce(
    (acc: number[], el) => acc.concat(el, el * -1),
    []
  );

  //вычисляем новый массив передвижений
  distanses.forEach((rowDist) => {
    distanses.forEach((cellDist) => {
      if (
        Math.abs(rowDist) + Math.abs(cellDist) === 3 &&
        labelsArray[x + rowDist] &&
        labelsArray[y + cellDist]
      ) {
        movingsArray.push(`${x + rowDist}${y + cellDist}`);
      }
    });
  });

  //раскрашиваем клетки возможных передвижений коня
  movingsArray.forEach((id) => {
    const moving = document.getElementById(id);
    if (moving) {
      moving.classList.add("moving");
    }
  });
}

createChessboard();

body?.addEventListener("click", (event) => {
  const { id } = event.target as HTMLElement;
  if (id) {
    const checked = document.getElementById(id);
    const previousCheck = document.querySelector(".checked");
    if (previousCheck) {
      previousCheck.classList.remove("checked");
    }
    checked?.classList.add("checked");

    let [x, y] = id.split("");

    createMovings(Number(x), Number(y));
  }
});
