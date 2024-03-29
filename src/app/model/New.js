const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const New = new Schema(
  {
    id: { type: Number },
    title: { type: String, maxLength: 255 },
    content: { type: String, maxLength: 255 },
    authorId: { type: Number },
    image: { type: String, maxLength: 255 },
    typeId: { type: String, maxLength: 255 },
    status: { type: Number },
    countLike: { type: Number },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Add plugin
mongoose.plugin(slug);
New.plugin(AutoIncrement, { inc_field: 'id' });
New.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('New', New);
