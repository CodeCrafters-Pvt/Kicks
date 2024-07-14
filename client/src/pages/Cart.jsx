import { useEffect, useState } from "react";
import { Input, Card, CartSummary } from "../components";
import { Link } from "react-router-dom";
import { useGetUserCartQuery } from "../redux/api/cartApiSlice";
import { RiEmotionSadLine } from "react-icons/ri";
import img from "../assets/nick air jordan 6.png";
import img2 from "../assets/vans 2.png";
import img3 from "../assets/adidas barricade 2.png";

export default function Cart() {
  const {
    data: cart,
    isLoading,
    isError,
    error,
  } = useGetUserCartQuery("658438761ea492a51fbf2c9e");
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleSelectAll = () => {
    setSelectAllChecked((prevState) => !prevState);
  };

  useEffect(() => {
    console.log(cart, "err", isError, error);
  }, [cart, isError]);

  const isCartNotFound =
    (!isLoading && isError && error.status === 404) ||
    (cart && cart.length === 0);

  const dummy = [
    {
      name: "Nike Air Jordan",
      type: "Sneakers",
      price: 386,
      quantity: 2,
      img: img,
      favorite: false,
    },
    {
      name: "Nike Air Jordan",
      type: "Sneakers",
      price: 386,
      quantity: 2,
      img: img2,
      favorite: false,
    },
    {
      name: "Nike Air Jordan",
      type: "Sneakers",
      price: 386,
      quantity: 2,
      img: img3,
      favorite: true,
    },
    {
      name: "Nike Air Jordan",
      type: "Sneakers",
      price: 386,
      quantity: 2,
      img: img,
      favorite: false,
    },
    {
      name: "Nike Air Jordan",
      type: "Sneakers",
      price: 386,
      quantity: 2,
      img: img,
      favorite: true,
    },
  ];
  return (
    <div className={`flex gap-56 mx-8 items-center`}>
      <div className="left w-1/2">
        <Link to="/products">
          <span className="text-md"> &lt; Shopping Continue</span>
        </Link>
        <hr className=" border-gray-300 m-1 my-2  w-1/2" />
        {isCartNotFound ? (
          <div className="flex flex-col w-[90vw]">
            <span className="text-lg mt-1">Shopping cart</span>
            <div className=" text-center text-xl  mt-20 text-gray-400 ">
              <span className="">
                CART IS EMPTY
                <RiEmotionSadLine className="inline text-6xl ml-2 mb-2"/>
              </span>
            </div>
          </div>
        ) : (
          <>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg mt-1">Shopping cart</span>
                <Input
                  type="checkbox"
                  field="selectAll"
                  selectAll
                  handleSelectAll={handleSelectAll}
                />
              </div>
              <small>You have {dummy.length} items in cart</small>
            </div>
            <div className="cards-container mt-2 pr-2 max-h-[64vh] overflow-y-auto">
              {dummy.map((product, index) => (
                <Card
                  key={index}
                  name={product.name}
                  type={product.type}
                  price={product.price}
                  quantity={product.quantity}
                  img={product.img}
                  favorite={product.favorite}
                  isChecked={selectAllChecked}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {!isCartNotFound && (
        <div className="right mt-20">
          <CartSummary />
        </div>
      )}
    </div>
  );
}
