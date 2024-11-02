import mongoose ,{Schema}from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile:{
        type:String,  // cloudinary url
        required:true,
    },
    thumbnail:{
        type:String,  // cloudinary url
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default: true
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }


},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)  //  Plugins are reusable modules that can add custom methods, virtuals, or other schema-level utilities to Mongoose schemas

//pagination is like dividing a large list of data into smaller, manageable chunks (or "pages") so you don’t have to load all the data at once

//(mongooseAggregatePaginate) is a plugin that makes it easier to apply pagination to complex data queries (called aggregation queries).When you’re adding a feature that allows you to get data in chunks. This plugin lets you specify the page and the number of items per page you want. For example:
export const Video = mongoose.model("Video",videoSchema)