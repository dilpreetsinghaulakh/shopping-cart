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
import ErrorPage from "./Error";
import LoadingPage from "./Loading";
import { addToCart } from "./cartLogic";
import getData from "./getShopData";

export default function Shop() {
  const { data, loading, error } = getData();

  if (error) {
    return <ErrorPage />;
  }
  if (loading) {
    return <LoadingPage />;
  }

  function ItemCard({ item }) {
    const [cartCount, setCartCount] = useState(1);
    return (
      <Card className="p-0 sm:p-4">
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
          <Button
            color="primary"
            className="w-full text-base font-bold"
            onClick={() => addToCart(item.id, parseInt(cartCount))}
          >
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
    <div className="p-2 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-5xl mb-4">Shop</h1>
      <div className="grid gap-4 sm:grid-cols-2 ">
        {data.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
