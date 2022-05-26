import app from './app'


const port = Number(process.env.PORT || process.env.PORT || 8080);
app.listen(port, () => {
  console.info('Express application started on port: ' + port);
});