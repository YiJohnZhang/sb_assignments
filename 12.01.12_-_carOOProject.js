
class Vehicle{
    constructor(vehicleMake, vehicleModel, vehicleYear){
        this.vehicleMake = vehicleMake;
        this.vehicleModel = vehicleModel;
        this.vehicleYear = vehicleYear;
    }

    honk(){
        return "Beep.";
    }
    
    toString(){
        return `The vehicle is a ${this.vehicleMake} ${this.vehicleModel} from ${this.vehicleYear}.`;
    }



}

//Part 1 Test Code
var myFirstVehicle = new Vehicle('Honda', 'Monster Truck', 1999);
console.log(myFirstVehicle.honk());
console.log(myFirstVehicle.toString());



class Car extends Vehicle{
    constructor(vehicleMake, vehicleModel, vehicleYear){

        super(vehicleMake, vehicleModel, vehicleYear)
        this.numWheel = 4;

    }

}

//Part 2 Test Code
var myFirstVehicle = new Car('Toyota', 'Corolla', 2005);
console.log(myFirstVehicle.honk());
console.log(myFirstVehicle.toString());
console.log(myFirstVehicle.numWheel);



class Motorcycle extends Vehicle{
    constructor(vehicleMake, vehicleModel, vehicleYear){
        super(vehicleMake, vehicleModel, vehicleYear);
        this.numWheels = 2;
    }

    revEngine(){
        return 'VROOM!';
    }
}

//Part 3 Test Code
var myFirstVehicle = new Motorcycle('Honda', 'Nighthawk', 2000);
console.log(myFirstVehicle.honk());
console.log(myFirstVehicle.revEngine());
console.log(myFirstVehicle.numWheels);



class Garage{
    constructor(garageStorageSize){
        this.garageStorageSize = garageStorageSize;
        this.vehicles = [];
    }

    add(parkVehicle){
        if(!(parkVehicle.prototype instanceof Vehicle || parkVehicle instanceof Vehicle)){
            console.log('Only vehicles are allowed in here!');
            return;
        }
        
        if(this.vehicles.length == this.garageStorageSize){
            console.log('Sorry, we are full.');
            return;
        }

        this.vehicles.push(parkVehicle);
        console.log('Vehicle added!');
    }

}

//Part 4 Test Code
let garage = new Garage(2);
console.log(garage.vehicles);
garage.add(new Car("Hyundai", "Elantra", 2015));
console.log(garage.vehicles);
garage.add("Taco");
garage.add(new Motorcycle("Honda", "Nighthawk", 2000));
console.log(garage.vehicles);
garage.add(new Motorcycle("Honda", "Nighthawk", 2001));
