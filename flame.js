class Flame {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 40;
    this.h = 40;
    this.ydir = 5;
  }
  down(){
    this.y += this.ydir;
  }
  show(){
    fill(255, 5, 5);
    noStroke();
    circle(this.x, this.y, this.w, this.h);
  }
  end(x, y){
    if((this.x +((this.w-5)/2)) - (x - ((this.w-5)/2)) >= 0 && (this.x +((this.w-5)/2)) - (x - ((this.w-5)/2)) <= 40 && (this.y -((this.w-5)/2)) -(y+((this.w-5)/2)) <= 0 && (this.y -((this.w-5)/2)) -(y +((this.w-5)/2)) >= -40){
      return true
    }
    if((this.x +((this.w-5)/2)) - (x - ((this.w-5)/2)) >= 0 && (this.x +((this.w-5)/2)) - (x - ((this.w-5)/2)) <= 40 && (this.y +((this.w-5)/2)) -(y-((this.w-5)/2)) >= 0 && (this.y-((this.w-5)/2)) - (y -((this.w-5)/2)) <= 40){
      return true
    }
    if((x +((this.w-5)/2)) - (this.x - ((this.w-5)/2)) >= 0 && (x +((this.w-5)/2)) - (this.x - ((this.w-5)/2)) <= 40 && (y -((this.w-5)/2)) -(this.y+((this.w-5)/2)) <= 0 && (y -((this.w-5)/2)) -(this.y +((this.w-5)/2)) >= -40){
      return true
    }
    if((x +((this.w-5)/2)) - (this.x - ((this.w-5)/2)) >= 0 && (x +((this.w-5)/2)) - (this.x - ((this.w-5)/2)) <= 40 && (y +((this.w-5)/2)) -(this.y-((this.w-5)/2)) >= 0 && (y-((this.w-5)/2)) - (this.y -((this.w-5)/2)) <= 40){
      return true
    }
  }
}
