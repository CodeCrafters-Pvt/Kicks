import PropTypes from "prop-types";
import { PaymentGateway } from "../";

export default function CartSummary() {
  return (
    <div className="bg-white shadow p-6 rounded-xl">
      <div className="flex w-full my-4 text-center justify-center font-black text-lg ">
        Order Summary
      </div>
      <hr className="border-t-2 border-lightPurple mx-4 my-2 opacity-50"></hr>
      <div className="grid grid-cols-2 place-content-betweens pt-4">
        <span>Subtotal</span>
        <span className="text-end">$1209</span>
        <span>Discount</span>
        <span className="text-end">$4</span>
      </div>
      <span className="text-xs">
        Shipping options will be updated during checkout.
      </span>

      <hr className="border-t-2 border-lightPurple mx-4 mt-4 opacity-50"></hr>
      {/* hr line */}

      <div className="grid grid-cols-2 place-content-betweens pt-4 font-bold">
        <span>Total (Tax incl.)</span>
        <span className="text-end">$3500</span>
      </div>
      <div className="flex justify-center my-4">
        <PaymentGateway/>
      </div>

      <small className="font-bold underline">Use a promo code</small>
{/* 
      <div className="grid grid-cols-3 my-4 gap-2 justify-items-center">
        <div className="col-start-1 col-end-4 align-middle text-center font-bold mb-2">
          Payment Method
        </div>
        <div className="block rounded-lg ml-6">
          <img
            src="src\assets\mastercard.png"
            alt="mastercard"
            className="object-cover justify-center h-10"
          />
        </div>
        <div className="block rounded-lg">
          <img
            src="src\assets\visa.png"
            alt="visa"
            className="object-cover justify-center h-10"
          />
        </div>
        <div className="block rounded-lg mr-6">
          <img
            src="src\assets\rupay.png"
            alt="rupay"
            className="object-cover justify-center h-10"
          />
        </div>
      </div> */}
    </div>
  );
}

CartSummary.propTypes = {
  cartProductId: PropTypes.array,
};
