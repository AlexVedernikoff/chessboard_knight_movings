const arrX = ["a", "b", "c", "d", "e", "f", "g", "h"];
const arrY = [8, 7, 6, 5, 4, 3, 2, 1];
const main = document.querySelector('main');
const movingsArray = [];

//создаём шахматную доску
arrY.forEach((elRow, j) => {
    const row = document.createElement('div');
    const rowIndex = document.createElement('div');
    rowIndex.innerText = elRow;
    main.appendChild(row);
    row.appendChild(rowIndex);
    rowIndex.classList.add('rowIndex');
    row.classList.add("row")
    arrX.forEach((el, i) => {
        const cell = document.createElement('div');
        row.appendChild(cell);
        cell.classList.add("cell")
        cell.id = el + elRow;
    
        if (j%2 == 0) {
            if (i%2 == 0) {
                cell.classList.add('light');
            } else {
                cell.classList.add('dark');
            }
        } else {
            if (i%2 != 0) {
                cell.classList.add('light');
            } else {
                cell.classList.add('dark');
            }
        }
    })
})

//Добавялем подписи a - h по горизонтали
const columnLetters = document.createElement('div');
main.appendChild(columnLetters);
columnLetters.classList.add('row')
arrX.forEach(el => {
    const letter = document.createElement('div');
    letter.innerText = el;
    columnLetters.appendChild(letter);
    letter.classList.add('letter')
})

//создаём массив возможных передвижений коня
const createMovings = (x, y) => {
    //удаляем с доски предыдущие передвижения
    movingsArray.forEach((el) => {        
        const moving = document.getElementById(el);
        console.log(moving)
        if(moving) {
            moving.classList.remove("moving");
        }
    })
    //очищаем массив передвижений с прошлого раза
    if (movingsArray.length) {
        movingsArray.length =0;
    } ;

    const X = arrX.findIndex(el => el == x);
    const Y = arrY.findIndex(el => el == y);
    const arr = [-2, -1, 1, 2];
    
    //вычисляем новый массив передвижений
    arr.forEach((elX) =>{
        arr.forEach((elY)=>{
            if ( (Math.abs(elX) + Math.abs(elY) == 3)) {
                console.log(`elX = ${elX}, elY = ${elY}`)
                console.log(`Y + elY = ${ Y + elY}`)
                console.log(`X + elX = ${ X + elX}`)
                if (arrX[X+elX] && arrY[Y+elY]) {
                    movingsArray.push(String(arrX[X+elX]) + String(arrY[Y+elY]))
                }
            } 
        })
    })
    console.log(`movingsArray = `);
    console.log(movingsArray);

    //раскрашиваем клетки возможных передвижений коня
    movingsArray.forEach((el) => {
        const moving = document.getElementById(el);
        console.log(moving)
        if(moving) {
            moving.classList.add("moving");
        }
    })

};

main.addEventListener("click", (event) => {
    if (event.target.id) {
        const checked = document.getElementById(event.target.id);
        const previousCheck = document.querySelector(".checked");
        if (previousCheck) {
            previousCheck.classList.remove('checked');
        }
        const img = document.createElement('img');
        checked.classList.add('checked');

        console.log(`Координаты коня: ${event.target.id}`)

        let [x, y] =  event.target.id.split("");
        console.log(`Координата коня x: ${x}`);
        console.log(`Координата коня y: ${y}`);

        createMovings(x, y);
    }
})
