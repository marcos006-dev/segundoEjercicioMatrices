'useStrict';

import {
  mostrarMensaje,
  verificarValorInputs,
  reglasVerificacionMatrices,
  generarInputsMatriz,
  cargarValoresMatrices,
  multiplicarMatrices,
  generarTablaResultado,
} from './helpers.js';

// declaro objeto para almacenar los datos de las columnas y las filas de matriz 1 y 2
const datosMatrices = {
  filasMatriz1: 0,
  columnasMatriz1: 0,
  filasMatriz2: 0,
  columnasMatriz2: 0,
};

// callback para manejar el evento onchange de los input de las filas y columnas de las matrices

const obtenerDatosMatrices = (e) => {
  // obtener el valor del input
  const valorInput = e.target.value;
  // obtener id del input
  const idInput = e.target.id;

  // limpiar el contenedor de inputs y de resultados
  document.getElementById('contenedor-inputs').innerHTML = '';
  document.getElementById('contenedor-resultado-multiplicacion').innerHTML = '';
  // verificar valores del input
  const [estado, mensaje] = verificarValorInputs(
    idInput,
    valorInput,
    datosMatrices
  );

  // si el valor del input no es correcto se muestra el mensaje de error
  if (!estado) {
    mostrarMensaje(`${mensaje}`, 'alert alert-danger');
    return;
  }

  // añadir al objeto datosMatrices el valor del input y limpiar el mensaje

  datosMatrices[idInput] = valorInput;

  mostrarMensaje('', '');

  // verificar que las reglas de verificacion de las matrices se cumplan
  const [estadoRegla, mensajeRegla] = reglasVerificacionMatrices(datosMatrices);

  if (!estadoRegla) {
    mostrarMensaje(`${mensajeRegla}`, 'alert alert-danger');
    return;
  }

  // llamar funcion para generar inputs para cargar los datos de las matrices
  generarInputsMatriz(
    datosMatrices.filasMatriz1,
    datosMatrices.columnasMatriz1,
    'matriz1'
  );
  generarInputsMatriz(
    datosMatrices.filasMatriz2,
    datosMatrices.columnasMatriz2,
    'matriz2'
  );

  document.getElementById('btnCalcularMatrices').disabled = false;
};

// funcion para cargar los inputs de las matrices

document.getElementById('btnCalcularMatrices').addEventListener('click', () => {
  // obtener los valores de la matriz 1
  const [estadoMatriz1, resultadoMatriz1] = cargarValoresMatrices(
    datosMatrices,
    'filasMatriz1',
    'columnasMatriz1',
    'matriz1'
  );

  if (!estadoMatriz1) {
    mostrarMensaje(`${resultadoMatriz1}`, 'alert alert-danger');
    return;
  }

  const [estadoMatriz2, resultadoMatriz2] = cargarValoresMatrices(
    datosMatrices,
    'filasMatriz2',
    'columnasMatriz2',
    'matriz2'
  );

  if (!estadoMatriz2) {
    mostrarMensaje(`${resultadoMatriz2}`, 'alert alert-danger');
    return;
  }

  mostrarMensaje('', '');
  //   console.log(resultadoMatriz1);
  //   console.log(resultadoMatriz2);
  const resultadoMultiplicacion = multiplicarMatrices(
    resultadoMatriz1,
    resultadoMatriz2
  );

  generarTablaResultado(resultadoMultiplicacion);
});

// funcion para generar los inputs para cargar los datos de las matrices

window.addEventListener('DOMContentLoaded', (e) => {
  //   manejando el evento keyup para las filas del input de la matriz 1
  document
    .getElementById('filasMatriz1')
    .addEventListener('keyup', obtenerDatosMatrices);

  //   manejando el evento keyup para las columnas del input de la matriz 1
  document
    .getElementById('columnasMatriz1')
    .addEventListener('keyup', obtenerDatosMatrices);

  //   manejando el evento keyup para las filas del input de la matriz 1
  document
    .getElementById('filasMatriz2')
    .addEventListener('keyup', obtenerDatosMatrices);

  //   manejando el evento keyup para las columnas del input de la matriz 1
  document
    .getElementById('columnasMatriz2')
    .addEventListener('keyup', obtenerDatosMatrices);
});
