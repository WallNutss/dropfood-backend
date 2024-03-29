const fs = require('fs')
const path = require('path')

const handleFileUpload = file => {
    return new Promise((resolve, reject) => {
      const filename = file.hapi.filename
      const data = file._data
      console.log(typeof(data))
      const dirname = path.join(__dirname,"..","upload")
      fs.writeFile(dirname +"\\" +filename, data, err => {
        if (err) {
          reject(err)
        }
        resolve({ message: 'Upload successfully!' })
      })
    }).then((dirname,filename)=>{
      console.log("Success")
    })
}

module.exports = handleFileUpload