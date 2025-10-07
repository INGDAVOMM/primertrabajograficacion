function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
}

let cloudX = [150, 600, 400];
let cloudY = [100, 80, 50];
let cloudSpeed = [0.3, 0.2, 0.4];
let heartPulse = 0;

function draw() {
  background(255);

  // --- 🌸 CIELO ---
  let skyTop = color(255, 160, 200);
  let skyBottom = color(255, 220, 200);
  for (let y = 0; y < height / 2; y++) {
    let t = map(y, 0, height / 2, 0, 1);
    let c = lerpColor(skyTop, skyBottom, t);
    stroke(c);
    line(0, y, width, y);
  }

  // --- ☁️ NUBES ANIMADAS ---
  function drawCloud(x, y, scale) {
    fill(255, 255, 255, 230);
    noStroke();
    ellipse(x, y, 60 * scale, 60 * scale);
    ellipse(x + 30 * scale, y + 10 * scale, 50 * scale, 50 * scale);
    ellipse(x - 30 * scale, y + 10 * scale, 50 * scale, 50 * scale);
    ellipse(x + 15 * scale, y - 15 * scale, 55 * scale, 55 * scale);
    ellipse(x - 15 * scale, y - 15 * scale, 55 * scale, 55 * scale);
  }

  // Dibujar y mover nubes
  for (let i = 0; i < cloudX.length; i++) {
    drawCloud(cloudX[i], cloudY[i], 1.2 + 0.2 * i);
    cloudX[i] += cloudSpeed[i];

    // Si salen de la pantalla, reaparecen
    if (cloudX[i] > width + 100) {
      cloudX[i] = -100;
    }
  }

  // --- 🌊 MAR ---
  for (let y = height / 2; y < height * 0.75; y++) {
    let t = map(y, height / 2, height * 0.75, 0, 1);
    let c = lerpColor(color(120, 190, 255), color(30, 120, 200), t);
    stroke(c);
    line(0, y, width, y);
  }

  // Olas
  noFill();
  stroke(255, 255, 255, 100);
  strokeWeight(2);
  for (let y = height / 2 + 15; y < height * 0.75; y += 20) {
    beginShape();
    for (let x = 0; x <= width; x += 20) {
      let wave = sin(x * 0.05 + frameCount * 0.05) * 5;
      vertex(x, y + wave);
    }
    endShape();
  }

  // --- 🏖️ ARENA ---
  for (let y = height * 0.65; y < height; y++) {
    let t = map(y, height * 0.65, height, 0, 1);
    let c = lerpColor(color(255, 210, 120), color(255, 160, 70), t);
    stroke(c);
    line(0, y, width, y);
  }

  // Forma de la isla
  noStroke();
  fill(255, 200, 90, 230);
  beginShape();
  vertex(0, height * 0.8);
  bezierVertex(width * 0.2, height * 0.6, width * 0.4, height * 0.9, width * 0.6, height * 0.78);
  bezierVertex(width * 0.75, height * 0.85, width * 0.85, height * 0.9, width, height * 0.85);
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);

  // --- 🌴 PALMERAS ---
  textFont("Segoe UI Emoji");
  textSize(170);
  text("🌴", 50, 520);
  textSize(150);
  text("🌴", 550, 520);

  // --- 🧡 CORAZÓN NARANJA ANIMADO ---
  push();
  heartPulse = sin(frameCount * 0.05) * 0.05; // efecto latido
  translate(400, 300);
  scale(1 + heartPulse);
  fill(255, 140, 0); // Naranja
  noStroke();
  textSize(500);
  text("❤️", 0, 0);
  pop();

  // --- TEXTO "Un verano sin ti" ---
  push();
  textFont("Georgia");
  textSize(50);
  for (let i = 0; i < 10; i++) {
    fill(255, 150 + i * 10, 50 + i * 5);
    text("Un verano sin ti", 400, 550 - i * 2);
  }
  pop();
}
