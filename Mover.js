class Mover
{
  constructor(x, y, radius, red, green, blue)
  {
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.mass = 1;
    this.radius = radius; //scales the objects according to their mass
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.origin = createVector(x, y);

  }

  drag(dragCoefficient) //dragCoefficient accounts for drag, density, surface area, and 1/2 coefficients
    {
      let drag = this.vel.copy();
      drag.normalize();
      drag.mult(-1);
      let speedSq = drag.magSq();
      drag.setMag(dragCoefficient*speedSq);
      this.applyForce(drag);

    }

  applyForce(force)
  {
    let f = p5.Vector.div(force, this.mass); // A = F/M calculates acceleration according to mass
    this.acc.add(f);//adds new acceleration to old acceleration
  }

  edges()
  {
    if (this.pos.y >= height - this.radius)
    {
      this.pos.y = height - this.radius;
      this.vel.y *= -1;
    }
    if (this.pos.y <= 0 + this.radius)
    {
      this.pos.y = 0 + this.radius;
      this.vel.y *= -1;
    }
    if (this.pos.x >= width - this.radius)
    {
      this.pos.x = width - this.radius;
      this.vel.x *= -1;
    }
    if (this.pos.x <= 0 + this.radius)
    {
      this.pos.x = 0 + this.radius;
      this.vel.x *= -1;
    }
  }


  showVelocity()
  {
    let direction = p5.Vector.add(this.pos, this.vel);//velocity vector pointing from circle of the ball
    let scale = p5.Vector.mult(this.vel, 5); //scale the direction vector
    direction.add(scale); //add the scale to the direction
    let base = this.pos.copy();
    stroke(255,0,255);
    line(base.x, base.y, direction.x, direction.y);

    let arrowSize = 10;

    let bottomRight = p5.Vector.mult(this.vel, .1);
    bottomRight.x = -1 * this.vel.y;
    bottomRight.y = this.vel.x;
    bottomRight.setMag(arrowSize/2);
    bottomRight.add(direction);
    let point1x = bottomRight.x;
    let point1y = bottomRight.y;

    let bottomLeft = p5.Vector.mult(this.vel, .1);
    bottomLeft.x = this.vel.y;
    bottomLeft.y = -1 * this.vel.x;
    bottomLeft.setMag(arrowSize/2);
    bottomLeft.add(direction);
    let point2x = bottomLeft.x;
    let point2y = bottomLeft.y;

    let tip = p5.Vector.mult(this.vel, .5);
    tip.add(direction);
    let point3x = tip.x;
    let point3y = tip.y;

    triangle(point1x, point1y, point2x, point2y, point3x, point3y);
  }

  update()
  {
    this.vel.add(this.acc);//adds acceleration to velocity to get new velocity
    this.pos.add(this.vel);//adds velocity to position to get new position
    this.acc.set(0,0); //resets acceleration

  }

  disperse()
  {
    this.vel = p5.Vector.random2D();
    this.vel.setMag(10);

  }

  floatAimlessly()
  {
    if(this.vel.mag() < 1)
    {
      this.vel.setMag(1);
    }

  }

  attract(origin)
  {
    let force = p5.Vector.sub(origin, this.pos);

    //this is to stop objects from shooting off when they get too close and from not being attracted when too far
    let distanceSq = constrain(force.magSq(), 100, 1000);


    let G = 5000;
    let strength = (G * (this.mass * 1000)) / distanceSq;
    force.setMag(strength);
    this.applyForce(force);
  }

  returnToOrigin()
  {
    this.vel = p5.Vector.sub(this.origin, this.pos);
    this.vel.setMag(7);
  }

  atOrigin()
  {
    home = true;
    let displacement = this.origin.dist(this.pos);
    if(displacement < 5)
    {
      this.vel.setMag(0);
      this.pos.x = this.origin.x;
      this.pos.y = this.origin.y;
    }
  }

  show()
  {
    push();
    fill(this.red,this.green, this.blue);
    ellipse(this.pos.x, this.pos.y, this.radius * 2, this.radius * 2);
    pop();

  }
}
