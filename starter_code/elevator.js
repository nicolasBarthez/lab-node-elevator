const _ = require("lodash");

class Elevator {
  constructor() {
    this.floor = 0;
    this.MAXFLOOR = 10;
    this.requests = [];
    this.direction = "Up";
    this.waitingList = [];
    this.passengers = [];
  }

  start() {
    this.listener = setInterval(() => {
      this.update();
    }, 1000);
  }
  stop() {
    clearInterval(this.listener);
  }
  update() {
    this.log();
    return this.floor < this.requests[0] ? this.floorUp() : this.floorDown();
  }

  _passengersEnter(floor) {
    const pers = this.waitingList.find(obj => obj.originFloor === floor);
    if (pers) {
      this.passengers.push(pers);
      this.waitingList = _.without(this.waitingList, pers);
      this.requests.push(pers.destinationFloor);
      this.requests.shift();
      console.log(`${pers.name} has enter the elevator.`);
      console.log(this.requests);
    }
  }
  _passengersLeave(floor) {
    const pers = this.passengers.find(obj => obj.destinationFloor === floor);
    if (pers) {
      this.passengers = _.without(this.passengers, pers);
      this.requests.shift();
      console.log(`${pers.name} has left the elevator.`);
    }
  }

  floorUp() {
    this.direction = "Up";
    this._passengersLeave(this.floor);
    this._passengersEnter(this.floor);
    return this.floor < this.MAXFLOOR ? this.floor++ : this.floor;
  }
  floorDown() {
    this.direction = "Down";
    this._passengersLeave(this.floor);
    this._passengersEnter(this.floor);
    return this.floor > 0 ? this.floor-- : this.floor;
  }
  call(person) {
    this.requests.push(person.originFloor);
    this.waitingList.push(person);
  }
  log() {
    console.log(`Direction: ${this.direction} | Floor: ${this.floor}`);
  }
}

module.exports = Elevator;
