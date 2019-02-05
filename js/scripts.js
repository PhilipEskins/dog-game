

//Dog object
function Dog(name, energy, toy) {
  this.energy = energy;
  this.toy = toy;
  this.name = name;
}
Dog.prototype.subEnergy = function() {
  if (this.energy === 0) {
    this.energy = 0;
  } else {
    this.energy -= 1;
  }
}
Dog.prototype.nap = function() {
  if (this.energy >= 100) {
    this.energy = 100;
  } else {
    this.energy += 5;
  }
}

//Human Object
function Human(name, money, energy, inventory) {
  this.name = name;
  this.money = money;
  this.energy = energy;
  this.inventory = inventory;
}

Human.prototype.subEnergy = function() {
  if (this.energy === 0) {
    this.energy = 0;
  } else {
    this.energy -= 1;
  }
}

dog = new Dog("Fido", 10);
human = new Human("Bob", 100, 10, []);

var hour = 7;

var subIntervalHuman = setInterval(subEnergyHuman, 1000);
var subIntervalDog = setInterval(subEnergyDog, 1000);
var checkNap = setInterval(isNapTime, 1000);

function isNapTime() {
  if (dog.energy === 0) {
    clearInterval(subIntervalDog);
    dog.nap();
  }
  if (dog.energy <= 100) {
    dog.nap();
  }
}

function subEnergyDog() {
  dog.subEnergy();
}

function subEnergyHuman() {
  human.subEnergy();
}

function addHour() {
  hour += 1;
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
