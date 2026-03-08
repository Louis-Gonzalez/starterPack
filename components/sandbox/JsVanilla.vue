<script setup lang="ts">
// import { ref } from 'vue'
// import { string } from 'postcss-selector-parser';
// import { number } from '@intlify/core-base';
//
// // je me rappelle pas comment déclaré ici pour l'utiliser plus bas
// // IUser : {
// //   name: string,
// //   age: number
// // }
//
// // si cela avait été dans un autre fichier j'aurais fait et j'aurais ajouter l'import en haut du fichier import type Iuser from '...''
// // export interface IUser {
// //   name: string
// //   age: number
// // }
//
// const age = ref<number>(25)
// const PI = ref<number>(3.14)
//
// const a = ref<number>(3)
// const b = ref<number>(5)
// //
// // const add = ()=>{
// //   return a.value + b.value
// // }
//
// // format réutilisable
// const add = (a:number ,b:number ) => {
//   return a + b
// }
//
// const isAdult = (number:number)=>{
//  return number >= 18 ? true : false
// }
//
// console.log(isAdult(age.value))
//
// const listNumber = ref([1,2,3,4,5,6,7,8,9,10]) // je n'arrive pas à faire le type de ce tableau de number <number[]>
// // const logListNumber =  listNumber.value.map((item) => console.log(item))
// const logListNumber = listNumber.value.forEach((item)=> console.log(item))
// console.log(logListNumber)
//
// const fruits = ref(['apple', 'banana', 'orange'])
// console.log(fruits.value[1])
//
// const simple = ref([1,2,3,4,5])
// const double = simple.value.map((item) => item * 2)
// console.log(double)
//
// const onlyPair = simple.value.filter((item) => item %2 === 0 )
// console.log(onlyPair)
//
// const reduce = simple.value.reduce((acc, item) => acc + item, 0)
// console.log(reduce)
//
// // ici sinon j'aurais pu écrire const user= ref<IUser>()
// const user = ref<{
//   name: string
//   age: number
// }>({
//     name: "Paul",
//     age: 30
//   }
// )
//
// console.log('user name', user.value.name, 'user age', user.value.age)
//
// // destructuring ?
// // const (name, age) for user.value c'est un truc comme cela'
//
// const objectA = { a: 1}
// const objectB = { b: 2}
// const spreadObject = {
//   ...objectA,
//   ...objectB
// }
// console.log(spreadObject)
//
// // promise et async await ?
//
//
// const myAsyncFunction = async () => {
//   await new Promise(resolve => setTimeout(resolve, 1000))
// }
//
// const showMeHelloAfterOneSecond = () => {
//   setTimeout(() => {
//     console.log("Hello, retardée d'une seconde");
//   }, 1000)
// }
//
//
// const arrayOne = [
//   {id:1, name:"Paul"},
//   {id:2, name:"Marie"}
// ]
// const objectOne = {}
//
// // je sais qu'il y a un truc qui cloche'
// const replaceArrayByObject = () => {
//   arrayOne.forEach(((item, key)) => {
//     objectOne.key = item
//   })
// }


// 1. Variable
const age = 25

// 2. Constante
const PI = 3.14

// 3. Fonction simple
function add(a:number , b:number) {
  return a + b
}

// 4. Arrow function
const addArrow = (a:number , b:number) => a + b

// 5. Condition
const isAdult = (age:number) => age >= 18

console.log("isAdult:", isAdult(age))

// 6. Boucle
for (let i = 1; i <= 10; i++) {
  console.log("loop:", i)
}

// 7. Tableau
const fruits = ["pomme", "banane", "orange"]

// 8. Accès tableau
const secondFruit = fruits[1]
console.log("second fruit:", secondFruit)

// 9. Parcourir un tableau
fruits.forEach(fruit => {
  console.log("fruit:", fruit)
})

// 10. map()
const numbers = [1, 2, 3]
const doubled = numbers.map(n => n * 2)
console.log("doubled:", doubled)

// 11. filter()
const numbers2 = [1, 2, 3, 4, 5]
const evenNumbers = numbers2.filter(n => n % 2 === 0)
console.log("even:", evenNumbers)

// 12. reduce()
const numbers3 = [1, 2, 3, 4]
const sum = numbers3.reduce((acc, n) => acc + n, 0)
console.log("sum:", sum)

// 13. Objet
interface IUser {
  id: number
  name: string
  age: number
}

const user: IUser = {
  id: 20,
  name: "Paul",
  age: 30
}

// 14. Accès propriété
console.log("user name:", user.name)

// 15. Destructuring
const { name: userName, age: userAge } = user
console.log("destructuring:", userName, userAge)

// 16. Spread operator
const objectA = { a: 1 }
const objectB = { b: 2 }

const mergedObject = {
  ...objectA,
  ...objectB
}

console.log("merged:", mergedObject)

// 17. Promise simple success
const myPromise = () => {
  return new Promise(resolve => {
    resolve("done")
  })
}
// Promise simple failed
const myPromiseFailed = () => {
  return new Promise((_, reject) => {
    reject("Failed")
  })
}

// 18. async / await
const runPromise = async () => {
  const result = await myPromise()
  console.log("promise result:", result)
}

runPromise()

// other example
const fetchUser = (): Promise<IUser> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id: 32, name: "Victor", age: 30 })
    }, 1000)
  })
}

let userTwo: IUser

const run = async () => {
  userTwo = await fetchUser()
  console.log(userTwo)
}

run()

// 19. setTimeout
setTimeout(() => {
  console.log("Hello")
}, 1000)

// 20. Transformer tableau -> objet
const arrayUsers: IUser[] =  [
  { id: 1, name: "Paul" , age: 65},
  { id: 2, name: "Marie", age: 35 },
]


const usersObject: Record<number, IUser> = {}

arrayUsers.forEach(user => {
  usersObject[user.id] = user
})

console.log(usersObject)
</script>

<template>
  <div>test js Vanilla</div>
</template>

<style scoped>

</style>