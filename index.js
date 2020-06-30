const app = require('express')();
const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.listen(4000);


app.post("/hash", (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            // Store hash in your password DB.
            return res.send({ hash: hash });
        });
    });
});

app.post("/compare", (req, res) => {
    bcrypt.compare(req.body.password, req.body.hash).then((result) => {
        if (result === true) {
            return res.send({ message: 'matched' });
        }
        else {
            return res.send({ message: 'not matched' });
        }
    });
})