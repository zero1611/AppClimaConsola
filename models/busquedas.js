const fs = require('fs')
const axios = require('axios');


class Busquedas{
    historial = [];
    dbPath = './db/database.json';


    constructor() {
        this.leerDB()
    }
    get historialCapitalizado(){
        for (let i = 0; i < this.historial.length; i++) {
            this.historial[i] = this.historial[i].replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));

        }
        return this.historial;
    }
    get paramsMapbox(){
        return{
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }
    get paramsOPENWEATHER(){
        return{
            'appid': process.env.OPENWEATHER_KEY,
            'units':'metric',
            'lang': 'es'
        }
    }
    async ciudad(lugar = ''){
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });
            const resp = await instance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }))

        }catch (e){
            return[];
        }



    }
    async climaLugar(lat, lon){
        try {

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                params: this.paramsOPENWEATHER
            });
            const resp = await instance.get();
            const{weather, main} = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        }catch (e) {
            console.log(e);
        }
    }
    agregarHistorial(lugar = ''){
        if(this.historial.includes(lugar.toLowerCase())){
            return;
        }
        this.historial.unshift(lugar.toLowerCase());
        this.guardarDB();
    }
    guardarDB(){
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }
    leerDB(){
        const archivo = this.dbPath;
        if(!fs.existsSync(archivo)){
            return ;
        }
        const info = fs.readFileSync(archivo,{encoding: 'utf-8'});
        const data = JSON.parse(info);
        this.historial = data.historial
    }
    limpiarHistorial(){
        this.historial = [];
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }
}

module.exports = {Busquedas};