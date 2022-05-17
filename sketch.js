let src;

let tiles = [];
let cols = 4;
let rows = 4
let w,h
let board = []
let blankSpot = -1;

function preload(){
  src = loadImage('./assets/jan_pic.jpg')
}

function swap(i, j, arr){
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

function move(i, j, arr){
  let blank = findBlank()
  let blankCol = blank % cols
  let blankRow = floor(blank/rows)
  
  if(isNeighbour(i,j,blankCol, blankRow)){
    swap(blank, i+j*cols, arr)
  }
}

function isNeighbour(i, j, x, y){
  if (i !== x && j !== y) return false
  if (abs(i-x) === 1 || abs(j-y) === 1) return true
  return false
}

function findBlank(){
  for(let i = 0; i < board.length; i++){
    if(board[i] === -1) return i
  }
}

function randomMove(arr){
  let r1 = floor(random(cols))
  let r2 = floor(random(rows))
  move(r1, r2, arr)
}

function simpShuffle(arr){
  for(let i = 0; i < 99; i++){
    randomMove(arr)
  }
}

function mousePressed(){
  let i = floor(mouseX / w)
  let j = floor(mouseY / h)
  move(i, j ,board)
}

function setup() {
  var myCanvas = createCanvas(512, 512);
  myCanvas.parent('canvas');
  w = width/cols
  h = height/rows
  
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let x = i * w
      let y = j * h
      let img = createImage(w, h)
      img.copy(src, x, y, w, h, 0, 0, w, h)
      let index = i + j * cols
      board.push(index)
      let tile = new Tile(index, img)
      tiles.push(tile)
    }
  }
  tiles.pop()
  board.pop()
  board.push(-1)
  simpShuffle(board)
}

function draw() {
  background(0)
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let index = i +j * cols
      let x = i * w
      let y = j * h
      let tileIndex = board[index]
      if(tileIndex > -1){
        let img = tiles[tileIndex].img
        image(img, x + 0.5, y + 0.5, w-1, h-1)
      }
    }
  }
}