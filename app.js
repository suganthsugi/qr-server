const express = require('express');

const app = express();

const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://admin:admin@cluster0.zk2cgod.mongodb.net/?retryWrites=true&w=majority");
const conn = mongoose.connection;
conn.on('open', () => {
    console.log('Database connected');
});

const Ro = require('./RO');


app.get('/new', async (req, res) => {
    try {
        const newRo = new Ro({});
        const savedRo = await newRo.save();
        res.status(200).json({
            status:"success",
            id:savedRo._id
    });
    } catch (err) {
        res.status(400).json({
            status: "error",
            err:err.message
        });
    }
});

app.get('/:id', async (req, res)=>{
    try {
        const currRo = await Ro.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: currRo.isVerified
        });
    } catch (err) {
        res.status(400).json({
            status: "error",
            err:err.message
        });
    }
});

app.post('/update/:id', async (req, res) => {
    try {
        const currRo = await Ro.findById(req.params.id);
        const { userName, phno, reason, trust, feedback } = req.body;
        currRo.userName=userName;
        currRo.phno=phno;
        currRo.reason=reason;
        currRo.trust=trust;
        currRo.feedback=feedback;
        currRo.isVerified=true;
        await currRo.save()
        res.status(200).json({
            status:"success",
            data: true
        })
    } catch (err) {
        res.status(400).json({
            status: "error",
            err:err.message
        });
    }
});

app.listen(4545, ()=> {
    console.log('Server started at http://127.0.0.1:4545');
});