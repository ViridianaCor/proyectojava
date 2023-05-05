const ingresos = [  { descripcion: "Salario", valor: 2000 },  { descripcion: "Venta de libros", valor: 450 },  { descripcion: "Freelance diseño web", valor: 800 },  { descripcion: "Venta de cursos en línea", valor: 300 },  { descripcion: "Dividendos", valor: 150 }];

const egresos = [
  { descripcion: "Renta de oficina", valor: 900 },
  { descripcion: "Pago de servicios", valor: 1100 },
  { descripcion: "Compra de suministros", valor: 200 },
  { descripcion: "Pago de nómina", valor: 500 }
];
const totalIngresos = () => {
  let total = 0;
  for (const ingreso of ingresos) {
    total += ingreso.valor;
  }
  return total;
};

const totalEgresos = () => {
  let total = 0;
  for (const egreso of egresos) {
    total += egreso.valor;
  }
  return total;
};

const formatoMoneda = (valor) => {
  return valor.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });
};

const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("es-MX", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

const cargarCabecero = () => {
  const presupuesto = totalIngresos() - totalEgresos();
  const porcentajeEgreso = totalEgresos() / totalIngresos();

  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML = formatoPorcentaje(
    porcentajeEgreso
  );
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(
    totalEgresos()
  );
};

const cargarIngresos = () => {
  let ingresosHTML = "";
  for (const ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

const crearIngresoHTML = (ingreso) => {
  return `
    <div class="elemento limpiarEstilos">
      <div class="elemento-descripcion">${ingreso.descripcion}</div>
      <div class="derecha limpiarEstilos">
        <div class="elemento-valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento-eliminar">
          <button class="elemento_eliminar--btn" onclick="eliminarIngreso(${ingreso.id})">
            <ion-icon name="close-circle-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  `;
};

const cargarEgresos = () => {
  let egresosHTML = "";
  for (const egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

const crearEgresoHTML = (egreso) => {
  let egresoHTML = `
    <div class="elemento limpiarEstilos">
      <div class="elemento-descripcion">${egreso.descripcion}</div>
      <div class="derecha limpiarEstilos">
        <div class="elemento-valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento-eliminar">
          <button class="elemento_eliminar--btn" onclick="eliminarEgreso(${egreso.id})">
            <ion-icon name="close-circle-outline"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  `;
  return egresoHTML;
};

const eliminarEgreso = (id) => {
  const indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
  egresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarEgresos();
};
const eliminarIngreso = (id) => {
  const indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
  ingresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarIngresos();
};
const agregarDato = () => {
  const forma = document.getElementById("forma");
  const tipo = forma.tipo.value;
  const descripcion = forma.descripcion.value;
  const valor = forma.valor.value;

  if (descripcion !== "" && valor !== "") {
    if (tipo === "ingreso") {
      ingresos.push(new Ingreso(descripcion, Number(valor)));
      cargarCabecero();
      cargarIngresos();
    } else if (tipo === "egreso") {
      egresos.push(Number(valor));
      cargarCabecero();
      cargarEgresos();
    }
    forma.reset();
  }
};
const cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

cargarApp();