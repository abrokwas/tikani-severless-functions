//const items = require('../assets/data')

require('dotenv').config()
const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_TIKANI_STORE_API_KEY })
  .base('appQKcJtFt1R39aIO')
  .table('products')

exports.handler = async (event, context, cb) => {
  try {
    const {records} = await airtable.list()
    const products = records.map((product)=>{
      const {id} = product;
      const {name,images,price} = product.fields
      const url = images[0].url 
      return {id,name,url,price}
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
