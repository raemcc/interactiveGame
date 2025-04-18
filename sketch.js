let character;
let home;
let nameInput;
let submitButton;
let showHighscoreInput = false;

class Game
{
  static shared = new Game();
  health = 100;
  score = 0;
  highscore;
  prompted = false;
  character = new Character();
  home = new Home();
  enemies=[];
  bullets=[];
  
  
}

function preload(){
  img = loadImage('media/character.png');
  img2 = loadImage('media/character2.png');
  enemy2 = loadImage('media/enemy2.png');
  pic3 = loadImage('media/enemy3.png');
  vis1 = loadImage('media/enemy1.png');
  myFont = loadFont('media/minecraft.ttf');
  bg = loadImage('media/sky.png');
  
}

function setup() {
  createCanvas(640, 480); //pixels
  screen = 4;
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
      
      case 5:
        showLeaderboard();
        break;

    }
}

function runGameDefense(){
  console.log("game");

  let scoresData = JSON.parse(localStorage.getItem("highscores")) || [];
  let scoresList = Object.values(scoresData);
  let scoresDataInt = scoresList.map(entry=> entry.score);
  // scoresData.map(s => int(s));
  Game.shared.highscore = Math.max(...scoresDataInt);
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
  text("highscore: " + Game.shared.highscore, 570, 460);
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
  console.log("menu");

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
  
  let playerScore = Game.shared.score;
  //get local list of highscores
  let highscoresList = JSON.parse(localStorage.getItem("highscores")) || [];
  //sort by descending
  let sortedHighscores = highscoresList.sort((a, b) => b.score - a.score);

  //get lowest score
  let lowestHighscore = sortedHighscores[sortedHighscores.length-1].score;
 

  textSize(35);
  strokeWeight(20);
  fill(255);
  textAlign(CENTER);

  text("GAME OVER", width/2, height/2);
  textSize(20);
  text("You scored: " + playerScore, width/2, (height/2)+30);
  text("Press Enter to Show Leaderboard", width/2, 425); 
  text("Press ESC to Exit to Menu", width/2, 450);
 
  // console.log("scores on board: " + sortedHighscores.length);
  

  if (
    !Game.shared.prompted
  ) {
      if(sortedHighscores.length<10 || playerScore<lowestHighscore){
        Game.shared.prompted = true; // prevents multiple prompts
        console.log("lowest score: " + lowestHighscore);
        console.log("scores length: " + sortedHighscores.length);
    
    
        if (!nameInput) {
          nameInput = createInput();
          nameInput.position(width / 2 - 120, height / 2 + 60);
          nameInput.size(200);
        }
    
        if (!submitButton) {
          submitButton = createButton("Submit");
          submitButton.position(nameInput.x + 210, nameInput.y);
          submitButton.mousePressed(() => {
          let playerName = nameInput.value().trim();
    
          if (playerName) {
            sortedHighscores.push({ name: playerName, score: playerScore });
            sortedHighscores.sort((a, b) => b.score - a.score);
            let trimmedHighscores = sortedHighscores.slice(0, 10);
            
        
            localStorage.setItem("highscores", JSON.stringify(trimmedHighscores));
            nameInput.remove();
            submitButton.remove();
            
            Game.shared.scoreSaved = true;
            text("New Highscore Saved", width / 2, height / 2 + 100);
            }
          });
        }
      } else {
        console.log("you didnt make it" );
      }
  } 
    // textSize(20);
    // text("You didnt make the leaderboard", width / 2, height / 2 + 45);
  
  
}

function showLeaderboard(){
  console.log("leaderboard");
  // Retrieve the high scores
  let highscoresList = JSON.parse(localStorage.getItem("highscores")) || [];
  // Sort by descending score
  let sortedHighscores = highscoresList.sort((a, b) => b.score - a.score);

  // Create a background for the leaderboard
  background(0, 0, 0, 150); // Semi-transparent background for the leaderboard

  
  // Title text
  textSize(35);
  fill(255);
  textAlign(CENTER);
  text("Leaderboard", width / 2, 50);
  textSize(20);
  text("Press Backspace to Try Again", width/2, 425); 
  text("Press ESC to Exit to Menu", width/2, 455);
  // Display the top 10 scores
  textSize(25);
  for (let i = 0; i < sortedHighscores.length && i < 10; i++) {
    let rank = i + 1;
    let scoreEntry = sortedHighscores[i];
    text(rank + ".  " + scoreEntry.name + " - " + scoreEntry.score, width / 2, 100 + (i * 40));
  }
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

if (screen == 4  && keyCode === 13){

    nameInput.remove();
    submitButton.remove();
    showHighscoreInput = false;
    console.log("leaderboard?");
    screen = 5;
    
}
if (screen == 4  && keyCode === 27){

  nameInput.remove();
  submitButton.remove();
  showHighscoreInput = false;
  console.log("leaderboard?");
  screen = 0;
  
}


if (keyCode === 13 && (screen == 0 || screen == 3)){
  console.log("rungame");
    screen = 1;
  }


  if (keyCode === 8 && screen == 5){
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