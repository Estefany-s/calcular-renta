import { useState } from "react";
import { Link } from "react-router-dom";

const CalcularRenta = () => {
  const [rentaGravada, setRentaGravada] = useState(0);
  const [totalRentaGravada, setTotalRentaGravada] = useState();
  const [gastosMedicos, setGastosMedicos] = useState(0);
  const [colegiatura, setColegiatura] = useState(0);
  const [rentaNeta, setRentaNeta] = useState();
  const [impuestoComputado, setImpuestoComputado] = useState();
  const [impuestoRetenido, setImpuestoRetenido] = useState();
  const [totalAPagar, setTotalAPagar] = useState();
  const [totalADevolver, setTotalADevolver] = useState();
  const [deduccionesPersonales, setDeduccionesPersonales] = useState();
  //Validar NIT****************
  const [nombre, setNombre] = useState("");
  const [nit, setNit] = useState("");

  // Función para manejar la entrada del NIT
  const handleNitChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remueve cualquier caracter que no sea dígito
    if (value.length > 14) {
      value = value.slice(0, 14); // Limita el número máximo de dígitos
    }

    // Formato: 0000-000000-000-0
    const formattedNit = value
      .replace(/(\d{4})(\d{0,6})(\d{0,3})(\d{0,1})/, "$1-$2-$3-$4")
      .replace(/-$/, ""); // Evita un guion final suelto

    setNit(formattedNit);
  };

  const handleNombreChange = (e) => {
    setNombre(e.target.value); // Actualiza el estado con el valor ingresado
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes usar el nombre y NIT como desees
    console.log("Nombre:", nombre);
    console.log("NIT:", nit);
    // También podrías enviar los datos a un servidor o realizar otra acción
  };
  //************************** */

  const limpiarDatos = (e) => {
    e.preventDefault();
    setRentaGravada(0);
    setTotalRentaGravada(0);
    setGastosMedicos(0);
    setColegiatura(0);
    setRentaNeta(0);
    setImpuestoComputado(0);
    setImpuestoRetenido(0);
    setTotalAPagar(0);
    setTotalADevolver(0);
    setDeduccionesPersonales(0);
    setNombre("");
    setNit("");
  };

  const calcularDeducciones = () => {
    return gastosMedicos + colegiatura;
  };

  const calcularImpuestoComputado = (rentaGravada, deduccionesPersonales) => {
    // let renta = 0;
    let exento = 0;
    let porcentaje = 0;
    let cuotaFija = 0;

    if (rentaGravada >= 0.01 && rentaGravada <= 4064) {
      //   renta = rentaGravada;
    } else if (rentaGravada >= 4064.01 && rentaGravada <= 9142.86) {
      exento = 4064;
      porcentaje = 0.1;
      cuotaFija = 212.12;
    } else if (rentaGravada >= 9142.87 && rentaGravada <= 22857.14) {
      exento = 9142.86;
      porcentaje = 0.2;
      cuotaFija = 720;
    } else if (rentaGravada >= 22857.15) {
      exento = 22857.14;
      porcentaje = 0.3;
      cuotaFija = 3462.86;
    }

    return (
      (rentaGravada - exento) * porcentaje + cuotaFija - deduccionesPersonales
    );
  };

  const calcularImpuestoRetenido = (rentaGravada) => {
    let exento = 0;
    let porcentaje = 0;
    let cuotaFija = 0;
    let rentaGravadaMensual = rentaGravada / 12;

    if (rentaGravadaMensual >= 0.01 && rentaGravadaMensual <= 472) {
      return rentaGravadaMensual * 12;
    } else if (rentaGravadaMensual >= 472.01 && rentaGravadaMensual <= 895.24) {
      exento = 472;
      porcentaje = 0.1;
      cuotaFija = 17.67;
    } else if (rentaGravadaMensual >= 895.25 && rentaGravadaMensual <= 2038.1) {
      exento = 895.24;
      porcentaje = 0.2;
      cuotaFija = 60;
    } else if (rentaGravadaMensual >= 2038.11) {
      exento = 2038.1;
      porcentaje = 0.3;
      cuotaFija = 288.57;
    }

    return ((rentaGravadaMensual - exento) * porcentaje + cuotaFija) * 12;
  };

  const calcularPagarODevolver = (impuestoComputado, impuestoRetenido) => {
    if (impuestoRetenido > impuestoComputado) {
      return {
        totalDevolver: impuestoRetenido - impuestoComputado,
        totalPagar: 0,
      };
    } else {
      return {
        totalDevolver: 0,
        totalPagar: impuestoComputado - impuestoRetenido,
      };
    }
  };

  const calcular = (e) => {
    e.preventDefault();

    setTotalRentaGravada(rentaGravada);

    // Calcular deducciones
    const deduccionesPersonales = calcularDeducciones();
    setDeduccionesPersonales(deduccionesPersonales);

    // Calcular la renta neta
    const rentaNeta = rentaGravada - deduccionesPersonales;
    setRentaNeta(rentaNeta.toFixed(2));

    // Calcular impuestos
    const impuestoComputado = calcularImpuestoComputado(
      rentaGravada,
      deduccionesPersonales
    );
    setImpuestoComputado(impuestoComputado.toFixed(2));

    const impuestoRetenido = calcularImpuestoRetenido(rentaGravada);
    setImpuestoRetenido(impuestoRetenido.toFixed(2));

    // Calcular total a pagar o devolver
    const { totalDevolver, totalPagar } = calcularPagarODevolver(
      impuestoComputado,
      impuestoRetenido
    );
    setTotalADevolver(totalDevolver.toFixed(2));
    setTotalAPagar(totalPagar.toFixed(2));
  };

  return (
    <div className="bg-primary bg-opacity-50 pb-5 pt-3">
      <div className="shadow-sm p-3 mt-0 pb-3 mx-2 bg-primary bg-opacity-25 rounded">
        <div className="row">
          <div className="col-12 col-md-6 m-auto">
            <div>
              <section
                className="d-flex justify-content-between align-items-center p-3"
                style={{ backgroundColor: "#1F363D" }}
              >
                <p className="text-light m-0">Calcular renta</p>
                <i className="bi bi-gear text-black p-1 bg-light rounded"></i>
              </section>
              <section className="p-4" style={{ backgroundColor: "#70A9A1" }}>
                <h4 className="text-center">
                  Declaración del impuesto sobre la renta
                </h4>
                <div>
                  <div className="d-flex align-items-center">
                    <p className="fw-bold m-0 me-2">Nombre:</p>
                    <input
                      type="text"
                      className="form-control w-50"
                      placeholder="Nombre completo"
                      value={nombre}
                      onChange={handleNombreChange}
                    />
                  </div>
                  <div className="d-flex align-items-center mt-2">
                    <p className="fw-bold m-0 me-5">NIT:</p>
                    <input
                      type="text"
                      className="form-control w-50"
                      placeholder="0000-000000-000-0"
                      value={nit}
                      onChange={handleNitChange}
                      maxLength="19" // Incluyendo guiones
                    />
                    {/* <input
                    type="text"
                    className="form-control w-50"
                    placeholder="0000-000000-000-0"
                  /> */}
                  </div>
                  <p className="m-0 fw-bold">
                    Ejercicio del <span>01/01/2024</span> al{" "}
                    <span>01/12/2024</span>
                  </p>
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Ver datos
                  </button>
                </div>
              </section>
              <form className="">
                <div
                  className="d-flex justify-content-between p-2 border border-secondary"
                  style={{ backgroundColor: "#9EC1A3" }}
                >
                  <p className="m-0">Rentas gravadas: </p>
                  <input
                    type="number"
                    className="form-control w-25 h-25"
                    value={rentaGravada}
                    onChange={(e) => setRentaGravada(e.target.value)}
                  />
                </div>
                <div
                  className="d-flex justify-content-between p-2 border border-secondary"
                  style={{ backgroundColor: "#CFE0C3" }}
                >
                  <p className="m-0">
                    Sueldos, Salarios, Gratificaciones, Comisiones:{" "}
                  </p>
                </div>
                <div
                  className="d-flex justify-content-between fw-bold p-2 border border-secondary"
                  style={{ backgroundColor: "#9EC1A3" }}
                >
                  <p className="m-0">Total Rentas gravadas: </p>
                  <p className="m-0">${totalRentaGravada || 0}</p>
                  {/* <input
                  type="number"
                  className="form-control w-25 h-25"
                  defaultValue={totalRentaGravada}
                  readOnly
                /> */}
                </div>
                <div
                  className="d-flex justify-content-between fw-bold p-2 border border-secondary"
                  style={{ backgroundColor: "#CFE0C3" }}
                >
                  <p className="m-0">
                    Costos, Gastos y Deducciones del ejercicio{" "}
                  </p>
                </div>
                <div
                  className="d-flex justify-content-between p-2 border border-secondary"
                  style={{ backgroundColor: "#9EC1A3" }}
                >
                  <p className="m-0">Gastos médicos: </p>
                  <input
                    type="number"
                    className="form-control w-25 h-25"
                    value={gastosMedicos}
                    onChange={(e) =>
                      setGastosMedicos(parseInt(e.target.value) || 0)
                    }
                  />
                </div>
                <div
                  className="d-flex justify-content-between p-2 border border-secondary"
                  style={{ backgroundColor: "#CFE0C3" }}
                >
                  <p className="m-0">Colegiaturas: </p>
                  <input
                    type="number"
                    className="form-control w-25 h-25"
                    value={colegiatura}
                    onChange={(e) =>
                      setColegiatura(parseInt(e.target.value) || 0)
                    }
                  />
                </div>
                <div
                  className="d-flex justify-content-between fw-bold p-2 border border-secondary"
                  style={{ backgroundColor: "#9EC1A3" }}
                >
                  <p className="m-0">Total de deducciones personales: </p>
                  <p className="m-0">${deduccionesPersonales || 0}</p>
                  {/* <input
                    type="number"
                    className="form-control w-25 h-25"
                    defaultValue={deduccionesPersonales}
                    readOnly
                  /> */}
                </div>
                <div
                  className="d-flex justify-content-between fw-bold p-2 border border-secondary"
                  style={{ backgroundColor: "#CFE0C3" }}
                >
                  <p className="m-0">Renta neta: </p>
                  <p className="m-0">${rentaNeta || 0}</p>
                  {/* <input
                    type="text"
                    className="form-control w-25 h-25"
                    defaultValue={rentaNeta}
                    readOnly
                  /> */}
                </div>
                <div
                  className="d-flex justify-content-between fw-bold p-2 border border-secondary"
                  style={{ backgroundColor: "#9EC1A3" }}
                >
                  <p className="m-0">
                    Impuesto Computado de la Renta Ordinaria:{" "}
                  </p>
                  <input
                    type="text"
                    className="form-control w-25 h-25"
                    value={parseFloat(impuestoComputado) || 0}
                    readOnly
                  />
                </div>
                <div
                  className="d-flex justify-content-between p-2 border border-secondary"
                  style={{ backgroundColor: "#CFE0C3" }}
                >
                  <p className="m-0">Impuesto Retenido </p>
                  <input
                    type="text"
                    className="form-control w-25 h-25"
                    value={parseFloat(impuestoRetenido) || 0}
                    readOnly
                  />
                </div>
                <div
                  className="d-flex justify-content-between fw-bold p-2 border border-secondary"
                  style={{ backgroundColor: "#9EC1A3" }}
                >
                  <p className="m-0">Total a pagar: </p>
                  <p className="m-0">${totalAPagar || 0}</p>
                  {/* <input
                    type="text"
                    className="form-control w-25 h-25"
                    defaultValue={totalAPagar}
                    readOnly
                  /> */}
                </div>
                <div
                  className="d-flex justify-content-between fw-bold p-2 border border-secondary"
                  style={{ backgroundColor: "#CFE0C3" }}
                >
                  <p className="m-0">Total a Devolver: </p>
                  <p className="m-0">${totalADevolver || 0}</p>
                  {/* <input
                    type="text"
                    className="form-control w-25 h-25"
                    defaultValue={totalADevolver}
                    readOnly
                  /> */}
                </div>

                <div
                  className="d-flex p-3"
                  style={{ backgroundColor: "#40798C" }}
                >
                  <button
                    className="btn me-5"
                    onClick={calcular}
                    style={{ backgroundColor: "#73EC8B" }}
                  >
                    Calcular
                  </button>
                  <button
                    className="btn"
                    onClick={limpiarDatos}
                    style={{ backgroundColor: "#73EC8B" }}
                  >
                    Nuevo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="text-center mt-3 mb-0">
          <Link to="/constanciaRenta">
            <button className="btn" style={{ backgroundColor: "#73EC8B" }}>
              Imprimir constancia
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CalcularRenta;
