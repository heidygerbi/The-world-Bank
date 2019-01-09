// variables globales 
/* global WORLDBANK:true */
/* eslint no-undef: "error" */
/* *********** FUNCIONES PARA CREAR TABLAS DINÁMICAS *********** */
// Función para conocer caption de indicators

const indicatiorsCaption = (indicatorsArr, ind) => {
  // indicatorsArr = WORLDBANK[element].indicators;
  let indicatorNameArr = [];
  indicatorNameArr = indicatorsArr.filter(populationElement => populationElement.indicatorCode === ind);
  return indicatorNameArr;
};

/* *********** FUNCIONES ESPECIALIZADAS *********** */
// Función con filterData 
const filterData = (country, arrYear, ind) => {
  let matrix = [];
  // let nameLimit = 0;
  country.forEach((element) => {
    let indicatorDateArr = [];
    let indicatorResult = [];
    let indicatorNameArr = [];
    const indicatorsArr = WORLDBANK[element].indicators;
    // console.log(indicator)
    indicatorNameArr = indicatiorsCaption(indicatorsArr, ind);
    indicatorDateArr = indicatorNameArr[0].data;
    // if (nameLimit === 0) addTableCaption(indicatorNameArr[0].indicatorName);
    // nameLimit++;
    // console.log(indicatorDateArr);
    for (let prop in indicatorDateArr) {
      if (prop >= arrYear[0] && prop <= arrYear[1]) { // prop hace referencia a la propiedad del objeto (en este caso años)
        let indDateArrTwoDec = 0;
        if (typeof (indicatorDateArr[prop]) === 'number') indDateArrTwoDec = indicatorDateArr[prop].toFixed(2);
        else indDateArrTwoDec = '';
        indicatorResult.push(indDateArrTwoDec);
      }
    }
    matrix.push(indicatorResult);
  });
  return matrix;
};

// Función para promedio
const computeStats = (array) => {
  let prom = [];
  let j = 0;
  let sum = 0;
  array.forEach(element => {
    sum = element.reduce((previous, current) => {
      console.log(current);
      console.log(previous);
      if (current != '' || current !== undefined || previous !== isNaN) {
        console.log('soy current'+current);
        console.log('soy previous'+previous);
        j++;
        return (parseInt(previous) + parseInt(current));
      }
    }, 0);
    console.log(sum);
    let avg = sum / j;
    prom.push(avg.toFixed(2));
  });
  return prom;
};
// Función para ordenar
const sortData = (data, sortOrder) => {
  if (sortOrder === 'asc') {
    let reversed = [];
    // console.log(data);
    let copyData = [...data];
    // console.log(copyData);
    for (let i = 0; i < copyData.length; i++) {
      reversed.push(copyData[i].reverse());
    }
    return reversed;
  } else if (sortOrder === 'desc') return data;
};


// const frequentIndicator = (ind) => {
//   let country = ['PER', 'CHL', 'MEX', 'BRA'];
//   const indicator = ind;
//   newRowTableCountry(country);
//   newRowTableYear(2017, 2017);
//   showForEach(country, 2017, 2017, indicator);
// };
window.worldbank = {
  sortData,
  computeStats,
  indicatiorsCaption,
  filterData
};