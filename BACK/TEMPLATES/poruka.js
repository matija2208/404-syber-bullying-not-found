const mg = require("mongoose");

const porukaStruct=new mg.Schema({
    sender:{
        type:String,
        require:true
    },
    tip:{
        type:Boolean,
        require:true
    },
    receiver:{
        type:String,
        require:true
    },
    text:{
        type:String,
        trim:true,
        require:true
    }
})

module.exports = mg.model("poruka",porukaStruct);