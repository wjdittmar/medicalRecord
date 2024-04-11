# medicalRecord

Personal objectives for this project:

- Demonstrate the ability to take feature requirements and translate them into a minimum viable product
- Showcase understanding of basic HTML / CSS
- Showcase ability to develop full-stack applications using the MERN development stack (MongoDB, Express, React.js, Node.js)
- Showcase ability to utilize version control (Git)
- Demonstrate basic user management using token-based authentication

Product Requirements:

### CRUD patient records

- firstName
- lastName
- dob (ISO 8601 format (YYYY-MM-DD))
- email
- phone (xxx-xxx-xxxx)
- preferred_language (ISO 639-1 language code)
- pre_existing_conditions (diagnosis[])
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

- patient_id
- visit_datetime (ISO 8601 format (YYYY-MM-DD))
- provider_notes
