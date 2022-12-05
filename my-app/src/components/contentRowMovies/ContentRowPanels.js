import React, { useEffect, useState } from "react"
import RowItem from "./RowItem";
function ContentRowPanels() {

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  let MoviesInDataBase = {
    key: 1,
    title: "Total Productos",
    quantity: totalProducts,
    color: "primary",
    icon: "fa-laptop",
  };

  let TotalAwards = {
    key: 2,
    title: "Total Usuarios",
    quantity: totalUsers,
    color: "success",
    icon: "fa-user",
  };

  let ActorsQuantity = {
    key: 3,
    title: "Total categorias ",
    quantity: totalCategories,
    color: "warning",
    icon: "fa-table",
  };

  useEffect(() => {
    const getTotalProducts = async () => {
      try {
        const response = await fetch("http://localhost:3030/api/products");
        const json = await response.json();
        //console.log(json.total);
        //return json.total;
        setTotalProducts(json.total);
      } catch (error) {
        console.log("error", error);
        // return 0;
        setTotalProducts(0);
      }
    };

    const getTotalUsers = async () => {
      try {
        const response = await fetch("http://localhost:3030/api/users");
        const json = await response.json();
        //console.log(json.total);
        //return json.total;
        setTotalUsers(json.total);
      } catch (error) {
        console.log("error", error);
        //return 0;
        setTotalUsers(0);
      }
    };

    const getTotalCategories = async () => {
      try {
        const response = await fetch("http://localhost:3030/api/products/categorias");
        const json = await response.json();
        //console.log(json.total);
        //return json.total;
        setTotalCategories(json.total);
      } catch (error) {
        console.log("error", error);
        //return 0;
        setTotalCategories(0);
      }
    };

    getTotalProducts();
    getTotalUsers();
    getTotalCategories();
  }, []);

  const dataRowMovies = [MoviesInDataBase, TotalAwards, ActorsQuantity];

  return (
    <div className="row">
      {dataRowMovies.map((card) => {
        return (
          <RowItem
            key={card.key}
            title={card.title}
            quantity={card.quantity}
            color={card.color}
            icon={card.icon}
          />
        );
      })}
    </div>
  );
}

export default ContentRowPanels;
