var express = require('express');
var router = express.Router();
var axios = require('axios')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//api
router.get('/api/items', function(req, res, next) {
  const q = req.query.q

  axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&&limit=4`)
    .then(function(d) {
      const data = d.data
      const response = {
        categories: data.available_filters[0].values[0].name,
        items: []
      }

      data.results.forEach(item => {
        const price = String(item.price).split('.')

        response.items.push({
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: parseInt(price[0]),
            decimals: price[1] ? parseInt(price[1]) : 0
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping
        })
      });
    
      res.json(response);
    }
  )
});

router.get('/api/items/:id', async function(req, res, next) {
  const id = req.params.id
  let response = {}
  let category_id= ''

  await axios.get(`https://api.mercadolibre.com/items/${id}`)
    .then(function(d) {
      const data = d.data

      const price = String(data.price).split('.')
      response = {
        categories: [],
        item: {
          id: data.id,
          title: data.title,
          price: {
            currency: data.currency_id,
            amount: parseInt(price[0]),
            decimals: price[1] ? parseInt(price[1]) : 0,
          },
          picture: data.pictures.secure_url,
          condition: data.condition,
          free_shipping: data.shipping.free_shipping,
          sold_quantity: data.sold_quantity,
        }
      }

      category_id = data.category_id
      return {response, category_id}
    })

  await axios.get(`https://api.mercadolibre.com/items/${id}/description`)
    .then(function(d) {
      const data = d.data
      response.item.description = data.plain_text
      return response
    })

  await axios.get(`https://api.mercadolibre.com/categories/${category_id}`)
  .then(function(d) {
    const data = d.data
    const categories = data.path_from_root

    categories.forEach(category => {
      response.categories.push(category.name)  
    })

    return response
  })
  
  res.json(response)
})

module.exports = router;