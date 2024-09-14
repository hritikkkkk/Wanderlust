const mongoose=require("mongoose");
const { reviewSchema } = require("../schema");
const Schema=mongoose.Schema;
const Review=require("./reviews.js");

const listingSchema=new Schema({
    title:{
        type:String,
       required:true,
    },
    description:String,
    image:{
      url:String,
      filename:String,  
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    

    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",

    },
    geometry: {
        type: {
          type: String,
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }



});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
})


const listing=mongoose.model("listing",listingSchema);
module.exports=listing;