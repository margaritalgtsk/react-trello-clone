const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

app.use(cors())

app.post('/image', upload.array('file'), function (req, res) {
    res.json({})
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})