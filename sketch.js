var helicopter,helicopterimg;
var skyimg;
var missile,missileimg;
var gun,gunimg;
var score;
var gameState;
var gunGroup,missileGroup;
var explosion;
var collect;

function preload(){
  helicopterimg=loadImage("helicopter.png");
  skyimg=loadImage("sky.jpg");
  missileimg=loadImage("missile.png");
  gunimg=loadImage("gun.png");
  explosion=loadSound("Explosion+7.mp3");
  collect=loadSound("gunreload.mp3");
}

function setup(){
  createCanvas(displayWidth,displayHeight);

  sky=createSprite(displayWidth/2,displayHeight/2,50,50);
  sky.addImage(skyimg);
  sky.scale=4;
  

  helicopter=createSprite(200,200,20,20);
  helicopter.addImage(helicopterimg);
  helicopter.scale=0.7;
  //helicopter.debug=true;

  missileGroup=new Group();
  gunGroup=new Group();  

  gameState=1;
  score=0;
}


function draw(){
  background("white");
  //console.log(helicopter.x);
  if(gameState===1){
  sky.velocityX=-5;
  camera.position.x=helicopter.x;
  if(sky.x<100){
    sky.x=displayWidth/2;
  }

  if(keyWentDown(DOWN_ARROW)){
    helicopter.y=helicopter.y+25;
  }
  if(keyWentDown(UP_ARROW)){
    helicopter.y=helicopter.y-25;
  }
    
  if((sky.x <=200 && sky.x>=195) || (sky.x<=500 && sky.x>=495)){
    missile=createSprite(displayWidth,random(70,displayHeight-50),30,30);
    missile.addImage(missileimg);
    missile.scale=0.3;
    missile.velocityX=-18;
    //missile.debug=true;
    missile.lifetime=200;
    missileGroup.add(missile);
    }
  if(sky.x>=675 || (sky.x<=180 && sky.x>=175)){
    gun=createSprite(displayWidth,random(70,displayHeight-50),20,20);
    gun.addImage(gunimg);
    gun.scale=0.1;
    gun.velocityX=-8;
    gun.lifetime=200;
    gunGroup.add(gun);
    //gun.debug=true;
  }

  if(gunGroup.isTouching(helicopter)){
    score=score+5;
    collect.play();
    gunGroup.destroyEach();
  }
  if(missileGroup.isTouching(helicopter)){
    gameState=0;
    gunGroup.setVisibleEach(false);
    missileGroup.setVisibleEach(false);
    helicopter.visible=false;
    explosion.play();
  }

  
}


  drawSprites();
  textSize(20);
  fill("red");
  text("CATCH THE GUNS AVOID THE MISSILES!",-100,50);

  fill(rgb(150,100,50));
  text("AMMO SCORE: "+ score,350,50);

  if(gameState===0){
    sky.velocityX=0;
    missileGroup.setLifetimeEach(-1);
    gunGroup.setLifetimeEach(-1);
    helicopter.lifetime=-1
    textSize(20);
    fill("blue");
    text("YOU SCORED "+score,250,300);
    text("PRESS SPACE TO PLAY AGAIN",200,500);
    if(keyCode===32){
      gameState=1; 
      score=0;
      gunGroup.destroyEach();
      missileGroup.destroyEach();
      helicopter.visible=true;
    }
  }
}





