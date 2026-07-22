import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { jwtDecode } from "jwt-decode";
import API from "../../../api";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = ({ amount, onSuccess, slotId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBookSlot = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.get(`/api/appointment/bookSlot/${slotId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Appointment booked successfully!");
      setTimeout(() => {
        navigate("/user/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error booking slot:", error);
      toast.error("Failed to book the slot. Please try again.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements || amount <= 0 || !slotId) {
      console.error("Payment failed: Invalid input values.");
      toast.error("Invalid payment details.");
      setIsProcessing(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);

      const response = await fetch(
        "http://localhost:8000/api/payment/create-intent",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, userId: decoded.id }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Payment failed");

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) throw error;

      await handleBookSlot();
      if (onSuccess) onSuccess(paymentIntent);
    } catch (error) {
      console.error("Payment error:", error.message || error);
      toast.error(error.message || "Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Payment Details
        </h3>
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#374151",
                  fontFamily: '"Inter", sans-serif',
                  "::placeholder": {
                    color: "#9CA3AF",
                  },
                },
                invalid: {
                  color: "#EF4444",
                },
              },
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <div>
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-2xl font-semibold text-gray-900">₹{amount}</p>
        </div>
        <button
          type="submit"
          disabled={!stripe || isProcessing || amount <= 0}
          className={`px-6 py-3 rounded-md text-white font-medium ${
            isProcessing ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          {isProcessing ? "Processing..." : "Confirm Payment"}
        </button>
      </div>
    </form>
  );
};

const PaymentForm = ({ onSuccess }) => {
  const location = useLocation();
  const slotId = location.state?.slotId;
  const serviceFee = 700; // Fixed amount or fetch from API
  const [amount] = useState(serviceFee);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Complete Your Payment
            </h2>
            <p className="mt-2 text-gray-600">
              Secure payment for your medical appointment
            </p>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Service Fee:</span>
              <span className="font-medium">₹{serviceFee}</span>
            </div>
          </div>

          <Elements stripe={stripePromise}>
            <CheckoutForm
              slotId={slotId}
              amount={amount}
              onSuccess={onSuccess}
            />
          </Elements>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your payment is secured with 256-bit SSL encryption</p>
            <div className="mt-2 flex justify-center space-x-4">
              <span className="text-blue-600">Privacy Policy</span>
              <span className="text-blue-600">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
