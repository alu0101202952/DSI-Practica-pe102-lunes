
import {MongoClient} from 'mongodb';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'dsi-assessment';

function insertEmail(email: string) {
    email=email;
}
interface UserInterface {
  name: string,
  surname: string,
  age: number,
  email: string,
  password: string,
}

ObjectEmail = insertEmail("jperez@ull.edu.es")

/**
 * Crear usuario
 */
MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const db = client.db(dbName);

  return db.collection<UserInterface>('users').insertMany([
    {
      name: 'Andrea',
      surname: 'Calero',
      age: 21,
      email: 'alu0101202952@ull.edu.es', 
      password: 'magic'
    },
    {
        name: 'Juan',
        surname: 'Perez',
        age: 22,
        email: 'jperez@ull.edu.es', 
        password: 'job'
    },
  ]);
}).then((result) => {
  console.log(result.insertedCount);
}).catch((error) => {
  console.log(error);
});

/**
 * Buscar usuario
 */
MongoClient.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((client) => {
    const db = client.db(dbName);
  
    return db.collection<UserInterface>('users').find({
      email: 'alu0101202952@ull.edu.es',
    }).toArray();
  }).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });


/**
 * Actualizar un usuario teniendo en cuenta el email como identificador
 */
MongoClient.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  const db = client.db(dbName);

  return db.collection<UserInterface>('notes').updateOne({
    email_: new ObjectEmail('jperez@ull.edu.es'),
  }, {
    // Cambia la contraseña de job a love
    $set: {
        name: 'Juan',
        surname: 'Perez',
        age: 22,
        email: 'jperez@ull.edu.es', 
        password: 'love'
    },
  });
}).then((result) => {
  console.log(result.modifiedCount);
}).catch((error) => {
  console.log(error);
});




