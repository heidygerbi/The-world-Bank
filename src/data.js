/* *********** FUNCIONES PARA CREAR TABLAS DINÁMICAS *********** */
// Función para conocer caption de indicators
const indicatiorsCaption = (indicatorsArr, ind) => {
  let indicatorNameArr = [];
  indicatorNameArr = indicatorsArr.filter(populationElement => populationElement.indicatorCode === ind);
  return indicatorNameArr;
};
const caption = (ind, dtaMundial) => {
  // const dir = WORLDBANK.PER.indicators;
  const dir = dtaMundial.PER.indicators;
  let indicatorNameArr = [];
  indicatorNameArr = dir.filter(populationElement => populationElement.indicatorCode === ind);
  return (indicatorNameArr[0].indicatorName);
};
/* *********** FUNCIONES ESPECIALIZADAS *********** */
// Función con filterData 
const filterData = (country, arrYear, ind, dtaMundial) => {
  let matrix = [];
  country.forEach((element) => {
    let indicatorDateArr = [];
    let indicatorResult = [];
    let indicatorNameArr = [];
    // const indicatorsArr = WORLDBANK[element].indicators;
    const indicatorsArr = dtaMundial[element].indicators;
    indicatorNameArr = indicatiorsCaption(indicatorsArr, ind, dtaMundial);
    indicatorDateArr = indicatorNameArr[0].data;
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
  let sum = 0;
  array.forEach(element => {
    let j = 0;
    sum = element.reduce((previous, current) => {
      if (current !== '') {
        j++;
        const sumRound = (parseFloat(previous) + parseFloat(current)).toFixed(2);
        return sumRound;
      }
      return previous;
    }, 0);
    let avg = sum / j;
    prom.push(avg.toFixed(2));
  });
  return prom;
};
// Función para ordenar
const sortData = (data, sortOrder) => {
  if (sortOrder === 'asc') {
    let reversed = [];
    let copyData = [...data];
    for (let i = 0; i < copyData.length; i++) {
      reversed.push(copyData[i].reverse());
    }
    return reversed;
  }
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
  filterData,
  caption
};