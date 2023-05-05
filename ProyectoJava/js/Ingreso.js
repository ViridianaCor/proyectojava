let contadorIngreso = 0;
class Ingreso extends Dato{
    constructor(descripcion,valor){
        super(descripcion,valor);
        this._id = contadorIngreso++;
    }
    get id(){
        return this._id;
    }
}