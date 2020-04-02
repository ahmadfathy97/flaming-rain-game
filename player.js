class Player {
  constructor(x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.xdir = 0;
    this.ydir = 0;
  }
  move(){
    this.x += this.xdir;
    this.y += this.ydir;
  }
  show(){
    fill(20, 20, 230);
    circle(this.x, this.y, this.w);
  }
  setMove(x,y){
    this.xdir += x;
    this.ydir += y;
  }
  killed(canW, canH){
    if(this.x <= 0 || this.x >= canW || this.y <= 0 || this.y >= canH){
      return true;
    }
  }
}
