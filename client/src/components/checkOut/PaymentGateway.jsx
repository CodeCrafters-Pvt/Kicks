import { useDispatch } from "react-redux";
import { useGeneratePaymentConfigMutation } from "../../redux/api/paymentApiSlice";
import { setPaymentConfig } from "../../redux/slices/paymentSlice";
import { Button } from "..";

export default function PaymentGateway({ data }) {
  const dispatch = useDispatch();
  const [generatePaymentConfig] = useGeneratePaymentConfigMutation();

  const initiatePayment = async (orderDetails) => {
    await generatePaymentConfig(orderDetails)
      .then((res) => {
        dispatch(setPaymentConfig(res.data));
        window.payhere.startPayment(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Button
      text="Place Order"
      type="button"
      variant="primary"
      className="w-60"
      onClick={() => initiatePayment(data)}
    />
  );
}
