const express = require('express');

const cors = require('cors');
const multer = require('multer');
const path = require('path');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('./database.json')
const db = low(adapter)

const app = express();
const port = 8080;

const jwtSecretKey = 'dsfdsfsdfdsvcsvdfgefg'

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
app.use(express.json())

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

app.get('/', (_req, res) => {
    res.send('Auth API.\nPlease use POST /auth & POST /verify for authentication')
})


app.post('/auth', (req, res) => {
    const { username, password } = req.body

    const user = db
        .get('users')
        .value()
        .filter((user) => username === user.username)

    if (user.length === 1) {
        bcrypt.compare(password, user[0].password, function (_err, result) {
            if (!result) {
                return res.status(401).json({ message: 'Invalid password' })
            } else {
                let loginData = {
                    username,
                    signInTime: Date.now(),
                }
                const token = jwt.sign(loginData, jwtSecretKey)
                console.log(token)
                res.status(200).json({ message: 'Success', token })
            }
        })
    } else if (user.length === 0) {
        return res.status(401).json({ message: 'User is not found' })
    }
})

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})