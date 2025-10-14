import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { RESEND_API_ENDPOINTS } from '../constants';
import { resendApiRequest } from '../helpers';

/**
 * Execute the list contacts operation
 */
export async function listContacts(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const audienceId = this.getNodeParameter('audienceId', index) as string;
	const options = this.getNodeParameter('options', index, {}) as IDataObject;

	// Build query parameters
	const qs: IDataObject = {};

	if (options.limit) {
		qs.limit = options.limit;
	}

	if (options.after) {
		qs.after = options.after;
	}

	if (options.before) {
		qs.before = options.before;
	}

	// Validate: after and before cannot be used together
	if (qs.after && qs.before) {
		throw new NodeOperationError(
			this.getNode(),
			'Cannot use "after" and "before" parameters together',
			{ itemIndex: index },
		);
	}

	const responseData = await resendApiRequest.call(
		this,
		'GET',
		RESEND_API_ENDPOINTS.CONTACTS(audienceId),
		undefined,
		qs,
	);

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
