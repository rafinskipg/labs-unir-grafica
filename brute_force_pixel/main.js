
var squareSize = 25

function bruteForceLine(x1,y1,xn, yn, color) {
  var m = (yn - y1) / (xn -x1)

  if (m < 1) {
    for (var x = x1; x < xn; x++) {
      var y = Math.round(y1 + m* (x - x1))
      fillSquare(x * squareSize, y * squareSize, squareSize, color)
    }
  } else {
    var n = (xn - x1)/ (yn -y1)
    for (var y = y1; y < yn; y++) {
      var x = Math.round(x1 + n* (y - y1))
      fillSquare(x * squareSize, y * squareSize, squareSize, color)
    }
  }

  drawReaLine(x1,y1, xn, yn)
}

var canvas
var context

function init() { 
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
}

function drawReaLine(x1,y1,xn,yn) {
  context.save()
  context.moveTo(x1*squareSize, y1*squareSize)

  context.lineTo(xn * squareSize, yn*squareSize)
  context.stroke()
  context.restore()
}

function fillSquare(x, y, size, color) {
  context.save()
  context.beginPath();

  console.log('fill', x, y , size)
  context.rect(x, y, size, size);
  context.fillStyle = color;
  context.fill();
  context.closePath(); 

  context.restore()
}

function drawSquare(x, y, size) {
  context.beginPath();
  context.rect(x, y, size, size);
  context.stroke();
  context.closePath(); 
}

function drawSquares() {
  for (var i = 0; i <= (canvas.width / squareSize); i++) {
    for(var j = 0; j <= (canvas.height / squareSize); j++) {
      drawSquare(i * squareSize,j * squareSize, squareSize)
    }
  }
}

init()
drawSquares()

bruteForceLine(5, 5, 10, 10, 'blue')

bruteForceLine(3, 3, 5, 9, 'red')