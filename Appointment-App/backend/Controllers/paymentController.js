const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Store in .env
const Payment = require("../Models/PaymentModel");

const createPaymentIntent = async (req, res) => {
  const { amount, userId } = req.body;

  if (!amount || isNaN(amount)) {
    return res.status(400).json({ error: "Invalid amount received" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "inr",
      payment_method_types: ["card"],
    });

    const newPayment = new Payment({
      userId,
      amount,
      paymentIntentId: paymentIntent.id,
      status: "pending",
    });

    await newPayment.save();

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
};
