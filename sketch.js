//Global Variables
var canvas; 
var h1;
var h2;
var h4;
var button;
var slide = 0;
var result = "";
let n = [3,5,9,25];
//set this to 0 when we want to start the experiment
let count = 100;
let nums = [];
let iter = 3;
let mins = [];
let type = 1;
let correct = 0;
let start = 99;
let output = ""
let intro1 = "Number Experiment: Click outside of canvas to begin."

let intro2 = "Circle Experiment: Click outside of canvas to begin."
let timeNow;

let right = 0;
let wrong = 0;



//setup elements
function setup() {
  canvas = createCanvas(400, 400);
  canvas.position(0, 200);
  h1 = createElement('h1', "UVIC HCI Experiment")
  h2 = createElement('h2', "By: Rahul Nawani and Martin Zhao")
  h3 = createElement("h3", "To begin enter your name and press below")
  input = createInput();
  input.position(60,167);
  button = createButton("Begin")
  button.mousePressed(userInput);
  
  var randomS = int(random(0,2))
  console.log(randomS)
  if (randomS == 0){
    type = 1;
  }
  else{
    type = 2;
    }
 
}

function mousePressed()
{
  var s = n[count];

  if (start == 1){
    start = 0;
    correct = 1;
    h1.html("If you mess up in any way by clicking too fast inside the box feel free to retry the experiment.")
    h2.html("After each number/circle is chosen click outside of the canvas to go to the next trial.")
  }
  
  if (correct == 1) 
  {
    timeNow = millis()
    var j = 1;
    var ystart = 75;
    var initials = 0;

    if (s == 3 || s == 5) 
    {
      initials = 75
    } 
    else {
      initials = 40
    }

    for (let i = 0; i < s; i++) 
    {
      
      var temp = int(random(0, 100));

      if (j == 8) 
      {
        j = 1;
        ystart += 75;

      }
      var x = initials * j;

      var y = ystart;
      
      var r = 35;
      
      if (type == 2){
        r = int(random(5, 40));
        temp = r;
      }
      
      let t = new Numbers(x, y, r, temp)

      if (type == 1) 
      {
        mins.push(temp);
      } 
      else 
      {
        mins.push(r);
      }

      nums.push(t)
      m = min(mins);
      correct = 1;
      j += 1
    }
    
  }
  
  
  for (let i = 0; i < nums.length; i++) {
    nums[i].clicked(mouseX, mouseY);
  }
  
  
  
}


function draw() {
  background(220);
 
  
  for (let i = 0; i < nums.length; i++) {
    nums[i].show();
  }
  
  if (correct == 3){
    textAlign(CENTER, CENTER);
    textSize(16);
    text(intro1, width / 2, height / 2);
    start = 1;
  }
  
 
}

//takes the name of the user and stores it as the first line of result.
function userInput(){
  removeElements();
  name = input.value();
  h1 = createElement('h1', "Hello " + name + "!")
  h2 = createElement('h3', "In this experiment, you have to try your best to find and click on the smallest number or bubble.<br/>Please start after reading the instruction carefully:<br/><br/>1. Click on the blank screen to start.<br/>2. Click on the smallest number or bubble in the screen.<br/> 3.Everytime you finish a trial, you need to click on the blank screen again  to start the next one. <br/><br/>The result of this experiment will be collected as a table shown in the end. Press below to start the trial.")
  count = 0;
  correct = 3;
}



class Numbers {
  constructor(x, y, r, value) {
    this.x = x
    this.y = y
    this.r = r
    this.value = value
  }

  clicked(px, py) {
    let d = dist(px, py, this.x, this.y);
    correct = 0
    
    if (d< this.r){
      
      var str = mins + " " + m + " " + this.value + " " + int(millis() -timeNow)
      
      
      var error_rate = abs(m-this.value)/(max(mins)-m);
      error_rate = error_rate.toFixed(2)
      str+=" "+error_rate
      
      
      
      if(m == this.value){
        right+=1;
        str += " 1\n"
      }else{
        wrong+=1;
        str += " 0\n"
      }
      
      
      result +=  str
      nums = []
      mins = []
    
      if (iter == 0){
        count +=1;
        iter = 3;
      }
      if (count == 4){
        changeType();
      }
      iter -= 1
      correct = 1
    }
    

  }

  show() 
  {
    var siz = 35
    if (count == 3) 
    {
      siz = 20;
    } 
    
    else if (count == 2) 
    {
      siz = 30
    }
    if (type == 1) 
    {
      textSize(siz);
      var txt = this.value
      text(txt, this.x, this.y);
    } 
    else if (type == 2) 
    {
      stroke(255);
      strokeWeight(4);
      textSize(siz);

      fill(125);
      ellipse(this.x, this.y, this.r * 2);
    }

  }
}


function changeType(){
  
  if (type == 1){
    if (start == 0){
      type = 2;
      count = 0;
      start +=2;
    }
    else{
      printOut()
      
    }
    
    
    
  }
  else{
    if (start == 0){
      type = 1;
      count = 0;
      start +=2;
    }
    else{
      printOut()
      
    }
    
  }
  
}



function printOut(){
  h1.html("Thank you!")
  h2.html("For the next step please send the downloaded text file to use on Slack DM. After you have sent our data please copy the link below to fill out a short questionnaire about the experiment.")
  let survey = createA('https://docs.google.com/forms/d/e/1FAIpQLSe7YrB_6BWGLx1QamutJJXgjNmkAaXIsRqYdDvTd4NOjM40CQ/viewform','Please  complete the survey.');
  survey.position(0,300);
  
  const writer = createWriter('results.txt');
  
  let rate = right/(right+wrong);
  rate = rate.toFixed(2)
  var str = 'Participate\'s name: '+ name+'\tfinal correct rate: '+rate+'\n';
  str += result;
  writer.print(str);
  writer.close();
  writer.clear();
  clear()
  
}
