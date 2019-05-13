const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
const client = yelp.client('5s5Z0u2ukZ6QJ2BuVO2hCyLjbQWJ5MXdkkpGbFgtvmKYVKwT_vVBQD8ObyIvA4WUAmU1jbev7imclA0zTKWBpjaBBbKMIKfU1TQGDGeaY0xHS513jvvamfaVi8zUXHYx');

/* GET home page. */

router.get("/", async (req, res) => {
  client
   .search({
    term: "tacos, taqueria",
    location: "los angeles, ca",
    limit: 3,
    open_now: true
   })
   .then(response => {
    const locationsName = response.jsonBody.businesses;
    res.json({
     status: 200,
     data: locationsName
    });
 
   })
   .catch(e => {
    console.log(e);
   });
 });


 router.post("/", async (req, res) => {
   console.log(req.body.location)
  client
   .search({
    term: "tacos, taqueria",
    location: `${req.body.location}, ca`,
    limit: `${req.body.limit}`,
    open_now: true
   })
   .then(response => {
    const locationsName = response.jsonBody.businesses;
    res.json({
     status: 200,
     data: locationsName
    });
 
   })
   .catch(e => {
    console.log(e);
   });
 });


// router.post('/', (req, res) => {
//   return res.json({
//     body: req.body
//   });
// });

router.put('/', (req, res) => {
  return res.json({data: 'Received a PUT HTTP method'});
});

router.delete('/', (req, res) => {
  return res.json({data: 'Received a DELETE HTTP method'});
});



module.exports = router;
