const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    address: {
        building: {
            type: Number,
        },
        street: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        zipcode: {
            type: String,
            trim: true,
        }
    },
    city: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    cuisine: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    restaurant_id: {
        type: Number,
        required: true,
    }
})

RestaurantSchema.query.byCuisine = function(value){
    return this.where({cuisine: value})
}

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;