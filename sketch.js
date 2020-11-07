
var monkey , monkey_running
var banana,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var survivalTime=0;
var PLAY=1;
var END=0;
var gameState=PLAY;
var gameOverImage;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  gameOverImage=loadAnimation("gameOver.jpg");
}



function setup() {
  createCanvas(600, 450);
monkey=createSprite(100, 375, 100, 100);
monkey.addAnimation("running", monkey_running);
//monkey.debug=true;
monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
monkey.addAnimation("over", gameOverImage);
monkey.scale=0.18;
  
bananaGroup=createGroup();
obstacleGroup=createGroup();  
  
ground=createSprite(300, 430, 600, 16);
  
}


function draw() {
background(247);
  
  if(gameState === PLAY){
    if(keyDown("space")&& monkey.y >= 320) {
        monkey.velocityY = -20;
     }
    bananas();
    obstacles();
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground);
    survivalTime=survivalTime+Math.round(frameCount/frameRate());
  }
  
  else if(gameState === END){
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.changeAnimation("over", gameOverImage);
    monkey.setCollider("rectangle", 0, 0, 250, 250);
    monkey.x=300;
    monkey.y=225;
    monkey.scale=0.6
    bananaGroup.setVelocityXEach=0;
    obstacleGroup.setVelocityXEach=0;
    if(mousePressedOver(monkey)){
      reset();
    }
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
  }
  
  drawSprites();
  textSize(20);
  fill("black");
  text("SURVIVAL TIME : "+survivalTime, 200, 50);
  text("BANANA EATEN : "+score, 200, 75);
}

function bananas(){
  if(frameCount % 110===0){
    banana=createSprite(605, 375, 15, 15);
    banana.addImage("running", bananaImage);
    banana.y= Math.round(random(150, 325))
    banana.velocityX=-5;
    banana.scale=0.1
    banana.lifetime=200
    bananaGroup.add(banana);
  }
  if(bananaGroup.isTouching(monkey)){
    score=score+1;
    banana.destroy();
  }
}
function obstacles(){
  if(frameCount %300===0){
    obstacle=createSprite(625, 385, 15, 15);
    obstacle.addImage("kill_monkey", obstacleImage);
    obstacle.scale=0.3
    obstacle.velocityX=-6;
    obstacle.lifetime=200
    obstacleGroup.add(obstacle);
    obstacle.debug=true;
    obstacle.setCollider("circle", 0, 0, obstacle.radius);
  }
}
function reset(){
gameState=PLAY;
score=0
monkey.changeAnimation("running", monkey_running);
monkey.setCollider("rectangle", 0, 0, 500, 600);
monkey.scale=0.18;
monkey.x=100;
monkey.y=375;
survivalTime=0;
}