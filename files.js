const fs = require('fs')

// reading files
fs.readFile('./docs/blog1.txt', (err, data) => {
  if (err) {
    console.log(err)
  }
  console.log(data.toString())
})

// writing files
fs.writeFile('./docs/blog1.txt', 'hello world ninjas', () => {
  console.log('File was written')
})

// to create a new file
fs.writeFile('./docs/blog2.txt', 'hello world ninjas', () => {
  console.log('File was written')
})

// directories if the assets folder doesn't exist then to run the code
// then can create and delete it if its not there
if (!fs.existsSync('./assets')){
  fs.mkdir('./assets', (err) => {
    if (err) {
      console.log(err)
    }
    console.log('Folder Created')
  })
} else {
  fs.rmdir('./assets', (err) => {
    if (err) {
      console.log(err)
    }
    console.log('Folder Deleted')
  })
}

// deleting files which will run if the file exists
if (fs.existsSync('./docs/deleteme.txt')) {
  fs.unlink('./docs/deleteme.txt', (err) => {
    if(err){
      console.log(err)
    }
    console.log('File Deleted')
  })
}