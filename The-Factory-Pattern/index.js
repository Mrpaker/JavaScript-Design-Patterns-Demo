function Car(options) {
  this.doors = options.doors || 4;
 this.state = options.state || "brand new";
 this.color = options.color || 'black';
}

function Truck(options) {
  this.state = options.state || "used";
 this.wheelSize = options.wheelSize || "large";
 this.color = options.color || 'blue';
}

function VehicleFactory() {}

VehicleFactory.prototype.vehicleClass = Car;

VehicleFactory.prototype.createVehicle = function (options) {
 switch(options.vehicleType) {
   case "car":
     this.vehicleClass = Car;
     break;
   case "truck":
     this.vehicleClass = Truck;
     break;
 }

 return new this.vehicleClass(options);
}

var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
 vehicleType: "car",
 color: "yellow",
 doors: 6 
});

var movingTruck = carFactory.createVehicle({
 vehicleType: "truck",
 state: "like new",
 color: "red",
 wheelSize: "small" 
});

console.log(car instanceof Car);
console.log( movingTruck instanceof Truck );

console.log(car);
console.log(movingTruck);