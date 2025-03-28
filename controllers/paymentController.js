const Stripe = require("stripe");

const createOrder = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { amount } = req.body;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Test Product" },
            unit_amount: Number(amount) * 1000, // Amount in cents ($50.00 = 5000)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: process.env.VITE_SUCCESS_URL,
      cancel_url: process.env.VITE_CANCEL_URL,
    });

    res.status(200).json({ success: true, id: session.id });
  } catch (error) {
    next(error);
  }
};

module.exports = { createOrder };
