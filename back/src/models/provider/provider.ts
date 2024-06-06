import { Schema, model } from 'mongoose';
import { Provider } from '../../../../types/provider';

const providerSchema = new Schema<Provider>({
	license: {
		type: String,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	}
});

const ProviderModel = model<Provider>('Provider', providerSchema);

export default ProviderModel;