import { useLocation } from "react-router-dom";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { PaymentForm } from "../Components/Page/Payment";
import { OrderSummary } from "../Components/Page/Order";

function Payment() {
  const {
    state: { apiResult, userInput },
  } = useLocation();

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// Stripe Publish Key
const stripePromise = loadStripe('pk_test_51QoKzSEJYDXr859PZTnbKIeAcnmr6wCOUn4v9A7a5HlrHqXSgd9NyjcMT7ie3Ylb5uPvFZVAXjC2IrvdeYvYh0My005i3hT3nS');

const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
  };

//   console.log(apiResult);
//   console.log(userInput);

  return (
    <Elements stripe={stripePromise} options={options}>
        <div className="container m-5 p-5">
            <div className="row">
                <div className="col-md-7"><OrderSummary /></div>
                <div className="col-md-5"><PaymentForm /></div>
            </div>
        </div>      
    </Elements>
  );
}

export default Payment;
