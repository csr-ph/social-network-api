const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        max: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timeStamp
    },
    username: {
        type: String,
        required: true
    },
    reactions: []
});

const reactionSchema = new Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        max: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timeStamp
    }
});
// when user queries the database, format the timestamp
const timeStamp = {
    get currentDate() { return Date.now() }
};

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);



module.exports = Thought;