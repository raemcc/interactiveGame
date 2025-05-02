let increase = 0;
let img;
let img2;

class Character
{
  constructor()
  {
    
    this.y = 240;
    this.x = 100;
    this.size = 50;
    this.state = 0;
    this.speed = 0;
    this.gravity = 0.5;
    this.velocity = 0;
    this.lift = -8;
  }


  show() {
    fill(255);

    if(this.state == 0){
      image(img, this.x-25, this.y-25, this.size, this.size);
      
    } else{
      image(img2, this.x-25, this.y-25, this.size, this.size);
    }
  }
  
  
  up()
  {
    this.velocity ++;
  }

  down()
  {
    this.velocity --;
  }

  right()
  {
    this.speed ++;
  }

  left()
  {
    this.speed --;
  }

  update() 
  {
    this.y = this.y - this.velocity
    this.x = this.x + this.speed
    
    // // hits the bottom of the screem

    if (this.y > height-16) {
      this.y  = height-16;
      this.velocity = this.velocity *-0.2;
    }

    // hits the top of the screen
    if (this.y < 16) {
      this.y = 16;
      this.velocity = this.velocity *-0.2;
    }

    // hits the enemy area of the screen
    if (this.x > 450) {
      this.x = 450;
      this.speed = this.speed *-0.2;
    }

    // hits the left of the screen
    if(Game.shared.mode = 1)
    {
      if(this.x < 82)
      {
        this.x = 82;
        this.speed = this.speed *-0.2;
      }
    } 
    else if (this.x <16) 
    {
      this.x = 16;
      this.speed = this.speed *-0.2;
    }
    

    if(this.velocity > 10) {
      this.velocity = 10;
    }
    if(this.velocity <-10){
      this.velocity = -10;
    }

    if(this.speed > 10) {
      this.speed = 10;
    }
    if(this.speed <-10) {
      this.speed = -10;
    }

  }

  
}
