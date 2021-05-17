
/**
 * @type RequestType atributos de petición de notas al servidor
 * type: atributo con la acción a realizar con las notas
 * user: usuario de la nota
 * title: titulo de la nota
 * body: cuerpo de la nota
 * color: color de la nota definido por los tipos de colores permitidos
 */
export type RequestType = {
  type: 'add' | 'list' | 'update' | 'remove';
  name: string,
  surname: string,
  age: number,
  email: string,
  password: string,
}

/**
 * @type ResponseType atributos de respuesta del servidor a la gestión de notas
 * type: acción realizada a la que se responde
 * success: boolean que indica si se realizó la acción correctamente(true) o no(false)
 * notes: atributo que tiene las colecciones de notas
 */
export type ResponseType = {
  type: 'add' | 'list' | 'update' | 'remove' | 'error';
  success: boolean;
}
