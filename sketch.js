var alien, alienImage, asteroid, asteroidImage, comet, cometImage, meteor, meteorImage;
var spaceship, spaceshipImage;
var bullet, bulletImage;
var backgroundImage, bg;
var gameOver, gameOverImage;
var alienGroup, asteroidGroup, meteorGroup, bulletGroup;
var play, end;
var gameState = "play";
var score = 0;
var lives = 10;

function preload() {
  spaceshipImage = loadImage("images/spaceship.png");
  alienImage = loadImage("images/alien.png");
  asteroidImage = loadImage("images/asteroid.png");
  backgroundImage = loadImage("images/background3.jpg");
  bulletImage = loadImage("images/bullet1.png");
  cometImage = loadImage("images/comet.png");
  meteorImage = loadImage("images/meteor.png");
  gameOverImage = loadImage("images/game over.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(windowWidth/2, 450);
  bg.addImage(backgroundImage);
  bg.scale = 2.7;
  //bg.velocityY = 5;

  bullet = createSprite(400, 400, 10, 10);
  bullet.addImage(bulletImage);
  bullet.scale = 0.02;

  gameOver = createSprite(windowWidth/2, windowHeight/2);
  gameOver.addImage(gameOverImage);

  spaceship = createSprite(windowWidth/2, windowHeight-50);
  spaceship.addImage(spaceshipImage);
  spaceship.scale = 0.2;

  alienGroup = new Group();
  asteroidGroup = new Group();
  meteorGroup = new Group();
  bulletGroup = new Group();

  console.log(windowWidth);
  console.log(windowHeight);
}

function draw() {
  background(255, 255, 255);

  console.log(lives);

  // infinitely moving background
  bg.velocityY = 5;// + score / 60;
  if(bg.y > 850) {
    bg.y = 250;
  }

  bullet.y = spaceship.y;

  text("Score: " + score, 10, 10);

  if(gameState === "play") {
    gameOver.visible = false;

    if(keyDown("LEFT_ARROW")) {
      spaceship.x = spaceship.x - 5;
    }
    if(keyDown("RIGHT_ARROW")) {
      spaceship.x = spaceship.x + 5;
    }
    if(keyDown("SPACE")) {
      spawnBullets();
    }
 
    if(meteorGroup.isTouching(spaceship) || alienGroup.isTouching(spaceship) || asteroidGroup.isTouching(spaceship)) {
      lives--;
    }

    if(meteorGroup.y > spaceship.y || alienGroup.y > spaceship.y || asteroidGroup.y > spaceship.y) {
      lives--;
      console.log(lives);
    }

    if(bulletGroup.isTouching(alienGroup) ||
    bulletGroup.isTouching(asteroidGroup) ||
    bulletGroup.isTouching(meteorGroup)) {
      score = score + 1;
      alienGroup.destroyEach();
      asteroidGroup.destroyEach()
      meteorGroup.destroyEach();
    }

    spawnAliens();
    spawnAsteroids();
    spawnMeteors();
  }
  else if(gameState === "end") {
    meteorGroup.destroyEach();
    alienGroup.destroyEach();
    meteorGroup.setVelocityYEach(0);
    alienGroup.setVelocityYEach(0);
    gameOver.visible = true;
  }

  drawSprites();
}

function spawnMeteors() {
  if(frameCount % 180 === 0) {
    meteor = createSprite(Math.round(random(100, 900)), -50);
    meteor.addImage(meteorImage);
    meteor.velocityY = 3;
    meteor.scale = 0.1;
    meteor.lifetime = 800;
    meteorGroup.add(meteor);
  }
}

function spawnAliens() {
  if(frameCount % 150 === 0) {
    alien = createSprite(Math.round(random(0, 1000)), -50);
    alien.addImage(alienImage);
    alien.velocityY = 4;
    alien.scale = 0.08;
    alien.lifetime = 800;
    alienGroup.add(alien);
  }
}

function spawnAsteroids() {
  if(frameCount % 150 === 0) {
    asteroid = createSprite(Math.round(random(100, 900)), -50);
    asteroid.addImage(asteroidImage);
    asteroid.velocityY = 2;
    asteroid.scale = 0.1;
    asteroid.lifetime = 800;
    asteroidGroup.add(asteroid);
  }
}

// function spawnBullets() {
//   if(frameCount % 60 === 0) {
//     bullet = createSprite(500, spaceship.y, 10, 10);
//     bullet.addImage(bulletImage);
  
//     bullet.velocityY = -3;
//     bullet.scale = 0.02;
//     console.log(bullet.velocityY)
//     bullet.lifetime = 600;
//     bulletGroup.add(bullet);
//   }
// }

function spawnBullets(){
  if(frameCount%5 ===0){
    bullet = createSprite(spaceship.x,spaceship.y - 40,5,10);
    bullet.velocityY = -5;
    //bullet.shapeColor = "yellow";
    bullet.addImage(bulletImage);
    bullet.scale = 0.02;
    bullet.lifetime = 150;
    bulletGroup.add(bullet);
  
}
}

