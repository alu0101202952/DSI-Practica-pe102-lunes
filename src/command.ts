import * as yargs from 'yargs';
import chalk from "chalk";
import { RequestType, ResponseType } from './types';
import * as net from 'net';
import { join } from 'path';


function saveUser(user: string) {
    let fs = require("fs");
    const dir = `./${user}`;
    //Se comprueba que existe el directorio si no se crea
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    //Nombre que se le atribuye al fichero y extensión
    let fileName = user + '.json';
    fileName = join(dir, fileName);
    //Coge un objeto y la convierte a formato JSON
    fs.writeFileSync(fileName, JSON.stringify(user));
  
}

/**
 * Función addTodo, añade la nota como una petición al servidor
 * @param request petición al servidor
 * @returns el añadir una nota guardándola con la función saveTodo pero antes
 * confirmando que corresponde con el usuario, título y el color, en otro caso
 * no será posible notificando error con success: false
 */
export function addUser(request: RequestType): ResponseType {
    if (!(request.email)) {
        let nameIn = request.name;
        if (nameIn) {
        saveUser(request.name);
        return {success: true, type: 'add'};
        } 
        else{
            return {success: false, type:'add'}
        }
    } else{
        return {success: false, type:'add'}
    }
}




/**
 * Yargs.command = add
 * Se añade las notas con un formato similar a:
 * add --user="edusegre" --title="Red note" --body="This is a red note" --color="red"
 */
yargs.command({
  command: 'add',
  describe: 'Add a new user',
  builder: {
    name: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    surname: {
      describe: 'User surname',
      demandOption: true,
      type: 'string',
    },
    age: {
      describe: 'User age',
      demandOption: true,
      type: 'number',
    },
    email: {
      describe: 'User email',
      demandOption: true,
      type: 'string',
    },
    password: {
        describe: 'User password',
        demandOption: true,
        type: 'string',
    },
  },
  handler(argv: { name: any; surname: any; age: any; email: any; password: any; color: any; user: any; title: any; body: any; }) {
    if (typeof argv.name === 'string' && typeof argv.surname === 'string' && typeof argv.age === 'number' && typeof argv.email === 'string'  && typeof argv.password === 'string') {
      const email =argv.email;
      if(email) {
        const request: RequestType = {
          type: 'add',
          name: argv.name,
          surname: argv.surname,
          age: argv.age,
          email: argv.email,
          password: argv.password,
        };
        // cliente conectará al puerto de escucha del servidor
        // y escribirá el .json correspondiente a la nota que se añada
        const client = net.connect({port: 60300});
        client.write(JSON.stringify(request) + '\0');

        // se almacena dicha acción de la petición
        let wholeData = '';
        client.on('data', (dataChunk) => {
          wholeData += dataChunk;
        });

        // Esto hasta que el cliente señalice el fin de dicha petición
        client.on('end', () => {
          const response: ResponseType = JSON.parse(wholeData);
          if(response.success) {
            console.log(chalk.green('New user added!'));
          } else {
            console.log(chalk.red('No added...'));
          }
        });
      } else {
        console.log(chalk.red('Invalid email'));
      }
    } else {
      console.log(chalk.red('It is necesary to give all the arguments'));
    }
  },
});


