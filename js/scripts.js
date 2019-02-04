//Dog object
function Dog(name, energy, toy) {
  this.energy = energy;
  this.toy = toy;
  this.name = name;
}
Dog.prototype.subEnergy = function() {
  this.energy -= 1;
}
Dog.prototype.nap = function() {
  this.energy += 1;
}

//Human Object
function Human(name, money, energy, inventory) {
  this.name = name;
  this.money = money;
  this.energy = energy;
  this.inventory = inventory;
}

Human.prototype.subEnergy = function() {
  this.energy -= 1;
}

dog = new Dog("Fido", 100);
human = new Human("Bob", 100, 100, []);
