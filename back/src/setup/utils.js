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

function createRandomPatient() {
	return {
		firstName: faker.person.firstName(),
		lastName: faker.person.lastName(),
		phone: faker.helpers.fromRegExp("[1-9]{3}-[1-9]{3}-[1-9]{4}"),
		preferredLanguage: faker.helpers.arrayElement(["en", "es", "fr"]),
		dob: faker.date.birthdate(),
		email: faker.internet.email(),
		sex: faker.person.sex(),

	};
}

function createRandomVisit() {
	return {
		encounterDate: faker.helpers.arrayElement([faker.date.soon(), faker.date.recent()])
	};
}
module.exports = {
	createRandomProvider,
	createRandomPatient,
	createRandomVisit
};