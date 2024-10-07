import { Link } from "react-router-dom";
import Header from "./Header";

const ConstanciaRenta = () => {
    return (
        <div className="">
            <Header/>
            <section className="w-50 shadow p-3 my-3 bg-body rounded m-auto">
                <h4 className="text-center">TecnoComercial, S.A</h4>
                <p className="my-4">
                    El infranscrito de la retención hace constar que Juaréz, Rosa con NIT: 4455-121002-123-1 en su calidad de empleada de esta empresa,
                    devengó durante un periodo comprendido entre 01/01/2023 al 31/12/2023 lo siguiente
                </p>
                <h4>Detalles</h4>
                <div>
                <div className="d-flex justify-content-between align-items-center">
                    <p>Ingreso devengado</p>
                    <p>$19,175.00</p>
                </div>
                <p>(Sueldos, vacaciones, gratificaciones y otros)</p>
                <div className="d-flex justify-content-between align-items-center">
                    <p>Aguinaldo gravado</p>
                    <p>$ --</p>
                </div>
                <p className="fw-bold">(-) Ingresos no gravados</p>
                <div className="d-flex justify-content-between align-items-center">
                    <p>Cotización AFP</p>
                    <p>$1,321.31</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p>Cotización ISSS</p>
                    <p>$360.00</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p>Aguinaldo no gravado</p>
                    <p>$950.00</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p>Monto gravado</p>
                    <p>$16,543.69</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <p>Impuesto sobre la renta</p>
                    <p>$1,880.17</p>
                </div>
                </div>
                <p className="mt-3 text-center">
                    Se extiende la presente en la ciudad de Santa Ana el 29 de enero
                    del 2024
                </p>
                <p className="text-center">Julieta Ramirez</p>
            </section>
            <Link to="/calculoRenta" className="d-flex justify-content-center mb-4 text-decoration-none">
                <button className="btn fs-5" style={{ backgroundColor: "#73EC8B" }}>Calcular Renta</button>
            </Link>
        </div>
    );
};

export default ConstanciaRenta;
