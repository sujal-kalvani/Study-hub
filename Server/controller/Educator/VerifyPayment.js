const stripe = require("stripe")(process.env.payment_secret_key);
const StudentEnrolled = require("../../models/Educator/StudentEnrolled");

const verifyPayment = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID missing" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed" });
    }

    const { userId, courseId } = session.metadata;

    if (!userId || !courseId) {
      return res.status(400).json({ message: "Metadata missing" });
    }

    // prevent duplicate enrollment
    const alreadyEnrolled = await StudentEnrolled.findOne({
      user: userId,
      course: courseId,
    });

    if (!alreadyEnrolled) {
      await StudentEnrolled.create({
        user: userId,
        course: courseId,
        paymentStatus: "paid",
        paymentMode: "online",
        amountPaid: session.amount_total / 100,
        stripeSessionId: session.id,
        paymentIntentId: session.payment_intent,
      });
    }

    res.status(201).json({ success: true });

  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = verifyPayment;
