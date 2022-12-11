const mg = require("mongoose");

const korisnikStruct=new mg.Schema({
    email:{
        type:String,
        trim:true,
        require:true
    },
    password:{
        type:String,
        trim:true,
        require:true
    },
    datumRodjenja:{
        type:Date
    },

    idRadnika:{
        type:String,
        trim:true
    },

    nadimak:{
        type:String,
        trim:true,
        require:true
    }
})

module.exports = mg.model("korisnik",korisnikStruct);