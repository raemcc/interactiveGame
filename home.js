let imgHome;
class Home
{
  constructor()
  {
    this.x= 0;
    this.y = 0;
    this.health = 100;
  }

  show() 
  {
    fill('white');
    if(Game.shared.home.health <30)
    {
      image(imgHome, this.x, this.y, 66, 480);
    } 
    else if (Game.shared.home.health <60)
    {
      image(imgHome, this.x, this.y, 66, 480);
    }
    else
    {
      image(imgHome, this.x, this.y, 66, 480);
    }
    
  }
  
  update() 
  {

  }

  
}
