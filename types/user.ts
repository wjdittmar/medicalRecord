export interface User {
	email: string;
	phone?: string;
	name: string;
	passwordHash: string;
	role: 'admin' | 'provider' | 'patient';
}