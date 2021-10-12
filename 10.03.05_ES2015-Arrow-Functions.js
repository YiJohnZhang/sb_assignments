//01 Refractor the following code:
/*
function double(arr) {
    return arr.map(function(val) {
        return val * 2;
    });
}
*/

// function double(arr){
//     return arr.map((val) => val*2);
// }

const double = (arr) => arr.map((val) => val*2);

console.log(double([1,2,3,4,5]));

//02 Refactor the following code:
/*
function squareAndFindEvens(numbers){
    var squares = numbers.map(function(num){
        return num ** 2;
    });
    var evens = squares.filter(function(square){
        return square % 2 === 0;
    });
    return evens;
}
*/

// function squareAndFindEvens(numbers){
//     var squares = numbers.map((num) => num **2);
//     var evens = squares.filter((squares) => square % 2 == 0);
//     return evens;
// }

const squareAndFindEvens = (numbers) => {
    var squares = numbers.map((num) => num**2);
    var evens = squares.filter((squares) => squares %2 == 0);
    return evens;
}

console.log(squareAndFindEvens([1,2,3,4,5]));