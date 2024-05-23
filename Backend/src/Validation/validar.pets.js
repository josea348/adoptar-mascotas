import { check, param } from 'express-validator';

export const createPetValidation = [
  check('nombre')
    .notEmpty().withMessage('El nombre es obligatorio.')
    .isString().withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ max: 50 }).withMessage('El nombre debe tener un máximo de 50 caracteres.'),
  check('raza')
    .notEmpty().withMessage('La raza es obligatoria.')
    .isInt().withMessage('La raza debe ser un número entero.'),
  check('categoria')
    .notEmpty().withMessage('La categoría es obligatoria.')
    .isInt().withMessage('La categoría debe ser un número entero.'),
  check('genero')
    .notEmpty().withMessage('El género es obligatorio.')
    .isInt().withMessage('El género debe ser un número entero.'),
  check('iduser')
    .notEmpty().withMessage('El usuario es obligatorio.')
    .isInt().withMessage('El usuario debe ser un número entero.'),
  check('imagen').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Debe proporcionar una imagen.');
    }
    return true;
  })
];

export const updatePetValidation = [
  param('id')
    .isInt().withMessage('El ID debe ser un número entero.')
    .toInt(),
  check('nombre')
    .optional()
    .isString().withMessage('El nombre debe ser una cadena de texto.')
    .isLength({ max: 50 }).withMessage('El nombre debe tener un máximo de 50 caracteres.'),
  check('raza')
    .optional()
    .isInt().withMessage('La raza debe ser un número entero.'),
  check('categoria')
    .optional()
    .isInt().withMessage('La categoría debe ser un número entero.'),
  check('genero')
    .optional()
    .isInt().withMessage('El género debe ser un número entero.'),
  check('iduser')
    .notEmpty().withMessage('El usuario es obligatorio.')
    .isInt().withMessage('El usuario debe ser un número entero.'),
  check('imagen').optional().custom((value, { req }) => {
    if (req.file) {
      throw new Error('No se permite actualizar la imagen de esta manera.');
    }
    return true;
  })
];
