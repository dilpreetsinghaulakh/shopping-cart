import { useEffect } from "react";
import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  Input,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";

const getData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/electronics")
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

export default function Shop() {
  const { data, loading, error } = getData();

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  function ItemCard({ item }) {
    const [cartCount, setCartCount] = useState(1);
    return (
      <Card className="p-0 sm:p-4">
        {console.log(item)}
        <CardBody>
          <div className="flex gap-2 sm:gap-4 items-center">
            <div className="p-4 border rounded-lg w-32 min-w-32 h-32 sm:w-40 sm:min-w-40 sm:h-40 flex items-center justify-center">
              <Image
                src={item.image}
                alt={item.title}
                width={200}
                height={200}
                className=" max-h-28 sm:max-h-32 w-auto"
                removeWrapper
                radius="none"
              />
            </div>
            <h2 className=" font-bold">{item.title}</h2>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-neutral-600">
              <FontAwesomeIcon icon={faStar} className="text-amber-500" />{" "}
              <b className="text-black">{item.rating.rate}</b> (
              {item.rating.count})
            </p>
            <h3 className="font-bold text-3xl">${item.price}</h3>
          </div>
        </CardBody>

        <CardFooter className="m-0 gap-2">
          <Button color="primary" className="w-full text-base font-bold">
            Add to Cart
          </Button>

          <Input
            type="number"
            min={1}
            max={999}
            value={cartCount}
            startContent={
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-blue-500"
              />
            }
            classNames={{
              input: ["w-8", "sm:w-12"],
              base: ["w-fit"],
            }}
            onChange={(e) => setCartCount(e.target.value)}
          />
        </CardFooter>
      </Card>
    );
  }
  return (
    <div className="p-2 sm:p-6">
      <h1 className="text-5xl mb-4">Shop</h1>
      <div className="grid gap-4">
        {data.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
