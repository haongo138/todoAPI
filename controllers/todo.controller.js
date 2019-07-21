const Task = require('../models/todo.model');

// READ TASKs
module.exports.getAll = async (req, res) => {
  let todos = await Task.find();
  res.json(todos);
}

module.exports.getById = async (req, res) => {
  const { id } = req.params;
  let todo = await Task.findById(id);
  return res.json(todo);
}

// CREATE A TASK
module.exports.create = async (req, res) => {
  const { task_name } = req.body;
  try {
    const newTask = new Task({ task_name });
    await newTask.save();
    return res.json(newTask);
  } catch (err) {
    console.log(err);
  }
}

// UPDATE A TASK
module.exports.updateById = async (req, res) => {
  const { id } = req.params;
  const { task_name } = req.body;
  try {
    const updateTask = await Task.findByIdAndUpdate(id, { task_name: task_name });
    res.json("task is updated successfully");
  } catch (err) {
    console.log(err);
  }
}

// DELETE A TASK by its ID
module.exports.deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndRemove(id);
    res.json(deletedTask);
  } catch (err) {
    console.log(err);
  }
}

// SET TASK COMPLETE OR NOT
module.exports.setComplete = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  task.task_isDone = !task.task_isDone;
  await task.save();
  res.json(task);
}