var bgStart;
var gameState = "level";
var girlImg,boyImg,cloudImg, cloudImg1;
var countButton = 1;
var next,nextImg;
var start,startImg;
var levelImg;
var l1,l2,l3,l4,l1Img,l2Img,l3Img,l4Img;
var lock1,lock2,lock3;
var mario,marioAni,marioStanding,marioBack;
var distance = 0;
var skybg,ground1,ground2;
var mousePressedl1 = false;
var g1Img,g2Img;
var key1,key1Img;




function preload(){
    bgStart = loadImage("IMAGES/bg start.png")
    girlImg = loadImage("IMAGES/person1.png");
    boyImg = loadImage("IMAGES/person2.png");
    cloudImg = loadImage("IMAGES/cloud.png");
    nextImg = loadImage("IMAGES/next level.png");
    cloudImg1 = loadImage("IMAGES/cloud1.png");
    startImg = loadImage("IMAGES/start_button.png");
    levelImg = loadImage("IMAGES/levet bg.png");
    l1Img = loadImage("IMAGES/level1.png");
    l2Img = loadImage("IMAGES/level2.png");
    l3Img = loadImage("IMAGES/level3.png");
    l4Img = loadImage("IMAGES/level4.png");
    marioBack = loadAnimation("IMAGES/MARIO/m4.png","IMAGES/MARIO/m5.png","IMAGES/MARIO/m6.png")
    marioAni = loadAnimation("IMAGES/MARIO/m1.png","IMAGES/MARIO/m2.png","IMAGES/MARIO/m3.png")
    marioStanding = loadAnimation("IMAGES/MARIO/m1.png");

    skybg = loadImage("IMAGES/sky bg.jpg");
   // groundImg = loadImage("IMAGES/ground.png");
   g1Img = loadImage("IMAGES/sky/g1.png");
   key1Img = loadImage("IMAGES/TEASURE/display key.png");


}

function setup(){
    createCanvas(1200,750);
    
    next = createSprite(1100,50);
    next.addImage(nextImg);
    next.scale = 0.2;

    start = createSprite(540,650);
    start.addImage(startImg);
    start.scale = 1.5;

    mario = createSprite(138,600);
    mario.addAnimation("standing",marioStanding);
    mario.addAnimation("running",marioAni);
    mario.addAnimation("back",marioBack);
    mario.scale = 1.8;
    
    l1 = createSprite(147,186);
    l1.addImage(l1Img);
    l1.scale = 0.4;

    l2 = createSprite(465,185);
    //l2.addImage(lock1);
    l2.addImage(l2Img);
    l2.scale = 0.4;

    
    l3 = createSprite(748,191);
    l3.addImage(l3Img);
    l3.scale = 0.4;

    
    l4 = createSprite(1030,186);
    l4.addImage(l4Img);
    l4.scale = 0.3;




    
}

function draw(){
    //console.log(mouseX,mouseY);
    if(gameState === "start"){
        background(bgStart);
        fill("maroon");
        textSize(50);
        strokeWeight(7);
        stroke("pink");
        text("Mario : The Runner",400,50);
        text("__________________",365,60);

        image(girlImg,100,550,150,200);
        image(boyImg,1000,550,150,200);
        
        if(countButton === 1){
            image(cloudImg,230,200,760,550);
            textSize(25);
            text("Use the arrow keys to play the game",380,350);
            text("Eat the fruits to  destroy or kill the obstacles",350,400);
            text("The power of killing will only be there for sometime.",350,440);
            text("After that you have to protect your self.",380,480);

            start.visible = false;
            mario.visible = false;
            l1.visible = false;
            l2.visible = false;
            l3.visible = false;
            l4.visible = false;


        }
        if(mousePressedOver(next)){
            countButton=2;
        }
        if(countButton === 2){
            image(cloudImg1,280,200,760,550);
            textSize(25);
            text("Collect all the key from the first three levels",400,350);
            text("Reach to the treasure boxes in the last level",380,400);
            text("Open those boxes to win the whole game",380,450);
            fill("black");
            text("Click on 'start' button to play",380,600);
            start.visible = true;
            mario.visible = false;
            l1.visible = false;
            l2.visible = false;
            l3.visible = false;
            l4.visible = false;

        }

        if(mousePressedOver(start)){
            gameState = "level";
        }
    }else if(gameState === "level"){
        background(levelImg);
        
        if(!mousePressedl1){
            textSize(20);
            fill("black");
            text("Click on level 1 to start",500,50);
        }

        //start.hide();
        start.destroy();
        next.destroy();

        l1.visible = true;
        l2.visible = true;
        l3.visible = true;
        l4.visible = true;


        
        mario.visible = true;

        if(mousePressedOver(l1)){
            mario.changeAnimation("running",marioAni);
            mario.velocityX = 8;
            mousePressedl1 = true;
            
            
        }

        if(mario.x === 1210){
            gameState = "level1"
            mario.x = 138;
            mario.y = 500;
            mario.changeAnimation("standing",marioStanding);
            ground2 = createSprite(camera.position.x,600,width,70);
            ground2.shapeColor = "brown";
            ground1 = createSprite(camera.position.x,570,width,30);
            ground1.shapeColor = "green";
            mario.velocityX = 0;
            


        }
    }else   if(gameState === "level1"){
        background(0);
        image(skybg,0,0,width*5,height);
        l1.visible = false;
        l2.visible = false;
        l3.visible = false;
        l4.visible = false;

        ground1.x = camera.position.x;
        ground2.x = camera.position.x;

        mario.collide(ground2);
        fill("white")
        textSize(20);
        text("Distance : " + distance,camera.position.x,50);
       
        mario.velocityY+=0.8;
        if(keyDown("right")){
            mario.x+=8;
            if(distance >= 60 && distance <= 650){
                camera.position.x+=8;
            }
            distance++;
            mario.changeAnimation("running",marioAni);
        }else if(keyDown("left")){
            mario.x-=8;
            if(distance >= 60){
                camera.position.x-=8;
            }
           distance--;
            mario.changeAnimation("back",marioBack);
        }else if(keyDown("up")){
            mario.velocityY = -3;
            mario.x+=8;
            if(distance >= 60){
                camera.position.x+=8;
            }
           distance++;
        }else{
            mario.changeAnimation("standing",marioStanding);
        }

       /* if(distance >= 700){
            key1 = createSprite(50,50,10,10);
            key1.addImage(key1Img);
        }*/
       G1();
        
    }
    
    drawSprites();
}

function G1(){
    if(frameCount % 50 === 0){
        var g1  = createSprite(camera.position.x +  1200/2,0,10,10);
        g1.shapeColor = "black";
        g1.velocityX = -4;
      //  g1.addImage(c1Img);
       // c1.scale = 3;
        //c1.lifetime = 150;
      //  c1.debug = true;
        g1.y = random(camera.position.x - 1200/2 , camera.position.x + 1200/2)
        //c1g.add(c1);

    }
}
