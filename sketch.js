var bg,bgImg;
var ground;
var bird,birdImg;
var pipeStraight,pipeStraightImg;
var pipeReverse , pipeReverseImg;
var pipeGroup;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var gameOver,gameOverImg;
var titleImg;
var score = 0;
var restart,restartImg;
var sound;

function preload()
{
    bgImg = loadImage("images/background.png");
    ground = loadImage("images/ground2.png");
    birdImg = loadImage("images/Bird.png");
    pipeStraightImg = loadImage("images/pipe1.png");
    pipeReverseImg = loadImage("images/pipe2.png");
    gameOverImg = loadImage("images/Game_over.png");
    titleImg = loadImage("images/Title.png");
    restartImg = loadImage("images/index.png");
 
}

function setup()
{
    createCanvas(windowWidth,windowHeight);
    bg = createSprite(windowWidth/2,windowHeight-10,windowWidth,10);
    bg.addImage("Ground",ground);
    bg.scale=0.5;
    sound = loadSound('sound/170441__offensivewalrus__bassline.mp3');

    bird = createSprite(windowWidth/13,windowHeight-400,100,100);
    bird.addImage("Bird",birdImg);
    bird.scale = 0.5
   bird.setCollider("circle",0,0,50);
    
    pipeGroup = new Group();

    gameOver = createSprite(windowWidth/2,windowHeight/2-100);
    gameOver.addImage("gameOver",gameOverImg);
    gameOver.visible = false;

    restart = createSprite(windowWidth/2,windowHeight/2-10);
    restart.addImage("Restart",restartImg);
    restart.scale = 0.5;
    restart.visible = false;
}

function draw()
{

    background(bgImg);
    image(titleImg,100,100);
    textSize(25);
    fill("red");
    text("Score:" + score,100,170);

    if(gameState===PLAY)
    {
        score = score + Math.round(frameCount/100);
        bg.velocityX = -9;
        bird.velocityY=2;
        bg.play(sound);

         if(bg.x<0)
         {
             bg.x = windowWidth/2;
         }
         if(keyDown("up"))
         {
             bird.y=bird.y-15; 
         }
        createStraightPipes();
        createReversePipes();
         if(pipeGroup.isTouching(bird))
         {
            gameState = END;
         }
    }

    if(gameState===END)
    {
        bg.velocityX = 0;
       bird.setVelocity(0,0);
        pipeGroup.destroyEach(); 
        gameOver.visible = true;
        restart.visible = true;
        if(mousePressedOver(restart))
        {
            restartGame();
        }
    }   
   
     drawSprites();
}

function restartGame()
{
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    score = 0;
}

function createStraightPipes()
{
    if(frameCount%60 === 0)
    {
        pipeStraight = createSprite(displayWidth+100,windowHeight-170,50,50);
        pipeStraight.addImage("Pipe1",pipeStraightImg);
        pipeStraight.scale = 0.35;
        pipeStraight.x = Math.round(random([displayWidth+100,displayWidth+500]));
        pipeStraight.velocityX = -9;
        pipeGroup.add(pipeStraight);
    }
    
}

function createReversePipes()
{
    if(frameCount%80 === 0)
    {
        pipeReverse = createSprite(displayWidth+100,windowHeight-520,50,50);
        pipeReverse.addImage("Pipe2",pipeReverseImg);
        pipeReverse.scale = 0.35;
        pipeReverse.x = Math.round(random([displayWidth+250,displayWidth+750]));
        pipeReverse.velocityX = -9;
        pipeGroup.add(pipeReverse);
    }
}