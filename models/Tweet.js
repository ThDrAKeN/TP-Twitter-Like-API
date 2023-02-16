const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TweetSchma = new Schema({
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    content:{
        type: String,
        required: true
    },
    comments: {
        type: Array
    },
});

const Tweet = mongoose.model('tweet', TweetSchma);

module.exports = Tweet;