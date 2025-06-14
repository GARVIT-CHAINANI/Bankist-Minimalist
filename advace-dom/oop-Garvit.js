"use strict";

// ////constructor function oop
// const Person = function (name, bYear) {
//   this.name = name;
//   this.bYear = bYear;
// };

// const garvit = new Person("Garvit", 2007);

// const matilda = new Person("Matilda", 2004);

// Person.prototype.calcAge = function () {
//   console.log(new Date().getFullYear() - this.bYear);
// };

// garvit.calcAge();
// matilda.calcAge();

// ////////////////////////

// const Car = function (Make, speed) {
//   this.Make = Make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(this.speed + "km/h");
// };

// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(this.speed + "km/h");
// };

// const bmw = new Car("bmw", 120);
// const mercedes = new Car("mercedes", 95);

// bmw.accelerate();
// bmw.accelerate();
// bmw.brake();
// bmw.accelerate();

// mercedes.accelerate();
// mercedes.brake();

//////////////classes/////////////

class Users {
  constructor(name, birthYear) {
    this.name = name;
    this.birthYear = birthYear;
  }

  get age() {
    return new Date().getFullYear() - this.birthYear;
  }

  set birthYear(bYear) {
    if (bYear < 2005) {
      this._birthYear = bYear;
    }
  }

  get birthYear() {
    return this._birthYear;
  }

  greet() {
    console.log(`Hey ${this.name}`);
  }
}

const user1 = new Users("Garvit", 2007);

console.log(user1);

const user2 = new Users("xx", 2004);
console.log(user2);

console.log(user1.age, user2.age);

console.log(user1);

user1.greet();
