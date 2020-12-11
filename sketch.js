var ball;
var database;
var position;

function setup(){
    createCanvas(500,500);

    //create the database inside a variable called database using 'firebase.database()'
    database = firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //create a variable called ballPosition and make it refer to the 'position' entry in the database 'database.ref()'
    var ballPosition = database.ref('ball/position');

    //create a listener for the ballPosition using '.on("value",function1,function2)'
    ballPosition.on("value",readPosition,showError);

  
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    //write down/update/change the read values in the database
    database.ref('ball/position').set({
'x':position.x + x,
'y':position.y + y
    })
 
}

function readPosition(data){
    //store the listened values inside the position variable
    position = data.val();
    //the position variable contains the listened x and y values from the database

    ball.x = position.x;
    ball.y = position.y;

}

function showError(){
    console.log ("There is an error")
}