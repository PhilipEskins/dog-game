//Dog object
function Dog(name, energy, toy, location) {
  this.energy = energy;
  this.toy = toy;
  this.name = name;
  this.status = "awake";
  this.location = location;
}
Dog.prototype.subEnergy = function(lump, multi) {
  if (lump >= 0) {
    this.energy -=lump*multi;
  }
  if (this.energy <= 0) {
    this.energy = 0;
  } else {
    this.energy -= 1;
  }
}
Dog.prototype.nap = function() {
  this.energy += 10;
}

//Human Object
function Human(name, money, energy, inventory, location) {
  this.name = name;
  this.money = money;
  this.energy = energy;
  this.inventory = inventory;
  this.location = location;
}

Human.prototype.subEnergy = function() {
  if (this.energy === 0) {
    this.energy = 0;
  } else {
    this.energy -= 1;
  }
}

//Timer object
function Timer(hour) {
  this.hour = hour;
  this.status = "active";
}

//Grocery store Object
function GroceryStore() {
  this.energy = {name: "Energy Bar", cost: 5, energy: 50};
}

//Pet Store Object
function PetStore() {
  this.rope = {name: "Rope", cost: 10, extra: 2};
  this.ball = {name: "Ball", cost: 15, extra: 3};
  this.plush = {name: "Squeak Toy", cost: 25, extra: 4};
}


//Global variables to start and stop the game
var subIntervalHuman;
var checkNap;
var time;
var end;

//function to start and stop the game
function gameTime(gameStatus) {
  if (gameStatus === "active") {
    subIntervalHuman = setInterval(subEnergyHuman, 6000);
    checkNap = setInterval(checkEnergy, 3000);
    time = setInterval(addHour, 30000);
    end = setInterval(checkEnd, 30000);
  }

  if (gameStatus === "ended") {
    clearInterval(subIntervalHuman);
    clearInterval(checkNap);
    clearInterval(time);
    clearInterval(end);
  }
}

//Check energy for Dog
function checkEnergy() {
  if (dog.status === "awake") {
    dog.subEnergy();
  }
  if (dog.status === "sleeping") {
    dog.nap();
  }
  if (dog.energy <= 0 && dog.location === "home"){
    dog.status = "sleeping";
  }
  if (dog.energy >= 100) {
    dog.status = "awake";
  }
}

//Human loses energy
function subEnergyHuman() {
  human.subEnergy();
}

//Time function (game resets after 5 hours have passed)
timer = new Timer(16);
function addHour() {
  if (timer.hour === 21) {
    timer.hour = 16;
  } else {
    timer.hour += 1;
  }
  console.log(timer.hour);
}

//Dog park function
function dogPark() {
  //Generates random number of dogs 0 to 5
  var numOfDogs = Math.floor(Math.random() * 6);
  var energyLoss = 0;
  if (timer.hour >= 19) {
    console.log("Its too late");
  } else if (dog.energy <= 50 || dog.status === "sleeping") {
      console.log("Your dog is too tired");
  } else if (numOfDogs === 0) {
      dog.subEnergy(10, 1);
      energyLoss = 10 *1;
  } else {
    dog.subEnergy(15, numOfDogs);
    energyLoss = 15 * numOfDogs;
  }
  var dogParkFun = [numOfDogs, energyLoss]
  return dogParkFun;
}

//Walk the dog function
function walkDog(blocks) {
  var mindRead;
  if (dog.status === "awake") {
    if(timer.hour >=20) {
      console.log("Its too late");
    }
    else if (blocks === 5) {
      if (dog.energy <= 60) {
        return mindRead = true;
      } else {
        dog.subEnergy(10, blocks);
      }
    }
    else if (blocks === 4) {
      if (dog.energy <= 50) {
        return mindRead = true;
      } else {
        dog.subEnergy(10, blocks);
      }
    }
    else if (blocks === 3) {
      if (dog.energy <= 40) {
        return mindRead = true;
      } else {
        dog.subEnergy(10, blocks);
      }
    }
    else if (blocks === 2) {
      if (dog.energy <= 30) {
        return mindRead = true;
      } else {
        dog.subEnergy(10, blocks);
      }
    }
    else if (blocks === 1) {
      if (dog.energy <= 20) {
        return mindRead = true;
      } else {
        dog.subEnergy(10, blocks);
      }
    }
  }
}

//Play with your dog
function playDog(human) {
  var ballCount = 0;
  var ropeCount = 0;
  var plushCount = 0;
  var extra = 0;
  for (var i = 0; i < human.inventory.length; i++) {
    if (human.inventory[i].name === "Squeak Toy") {
      plushCount++;
      extra += human.inventory[i].extra;
    }
    if (human.inventory[i].name === "Rope") {
      ropeCount++;
      extra += human.inventory[i].extra;
    }
    if (human.inventory[i].name === "Ball") {
      ballCount++;
      extra += human.inventory[i].extra;
    }
  }

  if (dog.status === "awake") {
    if (extra === 0) {
      dog.subEnergy(1, 1);
    } else {
      dog.subEnergy(1, extra);
    }
  }
  return extra;
}

//Pet Store function
function purchaseToy(human, item) {
  var petStore = new PetStore();
  var toy;
  if (item === "rope") {
    toy = petStore.rope;
  }
  if (item === "ball") {
    toy = petStore.ball;
  }
  if (item === "plush") {
    toy = petStore.plush;
  }

  if (human.money >= toy.cost) {
    human.inventory.push(toy);
    human.money -= toy.cost;
  } else {
    return false;
  }
}

//End of game
function checkEnd() {
  if(timer.hour === 21) {
    $("#gameOver").show();
    if(dog.energy <= 10) {
      $("#gameResult").text("You and your dog got a good nights rest. You earned $25.");
      human.money += 25;
    } else if(dog.energy > 10 && dog.energy <= 50) {
      $("#gameResult").text("Your dog was restless causing your sleep to be a little interrupted. You earned $15.");
      human.money += 15;
    } else if (dog.energy > 50 && dog.energy <= 90) {
      $("#gameResult").text("Your dog was very restless causing your sleep to be mostly interrupted. You earned $10.");
      human.money += 10;
    } else if (dog.energy >= 90) {
      $("#gameResult").text("Your dog was still active, you had to stay up all night so you needed to call in sick for work. You didn't earn anything today.");
      human.money += 0
    }
    timer.status = "ended";
    gameTime(timer.status);
  }
}

//UI Logic

$(document).ready(function() {
  $("form#formOne").submit(function(event){
    event.preventDefault();
    $("#startScreen").hide();
    $("#game").show();
    console.log();
    var ownerInput = $("input#ownerName").val();
    var ownerChar = $("input:radio[name=owner]:checked").val();
    var dogInput = $("input#dogName").val();
    var dogChar = $("input:radio[name=pup]:checked").val();
    //Create new objects
    dog = new Dog(dogInput, 100, " ", "home");
    human = new Human(ownerInput, 25, 100, [], "home");
    $("#humanName").text(human.name);
    //Puts your doggies name everywhere its referanced
    $(".doggieName").text(dog.name);
    //Stars the game
    gameTime(timer.status);

    //Attach pictures to human and dog
    if (ownerChar === "1") {
      $("#humanPic").append('<img src="img/woman1.png" alt="Human Female">');
    }else if (ownerChar === "2") {
      $("#humanPic").append('<img src="img/icon2.png"  alt="Female2">');
    }
    else if (ownerChar === "3") {
      $("#humanPic").append('<img src="img/icon3.png"  alt="Female3">');
    }
    if (dogChar === "1") {
      $("#dogPic").append('<img src="img/pup1.png" alt="nice pup">');
    }else if (dogChar === "2") {
      $("#dogPic").append('<img src="img/pup2.png"  alt="nice pup">');
    }
    else if (dogChar === "3") {
      $("#dogPic").append('<img src="img/pup3.png"  alt="nice pup">');
    }
    moveDog();
    moveHuman();

  });

  //This will hide a bunch of things after 10 seconds
  setInterval(hide, 10000)

  function hide() {
    $("#dogs").hide();
    $("#parkenergy").hide();
    $("#dogParkClosed").hide();
    $("#dogNapping").hide();
    $("#walkLate").hide();
    $("#walkEnergy").hide();
    $("#parkLowEnergy").hide();
    $("#afford").hide();
  }

  //Walk the dog button
  $("#walkDog").click(function(event){
    var blocks = parseInt($("#blocks option:selected").text());
    if (timer.hour >= 20) {
      $("#walkLate").show();
    } else if (dog.status === "sleeping"){
        $("#dogNapping").show();
    } else if (walkDog(blocks) === true) {
        $("#walkEnergy").show();
      }
  });

  //Dog park button
  $("#dogPark").click(function(event){
    if (timer.hour >= 19) {
      $("#dogParkClosed").show();
    }
     else if (dog.status === "sleeping") {
      $("#dogNapping").show();
    } else if (dog.energy <= 50) {
      $("#parkLowEnergy").show();
    } else {
      var dogParkResults = dogPark();
      $("#numberDogs").text(dogParkResults[0]);
      $("#energyResults").text(dogParkResults[1]);
      $("#dogs").show();
      $("#parkenergy").show();
    }
  });

  //Play with dog button
  $("#play").click(function(event){
    if (dog.status === "sleeping") {
      $("#dogNapping").show();
    } else {
      var getExtra = playDog(human);
      $("#showExtra").show();
      $("#extra").text(getExtra);
    }
  });

  //Restart button
  $("#restartDay").click(function(event){
     restartDay();
     $("#gameOver").hide();
  });

  //Restart the day, it starts again at 16:00
 function restartDay(){
   if(timer.hour === 21){
     $("#restartDay").show();
     timer.status = "active";
     human.energy = 50;
     dog.energy = 100;
     timer.hour = 16;
     gameTime(timer.status);
   }
 }

//progress bar dog energy level//
function moveDog() {
  var elem = document.getElementById("dogBar");
  var id = setInterval(frame, 10);
  function frame() {
    elem.style.width = dog.energy + '%';
    elem.innerHTML = dog.energy + '%';
  }
}

//progress bar Human Energy Level//
function moveHuman() {
  var elem = document.getElementById("humanBar");
  var id = setInterval(frame, 10);
  function frame() {
    elem.style.width = human.energy + '%';
    elem.innerHTML = human.energy + '%';
  }
}

 //Constantly updating dynamic values
  function continueRefreshing(){
    $("#timeRemaining").text(timer.hour + ":00");
    $("#remainingHumanEnergy").text(human.energy);
    $("#remainingDogEnergy").text(dog.energy);
    $("#yourDogsStatus").text(dog.status);
    $("#remainingMoney").text(human.money);
  }
  setInterval(continueRefreshing, 100);

  //Buy a rope
  $("#ropeClick").click(function(event){
    var ropeBuy = purchaseToy(human, "rope");
    if (ropeBuy === false) {
      $("#afford").show();
    } else {
    $("#ropeToy").hide();
    $("#ropeDog").show();
    }
  });
  //Buy a ball
  $("#ballClick").click(function(event){
    var ballBuy = purchaseToy(human, "ball");
    if (ballBuy === false) {
      $("#afford").show();
    } else {
      $("#ballToy").hide();
      $("#ballDog").show();
    }
  });
  //Buy a plush toy
  $("#squeakClick").click(function(event){
    var squeakBuy = purchaseToy(human, "plush")
    if (squeakBuy === false) {
      $("#afford").show();
    } else {
      $("#squeakToy").hide();
      $("#plushDog").show();
    }
  });
});
