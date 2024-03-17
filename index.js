// init
var container = document.getElementById('container');
var fullscreen = document.querySelector('#fullscreen'); // Select element with class 'fullscreen'
var maxx, maxy, halfx, halfy, dotCount, dots;

function init() {
  maxx = window.innerWidth;
  maxy = window.innerHeight;
  halfx = maxx / 2;
  halfy = maxy / 2;
  container.style.backgroundColor = "black"; // Ubah warna latar belakang container
  dotCount = 200;
  dots = [];
  // create dots
  for (var i = 0; i < dotCount; i++) {
    dots.push(new Dot());
  }
}

// dots animation
function render() {
  container.style.backgroundImage = drawBackground();
  requestAnimationFrame(render);
}

// generate background image data
function drawBackground() {
  var canvas = document.createElement('canvas');
  canvas.width = maxx;
  canvas.height = maxy;
  var context = canvas.getContext('2d');
  context.fillStyle = 'black'; // Warna latar belakang container
  context.fillRect(0, 0, maxx, maxy);
  for (var i = 0; i < dotCount; i++) {
    dots[i].draw(context);
    dots[i].move();
  }
  return 'url(' + canvas.toDataURL() + ')';
}

// dots class
function Dot() {
  this.rad_x = 2 * Math.random() * halfx + 1;
  this.rad_y = 1.2 * Math.random() * halfy + 1;
  this.alpha = Math.random() * 360;
  this.speed = Math.random() * 100 < 50 ? 1 : -1;
  this.speed *= 0.1;
  this.size = Math.random() * 5 + 1;
  this.color = Math.floor(Math.random() * 256);
}

// drawing dot
Dot.prototype.draw = function(context) {
  var dx = halfx + this.rad_x * Math.cos(this.alpha / 180 * Math.PI);
  var dy = halfy + this.rad_y * Math.sin(this.alpha / 180 * Math.PI);
  context.fillStyle = "rgb(" + this.color + "," + this.color + "," + this.color + ")";
  context.fillRect(dx, dy, this.size, this.size);
};

// calc new position in polar coord
Dot.prototype.move = function() {
  this.alpha += this.speed;
  if (Math.random() * 100 < 50) {
    this.color += 1;
  } else {
    this.color -= 1;
  }
};

// Hide container and show fullscreen class for 4 seconds
container.style.display = 'none'; // Hide container initially
fullscreen.classList.add('show'); // Show fullscreen class initially

// After 4 seconds, hide fullscreen class and show container
setTimeout(function() {
  container.style.display = ''; // Show container
  fullscreen.classList.remove('show'); // Hide fullscreen class
}, 5000); // Mengganti 1000 menjadi 4000 untuk menunggu 4 detik

// start animation
init();
render();

const textElement = document.getElementById('oi');
const text = "@RiseCrystal"; // Teks yang akan ditampilkan

let index = 0;

function type() {
  textElement.textContent = text.slice(0, index);
  textElement.style.fontFamily = "Times New Roman"; // Mengatur gaya font menjadi Times New Roman
  textElement.style.fontWeight = "bold"; // Mengatur teks menjadi bold
  index++;

  if (index <= text.length) {
    setTimeout(type, 100); // Waktu jeda antara setiap karakter (ms)
  } else {
    index = 0; // Reset index jika telah mengetik seluruh teks
    setTimeout(type, 2000); // Tunggu 2 detik sebelum memulai kembali mengetik
  }
}

type(); // Mulai mengetik
