import { Card, CardBody, Image, Input } from "@nextui-org/react";
import ErrorPage from "./Error";
import LoadingPage from "./Loading";
import getData from "./getShopData";
import { useContext, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "./App";

export default function CartPage() {
  const { cartCount, adjustCount, removeFromCart, updateCart, getCart } =
    useContext(CartContext);

  const cart = getCart();

  if (Object.keys(cart).length === 0) {
    return (
      <div className="h-[85vh] w-full flex items-center justify-center">
        <h1 className="text-5xl font-black">Cart is Empty</h1>
      </div>
    );
  } else {
    const { data, loading, error } = getData();

    function ItemCard({ id, count }) {
      const item = data.find((item) => item.id === id);
      const [itemCount, setItemCount] = useState(count);
      const cardRef = useRef();

      return (
        <Card className="p-0 sm:p-4 w-full" ref={cardRef}>
          <CardBody>
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="p-1 border rounded-lg w-16 min-w-16 h-16 flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={200}
                  height={200}
                  className=" max-h-14 w-auto"
                  removeWrapper
                  radius="none"
                />
              </div>
              <h2 className="font-bold">{item.title}</h2>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-neutral-600 text-xl flex items-center gap-2">
                <Input
                  type="number"
                  value={itemCount}
                  min={1}
                  max={999}
                  classNames={{
                    input: ["w-8", "sm:w-12"],
                    base: ["w-fit"],
                  }}
                  onChange={(e) => {
                    setItemCount(e.target.value);
                    updateCart(item.id, parseInt(e.target.value));
                    const cart = JSON.parse(localStorage.getItem("cart"));
                    let count = 0;
                    for (const key in cart) {
                      count += cart[key];
                    }
                    adjustCount(count);
                  }}
                  startContent={
                    itemCount === 1 ? (
                      <button
                        onClick={() => {
                          removeFromCart(item.id);
                          cardRef.current.style.display = "none";
                          adjustCount(cartCount - 1);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} className="text-lg" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setItemCount(itemCount - 1);
                          updateCart(item.id, itemCount - 1);
                          adjustCount(cartCount - 1);
                        }}
                      >
                        <FontAwesomeIcon icon={faMinus} className="text-lg" />
                      </button>
                    )
                  }
                  endContent={
                    <button
                      onClick={() => {
                        setItemCount(itemCount + 1);
                        updateCart(item.id, itemCount + 1);
                        adjustCount(cartCount + 1);
                      }}
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-lg" />
                    </button>
                  }
                ></Input>
                <p> &times; ${item.price}</p>
              </span>
              <div className="bg-neutral-200 h-[2px] rounded-full flex-grow"></div>
              <h3 className="font-bold text-3xl">
                ${parseInt(item.price * itemCount)}
                <span className=" text-base">
                  .
                  {
                    (
                      parseFloat(item.price * itemCount, 10).toFixed(2) + ""
                    ).split(".")[1]
                  }
                </span>
              </h3>
            </div>
          </CardBody>
        </Card>
      );
    }

    if (error) {
      return <ErrorPage />;
    }
    if (loading) {
      return <LoadingPage />;
    }
    return (
      <div className="p-2 sm:p-6 max-w-5xl mx-auto">
        <h1 className="text-5xl font-black mb-4">Cart</h1>
        <div className="flex flex-col gap-4 items-center justify-center">
          {Object.keys(cart).map((productId, i) => (
            <ItemCard
              key={i}
              id={parseInt(productId)}
              count={cart[productId]}
            />
          ))}
        </div>
        <div />
      </div>
    );
  }
}
