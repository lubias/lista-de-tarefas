const swaggerAutogen = require('swagger-autogen')({
  openapi: '3.0.0',
  language: 'pt-BR',
});

const outputFile = './swagger_output.json';
const endpointFiles = ['../src/routes.js'];

let doc = {
  info: {
      version: "1.0.0",
      title: "API Lista",
      description: "Documentação Lista."
  },
  servers:[
      {
          url: "http://localhost:4000",
          description: "Servidor localhost"
      },
      {
          url: "https://lista-de-tarefas-six-mu.vercel.app/",
          description: "Servidor de produção"
      }
  ],
  consumes: ['application/json'],
  produces: ['aplication/json'],
  components: {
      schemas: [ 'localhost' ]
  }
};

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
  console.log("Documentação do Swagger gerada encontra-se no arquivo em: "+outputFile);
  if(process.env.NODE_ENV !== 'production'){
      require("../index.js");
  }
});