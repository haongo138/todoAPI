const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid-v4');

const TaskSchema = new Schema({
  task_name: {
    type: String,
    required: true
  },
  task_isDone: {
    type: Boolean,
    default: false
  },
  task_createAt: {
    type: Date,
    default: Date.now
  },
  _id: {
    type: String,
    default: uuid()
  }
});

module.exports = mongoose.model('Task', TaskSchema, 'Tasks');