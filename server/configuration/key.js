if(process.env.NODE_ENV === 'production'){
    module.exports = require('./product.js');
}else{
    module.exports = require('./develop.js');
}