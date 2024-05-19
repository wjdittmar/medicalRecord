const fhirApi = require("../utils/fhirApi");

const fetchPatientData = async (firstName, lastName, dateOfBirth) => {
	const response = await fhirApi.get(
		`/Patient?given=${firstName}&family=${lastName}&birthdate=${dateOfBirth}`
	);
	return response.data;
};

const fetchConditions = async (patientId) => {
	const response = await fhirApi.get(
		`/Condition?patient=${patientId}`
	);
	return response.data;
};

const fetchDocumentReferences = async (patientId) => {
	const response = await fhirApi.get(
		`/DocumentReference?patient=${patientId}`
	);
	return response.data;
};

const getNotesByType = async (documentReferences, noteType) => {
	const noteUrls = documentReferences.entry
		.filter(element => element.resource.type.text === noteType) // Filter by note type
		.map(element => {
			const url = `${fhirApi.defaults.baseURL}/${element.resource.content[0].attachment.url}`;
			return url;
		});

	const noteDataPromises = noteUrls.map(noteUrl => fhirApi.get(noteUrl));
	const noteDataResponses = await Promise.all(noteDataPromises);
	return noteDataResponses.map(response => response.data);
};


module.exports = {
	fetchPatientData,
	fetchConditions,
	fetchDocumentReferences,
	getNotesByType,
};
