//Dog object
function Dog(name, energy, toy, location) {
  this.energy = energy;
  this.toy = toy;
  this.name = name;
  this.status = "awake";
  this.location = location;
}
Dog.prototype.subEnergy = function() {
  if (this.energy === 0) {
    this.energy = 0;
  } else {
    this.energy -= 1;
  }
}
Dog.prototype.nap = function() {
  this.energy += 1;
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

//Time function (game resets after 5 hours pass)
function addHour() {
  if (timer.hour === 21) {
    timer.hour = 16;
  } else {
    timer.hour += 1;
  }
  console.log(timer.hour);
}

//Dog park function
function dogPark(minutes) {
  var numOfDogs = 0
  // Math.floor(Math.random() * 6);
  var convertTime = (minutes * 60) * 1000;
  function subEnergyDog() {
    dog.subEnergy();
  }
  if (numOfDogs === 0) {
    setInterval(subEnergyDog, convertTime);
  } else if (numOfDogs >= 1) {
    setInterval(subEnergyDog, 1000);
  }
  return convertTime;
  return numOfDogs;
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
