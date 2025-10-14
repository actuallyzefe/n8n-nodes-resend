import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_BASE_URL, RESEND_API_ENDPOINTS } from '../constants';

/**
 * Execute the create audience operation
 */
export async function createAudience(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const name = this.getNodeParameter('name', index) as string;

	const responseData = await this.helpers.requestWithAuthentication.call(this, 'resendApi', {
		method: 'POST',
		baseURL: RESEND_API_BASE_URL,
		url: RESEND_API_ENDPOINTS.AUDIENCES,
		body: {
			name,
		},
		json: true,
	});

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
