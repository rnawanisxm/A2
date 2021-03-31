let nums = [];
let list = [];
let iter = 3;
//let n = [3, 5, 9, 25, 3, 5, 9, 25];
let n = [3];
let correct = 1;
let count = 0;
let mins = [];
let m = 0;
let txt = "";
let type = 1;
let intro = "In this experiment, \nyou have to try your best to \nfind and click on the smallest number or bubble. \nEverytime you finish a trail, \nyou need to click on the blank screen again \nto start the next one.\nThe result of this experiment will be collected \nas a table shown in the end";
let outro = "Please copy the results from the console \nto the google document";
let start = 0;


function setup() {
  createCanvas(400, 400);

}

function mousePressed() {
  var s = n[count];
  start = 1;

  if (correct == 1) {
    timeNow = millis()

  }

  if (iter > 0 & correct == 1) {
    var j = 1;
    var ystart = 75;
    var initials = 0;

    if (s == 3 || s == 5) {
      initials = 75
    } else {

      initials = 40

    }

    for (let i = 0; i < s; i++) {
      var temp = int(random(0, 100));

      if (j == 8) {
        j = 1;
        ystart += ystart;

      }
      var x = initials * j;

      var y = ystart;
      var r = int(random(5, 40));
      let t = new Numbers(x, y, r, temp)

      if (type == 1) {
        mins.push(temp);
      } else {
        mins.push(r);
      }

      nums.push(t)
      m = min(mins);
      correct = 0;
      j += 1
    }
    iter -= 1
  }


  for (let i = 0; i < nums.length; i++) {
    nums[i].clicked(mouseX, mouseY);
  }


}





function draw() {

  background(220);

  //This is the case
  if (start == 0) {
    textAlign(CENTER, CENTER);
    textSize(16);

    text(intro, width / 2, height / 2);
  }


  for (let i = 0; i < nums.length; i++) {
    nums[i].show();
  }

  if (correct == 3) {
    textAlign(CENTER, CENTER);
    textSize(16);
    text(outro, width / 2, height / 2);

  }



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
    if (type == 1) {
      if (d < this.r && this.value == m) {
        var results = mins
        nums = []
        mins = []
        correct = 1
        results += " " + this.value + " " + int(millis() - timeNow)
        print(results)
        if (iter == 0) {
          iter = 3;
          count += 1;

          if (count == 4) {
            type = 2;
          }

        }
      }
    } else {
      if (d < this.r && this.r == m) {
        var results1 = mins
        nums = []
        mins = []
        correct = 1
        results1 += " " + this.value + " " + int(millis() - timeNow)
        print(results1)
        if (iter == 0) {
          iter = 3;
          count += 1;

          if (count == 8) {
            correct = 3;
          }
        }
      }

    }







  }

  show() {
    var siz = 35

    if (count == 3) {
      siz = 20;
    } else if (count == 2) {
      siz = 30
    }
    if (type == 1) {
      textSize(siz);
      var txt = this.value
      text(txt, this.x, this.y);
    } else if (type == 2) {
      stroke(255);
      strokeWeight(4);
      textSize(siz);

      fill(125);
      ellipse(this.x, this.y, this.r * 2);
    }

  }



}