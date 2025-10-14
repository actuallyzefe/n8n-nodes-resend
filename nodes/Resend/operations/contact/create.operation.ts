import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_ENDPOINTS } from '../constants';
import { resendApiRequest } from '../helpers';

/**
 * Execute the create contact operation
 */
export async function createContact(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const audienceId = this.getNodeParameter('audienceId', index) as string;
	const email = this.getNodeParameter('email', index) as string;
	const additionalFields = this.getNodeParameter('additionalFields', index, {}) as IDataObject;

	const body: IDataObject = {
		email,
	};

	if (additionalFields.firstName) {
		body.first_name = additionalFields.firstName;
	}

	if (additionalFields.lastName) {
		body.last_name = additionalFields.lastName;
	}

	if (additionalFields.unsubscribed !== undefined) {
		body.unsubscribed = additionalFields.unsubscribed;
	}

	const responseData = await resendApiRequest.call(
		this,
		'POST',
		RESEND_API_ENDPOINTS.CONTACTS(audienceId),
		body,
	);

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
