import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./Cssfail/Payment.css";
import UPI_img from "../node/uploads/upi (1).png";
import WALLET_icon from "../node/uploads/wallet.png";
import CARD_icon from "../node/uploads/card.png";
import NB_icon from "../node/uploads/nb.png";
import Cash_icon from "../node/uploads/cod_icon.png";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe("your-public-key-from-stripe");

const CheckoutForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [selectedMethod, setSelectedMethod] = useState("cash");
  const id = localStorage.getItem("userId");
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  const handlePaymentMethodClick = (method) => {
    setSelectedMethod(method);
    if (method === "cash") {
      alert("Order Success Fully");
      navigate(`/Project/${id}`);
    }
  };

  return (
    <>
      <Header />
      <Form onSubmit={handleSubmit} className="content">
        <Row >
          <p className="payment-content-extratext">Pay online _________</p>
        </Row>
        <Row
          className={`hb-3 ${selectedMethod === "upi" ? "selected" : ""}`}
          onClick={() => handlePaymentMethodClick("upi")}
        >
          <img src={UPI_img} className="payment-content-icon" alt="Logo" />
          <h6 style={{ marginTop: "-3.4vh", marginLeft: "2.8rem" }}>UPI</h6>
        </Row>
        <Row
          className={`hb-3 ${selectedMethod === "wallet" ? "selected" : ""}`}
          onClick={() => handlePaymentMethodClick("wallet")}
        >
          <img src={WALLET_icon} className="payment-content-icon" alt="Logo" />
          <h6 style={{ marginTop: "-3.4vh", marginLeft: "2.8rem" }}>Wallet</h6>
        </Row>
        <Row
          className={`hb-3 ${selectedMethod === "card" ? "selected" : ""}`}
          onClick={() => handlePaymentMethodClick("card")}
        >
          <img src={CARD_icon} className="payment-content-icon" alt="Logo" />
          <h6 style={{ marginTop: "-3.4vh", marginLeft: "2.8rem" }}>
            Debit/Credit Cards
          </h6>
        </Row>
        <Row
          className={`hb-3 ${selectedMethod === "netbanking" ? "selected" : ""}`}
          onClick={() => handlePaymentMethodClick("netbanking")}
        >
          <img src={NB_icon} className="payment-content-icon" alt="Logo" />
          <h6 style={{ marginTop: "-3.4vh", marginLeft: "2.8rem" }}>
            Net Banking
          </h6>
        </Row>

        <Row >
          <p className="payment-content-extratext">Pay in cash _________</p>
        </Row>
        <Row
          className={`hb-3 ${selectedMethod === "cash" ? "selected" : ""}`}
          onClick={() => handlePaymentMethodClick("cash")}
        >
          <img src={Cash_icon} className="payment-content-icon" alt="Logo" />
          <h6 style={{ marginTop: "-3.4vh", marginLeft: "2.8rem" }}>
            Cash on delivery
          </h6>
        </Row>

        <Button
        onClick={() => handlePaymentMethodClick("cash")}
          variant="primary"
          type="submit"
          disabled={!stripe}
          className="payment_button"
        >
          Submit Payment
        </Button>
      </Form>
    </>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="payment-content">
        <h4>Select Payment Method</h4>
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default PaymentPage;
