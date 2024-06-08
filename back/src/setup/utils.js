import { faker } from "@faker-js/faker";


function createRandomProvider() {
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
		preferredLanguage: faker.helpers.arrayElement(["en", "es", "fr"]),
		dob: faker.date.birthdate(),
		sex: faker.person.sex(),
		ssn: faker.helpers.fromRegExp("[1-9]{3}-[1-9]{2}-[1-9]{4}")
	};
}

function createRandomVisit() {
	return {
		encounterDate: faker.helpers.arrayElement([faker.date.soon(), faker.date.past()]),
		providerNotes: faker.hacker.phrase()
	};
}
export default {
	createRandomProvider,
	createRandomPatient,
	createRandomVisit,
	createRandomUser
};