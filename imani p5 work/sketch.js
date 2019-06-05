// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDh9jgR_77Skjcp9IqWGnIVzCUNw2YMwV4",
    authDomain: "p5-imani.firebaseapp.com",
    databaseURL: "https://p5-imani.firebaseio.com",
    projectId: "p5-imani",
    storageBucket: "p5-imani.appspot.com",
    messagingSenderId: "735168375772",
    appId: "1:735168375772:web:8ccda2d16d080823"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
let database = firebase.database()
let name2=document.getElementById("name")
let x
let y
let a
let b
let k
let j
let kel
let direction
let score 
let level
let time
let scoreboard = {}
function setup() {
  createCanvas(windowWidth, windowHeight);
  x=[800,500,200,400]
  y=[600,400,600,200]
  a=500
  b=600
  k=500
  j=600
  level=1
  time=4

  direction = [1,1,1,1]
  score=5
  kel = 4
}

function draw() {
  if (time > 0) {
   
    
  

  background(90,100,300);
  time=time-0.05
  fill(210,300,200)
  circle(a,b,44)
   fill(310,400,300)
  circle(k,j,54)
 
if (touches.length == 0)   {
  if (keyIsDown(LEFT_ARROW)) {
    a = a - 10
  }
  if (keyIsDown(RIGHT_ARROW)) {
    a = a + 10
  }
   if (keyIsDown(UP_ARROW)) {
    b = b - 10
  }
 if (keyIsDown(DOWN_ARROW)) {
    b = b + 10
  }
}
else { 
		a = touches[0].x
		 b = touches[0].y
}

  
  
    for (i=0; i<kel; i=i+1) {
      fill(210,100,200)
    circle(x[i],y[i],34)
    x[i]=x[i]+5*direction[i]
    if ( x[i] > width || x[i] < 0) {
      direction[i] = direction[i]*-1
  }
    if (dist( x[i], y[i], a, b) < 34 + 44) {
      score = score + 1
    }
    if (dist( x[i], y[i], k, j) < 34 + 44) {
      score = score -1
    }




      }

  
  
  
   if (keyIsDown(68)) {
    k = k + 10
   }
     if (keyIsDown(65)) {
    k = k - 10
   }
 
   if (keyIsDown(87)) {
    j = j - 10
   }
   
   if (keyIsDown(88)) {
    j = j + 10
   }
  
  textSize(30)
  
  text("score:" + score,450, 100)	
  text("time: " + time.toFixed(0) ,450, 150)

  if (dist( a, b, k, j) < 34 + 54) {
	score = score - 1
  }
  
  if (score > 50 && level == 1) {
kel = kel + 2
level = 2
    x.push.apply(x, [80, 100])
    y.push.apply(y, [190, 110])
    direction.push.apply(direction,[1,1])
}
    
  if (score > 100 && level == 2) {
kel = kel + 2
level = 3
    x.push.apply(x, [80, 100])
    y.push.apply(y, [190, 110])
    direction.push.apply(direction,[1,1])
}
    
  if (score > 150 && level == 3) {
kel = kel + 2
level = 4
    x.push.apply(x, [80, 100])
    y.push.apply(y, [190, 110])
    direction.push.apply(direction,[1,1])
}
  
  if (score > 200 && level == 4) {
kel = kel + 2
level = 5
    x.push.apply(x, [80, 100])
    y.push.apply(y, [190, 110])
    direction.push.apply(direction,[1,1])
}
    
  if (score > 250 && level == 5) {
kel = kel + 2
level = 6
    x.push.apply(x, [80, 100])
    y.push.apply(y, [190, 110])
    direction.push.apply(direction,[1,1])
}

  
  }
  else {
    name2.innerHTML = "Name? <input id='mani'><button onclick='restart()'>Restart</button>"
    noLoop()

  }


  
}
function restart() { 
        let mani = document.getElementById("mani")
		name = mani.value 
		database.ref(name).set(score)
		if (name != "") { 
			scoreboard[name] = score
		}
        alert("scoreboard: " +JSON.stringify(scoreboard,null,1)) 
		time = 4
		score = 5
		loop()
		name2.innerHTML = ""
        generate_leaderboard()
		
}

function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max(...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
 alert("Leaderboard: " + JSON.stringify(leaderboard,null,1))
  }
}
