const postPredictHandler = require('../server/handler');
// const getPredictHistoriesHandler = require('../handlers/getPredictHistoriesHandler');
const { getPredictHistoriesHandler }= require('../services/storeData')
 
const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true
      }
    }
  } ,

  {
    path: '/predict/histories',
    method: 'GET',
    handler: getPredictHistoriesHandler
}
];
 
module.exports = routes;
