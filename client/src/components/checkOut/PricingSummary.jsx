export default function PricingSummary() {
  return (
    <div className="bg-white shadow px-8 py-4 rounded-xl text-center w-72">
      <span className=" font-heading ">Order details</span>
      <hr className=" border-gray-500  my-2" />
      <div className="flex justify-between  my-4">
        <span>Subtotal</span>
        <span>$50</span>
      </div>
      <div className="flex justify-between my-4">
        <span>Discount</span>
        <span>$5</span>
      </div>
      <div className="flex justify-between my-4">
        <span>Shipping</span>
        <span>$2</span>
      </div>
      <hr className=" border-gray-500  my-2" />
      <div className="flex justify-between my-4">
        <span>Total</span>
        <span>$47</span>
      </div>
      <hr className=" border-gray-500  my-2" />
    </div>
  );
}
