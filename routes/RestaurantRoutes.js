const express = require('express');
const restaurantModel = require('../models/Restaurant');
const app = express();

//Return all
//http://localhost:8081/restaurants
app.get('/restaurants', async (req, res) => {
    const restaurants = await restaurantModel.find({});

    try {
        res.status(200).send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
});

//Search by cuisine
//http://localhost:8081/restaurants/cuisine/Japanese
//http://localhost:8081/restaurants/cuisine/Bakery
//http://localhost:8081/restaurants/cuisine/Italian
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    const cuisine = req.params.cuisine

    const restaurants = await restaurantModel.find().byCuisine(cuisine)

    try {
        if (restaurants.length != 0) {
            res.send(restaurants);
        } else {
            res.send(JSON.stringify({ status: false, message: "No data found" }))
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

//Return columns with id, cuisines, name, city and restaurant_id
//http://localhost:8081/restaurants?sortBy=ASC
//http://localhost:8081/restaurants?sortBy=DESC
app.get('/restaurants', async (req, res) => {

    const sort = req.query.sortBy

    const restaurants = await restaurantModel.find({})
        .select('id cuisines name city restaurant_id')
        .sort({ 'restaurant_id': sort })

    try {
        res.status(200).send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
})

//Return restaurants details where all cuisines are equal to Delicatessen and the city is not equal to Brooklyn
//http://localhost:8081/restaurants/Delicatessen
app.get('/restaurants/Delicatessen', async (req, res) => {

    const restaurants = await restaurantModel.find({}, {_id: 0, address: 0, restaurant_id: 0, __v: 0})
    .where('cuisine').equals('delicatessen')
    .where('city').ne('brooklyn')
    .sort({'name': 'asc'})

    try {
        res.status(200).send(restaurants);
    } catch (err) {
        res.status(500).send(err);
    }
})


//Create new record
app.post('/restaurants', async (req, res) => {
    console.log(req.body)
    const restaurant = new restaurantModel(req.body)

    try {
        await restaurant.save((err) => {
            if (err) {
                res.send(err)
            } else {
                res.send(restaurant);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = app