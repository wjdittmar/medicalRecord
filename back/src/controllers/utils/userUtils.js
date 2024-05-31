const bcrypt = require("bcrypt");
const User = require("../../models/user/user");
const createUserSchema = require("../../models/user/createUserSchema");

const createUser = async (userObject) => {
	const { name, phone, email, password, role } = userObject;

	const { value: userValue, error: userError } = createUserSchema.validate({
		email,
		name,
		phone,
		password,
		role,
	});
	if (userError) {
		throw new Error(userError.details[0].message);
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(userValue.password, saltRounds);
	const user = new User({
		email: userValue.email,
		name: userValue.name,
		phone: userValue.phone,
		passwordHash: passwordHash,
		role: userValue.role,
	});

	return user.save();
};

module.exports = { createUser };
