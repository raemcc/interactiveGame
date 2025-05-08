let character;
let home;
let nameInput;
let submitButton;


class Game
{
  static shared = new Game();

  score = 0;

  highscore;

  prompted = false;
  soundPlayed;

  character = new Character();
  home = new Home();
  enemies=[];
  bullets=[];
  characterBullets=[];

  mode;
  highscoresList;
  sortedHighscores;
  lowestHighscore;

  customFrameCount;

  constructor() {
    let score = this.character.score;

    //get local list of highscores from browsers localStorage, if there are none, highscores list is an empty array
    // converts from json string into javascript array
    this.highscoresList = JSON.parse(localStorage.getItem("highscores")) || [];
    //sort by descending
    this.sortedHighscores = [...this.highscoresList].sort((a, b) => b.score - a.score);
    //get lowest score if there are more than 0 scores, else lowest score = 0
    this.lowestHighscore = this.sortedHighscores.length > 0
      ? this.sortedHighscores[this.sortedHighscores.length - 1].score
      : 0;
  }
  
}

function preload(){
  img = loadImage('media/character.png');
  img2 = loadImage('media/character2.png');

  enemy2 = loadImage('media/enemy2.png');
  pic3 = loadImage('media/enemy3.png');
  vis1 = loadImage('media/enemy1.png');

  imgHome1 = loadImage('media/home1.png');
  imgHome2 = loadImage('media/home2.png');
  imgHome3 = loadImage('media/home3.png');

  myFont = loadFont('media/minecraft.ttf');

  bg = loadImage('media/sky.png');
  bgBlueSky = loadImage('media/blueSky.png');

  hitHomeSound = loadSound('media/hitHome.mp3');
  hitEnemySound = loadSound('media/hitEnemy.mp3');
  loseSound = loadSound('media/lose.mp3');
  winSound = loadSound('media/gameWin.mp3');
  menuClickSound = loadSound('media/menu_click.mp3');
  
}

function setup() {
  createCanvas(640, 480); //pixels
  reset();
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
        controls();
        break;

      case 2:   
        runGameDefense();
      break;

      case 3:
        pauseGameDefence();
        break;

      case 4:
        gameOver();
        break;
      
      case 5:
        showLeaderboard();
        break;

      case 6:
        runGameAttack();
        break;

      case 7:
        pauseGameAttack();
        break;

      case 8:
        gameOverAttack();
        break;

      case 9:
        trainingMode();
        break;
      
      case 10:
        pauseGametraining();
        break;

      case 11:
        gameWinAttack();
        break;
    }
}

function menu(){

  fill(255);
  textAlign(CENTER);
  textSize(30);
  strokeWeight(20);
  text("MENU", width/2, 100); 
  textSize(25);
  text("Select mode: ", width/2, 150);
  textSize(15);

  text("A good place", width-100, (height/2)+10);
  text("To Start :)", width-100, (height/2)+30);
  text("<-----", width-200,(height/2)+20);

  text("The original", 100, height-(height/3)-20);
  text("gamemode!", 100, height-(height/3));
  text("----->", 200, height-(height/3)-10);

  text("Careful!", width-100, height-(height/5)-30);
  text("Pretty tricky !!!", width-100, height-(height/5)-5);
  text("<-----", width-200, height-(height/5)-20);

  let buttonWidth = 133;
  let pos = (width/2) - (buttonWidth/2);
 
  if(!Game.shared.prompted){
    controlsButton = createButton("How to Play");
    controlsButton.class('my-button');
    controlsButton.position(pos, 200);

    trainingButton = createButton("Training Mode");
    trainingButton.class('my-button');
    trainingButton.position((width/2)- (buttonWidth/2),250);

    defenceButton = createButton("Defence Mode");
    defenceButton.class('my-button');
    defenceButton.position(pos, 300);

    attackButton = createButton("Attack Mode");
    attackButton.class('my-button');
    attackButton.position((width/2)- (buttonWidth/2),350);

    leaderboardButton = createButton("Leaderboard");
    leaderboardButton.class('my-button');
    leaderboardButton.position((width/2)- (buttonWidth/2),400);

    controlsButton.mousePressed(() => {
      menuClickSound.play();
      reset();
      screen = 1;
      defenceButton.remove();
      attackButton.remove();
      leaderboardButton.remove();
      trainingButton.remove();
      controlsButton.remove();
    });

    defenceButton.mousePressed(() => {
      menuClickSound.play();
      reset();
      screen = 2;
      defenceButton.remove();
      attackButton.remove();
      leaderboardButton.remove();
      trainingButton.remove();
      controlsButton.remove();
    });

    attackButton.mousePressed(() => {
      menuClickSound.play();
      reset();
      screen = 6;
      defenceButton.remove();
      attackButton.remove();
      leaderboardButton.remove();
      trainingButton.remove();
      controlsButton.remove();
    });

    trainingButton.mousePressed(() => {
      menuClickSound.play();
      reset();
      screen = 9;
      defenceButton.remove();
      attackButton.remove();
      leaderboardButton.remove();
      trainingButton.remove();
      controlsButton.remove();
    });
    
    leaderboardButton.mousePressed(() => {
      menuClickSound.play();
      reset();
      screen = 5;
      defenceButton.remove();
      attackButton.remove();
      leaderboardButton.remove();
      trainingButton.remove();
      controlsButton.remove();
    });

    Game.shared.prompted = true;
  }
  
}

function reset(){

  Game.shared.score = 0;

  Game.shared.bullets = [];
  Game.shared.characterBullets = [];
  Game.shared.enemies = [];

  Game.shared.prompted = false;
  Game.shared.soundPlayed = 1;

  Game.shared.home = new Home();
  Game.shared.character = new Character();
  
  Game.shared.customFrameCount = 0;

  textAlign(CENTER,BASELINE);
  console.log("reset complete");
}

// ---


function controls(){
  textAlign(CENTER, BASELINE);
  textSize(45);
  noStroke();
  text("x", 35, 45);

  textSize(30);
  
  text("HOW TO PLAY", width/2, 50); 
  textSize(20);
  textAlign(LEFT);
  text("Tap 'W' to move upwards",120, 103);
  text("Tap 'A' to move left",120, 183);
  text("Tap 'S' to move downwards",120, 263);
  text("Tap 'D' to move right",120, 343);
  text("Press 'SPACE' to shoot!",280, 423);
  
  textAlign(CENTER,CENTER);
  fill(100)
  strokeWeight(3);
  
  rect(50,80,50,50);
  rect(50,160,50,50);
  rect(50,240,50,50);
  rect(50,320,50,50);
  rect(50,400,200,50);
  
  fill(255);
  textSize(25);
  text("W",77, 103);
  text("A",77, 183);
  text("S",77, 263);
  text("D",77, 343);
  text("SPACE",150, 423);
}


// ---


function runGameDefense(){
  background(bgBlueSky);
  Game.shared.mode = 1;
  Game.shared.prompted = false;
  Game.shared.customFrameCount++;

  let scoresData = JSON.parse(localStorage.getItem("highscores")) || [];

  // ensures scoresData is stored as array
  let scoresList = Object.values(scoresData);

  // extract just scores from objects
  let scoresDataInt = scoresList.map(entry=> entry.score);
  
  // get max score from list of integers, unless empty then set to 0
  Game.shared.highscore = scoresDataInt.length > 0 ? Math.max(...scoresDataInt) : 0;

  
  // shows "home" the area which takes damage from enemies
  Game.shared.home.show();

  noStroke();
  fill(0);

  // lines to make pause button
  rect(110,16,6,28);
  rect(125,16,6,28);
  
  // text to make 'x' escape button
  textAlign(CENTER, BASELINE);
  textSize(45);
  noStroke();
  text("x", 90, 45);


  // displays current score and current health
  textSize(15);
  text("score: " + Game.shared.score, 180, 460);
  text("highscore: " + Game.shared.highscore, 560, 460);
  textFont('Helvetica'); 
  text("❤️", 120, 458);
  
  
  textFont(myFont);
  text(Game.shared.home.health, 90, 460);
  
  // shows the character, makes sure character doesnt escape screen
  Game.shared.character.show();
  Game.shared.character.update();

  if(Game.shared.customFrameCount<400)
  {
    fill(0);
    textSize(20);
    text("press spacebar to shoot.", width/2+30, height/2+30);
    text("kill the enemies before they reach your base.", width/2+30, height/2+60);
  } 
  else  if (Game.shared.customFrameCount % 100 == 0) 
  {
    // adds new enemies into array
    Game.shared.enemies.push(new Enemy());
  }

  
  // ensures enemies array does not become too long once enemies are off screen
  if(Game.shared.enemies.length>15){
    Game.shared.enemies.shift();
  }
  
  
 
  //for loop iterates over each enemy and runs show() and update() functions, then checks collisons
    for (//sets i to last index in array
      let i = Game.shared.enemies.length - 1; 
      i >= 0; i--){

      let enemy = Game.shared.enemies[i];
      enemy.show();
      enemy.update();

      const collided = enemy.detectCollision('Home'); 

      if (collided) {
        Game.shared.enemies.splice(i, 1); // remove if it hit home
      }
    }

  //for loop iterates over each bullet and 
  // runs show() and update() functions and checks for collisions
    for (var i = 0; i < Game.shared.characterBullets.length; i ++){
      let bullet = Game.shared.characterBullets[i];
      Game.shared.characterBullets[i].show();
      Game.shared.characterBullets[i].update();
  
      // if a collision is detected between bullet and an object,
      // removes that bullet from the array
     
      if(bullet.detectCollision()){
        Game.shared.characterBullets.splice(i,1);
      }
    }
    
}

function pauseGameDefence(){
  background(bgBlueSky);
  fill(0);
  textAlign(CENTER);

  textSize(30);
  text("GAME DEFENCE PAUSED", width/2, height/2); 

  textSize(17);
  text("Current Score: " + Game.shared.score, width/2, (height/2)+30); 
  textSize(15);

  text("Press Enter to Resume", width/2, (height/2)+60);
}

function gameOver(){
  let playerScore = Game.shared.score;
  let sortedHighscores = Game.shared.sortedHighscores;
  let lowestHighscore = Game.shared.lowestHighscore;
 
  if(sortedHighscores.length<10 || playerScore>lowestHighscore){
    newHighScore();
  } else {
    regularScore();
  }
}

function newHighScore(){
  let playerScore = Game.shared.score;
  background(bgBlueSky);
  
  fill(0);
  textAlign(CENTER);
  
  textSize(35);
  text("You made the leaderboard!", width / 2, 100);
  
  textSize(25);
  text("You scored: " + playerScore, width / 2, 165);
  text("Please enter your name:", width / 2, height / 2 + 25);

  text("Press Submit to Show Leaderboard", width/2, 410);
  text("Press Esc to Exit to Menu", width/2, 450);
    
  if (!Game.shared.prompted) {
    winSound.play();
    nameInput = createInput();
    nameInput.position(width / 2 - 170, height / 2 + 60);
    nameInput.size(200,25);
    nameInput.attribute('maxlength', '8');
  
    submitButton = createButton("submit");
    submitButton.class('my-button');
    submitButton.position(nameInput.x + 210, nameInput.y);
    
    submitButton.mousePressed(() => {
      submitScore();
      menuClickSound.play();
    }
    );
        
    Game.shared.prompted = true;
  }
}

function submitScore(){
  let playerScore = Game.shared.score;

  console.log("Submit triggered");

  let playerName = nameInput.value().trim();

  if (playerName === "") {

    nameInput.remove();
    nameInput = createInput('---');
    nameInput.position(width / 2 - 170, height / 2 + 60);
    nameInput.size(200);
    return;
    } 

    // Add the score and player name to the highscores
    Game.shared.sortedHighscores.push({ name: playerName, score: playerScore });
    Game.shared.sortedHighscores.sort((a, b) => b.score - a.score);
    let trimmedHighscores = Game.shared.sortedHighscores.slice(0, 10);
    
    //save updated highscores to local storage
    localStorage.setItem("highscores", JSON.stringify(trimmedHighscores));
    //clear input and submit buttons
    nameInput.remove();
    submitButton.remove();

    
    console.log("score submitted");
    screen = 5;
}

function regularScore(){
  let buttonWidth = 133;
  
  background(bgBlueSky);
  let playerScore = Game.shared.score;

  textSize(25);
  fill(0);
  textAlign(CENTER);


  if(Game.shared.soundPlayed === 1){
    loseSound.play();
    Game.shared.soundPlayed = 0;
  }
  
  
  text("You didn't make the leaderboard :(", width/2, 165);
  text("You scored: " + playerScore, width / 2, height/2);
  text("Press Backspace to Try Again", width/2, 320);
  
  text("Press Enter to Show Leaderboard", width/2, 410);
  text("Press Esc to Exit to Menu", width/2, 450);

}

function showLeaderboard(){
  // Retrieve the high scores
  let highscoresList = JSON.parse(localStorage.getItem("highscores")) || [];
  // Sort by descending score
  let sortedHighscores = highscoresList.sort((a, b) => b.score - a.score);

  // Create a background for the leaderboard
  background(0, 0, 0, 150); // Semi-transparent background for the leaderboard

  textAlign(CENTER, BASELINE);
  textSize(45);
  noStroke();
  text("x", 35, 45);
  
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


// ---


function runGameAttack(){
  Game.shared.customFrameCount++;
  Game.shared.mode = 2;
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


  textSize(15);
  text("score: " + Game.shared.score, 125, 460);
 //scoreAttack
  textFont('Helvetica'); 
  text("❤️", 65, 458);
  
  textFont(myFont);
  text(Game.shared.character.health, 35, 460);

  Game.shared.character.show();
  Game.shared.character.update();

  if(Game.shared.enemies.length>15){
    Game.shared.enemies.shift();
  }
  
  if(Game.shared.customFrameCount<400)
  {
    fill(0);
    textSize(20);
    text("press spacebar to shoot.", width/2+30, height/2+30);
    text("kill 20 enemies to win", width/2+30, height/2+60);
  } 
  else  if (Game.shared.customFrameCount % 100 == 0) 
  {
    // adds new enemies into array
    Game.shared.enemies.push(new Enemy());
  }
  //for loop iterates over each enemy and runs show() and update() functions, then checks collisons

    for (//sets i to last index in array
      let i = Game.shared.enemies.length - 1; 
      i >= 0; i--){

      let enemy = Game.shared.enemies[i];
      enemy.show();
      enemy.update();
      enemy.shoot();      
      
      const collided = enemy.detectCollision('Character'); // check once

      if (collided) {
        Game.shared.enemies.splice(i, 1); // remove if it hit character
      }
    }

  //for loop iterates over each bullet and 
  // runs show() and update() functions and checks for collisions
  for (var i = 0; i < Game.shared.bullets.length; i ++){
    let bullet = Game.shared.bullets[i];
    Game.shared.bullets[i].show();
    Game.shared.bullets[i].update();

    // if a collision is detected between bullet and an object,
    // removes that bullet from the array
    
    if(bullet.detectCollision()){
      
      Game.shared.bullets.splice(i,1);
    }
  }
  for (var i = 0; i < Game.shared.characterBullets.length; i ++){
    let charBullet = Game.shared.characterBullets[i];
    charBullet.show();
    charBullet.update();

    // if a collision is detected between bullet and an object,
    // removes that bullet from the array
   
    if(charBullet.detectCollision()){
      Game.shared.characterBullets.splice(i,1);
    }
  }
}

function pauseGameAttack(){
  fill(255);
  textAlign(CENTER);
  textSize(30);
  strokeWeight(20);
  text("GAME ATTACK PAUSED", width/2, height/2); 
  textSize(15);
  text("Press Enter to Resume", width/2, (height/2)+30);
}

function gameOverAttack(){
  let playerScore = Game.shared.score;
  //scoreAttack

  if(Game.shared.soundPlayed === 1){
    loseSound.play();
    Game.shared.soundPlayed = 0;
  }

  fill(255);
  textAlign(CENTER);
  textSize(25);
  
  text("YOU LOSE </3", width / 2, 165);
  text("You scored: " + playerScore, width / 2, 320);
  text("Press Backspace to Try Again", width/2, 410);
  text("Press Esc to Exit to Menu", width/2, 450);
}

function gameWinAttack(){
  if(Game.shared.soundPlayed === 1){
    winSound.play();
    Game.shared.soundPlayed = 0;
  }
  fill(255);
  textAlign(CENTER);
  textSize(25);

  text("YOU WON !!!", width / 2, 165);
  text("You beat 20 enemies!", width/2, 200);
  text("Press Backspace to Try Again", width/2, 410);
  text("Press Esc to Exit to Menu", width/2, 450);
  
}


// ---


function trainingMode(){
  Game.shared.mode = 3;
  Game.shared.customFrameCount++;
  
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


  textSize(15);
  text("score: " + Game.shared.score, 55, 460);


  Game.shared.character.show();
  Game.shared.character.update();

  if(Game.shared.enemies.length>15){
    Game.shared.enemies.shift();
  }

  fill(0);
  textSize(20);
  if(Game.shared.customFrameCount<400)
  {
    text("press spacebar to shoot.", width/2, height/2);
    text("kill the enemies to earn points", width/2, height/2+30);
  } 
  else if(Game.shared.customFrameCount<800)
  {
    text("use W A S D keys to move", width/2, height/2);
    text("use space bar to shoot", width/2, height/2+30);
  } 
  else if (Game.shared.customFrameCount % 100 == 0) 
  {
    // adds new enemies into array
    Game.shared.enemies.push(new Enemy());
  }

  //for loop iterates over each enemy and runs show() and update() functions, then checks collisons
  for (//sets i to last index in array
    let i = Game.shared.enemies.length - 1; 
    i >= 0; i--){

    let enemy = Game.shared.enemies[i];
    enemy.show();
    enemy.update();
    
  }

  //for loop iterates over each bullet and 
  // runs show() and update() functions and checks for collisions
  for (var i = 0; i < Game.shared.characterBullets.length; i ++){
    let bullet = Game.shared.characterBullets[i];
    Game.shared.characterBullets[i].show();
    Game.shared.characterBullets[i].update();

    // if a collision is detected between bullet and an object,
    // removes that bullet from the array
   
    if(bullet.detectCollision()){
      Game.shared.characterBullets.splice(i,1);
    }
  }
}

function pauseGametraining(){
  fill(255);
  textAlign(CENTER);
  textSize(30);
  strokeWeight(20);
  text("training MODE PAUSED", width/2, height/2); 
  textSize(15);
  text("Press Enter to Resume", width/2, (height/2)+30);
}


// ---


function mousePressed() {

// Exit button area
  if ( mouseX > 10 && mouseX < 50 
    && mouseY > 10 && mouseY < 45 ) 
  {
    menuClickSound.play();
    reset();
    screen = 0;
  }
  
  if ( 
    Game.shared.mode === 1 
    && 
    mouseX > 70 && mouseX < 100 
    && mouseY > 10 && mouseY < 45 )
  {
    menuClickSound.play();
    reset();
    screen = 0;
  }

// Pause button area
  if ( Game.shared.mode === 1)
  {
    if ( mouseX > 105 && mouseX < 130
      && mouseY > 10 && mouseY <50 )
      {
        menuClickSound.play();
        screen = 3;
      }
  }
    
    if ( mouseX > 50 && mouseX < 74 
      && mouseY > 10 && mouseY < 50 ) 
    {

      if (screen === 6)
      {
        //attack
        menuClickSound.play();
        screen = 7;
      }

      if (screen === 9)
      {
        //training
        menuClickSound.play();
        screen = 10;
      }
    }
}

function keyPressed(){
//movement controls
  switch (keyCode) {
    case 87: // W key
      Game.shared.character.up();
      Game.shared.character.state = 0;
      break;
    case 83: // S key
      Game.shared.character.down();
      Game.shared.character.state = 0;
      break;
    case 68: // D key
      Game.shared.character.right();
      Game.shared.character.state = 0;
      break;
    case 65: // A key
      Game.shared.character.left();
      Game.shared.character.state = 0;
      break;
  }
//shooting controls for game
  if (keyCode === 32 && (screen === 2 || screen === 6 || screen  === 9 )){

    Game.shared.character.state = 1;

    Game.shared.characterBullets.push(new Bullet(Game.shared.character));

    if(Game.shared.characterBullets.length>8){
      Game.shared.characterBullets.shift();
    }
  }

  if (screen === 4 && keyCode === 13) {
    if (submitButton) {
      // if there is a submit button , press it
      menuClickSound.play();
      submitScore();
    } else {
      // no submit button continue to leaderboard
      menuClickSound.play();
      screen = 5;
    }
  }

  if (screen === 4  && keyCode === 27){
  // press escape to return to menu
    if (submitButton) {
      //clear input and button if they exist
      nameInput.remove();
      submitButton.remove();   
    }
    menuClickSound.play();
    reset();
    screen = 0;
    return;
  }

  if (screen === 4  && keyCode === 8){
    let playerScore = Game.shared.score;
    let sortedHighscores = Game.shared.sortedHighscores;
    let lowestHighscore = Game.shared.lowestHighscore;
   
    if(sortedHighscores.length<10 || playerScore>lowestHighscore){

    } else {
      menuClickSound.play();
      reset();
      screen = 2;
    }
    // press escape to return to menu
      
    }

  if (keyCode === 13 && (screen === 3)){
    ////continue the game when entered is pressed on attack pause
      screen = 2;
    }

  if (keyCode === 13 && screen === 7 ){
    //continue the game when entered is pressed on attack pause
      screen = 6;
    }

  if (keyCode === 13 && screen === 10 ){
    //continue the game when entered is pressed on attack pause
      screen = 9;
    }


  if (keyCode === 8 && screen === 5){
    //when backspace key is pressed on leaderboard game is restarted
    reset();
    screen = 2;
  }

  if (keyCode === 8 && (screen === 8 || screen === 11)){
    //when backspace key is pressed on game over/win attack, game is restarted
    reset();
    screen = 6;
  }
  if (keyCode === 27){
    menuClickSound.play();
    reset();
    screen = 0;
  }
  
}