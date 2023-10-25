const swaggerAutogen = require('swagger-autogen')({
    openapi: '3.0.0',
    language: 'pt-BR',
  });
  
  let doc = {
    info: {
        version: "1.0.0",
        title: "Lista",
        description: "Documentação da API Lista."
    },
    servers:[
        {
            url: "http://localhost:4000",
            description: "Servidor localhost"
        },
        {
            url: "https://learn-mug-backend.vercel.app",
            description: "Servidor de produção"
        }
    ],
    consumes: ['application/json'],
    produces: ['aplication/json'],
    components: {
        schemas: [ 'localhost' ]
    }
  };
  
  const  outputFile  =  './swagger_output.json' ; 
  const  endpointsFiles  =  [ './src/routes.js' ] ;
  
  swaggerAutogen ( outputFile ,  endpointsFiles ,  doc ) . then ( ( )  =>  {
    console.log("Documentação do Swagger gerada encontra-se no arquivo em: "+ outputFile);
    if(process.env.NODE_ENV !== 'production'){
      require ( '../index.js' ) ;  // arquivo raiz do seu projeto 
    }
  } ) ;