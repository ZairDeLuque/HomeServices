import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatesandcitysService {

  private dataA: any;
  private dataB: any;

  constructor() { 
    this.dataA = [
      { name: 'Aguascalientes', code: 'AG' },
      { name: 'Baja California', code: 'BC' },
      { name: 'Baja California Sur', code: 'BS' },
      { name: 'Campeche', code: 'CM' },
      { name: 'Chiapas', code: 'CS' },
      { name: 'Chihuahua', code: 'CH' },
      { name: 'Coahuila', code: 'CO' },
      { name: 'Colima', code: 'CL' },
      { name: 'Durango', code: 'DG' },
      { name: 'Guanajuato', code: 'GT' },
      { name: 'Guerrero', code: 'GR' },
      { name: 'Hidalgo', code: 'HG' },
      { name: 'Jalisco', code: 'JA' },
      { name: 'México', code: 'MX' },
      { name: 'Michoacán', code: 'MI' },
      { name: 'Morelos', code: 'MO' },
      { name: 'Nayarit', code: 'NA' },
      { name: 'Nuevo León', code: 'NL' },
      { name: 'Oaxaca', code: 'OA' },
      { name: 'Puebla', code: 'PU' },
      { name: 'Querétaro', code: 'QT' },
      { name: 'Quintana Roo', code: 'QR' },
      { name: 'San Luis Potosí', code: 'SL' },
      { name: 'Sinaloa', code: 'SI' },
      { name: 'Sonora', code: 'SO' },
      { name: 'Tabasco', code: 'TB' },
      { name: 'Tamaulipas', code: 'TM' },
      { name: 'Tlaxcala', code: 'TL' },
      { name: 'Veracruz', code: 'VE' },
      { name: 'Yucatán', code: 'YU' },
      { name: 'Zacatecas', code: 'ZA' }
    ];

    this.dataB = [
      // Aguascalientes
      { name: 'Aguascalientes', stateCode: 'AG' },
      { name: 'Asientos', stateCode: 'AG' },
      { name: 'Calvillo', stateCode: 'AG' },
      { name: 'Cosío', stateCode: 'AG' },
      { name: 'Jesús María', stateCode: 'AG' },
      { name: 'Pabellón de Arteaga', stateCode: 'AG' },
      { name: 'Rincón de Romos', stateCode: 'AG' },
      { name: 'San José de Gracia', stateCode: 'AG' },
      { name: 'Tepezalá', stateCode: 'AG' },
      { name: 'El Llano', stateCode: 'AG' },
    
      // Baja California
      { name: 'Mexicali', stateCode: 'BC' },
      { name: 'Tijuana', stateCode: 'BC' },
      { name: 'Ensenada', stateCode: 'BC' },
      { name: 'Rosarito', stateCode: 'BC' },
      { name: 'Tecate', stateCode: 'BC' },

      // Baja California Sur
      { name: 'La Paz', stateCode: 'BS' },
      { name: 'Los Cabos', stateCode: 'BS' },
      { name: 'Loreto', stateCode: 'BS' },
      { name: 'Comondú', stateCode: 'BS' },
      { name: 'Mulegé', stateCode: 'BS' },

      // Campeche
      { name: 'Campeche', stateCode: 'CM' },
      { name: 'Calkiní', stateCode: 'CM' },
      { name: 'Carmen', stateCode: 'CM' },
      { name: 'Champotón', stateCode: 'CM' },
      { name: 'Hecelchakán', stateCode: 'CM' },
      { name: 'Hopelchén', stateCode: 'CM' },
      { name: 'Palizada', stateCode: 'CM' },
      { name: 'Tenabo', stateCode: 'CM' },
      { name: 'Escárcega', stateCode: 'CM' },
      { name: 'Candelaria', stateCode: 'CM' },

      // Chiapas
      { name: 'Tuxtla Gutiérrez', stateCode: 'CS' },
      { name: 'Tapachula', stateCode: 'CS' },
      { name: 'San Cristóbal de las Casas', stateCode: 'CS' },
      { name: 'Comitán de Domínguez', stateCode: 'CS' },
      { name: 'Villaflores', stateCode: 'CS' },
      { name: 'Palenque', stateCode: 'CS' },
      { name: 'Tonalá', stateCode: 'CS' },
      { name: 'Chiapa de Corzo', stateCode: 'CS' },
      { name: 'Ocosingo', stateCode: 'CS' },
      { name: 'Cintalapa', stateCode: 'CS' },

      // Chihuahua
      { name: 'Chihuahua', stateCode: 'CH' },
      { name: 'Ciudad Juárez', stateCode: 'CH' },
      { name: 'Cuauhtémoc', stateCode: 'CH' },
      { name: 'Delicias', stateCode: 'CH' },
      { name: 'Parral', stateCode: 'CH' },
      { name: 'Ojinaga', stateCode: 'CH' },
      { name: 'Hidalgo del Parral', stateCode: 'CH' },
      { name: 'Creel', stateCode: 'CH' },
      { name: 'Casas Grandes', stateCode: 'CH' },
      { name: 'Guachochi', stateCode: 'CH' },

      // Coahuila
      { name: 'Saltillo', stateCode: 'CO' },
      { name: 'Torreón', stateCode: 'CO' },
      { name: 'Monclova', stateCode: 'CO' },
      { name: 'Piedras Negras', stateCode: 'CO' },
      { name: 'Acuña', stateCode: 'CO' },
      { name: 'Matamoros', stateCode: 'CO' },
      { name: 'Sabinas', stateCode: 'CO' },
      { name: 'Allende', stateCode: 'CO' },
      { name: 'Francisco I. Madero', stateCode: 'CO' },
      { name: 'Frontera', stateCode: 'CO' },

      // Colima
      { name: 'Colima', stateCode: 'CL' },
      { name: 'Manzanillo', stateCode: 'CL' },
      { name: 'Tecomán', stateCode: 'CL' },
      { name: 'Villa de Álvarez', stateCode: 'CL' },

      // Durango
      { name: 'Durango', stateCode: 'DG' },
      { name: 'Gómez Palacio', stateCode: 'DG' },
      { name: 'Lerdo', stateCode: 'DG' },
      { name: 'Canatlán', stateCode: 'DG' },
      { name: 'Pueblo Nuevo', stateCode: 'DG' },
      { name: 'Tlahualilo', stateCode: 'DG' },
      { name: 'El Salto', stateCode: 'DG' },
      { name: 'Nuevo Ideal', stateCode: 'DG' },
      { name: 'San Juan del Río', stateCode: 'DG' },
      { name: 'Guadalupe Victoria', stateCode: 'DG' },

      // Guanajuato
      { name: 'León', stateCode: 'GT' },
      { name: 'Irapuato', stateCode: 'GT' },
      { name: 'Celaya', stateCode: 'GT' },
      { name: 'Salamanca', stateCode: 'GT' },
      { name: 'Guanajuato', stateCode: 'GT' },
      { name: 'Dolores Hidalgo', stateCode: 'GT' },
      { name: 'San Miguel de Allende', stateCode: 'GT' },
      { name: 'Acámbaro', stateCode: 'GT' },
      { name: 'Pénjamo', stateCode: 'GT' },
      { name: 'San Francisco del Rincón', stateCode: 'GT' },

      // Guerrero
      { name: 'Acapulco', stateCode: 'GR' },
      { name: 'Chilpancingo', stateCode: 'GR' },
      { name: 'Iguala', stateCode: 'GR' },
      { name: 'Taxco', stateCode: 'GR' },
      { name: 'Zihuatanejo', stateCode: 'GR' },
      { name: 'Atoyac de Álvarez', stateCode: 'GR' },
      { name: 'Chilapa', stateCode: 'GR' },
      { name: 'Tlapa de Comonfort', stateCode: 'GR' },
      { name: 'Ometepec', stateCode: 'GR' },
      { name: 'Ciudad Altamirano', stateCode: 'GR' },
      { name: 'Arcelia', stateCode: 'GR' },

      // Hidalgo
      { name: 'Pachuca', stateCode: 'HG' },
      { name: 'Tulancingo', stateCode: 'HG' },
      { name: 'Tizayuca', stateCode: 'HG' },
      { name: 'Ixmiquilpan', stateCode: 'HG' },
      { name: 'Huejutla', stateCode: 'HG' },
      { name: 'Tepeji del Río', stateCode: 'HG' },
      { name: 'Tula de Allende', stateCode: 'HG' },
      { name: 'Actopan', stateCode: 'HG' },
      { name: 'Mixquiahuala', stateCode: 'HG' },
      { name: 'Zimapán', stateCode: 'HG' },

      // Jalisco
      { name: 'Guadalajara', stateCode: 'JA' },
      { name: 'Zapopan', stateCode: 'JA' },
      { name: 'Tlaquepaque', stateCode: 'JA' },
      { name: 'Tonalá', stateCode: 'JA' },
      { name: 'Puerto Vallarta', stateCode: 'JA' },
      { name: 'Tlajomulco de Zúñiga', stateCode: 'JA' },
      { name: 'El Salto', stateCode: 'JA' },
      { name: 'Tepatitlán', stateCode: 'JA' },
      { name: 'Lagos de Moreno', stateCode: 'JA' },
      { name: 'Ocotlán', stateCode: 'JA' },

      // México
      { name: 'Toluca', stateCode: 'MX' },
      { name: 'Ecatepec', stateCode: 'MX' },
      { name: 'Nezahualcóyotl', stateCode: 'MX' },
      { name: 'Naucalpan', stateCode: 'MX' },
      { name: 'Tlalnepantla', stateCode: 'MX' },
      { name: 'Chimalhuacán', stateCode: 'MX' },
      { name: 'Cuautitlán Izcalli', stateCode: 'MX' },
      { name: 'Atizapán de Zaragoza', stateCode: 'MX' },
      { name: 'Tecámac', stateCode: 'MX' },
      { name: 'Coacalco', stateCode: 'MX' },

      // Michoacán
      { name: 'Morelia', stateCode: 'MI' },
      { name: 'Uruapan', stateCode: 'MI' },
      { name: 'Lázaro Cárdenas', stateCode: 'MI' },
      { name: 'Zitácuaro', stateCode: 'MI' },
      { name: 'Apatzingán', stateCode: 'MI' },
      { name: 'Pátzcuaro', stateCode: 'MI' },
      { name: 'Sahuayo', stateCode: 'MI' },
      { name: 'La Piedad', stateCode: 'MI' },
      { name: 'Hidalgo', stateCode: 'MI' },
      { name: 'Zamora', stateCode: 'MI' },

      // Morelos
      { name: 'Cuernavaca', stateCode: 'MO' },
      { name: 'Jiutepec', stateCode: 'MO' },
      { name: 'Temixco', stateCode: 'MO' },
      { name: 'Cuautla', stateCode: 'MO' },
      { name: 'Zacatepec', stateCode: 'MO' },
      { name: 'Yautepec', stateCode: 'MO' },
      { name: 'Puente de Ixtla', stateCode: 'MO' },
      { name: 'Ayala', stateCode: 'MO' },
      { name: 'Xochitepec', stateCode: 'MO' },
      { name: 'Tepoztlán', stateCode: 'MO' },

      // Nayarit
      { name: 'Tepic', stateCode: 'NA' },
      { name: 'Bahía de Banderas', stateCode: 'NA' },
      { name: 'Santiago Ixcuintla', stateCode: 'NA' },
      { name: 'Tecuala', stateCode: 'NA' },
      { name: 'Ixtlán del Río', stateCode: 'NA' },
      { name: 'Compostela', stateCode: 'NA' },
      { name: 'Acaponeta', stateCode: 'NA' },
      { name: 'Tuxpan', stateCode: 'NA' },
      { name: 'Rosamorada', stateCode: 'NA' },
      { name: 'Ahuacatlán', stateCode: 'NA' },

      // Nuevo León
      { name: 'Monterrey', stateCode: 'NL' },
      { name: 'Guadalupe', stateCode: 'NL' },
      { name: 'San Nicolás de los Garza', stateCode: 'NL' },
      { name: 'Escobedo', stateCode: 'NL' },
      { name: 'Santa Catarina', stateCode: 'NL' },
      { name: 'Apodaca', stateCode: 'NL' },
      { name: 'San Pedro Garza García', stateCode: 'NL' },
      { name: 'General Escobedo', stateCode: 'NL' },
      { name: 'Juárez', stateCode: 'NL' },
      { name: 'García', stateCode: 'NL' },

      // Oaxaca
      { name: 'Oaxaca de Juárez', stateCode: 'OA' },
      { name: 'Salina Cruz', stateCode: 'OA' },
      { name: 'Juchitán de Zaragoza', stateCode: 'OA' },
      { name: 'Huajuapan de León', stateCode: 'OA' },
      { name: 'Santiago Pinotepa Nacional', stateCode: 'OA' },
      { name: 'San Juan Bautista Tuxtepec', stateCode: 'OA' },
      { name: 'Ixtepec', stateCode: 'OA' },
      { name: 'Miahuatlán de Porfirio Díaz', stateCode: 'OA' },
      { name: 'Zimatlán de Álvarez', stateCode: 'OA' },
      { name: 'Temascal', stateCode: 'OA'},

      // Puebla
      { name: 'Puebla', stateCode: 'PU' },
      { name: 'Tehuacán', stateCode: 'PU' },
      { name: 'Atlixco', stateCode: 'PU' },
      { name: 'San Martín Texmelucan', stateCode: 'PU' },
      { name: 'Cholula', stateCode: 'PU' },
      { name: 'Izúcar de Matamoros', stateCode: 'PU' },
      { name: 'Teziutlán', stateCode: 'PU' },
      { name: 'Huauchinango', stateCode: 'PU' },
      { name: 'Amozoc', stateCode: 'PU' },
      { name: 'Xicotepec', stateCode: 'PU' },

      // Querétaro
      { name: 'Santiago de Querétaro', stateCode: 'QT' },
      { name: 'San Juan del Río', stateCode: 'QT' },
      { name: 'Corregidora', stateCode: 'QT' },
      { name: 'El Marqués', stateCode: 'QT' },
      { name: 'Tequisquiapan', stateCode: 'QT' },
      { name: 'Huimilpan', stateCode: 'QT' },
      { name: 'Pedro Escobedo', stateCode: 'QT' },
      { name: 'Amealco de Bonfil', stateCode: 'QT' },
      { name: 'Ezequiel Montes', stateCode: 'QT' },
      { name: 'Cadereyta de Montes', stateCode: 'QT' },

      // Quintana Roo
      { name: 'Cancún', stateCode: 'QR' },
      { name: 'Playa del Carmen', stateCode: 'QR' },
      { name: 'Chetumal', stateCode: 'QR' },
      { name: 'Cozumel', stateCode: 'QR' },
      { name: 'Tulum', stateCode: 'QR' },
      { name: 'Othón P. Blanco', stateCode: 'QR' },
      { name: 'Isla Mujeres', stateCode: 'QR' },
      { name: 'Solidaridad', stateCode: 'QR' },
      { name: 'Bacalar', stateCode: 'QR' },
      { name: 'José María Morelos', stateCode: 'QR' },

      // San Luis Potosí
      { name: 'San Luis Potosí', stateCode: 'SL' },
      { name: 'Soledad de Graciano Sánchez', stateCode: 'SL' },
      { name: 'Matehuala', stateCode: 'SL' },
      { name: 'Ciudad Valles', stateCode: 'SL' },
      { name: 'Rioverde', stateCode: 'SL' },
      { name: 'Tamazunchale', stateCode: 'SL' },
      { name: 'Xilitla', stateCode: 'SL' },
      { name: 'Cárdenas', stateCode: 'SL' },
      { name: 'Salinas', stateCode: 'SL' },
      { name: 'Villa de Reyes', stateCode: 'SL' },

      // Sinaloa
      { name: 'Culiacán', stateCode: 'SI' },
      { name: 'Mazatlán', stateCode: 'SI' },
      { name: 'Los Mochis', stateCode: 'SI' },
      { name: 'Guasave', stateCode: 'SI' },
      { name: 'Mochicahui', stateCode: 'SI' },
      { name: 'Angostura', stateCode: 'SI' },
      { name: 'El Fuerte', stateCode: 'SI' },
      { name: 'Navolato', stateCode: 'SI' },
      { name: 'Cosalá', stateCode: 'SI' },
      { name: 'Escuinapa', stateCode: 'SI' },

      // Sonora
      { name: 'Hermosillo', stateCode: 'SO' },
      { name: 'Ciudad Obregón', stateCode: 'SO' },
      { name: 'Nogales', stateCode: 'SO' },
      { name: 'San Luis Río Colorado', stateCode: 'SO' },
      { name: 'Guaymas', stateCode: 'SO' },
      { name: 'Cajeme', stateCode: 'SO' },
      { name: 'Navojoa', stateCode: 'SO' },
      { name: 'Empalme', stateCode: 'SO' },
      { name: 'Agua Prieta', stateCode: 'SO' },
      { name: 'Cananea', stateCode: 'SO' },

      // Tabasco
      { name: 'Villahermosa', stateCode: 'TB' },
      { name: 'Cárdenas', stateCode: 'TB' },
      { name: 'Comalcalco', stateCode: 'TB' },
      { name: 'Paraíso', stateCode: 'TB' },
      { name: 'Huimanguillo', stateCode: 'TB' },
      { name: 'Macuspana', stateCode: 'TB' },
      { name: 'Tenosique', stateCode: 'TB' },
      { name: 'Jalpa de Méndez', stateCode: 'TB' },
      { name: 'Centro', stateCode: 'TB' },
      { name: 'Balancán', stateCode: 'TB' },

      // Tamaulipas
      { name: 'Ciudad Victoria', stateCode: 'TM' },
      { name: 'Tampico', stateCode: 'TM' },
      { name: 'Reynosa', stateCode: 'TM' },
      { name: 'Matamoros', stateCode: 'TM' },
      { name: 'Nuevo Laredo', stateCode: 'TM' },
      { name: 'Madero', stateCode: 'TM' },
      { name: 'Altamira', stateCode: 'TM' },
      { name: 'Río Bravo', stateCode: 'TM' },
      { name: 'San Fernando', stateCode: 'TM' },
      { name: 'Valle Hermoso', stateCode: 'TM' },

      // Tlaxcala
      { name: 'Tlaxcala', stateCode: 'TL' },
      { name: 'Apizaco', stateCode: 'TL' },
      { name: 'Huamantla', stateCode: 'TL' },
      { name: 'Zacatelco', stateCode: 'TL' },
      { name: 'Chiautempan', stateCode: 'TL' },
      { name: 'San Pablo del Monte', stateCode: 'TL' },
      { name: 'Tlaxco', stateCode: 'TL' },
      { name: 'Panotla', stateCode: 'TL' },
      { name: 'Tetla', stateCode: 'TL' },
      { name: 'Calpulalpan', stateCode: 'TL' },

      // Veracruz
      { name: 'Veracruz', stateCode: 'VE' },
      { name: 'Tierra Blanca', stateCode: 'VE'},
      { name: 'Xalapa', stateCode: 'VE' },
      { name: 'Coatzacoalcos', stateCode: 'VE' },
      { name: 'Poza Rica', stateCode: 'VE' },
      { name: 'Minatitlán', stateCode: 'VE' },
      { name: 'Córdoba', stateCode: 'VE' },
      { name: 'Orizaba', stateCode: 'VE' },
      { name: 'Tuxpan', stateCode: 'VE' },
      { name: 'Papantla', stateCode: 'VE' },
      { name: 'Cosoleacaque', stateCode: 'VE' },

      // Yucatán
      { name: 'Mérida', stateCode: 'YU' },
      { name: 'Valladolid', stateCode: 'YU' },
      { name: 'Progreso', stateCode: 'YU' },
      { name: 'Tizimín', stateCode: 'YU' },
      { name: 'Izamal', stateCode: 'YU' },
      { name: 'Tekax', stateCode: 'YU' },
      { name: 'Motul', stateCode: 'YU' },
      { name: 'Umán', stateCode: 'YU' },
      { name: 'Peto', stateCode: 'YU' },
      { name: 'Kanasín', stateCode: 'YU' },

      // Zacatecas
      { name: 'Zacatecas', stateCode: 'ZA' },
      { name: 'Fresnillo', stateCode: 'ZA' },
      { name: 'Guadalupe', stateCode: 'ZA' },
      { name: 'Jerez', stateCode: 'ZA' },
      { name: 'Sombrerete', stateCode: 'ZA' },
      { name: 'Calera', stateCode: 'ZA' },
      { name: 'Ojocaliente', stateCode: 'ZA' },
      { name: 'Río Grande', stateCode: 'ZA' },
      { name: 'Villa de Cos', stateCode: 'ZA' },
      { name: 'Nochistlán', stateCode: 'ZA' },
    ]
  }

  getStates(): any {
    return this.dataA;
  }

  getCitysWithoutState(stateCode: string): any {
    let arrayreturn = []

    for(let i = 0; i < this.dataB.length; i++){
      if(this.dataB[i].stateCode == stateCode){
        arrayreturn.push({name: this.dataB[i].name, stateCode: this.dataB[i].stateCode})
      }
    }

    return arrayreturn;
  }
}
