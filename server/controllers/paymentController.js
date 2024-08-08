const midtransClient = require('midtrans-client');
const { Order } = require('../models');

class PaymentController {
  static async initiateMidtrans(req, res, next) {
    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let orderId = Math.random().toString();
      let amount = 10000;
      let parameter = {
        // Data Detail Order
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
        // Data Jenis Pembayaran
        credit_card: {
          secure: true,
        },
        // Data detail customer
        customer_details: {
          fullName: req.user.fullName,
          email: req.user.email,
        },
      };

      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;
      console.log('transactionToken:', transactionToken);

      await Order.create({
        orderId,
        amount,
        UserId: req.user.id
      })

      res.status(200).json({ message: 'Order Created', transactionToken, orderId });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = PaymentController;
