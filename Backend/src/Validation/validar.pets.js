import { check, param } from 'express-validator';

export const createPetValidation = [
  check('nombre', 'Es obligatorio el nombre y maximo de 50 caracteres.').notEmpty().isString().isLength({max: 50}),
  check('raza', 'La raza es obligatorio.').notEmpty().isInt(),
  check('categoria','La categoria se necesita.').notEmpty().isInt(),
  check('genero', 'El genero es necesario.').notEmpty().isInt(),
  check('imagen').custom((value, { req }) => {
    if (!req.file) {
      throw new Error('Debe proporcionar una imagen.');
    }
    return true;
  })
];

export const updatePetValidation = [
  param('id').isInt().toInt(),
  check('nombre', 'Es obligatorio el nombre y maximo de 50 caracteres.').optional().isString(),
  check('raza', 'La raza es obligatorio.').optional().isInt(),
  check('categoria','La categoria se necesita.').optional().isInt(),
  check('genero', 'El genero es necesario.').optional().isInt(),
  check('imagen').optional().custom((value, { req }) => {
    if (req.file) {
      throw new Error('No se permite actualizar la imagen de esta manera.');
    }
    return true;
  })
];
