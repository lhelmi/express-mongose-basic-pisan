const express = require('express');
const app = express();
const cors = require('cors');
let corsAllowed = {
    origin: "http://localhost:4000"
}
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsAllowed));
const routers = require('./routers');
app.use(routers);
app.listen(port, () => {
    console.log(`running at ${port}`);
});