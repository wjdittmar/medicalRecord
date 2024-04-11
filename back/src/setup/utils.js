const { faker } = require("@faker-js/faker");


function createRandomProvider() {
	return {
		email: faker.internet.email(),
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		phone: faker.helpers.fromRegExp("[1-9]{3}-[1-9]{3}-[1-9]{4}"),
		license: {
			license_id: faker.helpers.fromRegExp("A[1-9]{7}"),
			state: faker.location.state({ abbreviated: true })
		}
	};
}
module.exports = {
	createRandomProvider
};