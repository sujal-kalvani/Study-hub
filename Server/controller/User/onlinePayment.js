const stripe = require("stripe")(process.env.payment_secret_key)
const onlinePayment = async (req, res) => {

    try {
        const { data } = req.body

        const line_items = data.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.title,
                },
                unit_amount: Math.round(item.price * 100), // INR in paise
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items,
            success_url: `${process.env.FRONTEND_URL}/payment-success`,
            cancel_url: `${process.env.FRONTEND_URL}/payment-fail`,
        });

        res.status(201).json({
            url: session.url,
        });


    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = onlinePayment