const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const grid = 15;
const paddleHeight = grid * 8;
const maxPaddleY = canvas.height - grid - paddleHeight;
var paddleSpeed = 6;
var ballSpeed = 4;

const leftPaddle = {
    x: grid * 2,
    y: canvas.height / 2 - paddleHeight / 2,
    width: grid,
    height: paddleHeight,
    dy: 0
};

const rightPaddle = {
    x: canvas.width - grid * 3,
    y: canvas.height / 2 - paddleHeight / 2,
    width: grid,
    height: paddleHeight,
    dy: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: grid,
    height: grid,
    resetting: false,
    dx: ballSpeed,
    dy: -ballSpeed,
};

function collides(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
        obj1.x + obj1.width > obj2.x &&
        obj1.y < obj2.y + obj2.height &&
        obj1.y + obj1.height > obj2.y;
}

function loop() {
    requestAnimationFrame(loop);
    context.clearRect(0, 0, canvas.width, canvas.height);
    leftPaddle.y += leftPaddle.dy;
    rightPaddle.y += rightPaddle.dy;

    if (leftPaddle.y < grid) {
        leftPaddle.y = grid;
    } else if (leftPaddle.y > maxPaddleY) {
        leftPaddle.y = maxPaddleY;
    }

    if (rightPaddle.y < grid) {
        rightPaddle.y = grid;
    } else if (rightPaddle.y > maxPaddleY) {
        rightPaddle.y = maxPaddleY;
    }


    context.fillStyle = 'Lightblue';
    context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
    context.fillStyle = '#D2B4DE';
    context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y < grid) {
        ball.y = grid;
        ball.dy *= -1;
    } else if (ball.y + grid > canvas.height - grid) {
        ball.y = canvas.height - grid * 2;
        ball.dy *= -1;
    }

    if ((ball.x < 0 || ball.x > canvas.width) && !ball.resetting) {
        ball.resetting = true;

        setTimeout(() => {
            ball.resetting = false;
            ball.x = canvas.width / 2;
            ball.y = canvas.height / 2;
        }, 1000);
    }

    if (collides(ball, leftPaddle)) {
        ball.dx *= -1;
        ball.x = leftPaddle.x + leftPaddle.width;
    } else if (collides(ball, rightPaddle)) {
        ball.dx *= -1;
        ball.x = rightPaddle.x - ball.width;
    }

    context.fillStyle = 'Black';
    context.fillRect(ball.x, ball.y, 80, 80);

    context.fillStyle = 'Black';
    context.fillRect(ball.x - 20, ball.y - 25, 30, 30);

    context.fillStyle = 'Black';
    context.fillRect(ball.x + 70, ball.y - 25, 30, 30);

    context.fillStyle = 'Pink';
    context.fillRect(ball.x - 10, ball.y - 15, 10, 10);

    context.fillStyle = 'Pink';
    context.fillRect(ball.x + 80, ball.y - 15, 10, 10);

    context.fillStyle = '#82E0AA';
    context.fillRect(ball.x + 15, ball.y + 20, 10, 10);

    context.fillStyle = '#82E0AA';
    context.fillRect(ball.x + 60, ball.y + 20, 10, 10);

    context.fillStyle = 'Black';
    context.fillRect(ball.x + 17, ball.y + 22, 5, 5);

    context.fillStyle = 'Black';
    context.fillRect(ball.x + 62, ball.y + 22, 5, 5);

    context.fillStyle = 'Pink';
    context.fillRect(ball.x + 35, ball.y + 40, 10, 10);

    context.fillStyle = 'Pink';
    context.fillRect(ball.x + 30, ball.y + 50, 20, 10);

    context.fillStyle = 'White';
    context.fillRect(ball.x + 20, ball.y + 65, 40, 6);

    context.fillStyle = 'White';
    context.fillRect(ball.x + 20, ball.y + 70, 5, 5);

    context.fillStyle = 'White';
    context.fillRect(ball.x + 55, ball.y + 70, 5, 5);


    context.fillStyle = '#EC7063';
    context.fillRect(0, 0, canvas.width, grid);
    context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);

    for (let i = grid + 15; i < canvas.height - grid; i += grid * 2) {
        context.fillStyle = '#EC7063';
        context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
    }

}


document.addEventListener('keydown', function (e) {

    if (e.which === 38) {
        rightPaddle.dy = -paddleSpeed;
    } else if (e.which === 40) {
        rightPaddle.dy = paddleSpeed;
    }


    if (e.which === 87) {
        leftPaddle.dy = -paddleSpeed;
    } else if (e.which === 83) {
        leftPaddle.dy = paddleSpeed;
    }

});



document.addEventListener('keyup', function (e) {

    if (e.which === 38 || e.which === 40) {
        rightPaddle.dy = 0;
    }

    if (e.which === 83 || e.which === 87) {
        leftPaddle.dy = 0;
    }

});

requestAnimationFrame(loop);