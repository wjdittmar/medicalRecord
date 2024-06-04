// types/provider.ts
import { ObjectId } from 'mongoose';

export interface Provider {
	license: string;
	user: ObjectId;
}
