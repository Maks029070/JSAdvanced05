const {Schema, model} = require('mongoose');
const autoInc = require('mongoose-plugin-autoinc');

const schema = new Schema({
   title: {
      type: String,
      required: true
   }
});

schema.plugin(autoInc.autoIncrement, {
   model: 'Todo',
   field: 'id',
   startAt: 1,
   incrementBy: 1
});

module.exports = model('Todo', schema);