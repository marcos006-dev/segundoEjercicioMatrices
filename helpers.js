// funcion para manejar los mensajes de respuesta

export const mostrarMensaje = (mensaje, claseCSS) => {
  const divMensaje = document.querySelector('#respuesta');
  divMensaje.innerHTML = mensaje;
  divMensaje.className = `col-md-12 col-sm-12 col-xs-12 mt-4 ${claseCSS}`;
};

export const verificarValorInputs = (idInput, valorInput, datosMatrices) => {
  // validar que el valor del input sea un numero
  if (isNaN(valorInput) || valorInput === 'e') {
    return [false, `El valor del input ${idInput} debe ser un numero`];
  }

  // validar que el valor del input sea mayor a 0
  if (valorInput <= 0) {
    return [false, `El valor del input ${idInput} debe ser mayor a 0`];
  }

  // verificar si existe la clave en el objeto datosMatrices
  if (!datosMatrices.hasOwnProperty(idInput)) {
    return [false, `El input ${idInput} no existe`];
  }

  return [true, ''];
};

export const reglasVerificacionMatrices = (datosMatrices) => {
  // validar que las columnas de la matriz 1 y las filas de la matriz 2 sean iguales
  if (datosMatrices.columnasMatriz1 !== datosMatrices.filasMatriz2) {
    return [
      false,
      `Las columnas de la matriz 1 y las filas de la matriz 2 deben ser iguales`,
    ];
  }

  // verificar que las filas y columnas de las matriz 1 y 2 sean mayor a 0
  if (
    datosMatrices.filasMatriz1 <= 0 ||
    datosMatrices.columnasMatriz1 <= 0 ||
    datosMatrices.filasMatriz2 <= 0 ||
    datosMatrices.columnasMatriz2 <= 0
  ) {
    return [
      false,
      `Las filas y columnas de las matrices deben ser mayores a 0`,
    ];
  }

  return [true, ''];
};

export const generarInputsMatriz = (filas, columnas, nombreMatriz) => {
  // crear un tabla para almacenar los inputs

  // se define la tabla y su cabecera
  let tableMatrices = `
    <table class="table table-bordered table-striped table-hover table-responsive">
    <thead>
        <tr>
            <th colspan="${columnas}" class="text-center" scope="col">${nombreMatriz}</th>
        </tr>
    </thead>
    <tbody>
    `;

  // se crean las filas de la tabla
  for (let i = 0; i < filas; i++) {
    tableMatrices += `
        <tr>
        `;

    // se crean las columnas de la tabla
    for (let j = 0; j < columnas; j++) {
      tableMatrices += `
        <td>
            <input type="number" class="form-control" id="${nombreMatriz}-${i}-${j}" placeholder="${i}-${j}">
        </td>
            `;
    }
    // se cierra la fila
    tableMatrices += `
        </tr>
        `;
  }

  // se cierra la tabla
  tableMatrices += `
    </tbody>
    </table>
    `;

  // se inserta la tabla en el contenedor de inputs
  document.getElementById('contenedor-inputs').innerHTML += tableMatrices;
};

export const cargarValoresMatrices = (
  datosMatrices,
  filaMatriz,
  columnaMatriz,
  idMatrizInput
) => {
  // se define el array donde se van a almacenar los valores de la matriz
  const matriz = [];

  // se recorre las filas de la matriz
  for (
    let filasMatriz = 0;
    filasMatriz < datosMatrices[filaMatriz];
    filasMatriz++
  ) {
    //   se crea un array para almacenar los valores de la columna
    const resultColumnaMatriz = [];

    // se recorre las columnas de la matriz
    for (
      let columnasMatriz = 0;
      columnasMatriz < datosMatrices[columnaMatriz];
      columnasMatriz++
    ) {
      // se obtiene el valor del input
      const inputMatriz = document.getElementById(
        `${idMatrizInput}-${filasMatriz}-${columnasMatriz}`
      );

      // se guarda el resultado de las validaciones
      const [estadoVerificacion, mensajeVerificacion] =
        verificarElementosMatriz(
          inputMatriz,
          idMatrizInput,
          filasMatriz,
          columnasMatriz
        );

      // se verifica si el valor del input es valido
      if (!estadoVerificacion) {
        return [false, mensajeVerificacion];
      }
      // se guardar el valor del input en el array de columnas
      inputMatriz.className = 'form-control';
      resultColumnaMatriz.push(parseInt(inputMatriz.value));
    }

    //   se guarda el array de columnas en el array de filas
    matriz.push(resultColumnaMatriz);
  }

  // se retorna el array de la matriz
  return [true, matriz];
};

const verificarElementosMatriz = (
  inputMatriz,
  idMatrizInput,
  filasMatriz,
  columnasMatriz
) => {
  // se verifica que el input no este vacio
  if (inputMatriz.value === '') {
    inputMatriz.className = 'form-control border border-danger';

    return [
      false,
      `El input ${idMatrizInput}-${filasMatriz}-${columnasMatriz} esta vacio`,
    ];
  }

  // se verifica que el input sea un numero

  if (isNaN(inputMatriz.value)) {
    inputMatriz.className = 'form-control border border-danger';

    return [
      false,
      `El input ${idMatrizInput}-${filasMatriz}-${columnasMatriz} debe ser un numero`,
    ];
  }

  return [true, ''];
};

export const multiplicarMatrices = (matriz1, matriz2) => {
  let matriz3 = [0];
  // se recorre las filas de la matriz 1
  for (let i = 0; i < matriz1.length; i++) {
    matriz3[i] = [0];
    // se recorre las filas de la matriz 2
    for (let j = 0; j < matriz2[0].length; j++) {
      matriz3[i][j] = 0;
      // multiplicar cada fila de la matriz 1 por cada columna de la matriz 2
      for (let k = 0; k < matriz1[0].length; k++) {
        matriz3[i][j] += matriz1[i][k] * matriz2[k][j];
      }
    }
  }

  return matriz3;
};

export const generarTablaResultado = (matriz3) => {
  let tableResultado = `
        <table class="table table-bordered table-striped table-hover table-responsive">
        <thead>
            <tr>
                <th colspan="${matriz3[0].length}" class="text-center" scope="col">Resultado</th>
            </tr>
        </thead>
        <tbody>
        `;

  // se crean las filas de la tabla
  for (let i = 0; i < matriz3.length; i++) {
    tableResultado += `
            <tr>
            `;

    // se crean las columnas de la tabla
    for (let j = 0; j < matriz3[0].length; j++) {
      tableResultado += `
            <td>
                <input type="number" class="form-control" id="resultado-${i}-${j}" placeholder="${i}-${j}" value="${matriz3[i][j]}">
            </td>
                `;
    }
    // se cierra la fila
    tableResultado += `
            </tr>
            `;
  }

  // se cierra la tabla
  tableResultado += `
        </tbody>
        </table>
        `;

  // se inserta la tabla en el contenedor de inputs
  document.getElementById('contenedor-resultado-multiplicacion').innerHTML +=
    tableResultado;
};
