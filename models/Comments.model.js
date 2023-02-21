
const mongoose = require ("mongoose")

const commentsSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref :"User",
        required: true
    },
    comentario: String,
    name:String
})

const Comments = mongoose.model("Comments", commentsSchema)
module.exports = Comments