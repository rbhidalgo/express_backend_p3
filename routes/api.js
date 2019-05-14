const express = require('express');
const router = express.Router();
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.MY_KEY)

/* GET home page. */

// router.get("/", async (req, res) => {
//   client
//    .search({
//     term: "tacos, taqueria",
//     location: "los angeles, ca",
//     limit: 3,
//     open_now: true
//    })
//    .then(response => {
//     const locationsName = response.jsonBody.businesses;
//     res.json({
//      status: 200,
//      data: locationsName
//     });
 
//    })
//    .catch(e => {
//     console.log(e);
//    });
//  });


 router.post("/", async (req, res) => {
   console.log(req.body.location)
  client
   .search({
    term: "tacos, taqueria",
    location: `${req.body.location}, ca`,
    limit: 50,
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
