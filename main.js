
require('dotenv').config()

const {leerInput,inquirerMenu,inquirePausa,listadoLugares,confirmar} = require('./helpers/inquirer');
const {Busquedas} = require('./models/busquedas')
const main = (async () =>{
    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const termino = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(termino);
                const id = await listadoLugares(lugares);
                if(id ==='0')continue;

                const lugarSel = lugares.find(l => l.id ===id);
                busquedas.agregarHistorial(lugarSel.nombre)
                const clima = await busquedas.climaLugar(lugarSel.lat,lugarSel.lng)
                console.log(clima)
                console.log(id);
                console.log('\n Informacion de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSel.nombre)
                console.log('Lat: ', lugarSel.lat)
                console.log('Lng:', lugarSel.lng)
                console.log('Temperatura:' ,clima.temp.toString().blue)
                console.log('Minima: ',clima.min.toString().blue)
                console.log('Maxima: ',clima.max.toString().blue)
                console.log('Como esta el Clima: ',clima.desc.blue)
                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i)=>{
                    const idx = `${i + 1}.`.red;
                    console.log(`${idx} ${lugar}`)
                })
                break;
            case 3:
                const ok = await confirmar('Esta seguro?')
                if(ok){
                    busquedas.limpiarHistorial();
                    console.log('Historial Borrado Exitosamente'.red);
                }

                break;

        }
        await inquirePausa();

    }while (opt !== 4);


})();