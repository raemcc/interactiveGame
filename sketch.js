let character;
let home;
let nameInput;
let submitButton;


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
      
      case 5:
        showLeaderboard();
        break;

    }
}

function runGameDefense(){
  Game.shared.prompted = false;
  let scoresData = JSON.parse(localStorage.getItem("highscores")) || [];

  // ensures scoresData is stored as array
  let scoresList = Object.values(scoresData);

  // extract just scores from objects
  let scoresDataInt = scoresList.map(entry=> entry.score);
  
  // get max score from list of integers, unless empty then set to 0
  Game.shared.highscore = scoresDataInt.length > 0 ? Math.max(...scoresDataInt) : 0;


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

  // shows "home" the area which takes damage from enemies
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
    // runs show() and update() functions
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
  // let lowestHighscore = sortedHighscores[sortedHighscores.length-1].score;

  let lowestHighscore = sortedHighscores.length > 0 ? sortedHighscores[sortedHighscores.length - 1].score : 0;
 
  if(sortedHighscores.length<10 || playerScore>lowestHighscore){
    newHighScore();
  } else {
    regularScore();
  }
}

function newHighScore(){
  let playerScore = Game.shared.score;

  //get local list of highscores
  let highscoresList = JSON.parse(localStorage.getItem("highscores")) || [];

  //sort by descending
  let sortedHighscores = highscoresList.sort((a, b) => b.score - a.score);

  //get lowest score
  let lowestHighscore = sortedHighscores.length > 0 ? sortedHighscores[sortedHighscores.length - 1].score : 0;

  fill(255);
  textAlign(CENTER);
  
  textSize(35);
  text("You made the leaderboard!", width / 2, 100);
  
  textSize(25);
  text("You scored: " + playerScore, width / 2, 165);
  text("Please enter your name:", width / 2, height / 2 + 25);

  text("Press Submit to Show Leaderboard", width/2, 410);
  text("Press Esc to Exit to Menu", width/2, 450);
    
  if (!Game.shared.prompted) {
   
    nameInput = createInput();
    nameInput.position(width / 2 - 120, height / 2 + 50);
    nameInput.size(200);
    nameInput.attribute('maxlength', '8');
  
    submitButton = createButton("submit");
    submitButton.class('my-button');
    submitButton.position(nameInput.x + 210, nameInput.y);
    
    submitButton.mousePressed(submitScore);
        
    Game.shared.prompted = true;
  }
}

function submitScore(){

  console.log("Submit triggered");

  let playerName = nameInput.value().trim();

  if (playerName === "") {

    nameInput.remove();
    nameInput = createInput('---');
    nameInput.position(width / 2 - 120, height / 2 + 50);
    nameInput.size(200);
    return;
    } 

    sortedHighscores.push({ name: playerName, score: playerScore });
    sortedHighscores.sort((a, b) => b.score - a.score);
    let trimmedHighscores = sortedHighscores.slice(0, 10);
    

    localStorage.setItem("highscores", JSON.stringify(trimmedHighscores));
    nameInput.remove();
    submitButton.remove();

    
    console.log("score submitted");
    screen = 5;
}

function regularScore(){
  let playerScore = Game.shared.score;
  //get local list of highscores
  let highscoresList = JSON.parse(localStorage.getItem("highscores")) || [];
  //sort by descending
  let sortedHighscores = highscoresList.sort((a, b) => b.score - a.score);

  //get lowest score
  let lowestHighscore = sortedHighscores.length > 0 ? sortedHighscores[sortedHighscores.length - 1].score : 0;

  // else {
  //   console.log("lowest score: " + lowestHighscore);
  //   console.log("scores length: " + sortedHighscores.length);

  //   textSize(20);
  //   text("you didnt make it", width / 2, height / 2 + 60);
  //   console.log("you didnt make it" );
  //   text("Press Enter to Show Leaderboard", width/2, 425); 
  // }

  textSize(35);
  fill(255);
  textAlign(CENTER);

  text("you didnt make it", width/2, height/2);
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
  textSize(25);
  fill(255);
  textAlign(CENTER);
  text("Leaderboard", width / 2, 50);
  textSize(20);
  text("Press Backspace to Try Again", width/2, 425); 
  text("Press ESC to Exit to Menu", width/2, 455);


  // Display the top 10 scores
  textAlign(LEFT);
  textSize(18);
  for (let i = 0; i < sortedHighscores.length && i < 10; i++) {
    let rank = i + 1;
    let scoreEntry = sortedHighscores[i];
    textAlign(LEFT);
    text(rank + ". " , 210, 100 + (i * 30));
    text(scoreEntry.name, 250, 100 + (i * 30));
    textAlign(RIGHT);
    text(scoreEntry.score, 430, 100 + (i * 30));
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

  if (screen === 4 && keyCode === 13) {
    console.log("ENTER key pressed");
    if (submitButton) {
      submitScore();
    } else {
      console.log("submitButton not defined yet");
    }
  }



if (screen === 4  && keyCode === 27){
// press escape to return to menu
  nameInput.remove();
  submitButton.remove();

  screen = 0;
  
}


if (keyCode === 13 && (screen === 0 || screen === 3)){
  
    screen = 1;
  }


  if (keyCode === 8 && screen === 5){
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