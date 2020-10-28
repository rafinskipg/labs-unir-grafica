var squareSize = 25

function bruteForceLine(x1, y1, xn, yn, color) {
  var m = (yn - y1) / (xn - x1)

  if (m < 1) {
    var originX = x1 < xn ? x1 : xn
    var destinyX = x1 < xn ? xn : x1
    for (var x = originX; x < destinyX; x++) {
      var y = Math.round(y1 + m * (x - x1))
      fillSquare(x * squareSize, y * squareSize, squareSize, color)
    }
  } else {
    var n = (xn - x1) / (yn - y1)
    var originY = y1 < yn ? y1 : yn
    var destinyY = y1 < yn ? yn : y1

    for (var y = originY; y < destinyY; y++) {
      var x = Math.round(x1 + n * (y - y1))
      fillSquare(x * squareSize, y * squareSize, squareSize, color)
    }
  }

  drawReaLine(x1, y1, xn, yn)
}

function bresenham_line(x1, y1, xn, yn, swapped = false, color) {
  var dx = xn - x1
  var dy = yn - y1
  var step = 1

  if (Math.abs(dy) > Math.abs(dx)) {
    bresenham_line(y1, x1, yn, xn, true, color)
    return
  }

  if (dy < 0) {
    bresenham_line(xn, yn, x1, y1, swapped, color)
    return
  }

  if (dy < 0) {
    step = -1
    dy = Math.abs(dy)
  }

  var p = 2 * dy - dx

  for (var x = x1, y = y1; x < xn; x++) {
    if (!swapped) {
      fillSquare(x * squareSize, y * squareSize, squareSize, color)
    } else {
      fillSquare(y * squareSize, x * squareSize, squareSize, color)
    }

    if (p >= 0) {
      p += 2 * (dy - dx)
      y += step
    } else {
      p += (2 * dy)
    }
  }

  if (!swapped) {
    drawReaLine(x1, y1, xn, yn)

  } else {
    drawReaLine(y1, x1, yn, xn)
  }

}

var canvas
var context

function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
}

function drawReaLine(x1, y1, xn, yn) {
  context.save()
  context.moveTo(x1 * squareSize, y1 * squareSize)

  context.lineTo(xn * squareSize, yn * squareSize)
  context.stroke()
  context.restore()
}

function fillSquare(x, y, size, color) {
  context.save()
  context.beginPath();

  console.log('fill', x, y, size)
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
    for (var j = 0; j <= (canvas.height / squareSize); j++) {
      drawSquare(i * squareSize, j * squareSize, squareSize)
    }
  }
}

init()
drawSquares()

bruteForceLine(5, 5, 10, 10, 'blue')

bruteForceLine(3, 3, 5, 9, 'red')

bruteForceLine(15, 10, 1, 1, 'purple')

bresenham_line(0, 0, 3, 8, false, 'green')