import { Component } from "react";


class TableProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableRowsData: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3030/api/products")
      .then((response) => response.json())
      .then((productos) => {
        console.log(productos);
        this.setState({
          tableRowsData: productos.data
        });
      });
  }
  render() {
    return (

      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>

          {this.state.tableRowsData.map((row) => {
            return (
              <tr key={row.product_name}>
                <td>{row.product_name}</td>
                <td>{row.product_description}</td>
                <td>{row.product_price}</td>
                <img
                  style={{ width: "60%" }}
                  src={"http://localhost:3030" + row.url_img_front}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default TableProducts;
