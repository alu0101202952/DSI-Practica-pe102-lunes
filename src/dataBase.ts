import {MongoClient} from 'mongodb';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'users';

interface UserInterface {
  name: string,
  surname: string,
  age: number,
  email: string,
  password: string,
}

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
        surname: 'Gonzalez',
        age: 34,
        email: 'juang@ull.edu.es', 
        password: 'job'
    },
  ]);
}).then((result) => {
  console.log(result.insertedCount);
}).catch((error) => {
  console.log(error);
});