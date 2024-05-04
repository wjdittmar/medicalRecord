const { faker } = require("@faker-js/faker");


function createRandomProvider() {
	const user = createRandomUser(); // a provider is a user + license field
	return {
		license: faker.helpers.fromRegExp("A[1-9]{7}") + faker.location.state({ abbreviated: true })
	};
}

function createRandomUser() {
	return {
		name: faker.person.firstName() + " " + faker.person.lastName(),
		phone: faker.helpers.fromRegExp("[1-9]{3}-[1-9]{3}-[1-9]{4}"),
		email: faker.internet.email()
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
		encounterDate: faker.helpers.arrayElement([faker.date.soon(), faker.date.past()]),
		providerNotes: faker.hacker.phrase()
	};
}
module.exports = {
	createRandomProvider,
	createRandomPatient,
	createRandomVisit,
	createRandomUser
};