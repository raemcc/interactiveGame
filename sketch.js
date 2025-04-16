let character;
let home;
let highscore = 0;

class Game
{
  static shared = new Game();
  health = 100;
  score = 0;
  

  character = new Character();
  home = new Home();
  enemies=[];
  bullets=[];
  
  
}

function preload(){
  img = loadImage('character.png');
  img2 = loadImage('character2.png');
  enemy2 = loadImage('enemy2.png');
  pic3 = loadImage('enemy3.png');
  vis1 = loadImage('enemy1.png');
  myFont = loadFont('minecraft.ttf');
  bg = loadImage('sky.png')
}

function setup() {
  createCanvas(640, 480); //pixels
  screen = 0;
  textFont(myFont);
}

function draw(){
  background(bg);
  switch(screen) {
      case 0:
        menu();
        break;

      case 1:
        runGameDefense();
        break;

      case 3:
        pause();
        break;

        case 4:
        gameOver();
        break;

    }
}

function runGameDefense(){
  
  noStroke();
  fill(255);

  // lines to make pause button
  rect(55,16,6,28);
  rect(70,16,6,28);
  
  // text to make 'x' escape button
  textAlign(CENTER);
  textSize(45);
  noStroke();
  text("x", 35, 45);

  if(mouseIsPressed==true){
    //checks if mouse is pressed over exit button
    if(mouseX<50 && mouseX>10 && mouseY<45 && mouseY>10){
      Game.shared.score = 0;
      screen=0;
    }
    //checks if mouse is pressed over pause button
    if(mouseX<74 && mouseX>50
      && mouseY<50 && mouseY>10){
      screen=3; 
      }
  }

  // displays current score and current health
  textSize(15);
  text("score: " + Game.shared.score, 120, 460);
  text("highscore: " + highscore, 570, 460);
  textFont('Helvetica'); 
  text("❤️", 65, 458);
  
  
  textFont(myFont);
  text(Game.shared.health, 35, 460);
  
  // shows the character, makes sure character doesnt escape screen
  Game.shared.character.show();
  Game.shared.character.update();

  Game.shared.home.show();
  
  
  // ensures enemies array does not become too long once enemies are off screen
  if(Game.shared.enemies.length>15){
    Game.shared.enemies.shift();
  }
  // adds new enemies into array
    if (frameCount % 100 == 0) {
      Game.shared.enemies.push(new Enemy());
    }
    //for loop iterates over each enemy and runs show() and update() functions
    for (var i = 0; i < Game.shared.enemies.length; i ++){
    Game.shared.enemies[i].show();
    Game.shared.enemies[i].update();
    Game.shared.enemies[i].detectCollision();

    if(Game.shared.enemies[i].detectCollision()){
      Game.shared.enemies.splice(i,1);
      }
    // if(Game.shared.enemies[i].hits(Game.shared.character)){
    //   console.log("hit");
    //   if(health>0){
    //     health-=1;
    //   } else {
    //     screen = 0;
    //   }
    // }
    }
 
    //for loop iterates over each bullet and 
    // runs show() and update() functions, if
    for (var i = 0; i <Game.shared.bullets.length; i ++){
      Game.shared.bullets[i].show();
      Game.shared.bullets[i].update();

      // if a collision is detected between bullet and enemy,
      //removes that bullet from the array
      if(Game.shared.bullets[i].detectCollision()){
        Game.shared.bullets.splice(i,1);
        }
      }
}

function menu(){
  Game.shared.health = 100;
  Game.shared.score = 0;
  Game.shared.bullets = [];
  Game.shared.enemies = []; 
  
  fill(255);
  textAlign(CENTER);
  textSize(30);
  strokeWeight(20);
  text("MENU", width/2, height/2); 
  textSize(15);
  text("Press Enter to Start", width/2, (height/2)+30);

}
function pause(){
  fill(255);
  textAlign(CENTER);
  textSize(30);
  strokeWeight(20);
  text("GAME PAUSED", width/2, height/2); 
  textSize(15);
  text("Press Enter to Resume", width/2, (height/2)+30);
}

function gameOver(){
  
//💔

  textSize(35);
  strokeWeight(20);
  fill(255);
  textAlign(CENTER);

  text("GAME OVER", width/2, height/2);
  textSize(20);
  
    text("You scored: " + Game.shared.score, width/2, (height/2)+30); 
    if( Game.shared.score >= highscore){
      //new highscore achieved
      highscore = Game.shared.score
      text("New Highscore!", width/2, (height/2)+60);
    } else {
      text("Highscore: " + highscore, width/2, (height/2)+60);
    }

    
  
  
  text("Press Enter to Try Again", width/2, 425); 
  text("Press ESC to Exit to Menu", width/2, 450);
}




function keyPressed(){
  if (keyCode === 87){
    Game.shared.character.up();
    Game.shared.character.state = 0;
  } 
  if (keyCode === 83){
    Game.shared.character.down();
    Game.shared.character.state = 0;
  }

  if (keyCode === 68){
    Game.shared.character.right();
    Game.shared.character.state = 0;
  }

  if (keyCode === 65){
    Game.shared.character.left();
    Game.shared.character.state = 0;
  }

  if (keyCode === 32 && screen == 1){
    Game.shared.character.state = 1;
    Game.shared.bullets.push(new Bullet());
    if(Game.shared.bullets.length>8){
      Game.shared.bullets.shift();
    }

  }

if (keyCode === 13 && (screen == 0 || screen == 3)){
    
    screen = 1;
  }

  if (keyCode === 13 && (screen == 4)){
    Game.shared.health = 100;
  Game.shared.score = 0;
  Game.shared.bullets = [];
  Game.shared.enemies = []; 
    screen = 1;
  }

  if (keyCode === 27){
    screen = 0;
  }
  
}