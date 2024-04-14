import { useEffect, useState } from "react";

export default function getData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/electronics", {
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server error: status ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        setData(res);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
