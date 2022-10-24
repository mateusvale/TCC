const { response, request } = require('express');
const express = require ('express');
const { curly } = require('node-libcurl');
const cors = require('cors');

const app = express();

app.use(express.json())

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.get('/onibus/:linha', cors(corsOptions), async (request, response) => {
    let { linha } = request.params;
    linha = linha == ":linha" ? "" : linha
    const url = `https://jeap.rio.rj.gov.br/dadosAbertosAPI/v2/transporte/veiculos/onibus2/${linha}`
    const { statusCode, data, headers } = await curly.get(url)
    return response.status(200).json(data)
  })

app.listen(3333)