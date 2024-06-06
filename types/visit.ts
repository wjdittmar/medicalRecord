// IVisit.ts
import mongoose from 'mongoose';
import { Address } from './address';

export interface Visit {
	patient: mongoose.Types.ObjectId;
	encounterDate: Date;
	address: Address;
	providerNotes?: string;
	provider: mongoose.Types.ObjectId[];
}
