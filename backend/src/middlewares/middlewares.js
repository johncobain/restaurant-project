const { BadRequestError } = require("../errors/AppError.js");

function errorHandler(err, req, res, next) {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Ocorreu um erro interno no servidor";

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

const validateClienteCreate = (req, res, next) => {
  const { nome, data_nascimento, cpf } = req.body;

  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    throw new BadRequestError(
      "Nome do cliente é obrigatório e deve ser uma string não vazia."
    );
  }

  if (!data_nascimento || !/^\d{4}-\d{2}-\d{2}$/.test(data_nascimento)) {
    throw new BadRequestError(
      "Data de nascimento é obrigatória e deve estar no formato YYYY-MM-DD."
    );
  }

  if (!cpf || !isValidCpf(cpf)) {
    throw new BadRequestError("CPF é obrigatório e deve ser válido.");
  }

  next();
};

const validateClienteUpdate = (req, res, next) => {
  const { nome, data_nascimento, cpf } = req.body;

  if (nome && (typeof nome !== "string" || nome.trim() === "")) {
    throw new BadRequestError("Nome do cliente deve ser uma string não vazia.");
  }

  if (data_nascimento && !/^\d{4}-\d{2}-\d{2}$/.test(data_nascimento)) {
    throw new BadRequestError(
      "Data de nascimento deve estar no formato YYYY-MM-DD."
    );
  }

  if (cpf && !isValidCpf(cpf)) {
    throw new BadRequestError("CPF deve ser válido.");
  }

  next();
};

const validatePratoCreate = (req, res, next) => {
  const { nome, preco, categoria } = req.body;

  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    throw new BadRequestError(
      "Nome do prato é obrigatório e deve ser uma string não vazia."
    );
  }

  if (!/^[a-zA-Z\s]{3,50}$/.test(nome)) {
    throw new BadRequestError(
      "Nome do prato deve conter apenas letras e espaços, com tamanho entre 3 e 50 caracteres."
    );
  }

  if (preco === undefined || isNaN(preco) || Number(preco) < 0) {
    throw new BadRequestError(
      "Preço do prato é obrigatório e deve ser um número positivo."
    );
  }

  if (!categoria || typeof categoria !== "string" || categoria.trim() === "") {
    throw new BadRequestError(
      "Categoria do prato é obrigatória e deve ser uma string não vazia."
    );
  }

  next();
};

const validatePratoUpdate = (req, res, next) => {
  const { nome, preco, categoria } = req.body;

  if (nome) {
    if (!/^[a-zA-Z\s]{3,50}$/.test(nome)) {
      throw new BadRequestError(
        "Nome do prato deve conter apenas letras e espaços, com tamanho entre 3 e 50 caracteres."
      );
    }
  }

  if (preco) {
    if (isNaN(preco) || Number(preco) < 0) {
      throw new BadRequestError("Preço do prato deve ser um número positivo.");
    }
  }

  if (categoria) {
    if (!/^[a-zA-Z\s]{3,50}$/.test(categoria)) {
      throw new BadRequestError(
        "Categoria do prato deve conter apenas letras e espaços, com tamanho entre 3 e 50 caracteres."
      );
    }
  }

  next();
};

module.exports = {
  errorHandler,
  validateClienteCreate,
  validateClienteUpdate,
  validatePratoCreate,
  validatePratoUpdate,
};
