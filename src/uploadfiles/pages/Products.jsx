import { useEffect, useState } from "react";

export function Products() {
  const [error, setError] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);
  async function fetchProducts() {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API}/products/range?start=0&end=20`,
        {
          // mode: "no-cors",
          headers: {
            atk: "",
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      setError(true);
    }
  }
  if (error) {
    return (
      <div>
        <h1>Ups ha habido un error</h1>
      </div>
    );
  }
  return (
    <div style={{ margin: "1rem" }}>
      <h1>Products</h1>
      {products.map(({ id, name, imageUrl, seller }) => (
        <div key={id} className="sha">
          <h2>{name}</h2>
          <img src={imageUrl} alt={name} width={300} />
          <p>{seller.name}</p>
        </div>
      ))}
    </div>
  );
}
