import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_BASE_URL, RESEND_API_ENDPOINTS } from '../constants';

/**
 * Execute the get audience operation
 */
export async function getAudience(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const audienceId = this.getNodeParameter('audienceId', index) as string;

	const responseData = await this.helpers.requestWithAuthentication.call(this, 'resendApi', {
		method: 'GET',
		baseURL: RESEND_API_BASE_URL,
		url: RESEND_API_ENDPOINTS.AUDIENCE_BY_ID(audienceId),
		json: true,
	});

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
