const express = require("express");
const path=require("path")
const { connectToMongoDB } = require("./connect");
const app = express();
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const staticRoute=require('./routes/staticRouter')
const userRoute=require('./routes/user')


const port = 8000;
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

app.use("/",staticRoute)
app.use("/url", urlRoute);
app.use('/user',userRoute)

connectToMongoDB(
  "mongodb+srv://saiteja:abcde@cluster0.u9jhqne.mongodb.net/short-url"
).then(() => console.log("mongodb connected"));


app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry=await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).send('Short URL not found');
  }
});

app.listen(port, () => console.log("port is connected"));
