const Table = require("../models/tableModel");
const createHttpErrors = require("http-errors");

const addTable = async (req, res, next) => {
  try {
    const { tableNo } = req.body;
    if (!tableNo) {
      const error = createHttpErrors(404, "Please provide Table no!!!");
      return next(error);
    }

    const isTablePresent = await Table.findOne({ tableNo });

    if (isTablePresent) {
      const error = createHttpErrors(404, "Table already exist!!!");
      return next(error);
    }

    const newTable = new Table({ tableNo });
    await newTable.save();
    res
      .status(201)
      .json({ success: true, message: "Table added!!", data: newTable });
  } catch (error) {
    next(error);
  }
};
// const getOrderById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const order = await Order.findById(id);
//     if (!order) {
//       const error = createHttpErrors(404, "order not found!!!");
//       return next(error);
//     }
//     res
//       .status(200)
//       .json({ success: true, message: "order fetched", data: order });
//   } catch (error) {
//     next(error);
//   }
// };
const getTables = async (req, res, next) => {
  try {
    const table = await Table.find();
    if (!table) {
      const error = createHttpErrors(404, "no table available!!!");
      return next(error);
    }
    res.status(200).json({ success: true, data: table });
  } catch (error) {
    next(error);
  }
};
const updateTable = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;

    const { id } = req.params;
    if (!mongoose.Types.ObjectId(id)) {
      const error = createHttpErrors(404, "Invalid Id!!!");
      return next(error);
    }

    const table = await Table.findByIdAndUpdate(
      id,
      { status, currentOrder: orderId },
      { new: true }
    );
    if (!table) {
      const error = createHttpErrors(404, "no Table found to update!!!");
      return next(error);
    }
    res.status(200).json({
      success: true,
      message: "Table updated",
      data: table,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addTable, getTables, updateTable };
