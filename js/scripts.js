//Dog object
function Dog(name, energy, toy) {
  this.energy = energy;
  this.toy = toy;
  this.name = name;
}
Dog.prototype.subEnergy = function() {
  this.energy -= 1;
  if (this.energy === 0) {
    return 0;
  }
}
Dog.prototype.nap = function() {
  if (this.energy === 0) {
    this.energy = 0;
  } else {
    this.energy += 1;
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

var subInterval = setInterval(subEnergy, 1000);

function subEnergy() {
  human.subEnergy();
}

function addHour() {
  hour += 1;
}
