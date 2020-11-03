var squareSize = 25

var canvas
var context
var centerPointX 
var centerPointY

function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  centerPointX = Math.round((canvas.width / squareSize) / 2) * squareSize
  centerPointY = Math.round((canvas.height  / squareSize) / 2 ) * squareSize
}

function drawRealLine(x1, y1, xn, yn, lineWidth = 1) {
  context.beginPath();

  context.strokeStyle = 'red'

  context.moveTo(x1  * squareSize , -y1 * squareSize   )
  context.lineWidth = lineWidth
  context.lineTo(xn * squareSize , -yn * squareSize )
  context.stroke()
  context.closePath();

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

function drawPoint(x, y) {
  context.beginPath();
  context.strokeStyle = 'red'
  context.font = "15px Arial";
  context.fillStyle = "blue";
  context.fillText(`(${x}, ${y})`, x * squareSize, - y * squareSize);
  context.arc(x * squareSize , - y * squareSize, 5,  0, 2 * Math.PI);
  context.stroke();
  context.closePath();
}

function drawPoints(points) {
 

  for(var i = 0; i < points.length; i++) {
    const x1 = points[i][0]
    const y1 = points[i][1]
    const x2 = points[i+1] ? points[i+1][0]: points[0][0]
    const y2 = points[i+1] ? points[i+1][1]: points[0][1]
    drawRealLine(x1,y1,x2,y2, 2)
  }

  for(var i = 0; i < points.length; i++) {
    drawPoint(points[i][0], points[i][1])
  }
}

function drawCenters() {

  context.save()
  context.beginPath()
  context.strokeStyle = 'green'
  context.moveTo(0, centerPointY)
  context.lineWidth = 3 
  context.lineTo(canvas.width, centerPointY)
  context.stroke()

  context.moveTo(centerPointX, 0)
  context.lineWidth = 3
  context.lineTo(centerPointX, canvas.height)
  context.stroke()
  context.closePath()
  context.restore()
}

function multiplyMatrices(m1, m2) {
  var result = [];
  for (var i = 0; i < m1.length; i++) {
      result[i] = [];
      for (var j = 0; j < m2[0].length; j++) {
          var sum = 0;
          for (var k = 0; k < m1[0].length; k++) {
              sum += m1[i][k] * m2[k][j];
          }
          result[i][j] = sum;
      }
  }
  return result;
}

function translate(x, y) {
  return [
    [1, 0, x],
    [0, 1, y],
    [0, 0 ,1]
  ]
}

function scale(x, y) {
  return [
    [x, 0, 0],
    [0, y, 0],
    [0, 0 ,1]
  ]
}
init()

drawSquares()

drawCenters()

context.translate(centerPointX, centerPointY)

const points = [
  [2, 2],
  [4, 2],
  [4, 0],
  [2, 0],
]

drawPoints(points)

const transformationMatrix = multiplyMatrices(translate(3, 1),multiplyMatrices( scale(2, 2), translate(-3, -1))) 

const scaled = points.map(
  p => multiplyMatrices(transformationMatrix, [[1, 0, p[0]], [0, 1, p[1]], [0, 0, 1]])
).map(s => [s[0][2], s[1][2]])

console.log(scaled)

drawPoints(scaled)

