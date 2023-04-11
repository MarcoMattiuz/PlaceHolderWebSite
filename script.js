
const imgTag = new Image(),
    canvas = document.getElementById('viewport'),
    ctx = canvas.getContext("2d")
resizePage();
imgTag.onload = drawImg;
imgTag.src = img_rand();
var img_border = (canvas.width * 10) / 100 + 50;
var img_center = img_border / 2;
var x = (canvas.width / 2 - img_center) + getRandomInt(0, 100);
var y = (canvas.height / 2 - img_center) + getRandomInt(0, 100);
var velx = 3 * (getRandomInt(0, 100) > 50 ? 1 : -1);
var vely = 3 * (getRandomInt(0, 100) > 50 ? 1 : -1);
const title = document.getElementById('mainTitle');

console.log(getOffset(title).left, getOffset(title).top)









function resizePage() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)) {

        ctx.canvas.width = document.documentElement.clientWidth
        ctx.canvas.height = document.documentElement.clientHeight
    } else {


        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }
}

function img_rand() {
    return "assets/faces/" + getRandomInt(1, 18) + ".jpg";
}

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY
    };
}

function img_setup() {
    img_border = (canvas.width * 10) / 100 + 50;
    img_center = img_border / 2;
    x = (canvas.width / 2 - img_center) + getRandomInt(0, 100);
    y = (canvas.height / 2 - img_center) + getRandomInt(0, 100);
    velx = 3 * (getRandomInt(0, 100) > 50 ? 1 : -1);
    vely = 3 * (getRandomInt(0, 100) > 50 ? 1 : -1);
}

window.addEventListener("resize", () => {
    resizePage();
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