const {Router} = require('express');
const Todo = require('../components/models/Todo');
const router = Router();

router.get('/', async (req, res) => {
   const todos = await Todo.find({}).lean();

   res.render('index', {
      title: 'To do list',
      isIndex: true,
      todos
   });
});

router.get('/create', (req, res) => {
   res.render('create', {
      title: 'Create to do item',
      isCreate: true
   });
});

router.post('/create', async (req, res) => {
   const todo = new Todo({
      title: req.body.title
   });

   await todo.save();
   res.redirect('/');
});

router.get('/delete/:id', (req, res) => {
   Todo.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
         res.redirect('/');
      } else {
         console.log(`Error: ${err}`);
      }
   });
});

module.exports = router;