
// when we require a file it finds it and runs it, we can destructure it like so
const { people, ages }  = require('./people')

// if you log it though it is an empty object but if you export it then you can use it in the file
console.log(people)
console.log(ages)

// os is built into node as something that we can run to see details about our OS. 

const os = require('os')
console.log(os.platform(), os.homedir())
