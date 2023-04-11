preloadImages();
const imgTag = new Image(),
    canvas = document.getElementById('viewport'),
    ctx = canvas.getContext("2d")
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
imgTag.onload = drawImg;
imgTag.src = img_rand();
var img_border = (canvas.width * 10) / 100 + 50;
var img_center = img_border / 2;
var x = (canvas.width / 2 - img_center) + getRandomInt(0, 100);
var y = (canvas.height / 2 - img_center) + getRandomInt(0, 100);
var velx = 3;
var vely = -3;


function img_rand() {
    return "assets/faces/" + getRandomInt(1, 18) + ".jpg";
}

function preloadImages() {
    var img = new Image();
    for (var i = 1; i < 18; i++) {
        img.src = "assets/faces/" + i + ".jpg";
    }

}

function img_setup() {
    img_border = (canvas.width * 10) / 100 + 50;
    img_center = img_border / 2;
    x = (canvas.width / 2 - img_center) + getRandomInt(0, 100);
    y = (canvas.height / 2 - img_center) + getRandomInt(0, 100);
    velx = 3;
    vely = -3;
}

window.addEventListener("resize", () => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    img_setup();
})

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function range(min, max, value) {
    if (value >= min && value <= max) {
        return true
    } else {
        return false
    }
}
function random_rgba(opacity) {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + opacity + ')';
}

function drawImg() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // if (velx > 0 && vely > 0) {//viene da sinistra alto - - 
    //     for (var i = img_border; i > 0; i -= 2) {
    //         ctx.fillStyle = random_rgba(0.03);
    //         ctx.fillRect(x - img_border / 20 - i, y - img_border / 20 - i, img_border - i, img_border - i)
    //     }

    // } else if (velx > 0 && vely < 0) {//viene da sinistra basso - + 
    //     for (var i = img_border; i > 0; i -= 2) {
    //         ctx.fillStyle = random_rgba(0.03);
    //         ctx.fillRect(x - img_border / 20 - i, y + img_border / 20 + i, img_border - i, img_border - i)
    //     }
    // } else if (velx < 0 && vely > 0) {//viene da destra alto + -
    //     for (var i = img_border; i > 0; i -= 2) {
    //         ctx.fillStyle = random_rgba(0.03);
    //         ctx.fillRect(x + img_border / 20 + i, y - img_border / 20 - i, img_border - i, img_border - i)
    //     }
    // } else if (velx < 0 && vely > 0) {//viene da destra basso + +
    // for (var i = 0; i < img_border; i += 2) {
    //     ctx.fillStyle = random_rgba(0.03);
    //     ctx.fillRect(x + img_border / 20 + i, y + img_border / 20 + i, img_border - i, img_border - i)
    // }
    // }

    ctx.drawImage(imgTag, x, y, img_border, img_border);
}


function draw() {
    drawImg();
    if (x + velx > canvas.width - img_border || x + velx < img_center - img_border / 2) {
        velx = -velx;
        console.log("X: ", x, " \nY: ", y);


    }
    if (y + vely > canvas.height - img_border || y + vely < img_center - img_border / 2) {
        vely = -vely;
        console.log("X: ", x, " \nY: ", y);

    }

    if (range(canvas.height - img_border + vely, canvas.height - img_border, y)) imgTag.src = "assets/faces/15.jpg";
    if (range(0, velx, x)) imgTag.src = "assets/faces/18.jpg"
    if (range(0, vely, y)) imgTag.src = "assets/faces/9.jpg"
    if (range(canvas.width - img_border + velx, canvas.width - img_border, x)) imgTag.src = "assets/faces/11.jpg"

    if (range(0, velx, x) && range(0, vely, y) || // left top
        range(0, velx, x) && range(canvas.height - img_border + vely, canvas.height - img_border, y) || // left bottom
        range(canvas.width - img_border + velx, canvas.width - img_border, x) && range(0, vely, y) || //right top
        range(canvas.width - img_border + velx, canvas.width - img_border, x) && range(0, velx, x) && range(canvas.height - img_border + vely, canvas.height - img_border, y)) { // right bottom
        console.log("WIN")
        imgTag.src = "assets/faces/17.jpg"
    }
    x += velx;
    y += vely;
}


setInterval(draw, 20);