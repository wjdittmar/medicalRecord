import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import querystring from "querystring";
import { sign } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import * as config from "./config";

const tokenUrl = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token";
const baseUrl = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4";

// Define the response type for the access token
interface AccessTokenResponse {
	access_token: string;
}

const getAccessToken = async (): Promise<string> => {
	const payload = {
		iss: config.EPIC_CLIENT_ID,
		sub: config.EPIC_CLIENT_ID,
		aud: tokenUrl,
		jti: uuidv4(),
		exp: Math.floor(Date.now() / 1000) + 300,
		iat: Math.floor(Date.now() / 1000),
	};
	const privateKey = config.EPIC_KEY;
	const jwtToken = sign(payload, privateKey, {
		algorithm: "RS256",
	});

	try {
		const response: AxiosResponse<AccessTokenResponse> = await axios.post(
			tokenUrl,
			querystring.stringify({
				grant_type: "client_credentials",
				client_assertion_type:
					"urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
				client_assertion: jwtToken,
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);
		return response.data.access_token;
	} catch (error) {
		throw new Error("Failed to get access token");
	}
};

const fhirApi = axios.create({
	baseURL: baseUrl,
});

fhirApi.interceptors.request.use(async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
	const accessToken = await getAccessToken();
	config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
});

export default fhirApi;
