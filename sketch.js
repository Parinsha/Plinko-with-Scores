//creating Engine, World, Events, Bodies
const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
//creating plinkos array, divisions array
var plinkos = [];
var divisions = [];
//creating division height, particle, count, score, game state
var divisionHeight= 300;
var particle;
var count = 0;
var score = 0;
var gameState = "start";

function setup() 
{
  //creating Canvas
  createCanvas(800, 800);
  //creating engine, world
  engine = Engine.create();
  world = engine.world;
  //creating ground
  ground = new Ground(width/2,height,width,20);
  //creating divisions
  for (var k = 0; k <=width; k = k + 80) 
  {
    divisions.push(new Divisions(k, height - divisionHeight/2, 10, divisionHeight));
  }
  //creating first row of plinkos
  for (var j = 75; j <= width; j = j + 50) 
  {
    plinkos.push(new Plinko(j,75));
  }
  //creating second row of plinkos
  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  }
  //creating third row of plinkos
  for (var j = 75; j <=width; j=j+50) 
  {
    plinkos.push(new Plinko(j,275));
  }
  //creating fourth row of plinkos
  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,375));
  }  
  //running engine
  Engine.run(engine);
}

function draw() 
{
  //giving a color for background
  background("black");
  //assigning text size, displaying score
  textSize(35)
  text("Score : " + score, 20, 30);
  //displaying 500 points for divisions
  text("500", 12, 550);
  text("500", 90, 550);
  text("500", 170, 550);
  text("500", 250, 550);
  //displaying 100 points for divisions
  text("100", 330, 550);
  text("100", 410, 550);
  text("100", 490, 550);
  //displaying 200 points for divisions
  text("200", 570, 550);
  text("200", 650, 550);
  text("200", 730, 550);
  //updating engine
  Engine.update(engine);
  //displaying ground
  ground.display();
  //displaying divisions
  for (var k = 0; k < divisions.length; k++) 
  {
    divisions[k].display();
  }
  //displaying plinkos
  for (var i = 0; i < plinkos.length; i++) 
  {
    plinkos[i].display();
  }
  //adding points
  if(particle != null)
  {
    particle.display();
    if(particle.body.position.y > 760)
    {
      if(particle.body.position.x < 300)
      {
        score = score + 500;
        particle = null;
        if(count >= 5) gameState = "end";
      }
      else if(particle.body.position.x < 600 && particle.body.position.x > 301)
      {
        score = score + 100;
        particle = null;
        if(count >= 5) gameState = "end";
      }
      else if(particle.body.position.x < 900 && particle.body.position.x > 601)
      {
        score = score + 200;
        particle = null;
        if(count >= 5) gameState = "end";
      }
    }
    console.log(score);
  }
  if(gameState == "end")
  { 
    textSize(100);
    text("Game Over", 150, 250);
  }
}
//creating function mouse pressed
function mousePressed()
{
  if(gameState !== "end")
  {
    count++;
    console.log(count);
    particle = new Particle(mouseX, 10, 10);
  }
}