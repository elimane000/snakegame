const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const gridCount = canvas.width / gridSize;

let snake = [{ x: 5, y: 5 }];
let direction = { x: 0, y: 0 };
let apple = getRandomApplePosition();

function getRandomApplePosition() {
    return {
        x: Math.floor(Math.random() * gridCount),
        y: Math.floor(Math.random() * gridCount),
    };
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);

    ctx.fillStyle = 'green';
    for (const segment of snake) {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    }
}

function update() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (newHead.x === apple.x && newHead.y === apple.y) {
        apple = getRandomApplePosition();
    } else {
        snake.pop();
    }

    snake.unshift(newHead);

    if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= gridCount ||
        newHead.y >= gridCount ||
        snake.slice(1).some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
        alert('Game over');
        snake = [{ x: 5, y: 5 }];
        direction = { x: 0, y: 0 };
    }
}

function gameLoop() {
    update();
    draw();
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

setInterval(gameLoop, 200);
