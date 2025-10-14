import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_BASE_URL, RESEND_API_ENDPOINTS } from './constants';

/**
 * Execute the cancel scheduled email operation
 */
export async function cancelEmail(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const emailId = this.getNodeParameter('emailId', index) as string;

	const responseData = await this.helpers.requestWithAuthentication.call(this, 'resendApi', {
		method: 'POST',
		baseURL: RESEND_API_BASE_URL,
		url: RESEND_API_ENDPOINTS.EMAIL_CANCEL(emailId),
		json: true,
	});

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
