const { BadRequestError } = require("../errors/AppError.js");

function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "An Internal Server Error Ocurred";

  res.status(statusCode).json({
    error: err.name || "InternalServerError",
    statusCode: statusCode,
    message: message,
  });
}

function isValidCpf(cpf) {
  cpf = String(cpf).replace(/[^\d]+/g, "");

  if (cpf.length !== 11) return false;

  if (/^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }
  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}

const validateClientCreate = (req, res, next) => {
  const { name, birthDate, cpf } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    throw new BadRequestError(
      "Client name is required and must be a non-empty string."
    );
  }

  if (!birthDate || !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
    throw new BadRequestError(
      "Birth date is required and must be in the format YYYY-MM-DD."
    );
  }

  if (!cpf || !isValidCpf(cpf)) {
    throw new BadRequestError("CPF is required and must be valid.");
  }

  next();
};

const validateClientUpdate = (req, res, next) => {
  const { name, birthDate, cpf } = req.body;

  if (name && (typeof name !== "string" || name.trim() === "")) {
    throw new BadRequestError("Client name must be a non-empty string.");
  }

  if (birthDate && !/^\d{4}-\d{2}-\d{2}$/.test(birthDate)) {
    throw new BadRequestError("Birth date must be in the format YYYY-MM-DD.");
  }

  if (cpf && !isValidCpf(cpf)) {
    throw new BadRequestError("CPF must be valid.");
  }

  next();
};

const validateDishCreate = (req, res, next) => {
  const { name, price, category } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    throw new BadRequestError(
      "Dish name is required and must be a non-empty string."
    );
  }

  if (!/^[a-zA-Z\s]{3,50}$/.test(name)) {
    throw new BadRequestError(
      "Dish name must contain only letters and spaces, and be between 3 and 50 characters long."
    );
  }

  if (price === undefined || isNaN(price) || Number(price) < 0) {
    throw new BadRequestError(
      "Dish price is required and must be a positive number."
    );
  }

  if (!category || typeof category !== "string" || category.trim() === "") {
    throw new BadRequestError(
      "Dish category is required and must be a non-empty string."
    );
  }

  next();
};

const validateDishUpdate = (req, res, next) => {
  const { name, price, category } = req.body;

  if (name) {
    if (!/^[a-zA-Z\s]{3,50}$/.test(name)) {
      throw new BadRequestError(
        "Dish name must contain only letters and spaces, and be between 3 and 50 characters long."
      );
    }
  }

  if (price) {
    if (isNaN(price) || Number(price) < 0) {
      throw new BadRequestError("Dish price msust be a positive number.");
    }
  }

  if (category) {
    if (!/^[a-zA-Z\s]{3,50}$/.test(category)) {
      throw new BadRequestError(
        "Dish category must contain only letters and spaces, and be between 3 and 50 characters long."
      );
    }
  }

  next();
};

module.exports = {
  errorHandler,
  validateClientCreate,
  validateClientUpdate,
  validateDishCreate,
  validateDishUpdate,
};
