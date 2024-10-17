import Joi from 'joi';

const validator = schema => payload => schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi
	.string()
	.email({
		minDomainSegments: 2,
		tlds: {
			allow: ['com', 'net']
		}
	})
	.required()
	.messages({
		'any.required': 'Email is required!',
		'string.email': 'Invalid email!'
	}),
	password: Joi
	.string()
	.min(6)
	.max(16)
	.required()
	.messages({
		'any.required': 'Password is required!',
		'string.min': 'Password must be atleast 6 characters long!',
		'string.max': 'Password must not exceed {#limit} characters!'
	})
});

const signinSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required()
});

const entrySchema = Joi.object({
	_id: Joi.string().required(),
	categories: Joi.string().required(),
	weight: Joi.number().required(),
	title: Joi.string().required(),
	calories: Joi.number().required(),
	groupBloodNotAllowed: Joi.array().items().required(),
	grams: Joi.number().required(),
});

const calorieIntakeSchema = Joi.object({
	height: Joi
		.number()
		.required()
		.min(100)
		.max(250)
		.messages({
			"number.min": "height must be atleast 100cm", 
			"number.max": "height must not exceed 250cm"
		}),
	currentWeight: Joi
		.number()
		.required()
		.min(50)
		.max(600)
		.messages({
			"number.min": "current weight must be atleast 50 kg",
			"number.max": "current weight must not exceed {#limit} kg"
		}),
	age: Joi
		.number()
		.required()
		.min(18)
		.max(100)
		.messages({
			"number.min": "age must be atleast 18 years or above",
			"number.max": "age must not exceed {#limit} years old"
		}),
	desiredWeight: Joi
		.number()
		.required()
		.min(50)
		.max(600)
		.messages({
			"number.min": "desired weight must be atleast 50 kg",
			"number.max": "desired weight must not exceed {#limit} kg"
		}),
	bloodType: Joi.number().required().valid(1, 2, 3, 4),
}).custom((value, helpers) => {
	if (value.currentWeight <= value.desiredWeight) return helpers.error('any.invalid');
	return value;
}).messages({'any.invalid': "currentWeight must not be less than or equal desiredWeight"})

export const signupValidator = validator(signupSchema);
export const signinValidator = validator(signinSchema);
export const entryValidator = validator(entrySchema);
export const calorieIntakeValidator = validator(calorieIntakeSchema);