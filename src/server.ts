import * as net from 'net';
import { RequestType, ResponseType } from './types';
import { MessageEventEmitterClient } from './eventEmitterClient';
import { addUser } from './command';

/**
 * Función todoFields, maneja las peticiones y si se introducen correctamente los tipos de atributos
 * para el manejo de nota, comprobando que sean de tipo string
 * @param request petición del servidor 
 * @param checkName nombre del usuario
 * @param checkSurname apellido
 * @param checkAge edad
 * @param checkEmail email
 * @param checkPassword contraseña
 * @returns true si se cumple que todos los anteriores atributos de la petición son tipo string y number
 */
function todoFields(request: RequestType, checkName: boolean, checkSurname: boolean, checkAge: boolean, checkEmail: boolean, checkPassword: boolean): boolean {
  if (checkName && typeof request.name !== 'string') {
    return false;
  }
  if (checkSurname && typeof request.surname !== 'string') {
    return false;
  }
  if (checkAge && typeof request.age !== 'number') {
    return false;
  }
  if (checkEmail && typeof request.age !== 'string') {
    return false;
  }
  if (checkPassword && typeof request.age !== 'string') {
    return false;
  }
  return true;
}

/**
 * Función processRequest procesa los tipos de peticiones, por ahora intentadas add
 * añadir notas
 * @param request petición al servidor
 * @returns respuesta al añadido de la nota por petición en caso contrario se impondrá que no fue
 * satisfactorio con success: false, un atributo de la respuesta de servidor que indica a modo de
 * localizador de errores
 */
function processRequest(request: RequestType): ResponseType {
  if (typeof request.type === 'string' && typeof request.email === 'string') {
    if (request.type == 'add') {
        if (todoFields(request, true, true, true, true, true)) {
          return addUser(request);
        } else {
          return { type: 'error', success: false};
        }
    } else {
      return { type: 'error', success: false};
    }
  } else {
    return { type: 'error', success: false};
  }
}

/**
 * En la siguiente parte se crea un servidor que está escuchando
 * y escribiendo todas las respuesta con respecto a la peticiones que
 * se realizan para ello se escribirán en notas.json con las que se 
 * trabajará
 */
const server = net.createServer((connection) => {
  const listener = new MessageEventEmitterClient(connection);
  listener.on('request', (request: RequestType) => {
    const response = processRequest(request);
    connection.write(JSON.stringify(response));
    connection.end();
  });
});

server.listen(60300);