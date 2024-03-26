import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

import logo from "../src/img/logo.svg";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://site--deliveroo-backend--9ks7wydljjh6.code.run"
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      <header>
        <div className="container">
          <img src={logo} alt="deliveroo logo" />
        </div>
      </header>
      <section>
        <div className="container hero-container">
          <div>
            <h1>{data.restaurant.name}</h1>
            <p>{data.restaurant.description}</p>
          </div>
          <img src={data.restaurant.picture} alt="miam" />
        </div>
      </section>
      <main>
        <button onClick={() => {}} className="container panier">
          Valider mon panier
        </button>

        <div className="container main-container">
          <section className="col-left">
            {" "}
            {data.categories.map((category) => {
              if (category.meals.length !== 0) {
                return (
                  <div key={category.name}>
                    <h2>{category.name}</h2>
                    <div className="articles-container">
                      {category.meals.map((meal) => {
                        return (
                          <article key={meal.id}>
                            <div>
                              <h3>{meal.title}</h3>
                              <p className="description">{meal.description}</p>
                              <span>{meal.price} €</span>
                              {meal.popular && <span>Populaire</span>}
                            </div>
                            {meal.picture && (
                              <img src={meal.picture} alt={meal.title}></img>
                            )}
                          </article>
                        );
                      })}
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </section>
          <section className="col-rigth"></section>
        </div>
      </main>
    </>
  );
}

export default App;
