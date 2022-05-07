import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    created_at: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    updated_at: {
      type: Date,
      default: () => Date.now(),
    },
  }, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

CommentSchema.virtual('url').get(function() {
  return '/post/' + this.post.title + '/comment/' + this._id;
});

export default mongoose.model('Comment', CommentSchema);
