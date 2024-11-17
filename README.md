# medicalRecord

http://www.nex-med.io

![overview](https://github.com/user-attachments/assets/d1e4baaa-2f39-4927-a4a5-789a4f63176d)

## Personal objectives for this project:

- Demonstrate the ability to take feature requirements and translate them into a minimum viable product
- Showcase understanding of basic HTML / CSS
- Showcase ability to develop full-stack applications using the MERN development stack (MongoDB, Express, React.js, Node.js)
- Showcase ability to utilize version control (Git) effectively with feature branches
- Demonstrate basic user authentication and authorization using the bearer token scheme and expiring secure cookies
- Demonstrate use of the reactQuery library to implement an internal messaging system that allows users to receive notifications when they get a new message
- Demonstrate ability to develop a Node.js backend to authenticate and interact with the Epic FHIR API, leveraging OAuth 2.0 for secure access token retrieval and patient data querying
- Develop a basic implementation of security measures to protect sensitive patient data: implement role-based access control, allowing for different privileges for different user level (e.g. admin, provider, patient); centralized asynchronous access logs with a customizable rotation schedule (using the Winston logging library)

## Todo:

- Add detailed patient demographic information including allergies, medication list, family history, social history, immunizations
- Add ability to attach external documents to patient visits
- Add testing for the front/back end
- Profile page for users
- CI/CD deployment pipeline

## Possible additional features:

- Deploy application to AWS
- Clinical-decision support
  - Utilize existing evidence-based guidelines to provide suggestions to providers regarding optimal treatment plans / monitoring
  - Utilize large-language models to analyze / summarize / and make recommendations utilizing existing minimally structured (provider notes) data
- Appointments
  - Add a scheduling system that allows patients to schedule appointments with providers depending on their avaiability and providers to be able to see what their real-time schedule looks like
  - Email / text appointment reminders for patients
  - Waitlist management and ability to handle cancellations
- Clinical research
  - Ability to interact with existing clinical research trial platforms
- Billing and claims
  - Integration with billing / claims processing systems
  - Support for in app payment
  - Coding suggestions for providers based on clinical documentation
  - Billing reports and analytics
- Medications
  - Ability for providers to e-prescribe medications from within the platform
    - Support for controlled substances
- Provider dashboard
  - Custom dashboard analytics for common population-level metrics that would be of interest to primary care providers / specialists
    - e.g. percentage of patients meeting recommended screening testing (colon cancer screening, breast cancer screening, etc)
    - percentage of patients that are on guideline-directed medical therapy (e.g. for systolic heart failure, secondary prevention of CV/stroke events)
    - Population level metrics for BMI, blood pressure, meeting vaccination standards, no-show appointments, patient satisfaction scores
- Patient portal
  - Secure way for patients to message providers and view visit information
  - Educational resources and self-help tools
- Enterprise-level analytics
  - Staffing metrics
  - Operational metrics
  - Financial metrics
  - Quality measures and performance tracking
  - Population health measures
- Interoperability
  - Compliance with existing interoperability standards (HL7 / FHIR)
  - Integration with major existing electronic health record systems
- Security / Privacy measures
  - Pass formal HIPAA / GPDR compliance audit
- User training
  - In app technical support, issue tracking, and notifications about features updates and improvements
- Convert front/backend to typescript
- Send registration email on sign-up with confirmation code
- End-to-end testing

See the individual README.md files in the back/ and front/ directories for an overview of each individual component

For any questions or inquiries, please contact wjdittmar@nex-med.io

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.
