// let caption = '';
let matrix = [];
let dateRange = [];
let ElementClick = '';
let bool = true;
// btn-submit
const btnSubmit = document.getElementById('btn-submit');
let btnIndex = document.getElementById('btn-index');
let btnSearch = document.getElementById('btn-search');
btnSubmit.addEventListener('click', () => {
  document.getElementById('table-result').style.display = 'block';
  document.getElementById('btn-order').style.display = 'block';
  document.getElementById('table-container').innerHTML = '';
  document.getElementById('table-prom').innerHTML = '';
  matrix = worldbank.filterData(searchMutipleCountry(), searchRangeYear(), indicator());
  generateTable(matrix, 'table-container');
  generateSumaryTable(worldbank.computeStats(matrix), searchMutipleCountry());
});

const generateSumaryTable = (prom, arrCountry) => {
  const bodyProm = document.getElementById('table-prom');
  const tablaProm = document.createElement('TABLE');
  const node = document.createElement('CAPTION');
  const textnode = document.createTextNode('Promedio por paises');
  node.appendChild(textnode);
  const tblBodyProm = document.createElement('TBODY');
  const hileraProm = document.createElement('TR');
  arrCountry.forEach(element => {
    const celdaProm = document.createElement('TH');
    let textoCeldaProm = document.createTextNode(element);
    celdaProm.appendChild(textoCeldaProm);
    hileraProm.appendChild(celdaProm);
    // document.getElementById('prom').innerHTML =`${element} `;  
  });
  const hileraProm1 = document.createElement('TR');
  prom.forEach(element => {
    const celdaProm = document.createElement('TD');
    let textoCeldaProm = document.createTextNode(element);
    celdaProm.appendChild(textoCeldaProm);
    hileraProm1.appendChild(celdaProm);
    // document.getElementById('prom').innerHTML =`${element} `;  
  });
  tblBodyProm.appendChild(hileraProm);
  tblBodyProm.appendChild(hileraProm1);

  // posiciona el <tbody> debajo del elemento <table>
  tablaProm.appendChild(tblBodyProm);

  tablaProm.appendChild(node);
  // appends <table> into <body>
  bodyProm.appendChild(tablaProm);


  // document.getElementById('prom').appendChild(node);
};

const generateTable = (matr, origin) => {

  document.getElementById(origin).innerHTML = '';

  const indicator2 = indicator();
  const caption = worldbank.caption(indicator2);
  // Obtener la referencia del elemento body
  const body = document.getElementById(origin);
  // Crea un elemento <table> y un elemento <tbody>
  // let caption =worldbank.indicatiorsCaption();
  const divTable = document.createElement('DIV');
  divTable.setAttribute('id', 'table-container-unique');
  const tabla = document.createElement('TABLE');
  const tblBody = document.createElement('TBODY');

  const arrCountry = searchMutipleCountry();
  const range = searchRangeYear();

  const node = document.createElement('H3');
  const textnode = document.createTextNode(`${caption}, del ${dateRange[0]} al ${dateRange[1]}`);
  node.appendChild(textnode);
  body.appendChild(node);
  body.appendChild(divTable);
  const hileraYear = document.createElement('TR');

  if (bool) {
    for (let i = range[0] - 1; i <= range[1]; i++) {
      const celdaYear = document.createElement('TH');
      let textoCeldaYear = document.createTextNode(i);
      if (i === range[0] - 1) {
        textoCeldaYear = document.createTextNode('País');
      }
      celdaYear.appendChild(textoCeldaYear);
      hileraYear.appendChild(celdaYear);
      bool = false;
    }
  } else {
    for (let i = range[1]; i >= range[0] - 1; i--) {
      const celdaYear = document.createElement('TH');
      let textoCeldaYear = document.createTextNode(i + 1);
      if (i === range[1]) {
        textoCeldaYear = document.createTextNode('País');
      }
      celdaYear.appendChild(textoCeldaYear);
      hileraYear.appendChild(celdaYear);
    } bool = true;
  }
  tblBody.appendChild(hileraYear);
  // Crea las celdas
  for (let i = 0; i < matr.length; i++) {
    // Crea las hileras de la tabla
    const hilera = document.createElement('TR');
    const celdaTitulo = document.createElement('TH');
    const textoCeldaTitulo = document.createTextNode(arrCountry[i]);
    celdaTitulo.appendChild(textoCeldaTitulo);
    hilera.appendChild(celdaTitulo);
    for (let j = 0; j < matr[i].length; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      const celda = document.createElement('TD');
      const textoCelda = document.createTextNode(matr[i][j]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }
  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  divTable.appendChild(tabla);
};

/* *********** FUNCIONES PARA MENÚ DE BÚSQUEDA *********** */
// función para seleccionar multiples paises
const searchMutipleCountry = () => {
  const country = document.frm['country[]'];
  const CountryArray = [];
  for (let i = 0; i < country.length; i++)
    if (country[i].checked) CountryArray.push(country[i].value);
  // else return alert('Debe selecionar al menos 1 país');
  return CountryArray;
};
// función para seleccionar una rango de fechas
const searchRangeYear = () => {
  dateRange = [document.frm['date-one'].value, document.frm['date-two'].value];
  if (dateRange[0].value >= dateRange[1].value) return alert('Rango de fecha inválido');
  else return dateRange;
};
// función para conocer indicador deseado
const searchIndicator = () => {
  let indicat = document.frm['category[]'];
  let IndicatorString = '';
  for (let i = 0; i < indicat.length; i++)
    if (indicat[i].checked) IndicatorString = indicat[i].value;
  // else return 'Debe selecionar 1 categoría';
  return IndicatorString;
};
// función para conocer genero seleccionado
const searchSex = () => {
  let sexArr = document.frm['sex[]'];
  let sexString = '';
  for (let i = 0; i < sexArr.length; i++)
    if (sexArr[i].checked) sexString = sexArr[i].value;
  // else return 'Debe selecionar 1 genero';
  return sexString;
};
// función para identificar indicador específico (según sexo)
const indicator = () => { // ind
  let indicator = '';
  const IndicatorString = searchIndicator();
  const sexString = searchSex();
  if (IndicatorString === 'SL.TLF.BASC.ZS' && sexString === 'FE') indicator = 'SL.TLF.BASC.FE.ZS';
  else if (IndicatorString === 'SL.TLF.BASC.ZS' && sexString === 'MA') indicator = 'SL.TLF.BASC.MA.ZS';
  else if (IndicatorString === 'SL.TLF.INTM.ZS' && sexString === 'FE') indicator = 'SL.TLF.INTM.FE.ZS';
  else if (IndicatorString === 'SL.TLF.INTM.ZS' && sexString === 'MA') indicator = 'SL.TLF.INTM.MA.ZS';
  else if (IndicatorString === 'SL.TLF.ADVN.ZS' && sexString === 'FE') indicator = 'SL.TLF.ADVN.FE.ZS';
  else if (IndicatorString === 'SL.TLF.ADVN.ZS' && sexString === 'MA') indicator = 'SL.TLF.ADVN.MA.ZS';
  else if (IndicatorString === 'SL.TLF.ACTI.ZS' && sexString === 'FE') indicator = 'SL.TLF.ACTI.FE.ZS';
  else if (IndicatorString === 'SL.TLF.ACTI.ZS' && sexString === 'MA') indicator = 'SL.TLF.ACTI.MA.ZS';
  return indicator;
};

const hidenDiv = (div1, div2) => {
  document.getElementById(div1).style.display = 'block';
  document.getElementById(div2).style.display = 'none';
};

btnIndex.addEventListener('click', () => {
  hidenDiv('index', 'search');
});

btnSearch.addEventListener('click', () => {
  hidenDiv('search', 'index');
});



const printMainIndicators = (paramIndicator) => {
  const arrCountry = ['PER', 'CHL', 'MEX', 'BRA'];
  const arrYear = ['2012', '2017'];
  document.getElementById('caption').innerHTML = '';
  document.getElementById('table-wrapper').innerHTML = '';
  const ind2 = document.getElementById(paramIndicator).value;
  document.getElementById('caption').innerHTML = worldbank.caption(ind2);
  matrix = worldbank.filterData(arrCountry, arrYear, ind2);
  generateTableMainIndicators(matrix, 'table-wrapper');
  colletionsPer = matrix[0];
  colletionsChl = matrix[1];
  colletionsMex = matrix[2];
  colletionsBra = matrix[3];
  console.log('Matriz ' + matrix[0]);
  console.log('colletionsPer ' + colletionsPer);
  console.log('colletionsChl ' + colletionsChl);
  console.log('colletionsMex ' + colletionsMex);
  console.log('colletionsBra ' + colletionsBra);
  grafica(matrix);
};
document.onclick = captureClick;
function captureClick(element) {
  // Funcion para capturar el click del raton
  let click;
  if (element !== null) {
    // Si ha hecho click sobre un destino, lo leemos
    click = element.target;
  }
  // Añadimos el elemento al array de elementos
  ElementClick = click;
  // Una prueba con salida en consola
  switch (ElementClick.id) {
    case 'SH':
      printMainIndicators(ElementClick.id);
      break;
    case 'SG':
      printMainIndicators(ElementClick.id);
      break;
    case 'SP':
      printMainIndicators(ElementClick.id);
      break;
    case 'IC':
      printMainIndicators(ElementClick.id);
      break;
    case 'ICF':
      printMainIndicators(ElementClick.id);
      break;
    case 'COV':
      printMainIndicators(ElementClick.id);
      break;
  }
}
// btn-order-asc
const btnOrderAsc = document.getElementById('order-asc');
btnOrderAsc.addEventListener('click', () => {
  let resultMatrix = worldbank.sortData(matrix, 'asc');
  generateTable(resultMatrix, 'table-container');
});



const generateTableMainIndicators = (matr, origin) => {

  document.getElementById(origin).innerHTML = '';
  // Obtener la referencia del elemento body
  const body = document.getElementById(origin);
  // Crea un elemento <table> y un elemento <tbody>
  const tabla = document.createElement('TABLE');
  const tblBody = document.createElement('TBODY');


  const arrCountry = ['PER', 'CHL', 'MEX', 'BRA'];
  const range = ['2012', '2017'];
  const hileraYear = document.createElement('TR');

  for (let i = range[0] - 1; i <= range[1]; i++) {
    const celdaYear = document.createElement('TH');
    let textoCeldaYear = document.createTextNode(i);
    if (i === range[0] - 1) {
      textoCeldaYear = document.createTextNode('País');
    }
    celdaYear.appendChild(textoCeldaYear);
    hileraYear.appendChild(celdaYear);

  }

  tblBody.appendChild(hileraYear);
  // Crea las celdas
  for (let i = 0; i < matr.length; i++) {
    // Crea las hileras de la tabla
    const hilera = document.createElement('TR');
    const celdaTitulo = document.createElement('TH');
    const textoCeldaTitulo = document.createTextNode(arrCountry[i]);
    celdaTitulo.appendChild(textoCeldaTitulo);
    hilera.appendChild(celdaTitulo);
    for (let j = 0; j < matr[i].length; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      const celda = document.createElement('TD');
      const textoCelda = document.createTextNode(matr[i][j]);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
    }
    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }
  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tabla);
};
// crear grafica de barra
const grafica = (matrix) =>{
  $(document).ready(function() {
    let datos = {
    labels: ['2012', '2013', '2014', '2015', '2016', '2017'],
    datasets: [{
      label: 'PER',
      backgroundColor: 'rgba(220,220,220,0.5)',
      data: matrix[0]
    },
    {

      label: 'CHL',
      backgroundColor: 'rgba(151,187,205,0.5)',
      data: matrix[1]
    },
    {
      label: 'MEX',
      backgroundColor: 'rgba(151,100,205,0.5)',
      data: matrix[2]
    },
    {
      label: 'BRA',
      backgroundColor: 'rgba(151,200,205,0.5)',
      data: matrix[3]
    }
    ]
    };


    let canvas = document.getElementById('chart').getContext('2d');
    window.bar = new Chart(canvas, {
      type: 'bar',
      data: datos,
      options: {
        elements: {
          rectangle: {
            borderWidth: 1,
            borderColor: 'rgb(0,255,0)',
            borderSkipped: 'bottom'
          }
        },
        responsive: true,
        // title: {
        //   display: true,
        //   text: caption
        // }
      }
    });

    // setInterval(function () {
    //   var newData = [
    //     [getRandom(), getRandom(), getRandom(), getRandom() * -1, getRandom()],
    //     [getRandom(), getRandom(), getRandom(), getRandom(), getRandom()],
    //     [getRandom(), getRandom(), getRandom(), getRandom(), getRandom()],
    //   ];

    //   $.each(datos.datasets, function (i, dataset) {
    //     dataset.data = newData[i];
    //   });
    //   window.bar.update();
    // }, 5000);




    // function getRandom() {
    //   return Math.round(Math.random() * 100);
    // }


  });
};