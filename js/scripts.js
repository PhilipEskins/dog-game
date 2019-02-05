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
}

dog = new Dog("Fido", 100, " ", "home");
human = new Human("Bob", 100, 100, [], "home");
timer = new Timer(16);

var subIntervalHuman = setInterval(subEnergyHuman, 6000);
// var checkNap = setInterval(checkEnergy, 3000);
var time = setInterval(addHour, 30000);

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
  } else if (dog.energy <= 50) {
      console.log("Your dog is too tired");
  } else if (numOfDogs === 0) {
      dog.subEnergy(20, 1);
  } else {
    dog.subEnergy(20, numOfDogs);
  }
  return numOfDogs;
}

function walkDog(blocks) {
  if (blocks === 5) {
    if (dog.energy <= 60) {
      console.log("Your dog is too tired");
    } else {
      dog.subEnergy(10, blocks);
    }
  }
  if (blocks === 4) {
    if (dog.energy <= 50) {
      console.log("Your dog is too tired");
    } else {
      dog.subEnergy(10, blocks);
    }
  }
  if (blocks === 3) {
    if (dog.energy <= 40) {
      console.log("Your dog is too tired");
    } else {
      dog.subEnergy(10, blocks);
    }
  }
  if (blocks === 2) {
    if (dog.energy <= 30) {
      console.log("Your dog is too tired");
    } else {
      dog.subEnergy(10, blocks);
    }
  }
  if (blocks === 1) {
    if (dog.energy <= 20) {
      console.log("Your dog is too tired");
    } else {
      dog.subEnergy(10, blocks);
    }
  }
}

//UI Logic
$(document).ready(function() {

  $("form#formOne").submit(function(event){
    event.preventDefault();
    console.log();
    var ownerInput = $("input#ownerName").val();
    var ownerChar = $("input:radio[name=owner]:checked").val();
    var dogInput = $("input#dogName").val();
    var dogChar = $("input:radio[name=pup]:checked").val();
    console.log(ownerInput);
    console.log(ownerChar);
    console.log(dogInput);
    console.log(dogChar);
    // $("#results").text(ownerInput);
    // $("#results").text(dogInput);
  });
})
