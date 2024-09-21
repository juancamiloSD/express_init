const { Schema, model } = require("mongoose")


const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
 })

 CategorySchema.methods.toJSON = function(){
    const { __v, status, ...category } = this.toObject()
    return category
}

module.exports = model( "Category", CategorySchema )