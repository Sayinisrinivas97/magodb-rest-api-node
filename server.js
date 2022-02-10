const express = require("express");
const app = express();

const BrandName = require('./model');

app.use(express.json());

const mongoose = require("mongoose");
const { send, json } = require("express/lib/response");

mongoose.connect('mongodb+srv://sayinisrinivas:sayinisrinivas@cluster0.cu5rx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(
    () => console.log("DB conacted")
).catch(err => console.log(err))

app.get('/', (req, res) => {
    return res.send("hollow")
})

app.post('/addbrands', async (req, res) => {
    const { brandname } = req.body;
    try {
        const newData = new BrandName({ brandname });
        await newData.save();
        return res.json(await BrandName.find())
    }
    catch (err) {
        console.log(err.massage)
    }
})

app.get("/allbrands", async (req, res) => {
    try {
        const allData = await BrandName.find();
        return res.json(allData);

    } catch (err) {
        console.log(err.massage)
    }
})

app.get('/allbrands/:id', async (req, res) => {
    try {
        const Data = await BrandName.findById(req.params.id);
        return res.json(Data)
    }
    catch (err) {
        console.log(err.massage)
    }
})

app.delete('/deletebrand/:id', async (req, res) => {
    try {
        await BrandName.findByIdAndDelete(req.params.id);
        return json(await BrandName.find())
    }
    catch (err) {
        console.log(err.massage)
    }
})
app.listen(4000, () => console.log("Server is Running"))