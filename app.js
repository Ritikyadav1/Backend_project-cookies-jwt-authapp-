const express = require('express');
const app = express();

const path = require('path');
const userModel = require('./models/user');
const cookieParser = require('cookie-parser');



const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


app.use(cookieParser());
app.set('view engine', "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// "/" route pe hum render kar rahe hai index.ejs page aur get route hai 
app.get('/', (req, res) => {
    res.render('index.ejs')
})

// hum "/create" route pe account create karna chahte hai user jiske paas email,password,
// age aur username ho 
//phir hum password ko hash me convert kar rahe hai bcrypt.gensalt ke through kyuki wo password database me aise hi dikhne lagega to sab koi jaan jaayega password , isliye hum usse hash me convert karte hai 
//phir user ko verify karne ke liye hum jwt token create karte hai aur usse cookies me store kara dete hai .
app.post('/create', (req, res) => {
    let { username, email, password, age } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                username,
                email,
                password: hash,
                age
            })

            let token = jwt.sign({ email }, "zxcvbnm");

            res.cookie("token", token);

            res.send(createdUser);
        })

    })


})

//logout route me hum cookies ko clear kar dete hai jisme hum user ka email store kiye hote the aur jab clear ho jata hai tab hame dubara login karna padta hai 
app.get("/logout", (req, res) => {
    res.clearCookie("token");

    res.redirect('/');
})

//login route pe login.ejs render kar rahe hai 
app.get("/login", (req, res) => {

    res.render('login.ejs');
})


//ab hame verify karna hai user ka email and password taaki hum login kara paaye user ko , aur hum user ka email find karte hai (user ka email le lete hai user.body.email se ) aur usko match karate hai database se (user.email) , then uske baad password lete hai aur usse compare karte hai user ke paasword se jo database me hash me store hua hai usko bcrypt ke through compare karte hai aur agar password sahi hota hai to tokem bana kar uska email login kara dete hai .aur agar galat hota hai to usse res.send(something went wrong ) de dete hai 
app.post("/login", async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) res.send("something went wrong");

    bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: user.email }, "zxcvbnm");

            res.cookie("token", token);
            res.send("you can login");
        }
        else {
            res.send("something went wrong ");
        }
    });
})


app.listen(3000);