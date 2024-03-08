import { useDispatch } from "react-redux";
import { useGeneratePaymentConfigMutation } from "../../redux/api/paymentApiSlice";
import { setPaymentConfig } from "../../redux/slices/paymentSlice";
import { Button } from "../../components";


export default function PaymentGateway() {
  const dispatch = useDispatch();
  const [generatePaymentConfig] = useGeneratePaymentConfigMutation();

  const dummy = {
    id: "12345",
    items: "Door bell wireless",
    amount: "1000",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    address: "123 Main St",
    city: "Anytown",
    country: "CountryName",
  };

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
      text="Checkout ->"
      type="button"
      variant="primary"
      onClick={() => initiatePayment(dummy)}
    />
  );
}
