const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const  ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    length: [1-280]
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
  },
  reactions: [ReactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
}
);

const  ReactionSchema = new Schema({
    //set custom id to avoid confusion with parent comment_id
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
  );

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;