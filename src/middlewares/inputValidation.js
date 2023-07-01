import {body, validationResult} from 'express-validator';

const validateInput = [
    body('donorName').trim().isLength({ min: 1 }).withMessage('Donor name is required'),
    body('donorEmail').trim().isEmail().withMessage('Invalid email format'),
    body('amount').trim().isFloat({ min: 1 }).withMessage('Invalid amount'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];

export default validateInput;
      