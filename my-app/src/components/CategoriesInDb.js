import { Component } from "react";
//funciona

class CategoriesInDb extends Component {
  state = {
        productos: [],
    };
    
    componentDidMount() {
        console.log("montado");
        fetch("http://localhost:3030/api/products/")
          .then((r) => r.json())
          .then((respuesta) => {
            console.log(respuesta);
            this.setState({ productos: respuesta });
          })
          .catch((error) => console.log(error));
    }

  render() {
    return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5
              className="m-0 font-weight-bold text-gray-800"
            >
              Categorias
            </h5>
          </div>
          <div className="card-body fondoCaja">
            <div className="row">
            <div>
                    <p>La Liga: {this.state.productos.laLiga}</p>
                    <p>Premier League: {this.state.productos.premierLeague}</p>
                    <p>Bundesliga: {this.state.productos.bundesliga}</p>
                    <p>Ligue 1: {this.state.productos.ligue1}</p>
                    <p>Primera Division Argentina: {this.state.productos.primeraDivisionArgentina}</p>
                    <p>Primera Division Colombiana: {this.state.productos.primeraDivisionColombiana}</p>
                    <p>Selecciones Del Mundo: {this.state.productos.seleccionesDelMundo}</p>
                    
            </div>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    );
  }
}

export default CategoriesInDb;
