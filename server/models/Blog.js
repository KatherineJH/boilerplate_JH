const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    blogId: {
        type:Schema.Types.ObjectId,
        ref: 'Write'
    },
    title: {
        type:String,
        maxlength:50,
    },
    description: {
        type: String,
    },
    fileName: {
        type: String,
    },
    filePath : {
        type: String,
    },
    catogory : {
        type: String,
    }

}, { timestamps: true })


const Blog = mongoose.model('Blog', blogSchema);

module.exports = { Blog };