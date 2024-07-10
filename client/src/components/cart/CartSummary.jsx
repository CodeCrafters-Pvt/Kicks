import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "../../components";

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
        <Link to="/check-out">
          <Button text="Checkout  ->" type="button" variant="primary" />
        </Link>
      </div>

      <small className="font-bold underline">Use a promo code</small>
    </div>
  );
}

CartSummary.propTypes = {
  cartProductId: PropTypes.array,
};
