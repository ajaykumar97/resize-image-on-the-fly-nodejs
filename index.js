const express = require('express');
const server = express();

const resize = require('./resize')

server.get('/', async (req, res) => {
    // Extract the query-parameter
    const widthString = req.query.width
    const heightString = req.query.height
    const format = req.query.format

    // Parse to integer if possible
    let width, height
    if (widthString) {
        width = parseInt(widthString)
    }
    if (heightString) {
        height = parseInt(heightString)
    }

    // Set the content-type of the response
    res.type(`image/${format || 'png'}`)

    try {
        // Get the resized image
        const stream = await resize('node.jpg', format, width, height);
        stream.pipe(res);
    } catch (error) {
        console.log('image thum generation error is: ', String(error));
        res.status(404).send()
    }
});

server.listen(8000, () => {
    console.log('Server started!')
})