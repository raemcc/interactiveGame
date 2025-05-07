let vis1;
let enemy2;
let pic3;
let enemySize;
let impact;
let hitHomeSound;

class Enemy
{
  constructor()
  {
    
    this.x = 590;
    this.y = random(10,400);
    this.type = round(random(0,2));
    this.shootInterval = floor(random(50,100));
    
    if (this.type == 0){
      this.size = 40;
      this.speed = 3;
      this.health = 1;
      

    } else if(this.type == 1){
      this.size = 60;
      this.speed = 1.5;
      this.health =2;
      

    }else {
      this.size = 80;
      this.speed = 0.7;
      this.health =3;
      
    }
  }


//checks for enemy collisions with character and home

detectCollision(mode = 'Both')
{
  if(mode === 'Home' || mode === 'Both')
  {
    if(this.x<63){

      //if enemy past home
      let impact;
      if(this.size >=80) {
        impact = 60;
      } else if (this.size >= 60) {
        impact = 40;
      } else {
        impact = 20;
      }
      console.log("Enemy hit home!");
      hitHomeSound.play();
      
      Game.shared.home.health -= impact;
      Game.shared.home.health = max(Game.shared.home.health, 0); // Keep it above 0

      if (Game.shared.home.health <= 0) {
        screen = 4;
      }
  
    //collision was detected
    return true;
    }
  }
  if(mode === 'Character' || mode === 'Both')
  {
    const char = Game.shared.character;
    if (this.x < char.x + 32 && 
        this.x + this.size > char.x && 
        this.y < char.y + 32 && 
        this.y + this.size > char.y) 
      {
  
        let damage;
        if(this.size >=80) 
        {
          damage = 20;
        } 
        else if (this.size >= 60) 
        {
          damage = 15;
        } 
        else 
        {
          damage = 5;
        }
  
        console.log("Enemy hit character!");

        Game.shared.character.health -= damage;

        if (Game.shared.character.health <= 0) {
          screen = 8;
        }
        return true; // Collision detected
      } 
  }
}
shoot()
{
  if(
    frameCount %  this.shootInterval == 0
  ){
    Game.shared.bullets.push(new Bullet(this))
  }
}
show() 
{
  if(this.type==0){
    image(enemy2, this.x, this.y, this.size, this.size);
    
  }else if(this.type == 1){
    image(pic3, this.x, this.y, this.size, this.size);
  }else{
    image(vis1, this.x, this.y, this.size, this.size);
  }
}

update()
{
this.x -=this.speed;
}
}