import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_ENDPOINTS } from '../constants';
import { resendApiRequest } from '../helpers';

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

	const responseData = await resendApiRequest.call(this, 'GET', url);

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
