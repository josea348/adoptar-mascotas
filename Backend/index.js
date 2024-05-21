import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import routUsers from './src/Routers/router.users.js';
import routPets from './src/Routers/router.pets.js';
import routCategorie from './src/Routers/router.categories.js';
import routRaces from './src/Routers/router.races.js';
import routGenders from './src/Routers/router.genders.js';
import routValidarUser from './src/Routers/router.autentication.js';

const servidor = express();

servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: true }));

servidor.use(express.static('./public'));

servidor.use(cors());

servidor.use('/user', routUsers);
servidor.use('/pets', routPets);
servidor.use('/categories', routCategorie);
servidor.use('/races', routRaces);
servidor.use('/genders', routGenders);
servidor.use(routValidarUser);

servidor.listen(3000, () => {
  console.log(`Servidor rodando en el puerto 3000`);
})