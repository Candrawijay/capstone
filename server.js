// server.js
'use strict';

const Hapi = require('@hapi/hapi');
const predictRoute = require('./routes/predictRoute');  // Pastikan path ini sesuai

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  // Menambahkan rute ke server
  server.route(predictRoute);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
