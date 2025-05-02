let bgHome;
class Home
{
  constructor()
  {
    this.x=0;
    this.y=0;
  }

  show() 
  {
    fill('white');
    rect(this.x, this.y, 20, 370);
    image(bgHome, this.x, this.y, 66, 480);
  }
  
  update() 
  {

  }

  
}
