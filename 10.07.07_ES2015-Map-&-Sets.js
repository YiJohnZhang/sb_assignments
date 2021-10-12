//QQ01
//new Set([1,1,2,2,3,4])
->  Set(4) {1,2,3,4}

//QQ02
//[...new Set("referee")].join("")
->  'ref'

//QQ03
// let m = new Map();
// m.set([1,2,3], true);
// m.set([1,2,3], false);
->  Map(1) ([1,2,3] => false)

//hasDuplicate
function hasDuplicate(array){
    
    const checkDuplicates = new Set(array);
    return [...checkDuplicates].length == array.length;

}

console.log(hasDuplicate([1,3,2,1])); // true
console.log(hasDuplicate([1,5,-1,4])); // false

//vowelCount
const vowelCount = (inputString) => {

    const vowels = [...inputString].filter((ele) => ele == 'a' || ele == 'e' || ele == 'i' || ele == 'o' || ele == 'u');
    const vowelCountMap = new Map();

    //Initialize the counting
    vowels.forEach((ele) => vowelCountMap.set(ele, 0));

    [...vowels].forEach((ele) => vowelCountMap.set(ele, vowelCountMap.get(ele) + 1));
    return vowelCountMap;
}

console.log(vowelCount('awesome')); // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
console.log(vowelCount('Colt')); // Map { 'o' => 1 }

