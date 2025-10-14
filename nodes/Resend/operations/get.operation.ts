import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_BASE_URL, RESEND_API_ENDPOINTS } from './constants';

/**
 * Execute the get email operation
 */
export async function getEmail(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const emailId = this.getNodeParameter('emailId', index) as string;

	const responseData = await this.helpers.requestWithAuthentication.call(this, 'resendApi', {
		method: 'GET',
		baseURL: RESEND_API_BASE_URL,
		url: RESEND_API_ENDPOINTS.EMAIL_BY_ID(emailId),
		json: true,
	});

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
