const express = require('express');
const app = express();
const connection = require('./src/database/database');
const bodyParser = require('body-parser');
const routerTipoInvestimento = require('./src/routers/TipoInvestimentoRouter');
const routerInvestimento = require('./src/routers/InvestimentoRouter');
const routerAporte = require('./src/routers/AporteRouter');
const routerProvento = require('./src/routers/ProventoRouter');
const routerUser = require('./src/routers/UserRouter');
const routerNodemail = require('./src/routers/NodemailRouter');

require('dotenv').config();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routerNodemail);
app.use(routerTipoInvestimento);
app.use(routerInvestimento);
app.use(routerAporte);
app.use(routerProvento);
app.use(routerUser);

//DATABASE
connection
  .authenticate()
  .then(() => {
    console.log('Conexão feita com banco de dados');
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

app.get('/', (req, res) => {
  res.send('primeiro get');
});

app.listen(process.env.PORT_APP, () => {
  console.log('API rodando');
});
