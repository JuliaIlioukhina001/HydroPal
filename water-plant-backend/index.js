const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");


app.use(express.json());
app.use(cors());

// Database Connection With MongoDB
mongoose.connect("mongodb+srv://vaishnavmandru:Eq8AKrwk4uqBikDt@cluster0.crfdmvg.mongodb.net/Thirsty-Plant");


//Image Storage Engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      console.log(file);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:4000/images/${req.file.filename}`
    })
})

app.use('/images', express.static('upload/images'));


const Product = mongoose.model("Sticker", {
  id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    coins: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
});

const Users = mongoose.model("Users", {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    giftData: {
      type: Object,
    },
    coins: {
      type: Number,
    },
    cryptokey: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
});

// MiddleWare to fetch user from database
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};


app.get("/", (req, res) => {
  res.send("Root");
});

//Create an endpoint at ip/login for login the user and giving auth-token
app.post('/login', async (req, res) => {
  console.log("Login");
    let success = false;
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
      console.log(user.id);
			const token = jwt.sign(data, 'secret_ecom');
			res.json({ success: true, token });
        }
        else {
            return res.status(400).json({success: false, errors: "wrong password"})
        }
    }
    else {
        return res.status(400).json({success: false, errors: "wrong email address"})
    }
})

//Create an endpoint at ip/auth for regestring the user in data base & sending token
app.post('/signup', async (req, res) => {
  console.log("Sign Up");
        let success = false;
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: success, errors: "existing user found with this email" });
        }
        let gift = {};
          for (let i = 0; i < 10; i++) {
          gift[i] = 0;
        }
        const user = new Users({
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            coins: 9,
            giftData: gift,
            cryptokey: "",

        });
        await user.save();
        const data = {
            user: {
                id: user.id
            }
        }
        
        const token = jwt.sign(data, 'secret_ecom');
        success = true; 
        res.json({ success, token })
    })

app.get("/allgifts", async (req, res) => {
	let gifts = await Product.find({});
  console.log("All Products");
    res.send(gifts);
});


//Create an endpoint for saving the product in cart
app.post('/buy', fetchuser, async (req, res) => {
	console.log("bought");
    let userData = await Users.findOne({_id: req.user.id});
    let productData = await Product.findOne({id: req.body.itemId});
    console.log(parseInt(userData.coins));
    if (parseInt(userData.coins) >= productData.coins)
    {
      userData.coins -= productData.coins;
      userData.giftData[req.body.itemId] += 1;
      await Users.findOneAndUpdate({_id:req.user.id}, {giftData:userData.giftData});
      await Users.findOneAndUpdate({_id: req.user.id}, {coins: userData.coins});
      res.send("Added")

    } else {
      return res.status(400).json({success: false, errors: "not sufficient funds"});

    }
  })



  //Create an endpoint for saving the product in cart
app.post('/getgift', fetchuser, async (req, res) => {
  console.log("Get gift");
  let userData = await Users.findOne({_id:req.user.id});
  res.json(userData.giftData);

  })

  app.post('/user-info', fetchuser, async (req, res) => 
    { let user = await Users.findOne({_id:req.user.id}); 
      console.log("get info"); 
      res.send(user); 
  })



app.post("/addgift", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length>0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id+1;
  }
  else
  { id = 1; }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    coins: req.body.coins,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({success:true,name:req.body.name})
});


app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});
