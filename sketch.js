var monkey;
var obstaclesGroup,obstaclesImage;
var bananaGroup,bananaImage;
var game,gameOimg;
var score = 0;
var jungle,jungleImg;
var survivaltime

function preload(){
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  jungleImg = loadImage("jungle background.jpg");

  gameOimg = loadImage("gameover img.jpg");

}
 

function setup() {
  createCanvas(600, 360);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  jungle = createSprite(600,100, 1, 2); 
  jungle.addImage(jungleImg);
  jungle.velocityX = -4;
  jungle.scale =6;

 bananaGroup = new Group();
 obstaclesGroup = new Group(); 
}


function draw() {
 background("white");
  
  monkey.collide(ground);
  
    if(obstaclesGroup.isTouching(monkey)&& monkey.scale===0.08||score>0){
      game = createSprite(90,180);
      game.addImage(gameOimg);
      game.scale = 3;
      
      obstaclesGroup.velocityX = 0;
      game.depth >= obstaclesGroup.depth;
      
      bananaGroup.velocityX = 0;
      game.depth >= bananaGroup.depth;
    }

    if(obstaclesGroup.isTouching(monkey)){
    monkey.scale = 0.08;
    score = score - 2;
    obstaclesGroup.destroyEach();
    }

     if(monkey.isTouching(bananaGroup)){
     score = score+1;
     bananaGroup.destroyEach();
  }
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
    
  camera.position.x = monkey.x;

  if(jungle.x<0){
    jungle.x = jungle.width/2
  }
  
 score.depth = jungle.depth
 score.depth  = score.depth+1;  
    
 ground .depth = jungle.depth
 ground.depth = ground.depth+1;
 
   if(keyDown("space") ) {
     monkey.velocityY = -12;
    }
  
  switch(score){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.sclae = 0.16;
       break;  
    case 40: monkey.scale = 0.18;
  }
  
  monkey.velocityY = monkey.velocityY+0.8;
  
  monkey.depth = jungle.depth
  monkey.depth  = monkey.depth+1;

 drawSprites(); 
    
  stroke("blue");
  textSize(20);
  fill("red");
  text("score: "+ score, 260, 50);
  
  stroke("black");
  textSize(20);
  fill("yellow")
  survivaltime=Math.ceil(frameCount/jungle.velocityX);
  text("survivaltime :"+ survivaltime,100,50);
  
  if(camera.position.x = monkey.x){
    obstacle();
    banana();
  }
}

function banana(){
  
  if (frameCount%80===0){
 var banana = createSprite(300, 50, 20, 20);
     banana.addImage(bananaImage);
     banana.scale = 0.1;
     banana.velocityX = -5;
     banana.y = Math.round(random(140, 300));
     banana.lifetime = 100;
     bananaGroup.add(banana);
  }
}

function obstacle(){
  if(frameCount%100===0){
 var obstacles = createSprite(0,0);
     obstacles.x = 340;
     obstacles.y = 315;
     obstacles.addImage(obstaceImage);
     obstacles.scale = 0.2;
     obstacles.velocityX = -6;
     obstacles.lifetime = 100;
     obstaclesGroup.add(obstacles);
  }
}