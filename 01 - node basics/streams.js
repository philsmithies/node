const fs = require('fs')

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8' })
const writeStream = fs.createWriteStream('./docs/blog4.txt')

// similar to a click event in js is what 'on' does with a data event then writing a stream of data into our new file
// readStream.on('data', (chunk) => {
//   console.log('--------- NEW CHUNK ------------')
//   console.log(chunk)
//   writeStream.write('\n NEW CHUNK \n')
//   writeStream.write(chunk)
// })

// piping
// take read stream and pipe it into the write stream

readStream.pipe(writeStream)