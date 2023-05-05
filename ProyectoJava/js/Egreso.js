let contadorEgreso = 0;
class Egreso extends Dato{
    constructor(descripcion,valor){
        super(descripcion,valor);
        this._id = contadorIngresos++;
    }
    get id(){
        return this._id;
    }
}