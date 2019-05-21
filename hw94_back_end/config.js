const path = require('path');
const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, 'public/uploads'),
    dbUrl: 'mongodb://localhost/hw89',
    mongoOptions: {
      useNewUrlParser: true,
      useCreateIndex: true
    },
  facebook: {
    appId: '352798085373485',
    appSecret: 'f5bfa3e4c88a9b1e0956aa0d5fb3e020'
  }
};