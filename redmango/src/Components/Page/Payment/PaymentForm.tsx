import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { toastNotify } from '../../../Helper';
import { orderSummaryProps } from '../Order/OrderSummaryProps';
import { cartItemModel } from '../../../Interfaces';

const PaymentForm = ({ data, userInput }: orderSummaryProps) => {
        const stripe = useStripe();
        const elements = useElements();
        const [isProcessing, setIsProcessing] = useState(false);

      
        const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
          // We don't want to let default form submission happen here,
          // which would refresh the page.
          event.preventDefault();
      
          if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
          }
          setIsProcessing(true);
          const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
              return_url: "https://example.com/order/123/complete",
            },
            redirect: "if_required",
          });
      
          if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
            toastNotify("An unexpected error occured.", "error");
            setIsProcessing(false);
          } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
            console.log(result);
            // "pickupName": "string",
            // "pickupPhoneNumber": "string",
            // "pickupEmail": "string",
            // "applicationUserId": "string",
            // "orderTotal": 0,
            // "stripePaymentIntentID": "string",
            // "status": "string",
            // "totalItems": 0,
            
            const orderDetailsDTO: any = [];
            data.cartItems.forEach((item:cartItemModel)=>{
              const tempOrderDetail: any = {};
              tempOrderDetail["menuItemId"] = item.menuItem?.id;
              tempOrderDetail["quantity"] = item.quantity;
              tempOrderDetail["itemName"] = item.menuItem?.name;
              tempOrderDetail["price"] = item.menuItem?.price;
              orderDetailsDTO.push(tempOrderDetail);
            })

          }
        };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="btn btn-success mt-5 w-100">Submit</button>
    </form>
  );
};

export default PaymentForm;

//---Followig is the default redirect URL if we don't use 
//https://example.com/order/123/complete?
// payment_intent=pi_3QoPmMEJYDXr859P1G4ARXSi
// &payment_intent_client_secret=pi_3QoPmMEJYDXr859P1G4ARXSi_secret_YxqORXYblJo3PbeiXh60IFZuZ
// &redirect_status=succeeded
