const express = require('express');
const router = express.Router();

const User = require('../models/User')

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json({user})
  } catch(err) {
    res.json({err})
  }
});

router.post('/', async (req, res) => {
try {
  const user = await User.create(req.body)
  res.json({user})
} catch(err) {
  res.json({err})
}
});

router.put('/', (req, res) => {
return res.json({data: 'Received a PUT HTTP method user'});
});

router.delete('/:id/locations/:restId', async (req, res) => {
  const foundUser = await User.findById(req.params.id);
  foundUser.locations = foundUser.locations.filter(l => {
    return l.id != req.params.restId;
  });
  await foundUser.save();
  res.json({ user: foundUser})
});

router.post('/login', async (req, res) => {
console.log('hit')
try {
  const foundUser = await User.findOne({username: req.body.username})
  res.json({
    user: foundUser,
    success: true
  })
} catch(err) {
  res.json({err})
}
})

module.exports = router;
