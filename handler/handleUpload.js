const fs = require('fs')
const path = require('path')

const handleFileUpload = file => {
    return new Promise((resolve, reject) => {
      //console.log(file)
      const filename = file.hapi.filename
      const data = file._data
      //console.log({data}.data)
      console.log("Het Handled")
      console.log(__dirname)
      const dirname = path.join(__dirname,"..","upload")
      console.log(dirname)
      
      fs.writeFile(dirname +"\\" +filename, data, err => {
        if (err) {
          reject(err)
        }
        resolve({ message: 'Upload successfully!' })
      })
    })
}

module.exports = handleFileUpload