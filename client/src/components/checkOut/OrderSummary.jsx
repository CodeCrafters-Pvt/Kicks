import { IoMdCash } from "react-icons/io";
import { FaCreditCard } from "react-icons/fa";

export default function OrderSummary({ details, paymentOption }) {
  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    country,
    shippingAddress,
    items,
    amount,
  } = details;

  const renderAddressLines = (address) => {
    if (!address) return null;
    const parts = address.split(","); // Split address by commas
    return parts.map((part, index) => (
      <span key={index} className="ml-4 block">
        {part.trim()}, {/* Trim to remove any leading/trailing spaces */}
      </span>
    ));
  };

  return (
    <div className="bg-white shadow px-8 py-4 rounded-xl text-center w-1/2 ml-20 mt-16 mb-10">
      <span className="font-heading">Order Summary</span>
      <hr className="border-gray-500  my-2" />
      <div className="text-right mt-4 mb-2 font-bold">
        <span>Order ID : </span>
        <span>{id}</span>
      </div>
      <div className="flex justify-between">
        <div className="text-left ml-2 my-4 flex flex-col gap-2">
          <span className="font-bold mb-4">Customer</span>
          <span className="ml-4">
            {firstName} {lastName}
          </span>
          <span className="ml-4">{email}</span>
          <span className="ml-4">{phone}</span>
        </div>
        <div>
          <div className="text-left ml-2 my-4 flex flex-col gap-2">
            <span className="font-bold mb-4">Delivery</span>
            {/* {renderAddressLines(address)} */}
            <span className="ml-4">{address}</span>
            <span className="ml-4">{city}</span>
            <span className="ml-4">{country}</span>
          </div>
        </div>
      </div>
      <div className="text-left w-1/2 ml-2 mb-4 mt-10 flex flex-col gap-2 ">
            <div className="flex justify-between">
              <span className="font-bold mb-4">Payment</span>
              {paymentOption === "Cash" && (
                <IoMdCash className="text-2xl text-green-700 relative bottom-1" />
              )}
              {paymentOption === "Card" && (
                <FaCreditCard className="text-xl text-blue-700 relative bottom-1" />
              )}
            </div>
            <div className="ml-4 flex justify-between">
              <span>Subtotal </span>
              <span className="mr-4">$ 60</span>
            </div>
            <div className="ml-4 flex justify-between">
              <span>Discount </span>
              <span className="mr-4">$ 12</span>
            </div>
            <div className="ml-4 flex justify-between">
              <span>Shipping </span>
              <span className="mr-4">$ 5</span>
            </div>
            <hr className=" border-gray-500  my-2" />
            <div className="ml-4 flex justify-between">
              <span>Total </span>
              <span className="mr-4">$ 77</span>
            </div>
          </div>
    </div>
  );
}
