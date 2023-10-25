function routes(app) {
    app.use('/tarefas', require('./routes/tarefas.js'));
    return; 
}

module.exports = routes;