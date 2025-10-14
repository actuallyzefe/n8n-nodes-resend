import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_BASE_URL, RESEND_API_ENDPOINTS } from '../constants';

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

	const responseData = await this.helpers.requestWithAuthentication.call(this, 'resendApi', {
		method: 'POST',
		baseURL: RESEND_API_BASE_URL,
		url: RESEND_API_ENDPOINTS.CONTACTS(audienceId),
		body,
		json: true,
	});

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
