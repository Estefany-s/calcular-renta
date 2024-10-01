import { Link } from "react-router-dom";

const ConstanciaRenta = () => {
  return (
    <div className="">
      <section className="w-50 shadow p-3 my-3 bg-body rounded m-auto">
        <h4>Detalles</h4>
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <p>Ingreso devengado</p>
            <p>$0,000.00</p>
          </div>
          <p>(Sueldos, vacaciones, gratificaciones y otros)</p>
          <div className="d-flex justify-content-between align-items-center">
            <p>Aguinaldo gravado</p>
            <p>$0,000.00</p>
          </div>
          <p className="fw-bold">(-) Ingresos no gravados</p>
          <div className="d-flex justify-content-between align-items-center">
            <p>Cotización AFP</p>
            <p>$0,000.00</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p>Cotización ISSS</p>
            <p>$0,000.00</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p>Aguinaldo no gravado</p>
            <p>$0,000.00</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p>Monto gravado</p>
            <p>$0,000.00</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p>Impuesto sobre la renta</p>
            <p>$0,000.00</p>
          </div>
        </div>
        <p className="mt-3 text-center">
          Se extiende la presente en la ciudad de San Salvador el 29 de enero
          del 2023
        </p>
        <p className="text-center">Julieta Ramirez</p>
      </section>
      <Link to="/" className="m-auto">
        <button className="btn btn-secondary">Regresar</button>
      </Link>
    </div>
  );
};

export default ConstanciaRenta;
