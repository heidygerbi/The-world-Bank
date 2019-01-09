// variables globales 
/* global WORLDBANK:true */
/* eslint no-undef: 'error' */
require('../src/data.js');
const country = ['PER'];
const arrYear = ['2016', '2017'];
const ind = 'SL.TLF.ACTI.FE.ZS';
const matrixFilter = [['71.57', '72.15']];
const matrix = [['71.57', '72.15'], ['57.04', '57.50']];
const matrixAsc = [['72.15', '71.57'], ['57.50', '57.04']];
const prom = ['71.86', '57.27'];

WORLDBANK = {
  'PER': {
    'indicators': [
        {
        'data': {
          '2010': 75.0289993286133,
          '2011': 74.4199981689453,
          '2012': 74.2070007324219,
          '2013': 73.8600006103516,
          '2014': 72.6800003051758,
          '2015': 71.0400009155273,
          '2016': 71.5709991455078,
          '2017': 72.1520004272461
        },
        'countryName': 'Perú',
        'countryCode': 'PER',
        'indicatorName': 'Tasa de participación en la fuerza laboral, mujeres (% de la población femenina entre 15-64 años) (estimación modelado OIT)',
        'indicatorCode': 'SL.TLF.ACTI.FE.ZS'
      }
    ]
  }
};
// chequear worldbank es objeto
describe('worldbank', () => {
  it('Debería ser un objeto', () => {
    expect(typeof worldbank).toBe('object');
  });
});
// chequear todas las funciones
describe('worldbank.sortData', () => {
  it('Debería ser una funcion', () => {
    expect(typeof worldbank.sortData).toBe('function');
  });
  it('debería retornar un array invertido con la Tasa de participación en la fuerza laboral femenina del 2016 al 2017 - en Perú y chile', () => {
    expect(worldbank.sortData(matrix, 'asc')).toEqual(matrixAsc);
  });
});
describe('worldbank.computeStats', () => {
  it('Debería ser una funcion', () => {
    expect(typeof worldbank.computeStats).toBe('function');
  });
  it('debería retornar un array con los promedios de la tasa de fuerza laboral en  Perú y chile', () => {
    expect(worldbank.computeStats(matrix)).toEqual(prom);
  });
});
describe('worldbank.indicatiorsCaption', () => {
  it('Debería ser una funcion', () => {
    expect(typeof worldbank.indicatiorsCaption).toBe('function');
  });
});
describe('worldbank.filterData', () => {
  it('Debería ser una funcion', () => {
    expect(typeof worldbank.filterData).toBe('function');
  });
  it('debería retornar un array con la Tasa de participación en la fuerza laboral femenina del 2016 al 2017 - en Perú y chile', () => {
    expect(worldbank.filterData(country, arrYear, ind)).toEqual(matrixFilter);
  });
});


//   it('debería retornar un nuevo array, no modificar el original', () => {
//     expect(potter.cambiarPropiedad(input)).not.toEqual(input);
//   });
// });

//   it('deberia agregar la propiedad insignia a todos los estudiantes de hogwarts', () => {
//     expect(potter.agregaPropiedad(input)).toEqual(output2);
//   });
//   it('debería retornar un nuevo array, no cambiar el array original', () => {
//     expect(potter.agregaPropiedad(input)).not.toEqual(input);
//   });
// });
//   it('debería retornar un nuevo array con las casas de howards de manera única', () => {
//     expect(potter.filtrarCasasUnicas(input)).toEqual(output3);
//   });
// });
