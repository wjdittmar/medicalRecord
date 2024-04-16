### Patient

- firstName
- lastName
- dob (Date type -- e.g. 2020-05-11T20:14:14.796Z)
- email
- phone (xxx-xxx-xxxx)
- preferredLanguage (ISO 639-1 language code)
- preExistingConditions (diagnosis[])
- sex

### Diagnosis

- ICD10 code
- Description

### Providers

- firstName
- lastName
- email
- phone (xxx-xxx-xxxx)
- licenses (license[])
- license
  - {license_id, state}

### Visit

- patient (Patient[])
- encounterDate (Date type -- e.g. 2020-05-11T20:14:14.796Z)
- providerNotes
- address
  - { address1, address2, city, state, zipCode }
