//Create variables here
var dog, happydog, database, foodS, foodStock,dogimage,milkbottle,fedTime,lastFed,foodObj;
function preload()
{
  //load images here
  dogimage = loadImage("images/Dog.png");
  happydog=loadImage("images/happydog.png");

}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  dog=createSprite(250,250,50,50);
  dog.addImage("dog",dogimage)
  dog.addImage("happydogu",happydog);
  dog.scale = 0.25;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
foodObj = new Food (250,350,50,50);
feed=createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87)
  drawSprites();
  //add styles here
  textSize(15);
fill("red");
stroke(4)
text("Note:Press UP_ARROW KEY TO FEED DRAGO MILK",75,75);
  foodObj.display();
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val()
  })
  
fill(255,255,254);
textSize(15);
if(lastFed>=12){
text("Last Feed : "+lastFed%12 + "PM",350,30);
}else if(lastFed==0){
  text("Last Feed : "+lastFed +" AM",350,30); 
}else{
  text("Last Feed : "+lastFed + "AM",350,30);
}

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}




function feedDog(){
  dog.addImage(happydog);


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
