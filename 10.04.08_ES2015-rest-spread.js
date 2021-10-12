//01
// Refactor the following w/ rest/spread operator
// function filterOutOdds() {
//     var nums = Array.prototype.slice.call(arguments);
//     return nums.filter(function(num) {
//         return num % 2 === 0
//     });
// }

const filterOutOdds = (...arguments)) => {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter((num) => num % 2 == 0);
};

console.log(filterOutOdds([1,2,3,4,5,6,7,9]));

//02 findMin
// Write a function called findMin for the following:
// findMin(1,4,12,-3) // -3
// findMin(1,-1) // -1
// findMin(3,1) // 1

const findMin = (...arguments) => arguments.reduce((minValue,currentValue) => minValue < currentValue ? minValue:currentValue);

console.log(findMin(1,4,12,-3)) // -3
console.log(findMin(1,-1)) // -1
console.log(findMin(3,1)) // 1

//03 mergeObjects
// Write a function called mergeObjects that does the following:
//mergeObjects({a:1, b:2}, {c:3, d:4}) // {a:1, b:2, c:3, d:4}

function mergeObjects(mainObject, secondObject){
    Object.keys(secondObject).forEach((ele) => {
        mainObject[ele] = secondObject[ele];
    });

    return mainObject;
}

console.log(mergeObjects({a:1, b:2}, {c:3, d:4})); // {a:1, b:2, c:3, d:4}

//04 doubleAndReturnArgs
// Write a fucntion called doubleAndReturnArgs that has an array and a variable number of objects. Double the remaining objects and append to original array;
// doubleAndReturnArgs([1,2,3],4,4) // [1,2,3,8,8]
// doubleAndReturnArgs([2],10,4) // [2, 20, 8]

function doubleAndReturnArgs(firstArray, ...objectsToDouble){
    objectsToDouble.forEach((ele) => firstArray.push(ele*2));
    return firstArray;
}

console.log(doubleAndReturnArgs([1,2,3],4,4)); // [1,2,3,8,8]
console.log(doubleAndReturnArgs([2],10,4)); // [2, 20, 8]

//05 Slice and Dice
/** remove a random element in the items array
and return a new array without that item. */

const removeRandom = (items) => {
    randomIndexToRemove = Math.floor(Math.random(items.length));
    const newArray = [];
    items.forEach((ele, index) => {
        if(index != randomIndexToRemove)
            newArray.push(ele);
    });

    return newArray;
}

console.log(removeRandom([1,2,3,4,5]));

/** Return a new array with every item in array1 and array2. */

const extend = (array1, array2) => {

    const newArray = array1;
    array2.forEach((ele) => {
        newArray.push(ele);
    });

    return newArray;

}

console.log(extend([1,2,3,4,5],[6,7,78,8,9,10,11,123,13]));

/** Return a new object with all the keys and values
from obj and a new key/value pair */

const addKeyVal = (obj, key, val) => {
    let newObj = obj;
    newObj[key] = val;
    return newObj;
}

console.log(addKeyVal({'asdf':true, 1:false,},true,false));

/** Return a new object with a key removed. */

const removeKey = (obj, key) => {
    delete obj[key];
    return obj;
}

console.log(removeKey(addKeyVal({'asdf':true, 1:false,},true,false),1));

/** Combine two objects and return a new object. */

function combine(obj1, obj2) {
    let newObj = obj1;
    Object.keys(obj2).forEach((ele) => {
        newObj[ele] = obj2[ele];
    });
    return newObj;
}

console.log(combine({'cat1':'Yarn', 'cat2':'Cheez'},{'dog1':'Bones','dog2':'Scooby','dog3':'Goofy'}));

/** Return a new object with a modified key and value. */

const update = (obj, key, val) => {
    obj[key] = val;
    return obj;
}

console.log(update({'dog1':'Bones','dog2':'Scooby','dog3':'Goofy'},'dog2','Doofy'));