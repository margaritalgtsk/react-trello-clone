const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const multer = require('multer');
const path = require('path');

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

app.post('/image', upload.single('file'), function (req, res) {
    res.json({})
})

app.use('/images', express.static('images'));

app.get('/images/:filename', function(req, res) {
    const options = {
        root: path.join(__dirname, 'images/'),
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    const fileName = req.params.filename;
    const fullPath = path.join(options.root, fileName);
    res.sendFile(fullPath, options, function (err) {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        }
        else {
            console.log('Sent:', fileName);
        }
    });
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})