const Order = require("../models/orderModel");
const createHttpErrors = require("http-errors");

const addOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res
      .status(201)
      .json({ success: true, message: "order created!!", data: order });
  } catch (error) {
    next(error);
  }
};
const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      const error = createHttpErrors(404, "order not found!!!");
      return next(error);
    }
    res
      .status(200)
      .json({ success: true, message: "order fetched", data: order });
  } catch (error) {
    next(error);
  }
};
const getAllOrders = async (req, res, next) => {
  try {
    const order = await Order.find();
    if (!order) {
      const error = createHttpErrors(404, "no order available!!!");
      return next(error);
    }
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};
const updateOrder = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );
    if (!order) {
      const error = createHttpErrors(404, "no order found to update!!!");
      return next(error);
    }
    res.status(200).json({
      success: true,
      message: "order updated",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addOrder, getOrderById, getAllOrders, updateOrder };
