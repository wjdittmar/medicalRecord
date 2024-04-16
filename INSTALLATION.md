## Getting started

### Setup the backend

#### Step 1: Update Environment variables

Update the "MONGODB_URI" field with the URI of your MongoDB database.
Update the "SECRET" field with a string for signing jwt

#### Step 2: Install Backend Dependencies

Navigate to the /back directory

```bash
cd back
```

Then run the following to install the dependencies

```bash
npm install
```

#### Step 3: Run the Backend Server

Import the ICD10 codes from data/icd10cm-codes-April-2024.txt into the icd10 codes collection using "icd10code" and "disease" as the column headers -- see https://www.mongodb.com/developer/products/mongodb/mongoimport-guide/

#### Step 4: Run the Backend Server

Run the following command to start the backend server:

```bash
npm run dev
```
