import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { RESEND_API_BASE_URL, RESEND_API_ENDPOINTS } from '../constants';

/**
 * Execute the update contact operation
 */
export async function updateContact(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const audienceId = this.getNodeParameter('audienceId', index) as string;
	const lookupBy = this.getNodeParameter('lookupBy', index) as string;
	const updateFields = this.getNodeParameter('updateFields', index, {}) as IDataObject;

	// Build update body
	const body: IDataObject = {};

	if (updateFields.firstName) {
		body.first_name = updateFields.firstName;
	}

	if (updateFields.lastName) {
		body.last_name = updateFields.lastName;
	}

	if (updateFields.unsubscribed !== undefined) {
		body.unsubscribed = updateFields.unsubscribed;
	}

	// At least one field must be provided
	if (Object.keys(body).length === 0) {
		throw new NodeOperationError(this.getNode(), 'At least one update field must be provided', {
			itemIndex: index,
		});
	}

	let url: string;

	if (lookupBy === 'id') {
		const contactId = this.getNodeParameter('contactId', index) as string;
		url = RESEND_API_ENDPOINTS.CONTACT_BY_ID(audienceId, contactId);
	} else {
		const email = this.getNodeParameter('contactEmail', index) as string;
		url = RESEND_API_ENDPOINTS.CONTACT_BY_EMAIL(audienceId, email);
	}

	const responseData = await this.helpers.requestWithAuthentication.call(this, 'resendApi', {
		method: 'PATCH',
		baseURL: RESEND_API_BASE_URL,
		url,
		body,
		json: true,
	});

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
