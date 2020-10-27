import { makeAutoObservable, autorun } from 'mobx'

/**
 * Setup
 */

class Person {
  age = 17

  constructor() {
    makeAutoObservable(this)
  }

  addYear() {
    this.age += 1
  }

  get canRentCar() {
    return this.age >= 24
  }
}

const me = new Person()

/**
 * Read and Write Values
 */

const id = setInterval(() => {
  me.addYear()
}, 1000)

autorun(() => {
  if (me.canRentCar) {
    console.log('We can rent a car 🚙')
  } else {
    console.log("We can't rent a car")
  }
})

autorun(() => {
  console.log(`age ${me.age}`)
  if (me.age >= 27) {
    clearInterval(id)
  }
})
