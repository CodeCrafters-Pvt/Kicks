import { OrderSummary } from "../";
export default function Step2({ details ,paymentOption }) {
  return (
    <div className="flex">
      <OrderSummary details={details} paymentOption={paymentOption}/>
    </div>
  );
}
