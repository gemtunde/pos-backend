const Table = require("../models/tableModel");
const createHttpErrors = require("http-errors");

const addTable = async (req, res, next) => {
  try {
    const { tableNo, seats } = req.body;
    if (!tableNo || !seats) {
      const error = createHttpErrors(404, "Please provide Table no!!!");
      return next(error);
    }

    const isTablePresent = await Table.findOne({ tableNo });

    if (isTablePresent) {
      const error = createHttpErrors(404, "Table already exist!!!");
      return next(error);
    }

    const newTable = new Table({ tableNo, seats });
    await newTable.save();
    res
      .status(201)
      .json({ success: true, message: "Table added!!", data: newTable });
  } catch (error) {
    next(error);
  }
};

const getTables = async (req, res, next) => {
  try {
    const table = await Table.find().populate({
      path: "currentOrder",
      select: "customerDetails",
    });
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
