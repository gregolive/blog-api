import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      maxLength: 100,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    banner_img: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
    },
    preview: {
      type: String,
      maxLength: 200,
    },
    visibility: {
      type: String,
      required: true,
      enum: ['Visible', 'Hidden'],
      default: 'Visible',
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
  }
);

PostSchema.virtual('formatted_title').get(function() {
  return this.title.replace(/\s+/g, '-');
});

PostSchema.virtual('url').get(function() {
  return '/post/' + this.formatted_title;
});

export default mongoose.model('Post', PostSchema);
