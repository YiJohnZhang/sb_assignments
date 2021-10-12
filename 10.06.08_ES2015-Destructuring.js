//
let facts = {numPlanets: 8, yearNeptuneDiscovered: 1846};
let {numPlanets, yearNeptuneDiscovered} = facts;

//Object Destructuring 01
//  8
//  1846

//Object Destructuring 02
//  {yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659}

//Object Destructuring 03
//  Your name is Alejandro and you like purple
//  Your name is Melissa and you like green
//  Your name is undefined and you like green

//Array Destructuring 01
//  Maya
//  Marisa
//  Chi

//Array Destructuring 02
//  Raindrops on roses
//  Whiskers on kittens
//  [ "Bright copper kettles",  "warm woolen mittens",  "Brown paper packages tied up with strings" ]

//Array Destructuring 03
//  [20, 10, 30]

// var obj = {
//   numbers: {
//     a: 1,
//     b: 2
//   }
// };

// var a = obj.numbers.a;
// var b = obj.numbers.b;
var obj = {
    numbers: {
      a: 1,
      b: 2
    }
  };
  
let [a, b] = obj.numbers;

//Array Swap
// var arr = [1, 2];
// var temp = arr[0];
// arr[0] = arr[1];
// arr[1] = temp;
var arr = [1, 2];
[arr[0] arr[1]] = [arr[1] arr[0]];

//Race Results
const raceResults = ([first, second, third, ...rest]) => {
    return {
        first,
        second,
        third,
        rest
    }
};


console.log(raceResults(['Tom', 'Margaret', 'Allison', 'David', 'Pierre']));

