import express, { Request, Response } from 'express';
import cors from 'cors';
import animeRoutes from '../routes/animesRoutes';
import episodiosRoutes from '../routes/episodiosRoutes';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


//ROTAS PARA OS ANIMES
app.use('/anime', animeRoutes);

//ROTAS PARA OS ESPISÓDIOS
app.use('/episodios', episodiosRoutes);

//ROTAS PARA OS PERSONAGENS
//app.use();
 
 

//teste para saber se o servidor esta funcionando
app.get('/', (req, res) => {
    res.send('Hello World!');
});
// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});