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
  this.energy += 5;
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
  this.rope = {name: "Rope", cost: 5, extra: 2};
  this.ball = {name: "Ball", cost: 10, extra: 3};
  this.plush = {name: "Squeak Toy", cost: 15, extra: 4};
}

dog = new Dog("Fido", 100, " ", "home");
human = new Human("Bob", 100, 100, [], "home");
timer = new Timer(16);

var subIntervalHuman;
var checkNap;
var time;
var end;

function gameTime(gameStatus) {
  if (gameStatus === "active") {
    subIntervalHuman = setInterval(subEnergyHuman, 6000);
    checkNap = setInterval(checkEnergy, 3000);
    time = setInterval(addHour, 30000);
    end = setInterval(checkEnd, 30000);
    console.log(end);
  }

  if (gameStatus === "ended") {
    clearInterval(subIntervalHuman);
    clearInterval(checkNap);
    clearInterval(time);
    clearInterval(end);
    console.log(gameStatus);
    console.log(end);
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
  if (timer.hour >= 19) {
    console.log("Its too late");
  } else if (dog.energy <= 50 || dog.status === "sleeping") {
      console.log("Your dog is too tired");
  } else if (numOfDogs === 0) {
      dog.subEnergy(20, 1);
  } else {
    dog.subEnergy(20, numOfDogs);
  }
  return numOfDogs;
}

//Walk the dog function
function walkDog(blocks) {
  if (dog.status === "awake") {
    if(timer.hour >=20) {
      console.log("Its too late");
    }
    else if (blocks === 5) {
      if (dog.energy <= 60) {
        console.log("Your dog is too tired");
      } else {
        dog.subEnergy(10, blocks);
      }
    }
    else if (blocks === 4) {
      if (dog.energy <= 50) {
        console.log("Your dog is too tired");
      } else {
        dog.subEnergy(10, blocks);
      }
    }
    else if (blocks === 3) {
      if (dog.energy <= 40) {
        console.log("Your dog is too tired");
      } else {
        dog.subEnergy(10, blocks);
      }
    }
    else if (blocks === 2) {
      if (dog.energy <= 30) {
        console.log("Your dog is too tired");
      } else {
        dog.subEnergy(10, blocks);
      }
    }
    else if (blocks === 1) {
      if (dog.energy <= 20) {
        console.log("Your dog is too tired");
      } else {
        dog.subEnergy(10, blocks);
      }
    }
  }
  else {
    console.log("Your dog is napping");
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
      dog.subEnergy(5, 1);
    } else {
      dog.subEnergy(5, extra);
    }
  }
  else {
    console.log("Your dog is napping");
  }
  console.log(extra);
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
    console.log("You can't afford that");
  }
}

//End of game
function checkEnd() {
  if(timer.hour === 21) {
    if(dog.energy <= 10) {
      console.log("You and your dog got a good nights rest");
      human.money += 200;
    } else if(dog.energy > 10 && dog.energy < 50) {
      console.log("Your dog was restless causing your sleep to be a little interrupted.");
      human.money += 150;
    } else if (dog.energy > 50 && dog.energy < 90) {
      console.log("Your dog was very restless causing your sleep to be mostly interrupted.");
      human.money += 50;
    } else if (dog.energy >= 90) {
      console.log("Your dog was still active, you had to stay up all night so you needed to call in sick for work.");
      human.money += 0;
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
    $("#humanName").text(ownerInput);
    $("#doggieName").text(dogInput);
    gameTime(timer.status);

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



    console.log(ownerInput);
    console.log(ownerChar);
    console.log(dogInput);
    console.log(dogChar);
    // $("#results").text(ownerInput);
    // $("#results").text(dogInput);
  });


  $("#dogWalk").click(function(event){
    var blocks = $("#blocks").val();
    dogWalk(blocks);
  })

  $("#walkDog").click(function(event){
    var blocks = parseInt($("#blocks option:selected").text());
      walkDog(blocks);
      console.log(dog.energy);
    });
  $("#dogPark").click(function(event){
    dogPark();
    console.log(dog.energy);
    });
  $("#playDog").click(function(event){
    playDog();
    console.log(dog.status);
  });
  $("#pupEnergyLevel").click(function(event){

  })
});
