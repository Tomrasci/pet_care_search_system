import app from './app';

const port = 3002;

app.set('port', process.env.PORT || port);
app.listen(app.get('port'), () => {
  console.log(`Apllication started, listening on port ${app.get('port')}`);
});
