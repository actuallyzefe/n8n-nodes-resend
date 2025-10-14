import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_BASE_URL, RESEND_API_ENDPOINTS } from '../constants';

/**
 * Execute the get contact operation
 */
export async function getContact(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const audienceId = this.getNodeParameter('audienceId', index) as string;
	const lookupBy = this.getNodeParameter('lookupBy', index) as string;

	let url: string;

	if (lookupBy === 'id') {
		const contactId = this.getNodeParameter('contactId', index) as string;
		url = RESEND_API_ENDPOINTS.CONTACT_BY_ID(audienceId, contactId);
	} else {
		const email = this.getNodeParameter('contactEmail', index) as string;
		url = RESEND_API_ENDPOINTS.CONTACT_BY_EMAIL(audienceId, email);
	}

	const responseData = await this.helpers.requestWithAuthentication.call(this, 'resendApi', {
		method: 'GET',
		baseURL: RESEND_API_BASE_URL,
		url,
		json: true,
	});

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
