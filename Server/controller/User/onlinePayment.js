const stripe = require("stripe")(process.env.payment_secret_key);

const onlinePayment = async (req, res) => {
  try {
    const { course } = req.body;
   
    const userId = req.userId; // from auth middleware

    console.log("User Id",userId);
    console.log("Course Id",course._id);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.title,
            },
            unit_amount: Math.round(course.price * 100),
          },
          quantity: 1,
        },
      ],

      // ✅ store info safely
       metadata: {
        userId: userId.toString(),
        courseId: course._id.toString(),
      },

      // ✅ VERY IMPORTANT
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-fail`,
    });

    // ✅ FRONTEND STILL GETS URL
    res.status(200).json({
      url: session.url,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = onlinePayment;
