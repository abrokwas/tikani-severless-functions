require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_TIKANI_STORE_API_KEY })
  .base('appQKcJtFt1R39aIO')
  .table('products')
exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters
  if (id) {
    try {
      const product = await airtable.retrieve(id)
      if (product.error) {
        return {
          headers: {
            'Access-Control-Allow-Origin': '*',
            },  
          statusCode: 404,
          body: `No product with id: ${id}`,
        }
      }
      return {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify(product),
      }
    } catch (error) {
      return {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: 500,
        body: `Server Error`,
      }
    }
  }
  try {
    const {records} = await airtable.list()
    const products = records.map((product)=>{
      const {id} = product;
      const {name,images,price,category,company,colors,shipping,description,stock, stars, reviews,featured} = product.fields
      const url = images[0].url 
      return {id,url,name,price,category,company,colors,shipping,description,images,stock, stars, reviews,featured}
    })
    
    return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
    body: JSON.stringify(products),
  }
  } catch (error) {
    return {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: 500,
    body: 'server error',
  }
  }
}