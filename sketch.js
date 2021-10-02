

var jumpSound,checkpointSound,GameoverSound;
var nature,nature1,nauture2,nature3,natureGroup;
var mon,mon_fly;
var ground, groundImage;
var cloud,cloudImage,cloudGroup;
var girl,girlImage, girlJump, girlImage2;
var invisibleG;
var obtrash, obtrashImage,obtrash1,obtrash2,obtrash3,obtrash4,obtrash5;
 var bin ,binImage;
 var score=0;
 var PLAY=1;
 var END=0;
 var gameState=PLAY
var gameoverImage,resetImage,gameover,restart;

function preload(){
    mon_fly=
    loadAnimation("images/mons1.png","images/mons2.png","images/mons3.png","images/mons4.png")
    cloudImage=loadImage("images/thecloud1.png");
girlImage=loadAnimation("images/girl6.png","images/girl7.png","images/girl8.png","images/girl9.png","images/girl10.png","images/girl11.png")
    groundImage=loadImage("images/ground.png")
  girlJump=loadAnimation("images/girl12.png","images/girl13.png","images/girl14.png")
  obtrashImage=loadImage("images/obtrash.png");
  obtrash1=loadImage("images/bannans.png");
  obtrash2=loadImage("images/chip packet.png");
  obtrash3=loadImage("images/coins.png");
  obtrash4=loadImage("images/glass.png");
  //obtrash5=loadImage("images/paper.png");
  binImage=loadImage("images/bin4.png");
 girlImage2=loadImage("images/girl5.png")
  nature1=loadImage("images/leaves.png");
  nature2=loadImage("images/tree.png");
  nature3=loadImage("images/flowers.png");

  gameoverImage=loadImage("images/gameover.png");
  resetImage=loadImage("images/restart.png");

  jumpSound=loadSound("jump.mp3");
  GameoverSound=loadSound("gameover.mp3");
}



function setup(){
    createCanvas(1200,600)
    

    mon=createSprite(50,250,20,50);
    mon.addAnimation("flying",mon_fly);
    mon.scale=0.6;

    ground=createSprite(600,525,2400,800)
    ground.addImage(groundImage);
    ground.shapeColor="#814D25"
    ground.scale=3
    
   invisibleG=createSprite(600,535,2400,100)
   invisibleG.visible=false;

    girl=createSprite(200,200,20,50);
    girl.addAnimation("running",girlImage);
    girl.addAnimation("jumping", girlJump)
    girl.addImage("standing",girlImage2);
     girl.scale=0.55

     restart = createSprite(600,150,50,50);
     restart.addImage(resetImage);
     restart.scale = 0.5;

     bin=createSprite(1100,50,50,50);

     gameOver = createSprite(600,300,50,50);
     gameOver.addImage(gameoverImage);
     gameOver.scale = 0.5;
  
   
     bin.addImage(binImage)
     bin.scale=0.5

     
     
girl.setCollider("rectangle",10,10,3, girl.height
)
girl.debug=false;

   cloudGroup=createGroup()
   obstacleGroup=createGroup()
   natureGroup=createGroup()
    
    
}

function draw(){
background("#B7EDEF");

textSize(20)
    fill ("black")
    strokeWeight(3) 

if(gameState===PLAY){

  gameOver.visible = false;
   restart.visible = false; 

 
   ground.velocityX = -(4 + 3* score/2)
   
    if(ground.x<0){
        ground.x=ground.width/2

    }
  
    if(keyDown("space")&& girl.y>=350){
         jumpSound.play()
        girl.velocityY=-20
        girl.changeAnimation("jumping",girlJump);
    }

    else{
     
      girl.changeAnimation("running",girlImage);
    }

    
    girl.velocityY=girl.velocityY+0.9 

    if(obstacleGroup.isTouching(girl)){
       score=score+2
       obstacleGroup.destroyEach()
    }
      spawnObstacles()
    spawnNature()
       spawnClouds()

      

       if(natureGroup.isTouching(girl)){
        GameoverSound.play() 
           gameState=END
       }
    
}
     

 else if(gameState===END){
 girl.changeImage("standing",girlImage2);
ground.velocityX=0;
girl.velocityY=0;

cloudGroup.setLifetimeEach(-1);
obstacleGroup.setLifetimeEach(-1);
natureGroup.setLifetimeEach(-1);


cloudGroup.setVelocityXEach(0);
obstacleGroup.setVelocityXEach(0);
natureGroup.setVelocityXEach(0);


  gameOver.visible = true;
  restart.visible = true;


}

if (mousePressedOver(restart)){
  reset()
}

 
  

   girl.collide(invisibleG)


    drawSprites()

    text("score :"+score,1000,130);
}

function spawnClouds(){
if(frameCount% 250===0){
   
     cloud=createSprite(1200,50,50,50)
     cloud.shapeColor="white"
     cloud.y=Math.round(random(50,150));
     cloud.addImage(cloudImage);
     cloud.velocityX=-2;
     cloud.scale=0.4

     mon.depth=cloud.depth+1;
     bin.depth=cloud.depth+1;
     girl.depth=cloud.depth+1;
     restart.depth=cloud.depth+1;

     cloud.lifetime=600;
    
     cloudGroup.add(cloud)
}
}


function spawnObstacles(){
    if(frameCount % 150===0){


        obtrash= createSprite(1200,435,50,50);
        obtrash.velocityX=-10
      var rand=Math.round(random(1,6))
      switch(rand){
          case 1: obtrash.addImage(obtrashImage);
                  break;

         case 2: obtrash.addImage(obtrash1);
                break;

        case 3: obtrash.addImage(obtrash2);
               break;
       
        case 4: obtrash.addImage(obtrash3);
               break;

        case 5: obtrash.addImage(obtrash4)
                break;

        //case 6:obtrash.addImage(obtrash5)

            //  break;

        default: break;
      }



        
        obtrash.lifetime=1200;
        obtrash.scale=0.35
        obstacleGroup.add(obtrash);
    }
}



function spawnNature(){
    if(frameCount % 100===0){


        nature= createSprite(1200,435,50,50);
        nature.velocityX=-10
      var rand=Math.round(random(1,3))
      switch(rand){
          case 1: nature.addImage(nature1);
                  break;

         case 2: nature.addImage(nature2);
                break;

        case 3: nature.addImage(nature3);
               break;

        default: break;
      }
        nature.lifetime=1200;
        nature.scale=0.35
        natureGroup.add(nature);
    }
}


function reset()
{

  gameState=PLAY;
  restart.visible=false;
  gameOver.visible=false;
  score=0;
  natureGroup.destroyEach()
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  girl.changeAnimation("running",girlImage);
  
}