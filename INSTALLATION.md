## Getting started

### Setup the backend

#### Step 1: Update Environment variables

Update the "MONGODB_URI" field with the URI of your MongoDB database.
Update the "ACCESS_TOKEN_SECRET" fields with a string for signing jwt

#### Step 2: Install Backend Dependencies

Navigate to the /back directory

```bash
cd back
```

Then run the following to install the dependencies

```bash
npm install
```

#### Step 3: Populate the icd10 codes collection

Import the ICD10 codes from data/icd10cm-codes-April-2024.txt into the icd10 codes collection using "icd10code" and "disease" as the column headers -- see https://www.mongodb.com/developer/products/mongodb/mongoimport-guide/

#### Step 4: Setup the EPIC integration

- Follow the instructions at https://fhir.epic.com/Documentation?docId=oauth2&section=BackendOAuth2Guide to create a public/private key pair
- Upload the private key PEM string to the "EPIC_KEY" environment variable
- Create an app on the EPIC FHIR website (https://fhir.epic.com/Developer/Create) and select "Backend Systems" as the Application audience
- Add all of the R4 APIs on the app creation page
- Upload the public JWT signing key that you created earlier on the app creation page.
- Finalize the app on the app creation page and agree to the terms and conditions. Make note of the "non-production client ID" and update the EPIC_CLIENT_ID environment variable with this value

#### Step 5 (optional): Populate the database with test entries for patients, providers, visits

```bash
npm run setup
```

#### Step 6: Run the Backend Server

Run the following command to start the backend server:

```bash
npm run dev
```

#### Step 7: Install Frontend Dependencies

Navigate to the /front directory

```bash
cd back
```

Then run the following to install the dependencies

```bash
npm install
```

#### Step 8: Run the Frontend Server

Run the following command to start the backend server:

```bash
npm run dev
```
