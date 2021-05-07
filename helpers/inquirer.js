const inquirer = require('inquirer');
require('colors');
const preguntas =[{
    type: 'list',
    name: 'opcion',
    message: 'Que desea hacer?',
    choices: [
        {
            value: 1,
            name: `${'1'.red}. Bucar Ciudad`
        },
        {
            value:2,
            name: `${'2'.red}. Historial`
        },
        {
            value:3,
            name: `${'3'.red}. Limpiar Historial`
        },

        {
            value:4,
            name: `${'4'.red}. Salir`
        }
    ]
}];
const pausa = {
    type: 'input',
    name: 'enter',
    message: `Presione ${'ENTER'.red} para continuar`
}

const inquirerMenu = async () =>{
    console.clear();
    console.log('========================');
    console.log('Seleccione una opcion'.red);
    console.log('========================\n');

   const {opcion} = await inquirer.prompt(preguntas);
   return opcion;
}
const  inquirePausa = async ()=>{
    console.log('\n');
    await inquirer.prompt(pausa);

}
const leerInput = async(message)=>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];
    const {desc} = await inquirer.prompt(question);
    return desc;
}
const listadoLugares = async (lugares = [])=>{
    console.log('\n');
    const choices = lugares.map((lugar, i) =>{
        const idx = `${i + 1}`.red;
        return{
            value: lugar.id,
            name: `${idx } ${lugar.nombre}`
        }

    });
    choices.unshift({
        value: '0',
        name: '0.' .green + ' Cancelar'
    });
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;
}
const confirmar = async (message) =>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const {ok} = await inquirer.prompt(question);
    return ok;
}
const mostrarListadoChecklist = async (tareas = [])=>{
    console.log('\n');
    const choices = tareas.map((tarea, i) =>{
        const idx = `${i + 1}`.red;
        return{
            value: tarea.id,
            name: `${idx } ${tarea.desc}`,
            checked: (tarea.completadoEn)?true : false
        }

    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(preguntas);
    return ids;
}
module.exports = {
    inquirerMenu,
    inquirePausa,
    leerInput,
    listadoLugares,
    confirmar,
    mostrarListadoChecklist
}