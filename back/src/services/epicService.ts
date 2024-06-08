import fhirApi from "../utils/fhirApi";

// Define interfaces for the expected response data
// TODO: types may already exist for this

interface FhirResponse<T> {
	data: T;
}

interface PatientData {
	entry: Array<{
		link: Array<{
			url: string;
		}>;
	}>;
}

interface ConditionData {
	entry: Array<{
		resource: {
			type: {
				text: string;
			};
			content: Array<{
				attachment: {
					url: string;
				};
			}>;
		};
	}>;
}

interface DocumentReferenceData {
	entry: Array<{
		resource: {
			type: {
				text: string;
			};
			content: Array<{
				attachment: {
					url: string;
				};
			}>;
		};
	}>;
}

interface NoteData {
	// Define the structure of a single note data here if needed
}

const fetchPatientData = async (firstName: string, lastName: string, dateOfBirth: string): Promise<PatientData> => {
	const response: FhirResponse<PatientData> = await fhirApi.get(
		`/Patient?given=${firstName}&family=${lastName}&birthdate=${dateOfBirth}`
	);
	return response.data;
};

const fetchConditions = async (patientId: string): Promise<ConditionData> => {
	const response: FhirResponse<ConditionData> = await fhirApi.get(
		`/Condition?patient=${patientId}`
	);
	return response.data;
};

const fetchDocumentReferences = async (patientId: string): Promise<DocumentReferenceData> => {
	const response: FhirResponse<DocumentReferenceData> = await fhirApi.get(
		`/DocumentReference?patient=${patientId}`
	);
	return response.data;
};

const getNotesByType = async (documentReferences: DocumentReferenceData, noteType: string): Promise<NoteData[]> => {
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

export {
	fetchPatientData,
	fetchConditions,
	fetchDocumentReferences,
	getNotesByType,
};
