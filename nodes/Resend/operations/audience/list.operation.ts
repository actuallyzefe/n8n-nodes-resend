import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_BASE_URL, RESEND_API_ENDPOINTS } from '../constants';

/**
 * Execute the list audiences operation
 */
export async function listAudiences(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const responseData = await this.helpers.requestWithAuthentication.call(this, 'resendApi', {
		method: 'GET',
		baseURL: RESEND_API_BASE_URL,
		url: RESEND_API_ENDPOINTS.AUDIENCES,
		json: true,
	});

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
