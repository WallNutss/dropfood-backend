const fs = require('fs')
const path = require('path')

const handleFileUpload = file => {
    return new Promise((resolve, reject) => {
      //console.log(file)
      const filename = file.hapi.filename
      const data = file._data
      //console.log({data}.data)
      console.log("Het Handled")
      console.log(__filename+ "\\" +filename)
      
      fs.writeFile( __dirname+ "\\" +filename, data, err => {
        if (err) {
          reject(err)
        }
        resolve({ message: 'Upload successfully!' })
      })
    })
}

module.exports = handleFileUpload