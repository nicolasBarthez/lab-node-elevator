const Elevator = require("./elevator.js");
const Person = require("./person.js");

const lift = new Elevator();
const julia = new Person("Julia", 2, 6);

const goStop = () => {
  setTimeout(() => lift.stop(), 20000);
};

lift.start();
lift.call(julia);
goStop();
