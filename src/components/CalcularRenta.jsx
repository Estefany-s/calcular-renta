import { useState } from "react";

export const CalcularRenta = () => {
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
    }

    const calcularDeducciones = () => {
        return gastosMedicos + colegiatura;
    }

    const calcularImpuestoComputado = (rentaGravada, deduccionesPersonales) => {
        let renta = 0;
        let exento = 0;
        let porcentaje = 0;
        let cuotaFija = 0;

        if (rentaGravada >= 0.01 && rentaGravada <= 4064) {
            renta = rentaGravada;
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

        return ((rentaGravada - exento) * porcentaje + cuotaFija) - deduccionesPersonales;
    }

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
            exento = 2038.10;
            porcentaje = 0.3;
            cuotaFija = 288.57;
        }

        return (((rentaGravadaMensual - exento) * porcentaje + cuotaFija) * 12);
    }

    const calcularPagarODevolver = (impuestoComputado, impuestoRetenido) => {
        if (impuestoRetenido > impuestoComputado) {
            return { totalDevolver: impuestoRetenido - impuestoComputado, totalPagar: 0 };
        } else {
            return { totalDevolver: 0, totalPagar: impuestoComputado - impuestoRetenido };
        }
    }

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
        const impuestoComputado = calcularImpuestoComputado(rentaGravada, deduccionesPersonales);
        setImpuestoComputado(impuestoComputado.toFixed(2));

        const impuestoRetenido = calcularImpuestoRetenido(rentaGravada);
        setImpuestoRetenido(impuestoRetenido.toFixed(2));

        // Calcular total a pagar o devolver
        const { totalDevolver, totalPagar } = calcularPagarODevolver(impuestoComputado, impuestoRetenido);
        setTotalADevolver(totalDevolver.toFixed(2));
        setTotalAPagar(totalPagar.toFixed(2));
    }

    return (
        <form className="mt-3 p-3">
            <div className="d-flex">
                <p>Rentas gravadas: </p>
                <input type="number" value={rentaGravada} onChange={(e) => setRentaGravada(e.target.value)} />
            </div>
            <div className="d-flex">
                <p>Total Rentas gravadas: </p>
                <input type="number" defaultValue={totalRentaGravada} readOnly/>
            </div>
            <div className="d-flex">
                <p>Gastos médicos: </p>
                <input type="number" value={gastosMedicos} onChange={(e) => setGastosMedicos(parseInt(e.target.value) || 0)} />
            </div>
            <div className="d-flex">
                <p>Colegiaturas: </p>
                <input type="number" value={colegiatura} onChange={(e) => setColegiatura(parseInt(e.target.value) || 0)} />
            </div>
            <div className="d-flex">
                <p>Total de deducciones personales: </p>
                <input type="number" defaultValue={deduccionesPersonales} readOnly />
            </div>
            <div className="d-flex">
                <p>Renta neta: </p>
                <input type="text" defaultValue={rentaNeta} readOnly />
            </div>
            <div className="d-flex">
                <p>Impuesto Computado de la Renta Ordinaria: </p>
                <input type="text" value={parseFloat(impuestoComputado) || 0} readOnly/>
            </div>
            <div className="d-flex">
                <p>Impuesto Retenido </p>
                <input type="text" value={parseFloat(impuestoRetenido) || 0} readOnly />
            </div>
            <div className="d-flex">
                <p>Total a pagar: </p>
                <input type="text" defaultValue={totalAPagar} readOnly/>
            </div>
            <div className="d-flex">
                <p>Total a Devolver: </p>
                <input type="text" defaultValue={totalADevolver} readOnly/>
            </div>

            <div className="d-flex mt-3">
                <button className="btn btn-primary me-5" onClick={calcular}>
                    Calcular
                </button>
                <button className="btn btn-success" onClick={limpiarDatos}>
                    Nuevo
                </button>
            </div>
        </form>
    )
}
