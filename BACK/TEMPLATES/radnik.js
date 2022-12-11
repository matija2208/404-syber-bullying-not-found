const mg = require("mongoose");

const radnikStruct=new mg.Schema({
    ime:{
        type:String,
        trim:true,
        require:true
    },
    prezime:{
        type:String,
        trim:true,
        require:true
    },
    email:{
        type:String,
        trim:true,
        require:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        require:true
    },
    brojTelefona:{
        type:String,
        trim:true,
        require:true
    },

    overa:{
        type:String,
        trim:true,
        require:true
    },

    profilna:{
        type:String,
        trim:true,
        require:true
    },
    
    idKorisnika:[{
        type:String,
        trim:true
    }],

    overen:{
        type:Boolean,
        require:true
    },

    opis:{
        type:String,
        trim:true,
        require:true
    }
})

module.exports = mg.model("radnik",radnikStruct);