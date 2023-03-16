const router = require('express').Router();
const Author = require('../models/Author');

// router.post('/', async (req, res) => {
//   try {
//     const authorData = await Author.create(req.body);

//     req.session.save(() => {
//       req.session.author_id = authorData.id;
//       req.session.logged_in = true;

//       res.status(200).json(authorData);
//     });
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.post('/login', async (req, res) => {
  try {
    const authorData = await Author.findOne({ where: { email: req.body.email } });
    console.log('Here by authorData: ' + JSON.stringify(authorData))

    if (!authorData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please click back on your browser try again' });
      return;
    }

    const validPassword = await authorData.checkPassword(req.body.password);
    console.log('VALID ' + validPassword);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please click back on your browser and try again' });
      return;
    }

console.log('authorData.id: ' + authorData.id)

    req.session.save(() => {
      req.session.author_id = authorData.id;
      req.session.logged_in = true;
   
      

      res.json({ author: authorData, message: 'You are now logged in!' });
    //   res.redirect('/');
      return;
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


router.get('/login', (req, res) => {
    // If a session exists, redirect the request to the homepage
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    try{
    res.render('login');
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
  });

module.exports = router;



