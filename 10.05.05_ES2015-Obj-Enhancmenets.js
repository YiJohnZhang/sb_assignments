//01 Refactor the following code:
// function createInstructor(firstName, lastName){
//     return {
//       firstName: firstName,
//       lastName: lastName
//     }
//   }

const createInstructor = (firstName,lastName){

    return {
        firstName,
        lastName
    }

}

console.log(createInstructor('Samir','Eddine'));

//02 Computed Property Names
function setFavoriteNumber(object, computedKey, value)(
    return object[computedKey] = value;
)

console.log(setFavoriteNumber(instructor,42,'That is my favorite!'));

//03 Object methods
// var instructor = {
//     firstName: "Colt",
//     sayHi: function(){
//       return "Hi!";
//     },
//     sayBye: function(){
//       return this.firstName + " says bye!";
//     }
//   }

const instructor = {
    firstName: 'Colt',
    sayHi(){
        return 'Hi!';
    },
    sayBye(){
        return `${this.firstName} says bye!`;
    }
};

console.log(instructor);

//04 createAnimal
function createAnimal(animalType, speechType, speechTransliteration){
    return {
        animalType,
        [speechType]: function(){
            return speechTransliteration;
        }
    };
}


const d = createAnimal("dog", "bark", "Woooof!")
// {species: "dog", bark: ƒ}
console.log(d.bark());  //"Woooof!"

const s = createAnimal("sheep", "bleet", "BAAAAaaaa")
// {species: "sheep", bleet: ƒ}
console.log(s.bleet()); //"BAAAAaaaa"