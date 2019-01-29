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
        category: data.available_filters[0].values[0].name,
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
          free_shipping: item.shipping.free_shipping,
          seller_address: item.seller_address.state.name
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

  let d = await axios.get(`https://api.mercadolibre.com/items/${id}`)
  let data = d.data

  const price = String(data.price).split('.')
  console.log(price)
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
      picture: data.pictures[0].secure_url,
      condition: data.condition,
      free_shipping: data.shipping.free_shipping,
      sold_quantity: data.sold_quantity,
      seller_address: data.seller_address.state.name
    }
  }

  category_id = data.category_id

  d = await axios.get(`https://api.mercadolibre.com/items/${id}/description`)
  data = d.data
  response.item.description = data.plain_text

  d = await axios.get(`https://api.mercadolibre.com/categories/${category_id}`)
  data = d.data
  const categories = data.path_from_root

  categories.forEach(category => {
    response.categories.push(category.name)  
  })
 
  res.json(response)
})

module.exports = router;