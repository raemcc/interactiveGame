
class Bullet
{
  constructor()
  {
    this.y = Game.shared.character.y+10;
    this.x = Game.shared.character.x;
    
    

  }

  detectCollision()
  {
    // console.log(Game.shared.enemies.length);
    for(var i = 0; i<Game.shared.enemies.length; i++){
      let enemy = Game.shared.enemies[i];
      
      //check x axis
      if(this.x+10> enemy.x && this.x < enemy.x + enemy.size){
        //if true, check y axis

        if(this.y+3 >= enemy.y && this.y <= enemy.y + enemy.size){
          //if true its a hit
          if(Game.shared.enemies[i].health <=1){
            Game.shared.enemies.splice(i,1);
            Game.shared.score +=1;
           
          }else{
            Game.shared.enemies[i].health -=1;
            Game.shared.enemies[i].size -=20;
          }
          return true;
        }
      }

    }
    
  }

  show() 
  {
    fill('white');
    rect(this.x, this.y, 10, 3);
  }
  

  update() 
  {
    this.x +=3;
  }
}
