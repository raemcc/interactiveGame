let vis1;
let enemy2;
let pic3;
let enemySize;
let impact;
class Enemy
{
  constructor()
  {
    
    this.x = 590;
    this.y = random(10,400);
    this.type = round(random(0,2))
    
    
    

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


  detectCollision()
  {
    for(var i = 0; i<Game.shared.enemies.length; i++){
      let enemy = Game.shared.enemies[i];
      if(enemy.x<20){
        //hits home
        if(Game.shared.health<1){
          screen = 4;
        } else {
          enemySize=enemy.size
          if(enemySize>=80){
            impact = 30;
          } else if(enemySize>=60){
            impact = 20;
          } else{
            impact = 10;
          }
          
          console.log(impact);
          Game.shared.health -= impact/2;
        }
        return true;
      }

    }
  }

  //   // character is 32 wide and high, x+16 and x-16
  //   // enemy is this.size wide snd high
  //     if(character.x+16<this.x ||
  //       character.x-16>this.x+this.size)
  //       //safe
  //     {
  //       this.hit = false;
  //       return false;
  //     }else if(character.y +16 <this.y || 
  //       character.y +16 > this.y+this.size)
  //       //safe
  //     {
  //       this.hit = false;
  //       return false;
  //     }else 
  //     {this.hit = true;
  //       console.log("hit");
  //       return true;
  //     }
  //   }

  show() 
  {
    // if (this.type == 0){
    //   image(enemy1, this.x, this.y, this.size, this.size);
      

    // } else if(this.type == 1){
    //   image(enemy2, this.x, this.y, this.size, this.size);
      

    // }else {
      
    //   image(enemy3, this.x, this.y, this.size, this.size);
    // }
if(this.type==0){
  image(enemy2, this.x, this.y, this.size, this.size);

}else if(this.type == 1){
  image(pic3, this.x, this.y, this.size, this.size);
}else{
  fill('green');
  image(vis1, this.x, this.y, this.size, this.size);

}

  }
 

  update()
  {
  this.x -=this.speed;
  
  }
}