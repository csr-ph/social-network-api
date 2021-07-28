const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const timeStamp = () => {
    return Date.now(); 
};

const reactionSchema = new Schema({
    reactionId: {
        type: mongoose.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
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
    reactions: [reactionSchema]
});


// when user queries the database, format the timestamp


thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);



module.exports = Thought;