const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : 1,
        maxLength : 50
    },
    price : {
        type : Number,
        required : true,
        min : 1,
        max : 9999999
    },
    stock : {
        type : Number,
        required : true,
        min : 0
    },
    status : {
        type : Boolean,
        default : true
    },
    sequenceId: {
        type: Number,
    }
});
// productSchema.plugin(AutoIncrement, { inc_field: 'sequenceId' });
const Product = mongoose.model('Product', productSchema);
module.exports = Product;