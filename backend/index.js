let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
var cors = require('cors');
let app = express();

let apiRoutes = require("./routes/api-routes");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors())

// STEP 4: definire collegamento al db

// test locale
// mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true});

// test Docker Compose
mongoose.connect('mongodb://mongo:27019/mydb', { useNewUrlParser: true});

var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

var port = process.env.PORT || 8081;

app.get('/', (req, res) => res.send('Hello World!'));

// STEP 5: definire contesto (opzionale)
app.use('/api', apiRoutes);

app.listen(port, function () {
    console.log("Running webapp on port " + port);
});
