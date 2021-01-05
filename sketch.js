var crosshair,crosshairimage
var ground,groundimage
var alienGroup,aliens,alienblast,alienblastimage
var PLAY=1
var START=2
var END=0
var gamestate=START
var score=0
var lasersound
var explosionsound
var ammo=30
var coinGroup,coinimage
var gameover,gameoverimage,gameoversound
var theme
var startscreen,startscreenimage
var restart,restartimage
var click,clickimage


function preload(){
  crosshairimage=loadImage("crosshair.png")
  groundimage=loadImage("ground.jpg")
  aliens=loadImage("alien.png")
  alienblastimage=loadImage("blast.gif")
  lasersound=loadSound("Laser Blasts-SoundBible.com-108608437.mp3")
  explosionsound=loadSound("Explosion+3.mp3")
  coinimage=loadImage("coin.png")
  gameoverimage=loadImage("gameover.png")
  gameoversound=loadSound("gameover.mp3")
  startscreenimage=loadImage("startscreen.jpg"  )
  restartimage=loadImage("restart.png")
  clickimage=loadImage("click.png")
  
}

function setup() {
  createCanvas(400,400);
  ground=createSprite(200,200,20,20)
  ground.addImage(groundimage,groundimage)
  ground.scale=3
  
  crosshair=createSprite(200,200,20,20)
  crosshair.addImage(crosshairimage,crosshairimage)
  crosshair.scale=0.09
  crosshair.setCollider("circle",0,0,5)
 // crosshair.debug=true
  
  alienGroup=new Group()
  coinGroup=new Group()
  
  gameover=createSprite(200,150,20,20)
  gameover.addImage(gameoverimage,gameoverimage)
  gameover.visible=false
  
  startscreen=createSprite(200,200,20,40)
  startscreen.addImage(startscreenimage,startscreenimage)
  startscreen.scale=0.8
  
  restart=createSprite(200,250,20,20)
  restart.addImage(restartimage,restartimage)
  restart.scale=0.4
  
  click=createSprite(200,270,20,20)
  click.addImage(clickimage,clickimage)
  click.scale=0.4
}

function draw() {
  background("200");
  if (gamestate===START){
   startscreen.visible=true
   click.visible=true
   text("Click to start",200,300)
   restart.visible=false
  }
  
  if (gamestate===PLAY){
    click.visible=false
    startscreen.visible=false
    ground.velocityX=-3
    gameover.visible=false
    crosshair.x=mouseX
    crosshair.y=mouseY
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    alien()
    coin()
    restart.visible=false
  }
  else if(gamestate===END){
    click.visible=false
    coinGroup.destroyEach()
    alienGroup.destroyEach()
    text("Your score is "+score,200,250)
    text("Press R to reset",200,350)
    gameover.visible=true
    ground.velocityX=0
    restart.visible=true
   }
  drawSprites()
  fill("white")
  textSize(20)
  text("Score: "+score,100,20)
  text("AMMO: "+ammo,300,380)
  
  if (ammo===0){
    gamestate=END
  }
  if (keyDown("r")&&gamestate===END){
    reset()
  }
}

function alien(){
  if (frameCount%30==0){
    var  alien=createSprite(0,200,20,20)
    alien.y=Math.round(random(10,390))
    alien.addImage(aliens,aliens)
    alien.velocityX=4
    alien.depth=ground.depth+1
    alien.scale=0.04
    alien.lifetime=105
    alienGroup.add(alien)
   // alien.debug=true       
  }
}

function mouseClicked(){
  if (gamestate===PLAY){
    lasersound.play()
    ammo=ammo-1  
    for (var j = 0; j < alienGroup.length; j++) { 
      if (alienGroup.get(j).isTouching(crosshair)) { 
        score=score+1
        alienblast=createSprite(crosshair.x,crosshair.y,20,20)
        alienblast.addImage(alienblastimage)
        alienblast.scale=0.5
        alienGroup.get(j).destroy()
        alienblast.lifetime=10
        explosionsound.play()
      } 
    }
  }
  
  if (crosshair.isTouching(coinGroup)){
    ammo=ammo+4
    for (var k = 0; k < coinGroup.length; k++) { 
      if (coinGroup.get(k).isTouching(crosshair)) { 
        coinGroup.get(k).destroy()
      }
    }
  }
  if (gamestate===START){
    gamestate=PLAY
  }
}

function coin(){
 if (frameCount%200==0){
    var  coin=createSprite(0,200,20,20)
    coin.y=Math.round(random(10,390))
    coin.addImage(coinimage,coinimage)  
    coin.velocityX=6
    coin.depth=ground.depth+2
    coin.scale=0.04
    coin.lifetime=105
    coinGroup.add(coin)
    //coin.debug=true
 }
}

function reset(){
  ammo=30
  score=0
  gamestate=START
}