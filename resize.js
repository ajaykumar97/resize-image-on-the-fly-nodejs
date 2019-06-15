const fs = require('fs')
const sharp = require('sharp')
const path = require('path');
const ABSPATH = path.dirname(process.mainModule.filename);

const exists = (path) => {
    try {
        return fs.statSync(path).isFile();
    } catch (e) {
        console.log('check image exists error is: ', String(e))
        return false;
    }
};

module.exports = function resize(path, format, width, height) {
    return new Promise((resolve, reject) => {
        let image = ABSPATH + '/' + path;
        console.log('image is: ', image)
        if (!exists(image)) {
            return reject('Image does not exist.')
        }
        
        const readStream = fs.createReadStream(path)
        let transform = sharp()

        if (format) {
            transform = transform.toFormat(format)
        }

        if (width || height) {
            transform = transform.resize(width, height)
        }

        return resolve(readStream.pipe(transform))
    });
}
