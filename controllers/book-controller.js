const { find } = require("../models/book-model");
const { userModel, bookModel } = require("../models/index");
const IssuedBook = require("../dtos/book-dto");

exports.getAllBooks = async (req, res) => {
  const books = await bookModel.find();

  if (books.length === 0)
    return res.status(404).json({
      success: false,
      message: "No Book Found",
    });
  res.status(200).json({
    success: true,
    data: books,
  });
};

exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await bookModel.findById(id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "book not found",
    });
  } else {
    return res.status(200).json({
      success: true,
      data: book,
    });
  }
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await bookModel
    .find({
      issuedBook: { $exists: true },
    })
    .populate("issuedBook");

  const issuedBooks = users.map((each) => new IssuedBook(each));
  if (issuedBooks.length === 0)
    return res.status(404).json({
      success: false,
      message: "book not issued",
    });
  return res.status(200).json({
    success: true,
    data: issuedBooks,
  });
};

exports.addNewBook = async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({
      success: false,
      message: "No Data passed",
    });
  }
  await bookModel.create(data);

  const allBooks = await bookModel.find();

  // if (book) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "book already exists",
  //   });
  // }
  return res.status(200).json({
    success: true,
    data: allBooks,
  });
};

exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const updatedBook = await bookModel.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    { new: true }
  );
  return res.status(200).json({
    success: true,
    data: updatedBook,
  });
};
