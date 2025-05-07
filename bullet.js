
let hitEnemySound;


class Bullet
{

  constructor(shooter)
  {
    this.y = shooter.y + shooter.size/5;
    this.x = shooter.x;
    this.shooter = shooter;
    
  }

  detectCollision()
  {
    let char = Game.shared.character;
    
    for(var i = 0; i<Game.shared.enemies.length; i++)
    {
      let enemy = Game.shared.enemies[i];

      if(this.shooter != char)
      //shot by enemy
      {
        //check if enemies bullet hits character:
        //first check y
        let charTop = char.y - (char.size/2);
        let charBottom = char.y + (char.size/2);

        if (
          this.y+3 > charTop && 
          this.y < charBottom
        ) {
            //then  check x
            let charLeft = char.x-(char.size/2);
            let charRight = char.x+ (char.size/2);

            if(
              this.x +10 > charLeft && 
              this.x < charRight

            ) {
                //bullet has hit the player
                console.log("bullet has hit player");
                hitHomeSound.play();
                Game.shared.character.health -= 10;
                  if (Game.shared.character.health <= 0) 
                  {
                    screen = 8;
                  }

                return true;
              }
          }
        
      }
      else
      //bullet was shot by player, check if its a hit:
      {
        //check x axis
        if  (
          this.x+10 > enemy.x && 
          this.x < enemy.x + enemy.size
          ) {
            //if true, check y axis
              if (
                this.y+3 >= enemy.y && 
                this.y <= enemy.y + enemy.size
              ) {
                  //if true its a hit
                  //deal with enemies that have been hit & update score
                  if(Game.shared.enemies[i].health <=1)
                    {
                      //enemy is killed and removed from array
                      Game.shared.enemies.splice(i,1);
                      hitEnemySound.play();
                      // score is updated by 1 based on game mode 
                      switch (Game.shared.mode) 
                      {
                        case 1:
                        //defence mode
                          Game.shared.score +=1;
                        break;

                        case 2:
                        //attack mode
                          Game.shared.score +=1;
                          if(Game.shared.score>4)
                          {
                          screen=11;
                          }
                        break;

                        case 3:
                        //training mode
                        Game.shared.score +=1;
                        break;
                      }
                    } 
                    else
                    {
                      //enemies health and size are reduced
                      Game.shared.enemies[i].health -=1;
                      Game.shared.enemies[i].size -=20;
                    }
                  //collision has been detected so return true
                  return true;
                }
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
    let character = Game.shared.character;
    
    if(this.shooter != character)
      //shot by enemy
      {
        //bullets movce slightly faster than fastest enemy
        this.x -=4;
      } 
      else 
      {
        this.x +=3;
        
      }  
  }
}
