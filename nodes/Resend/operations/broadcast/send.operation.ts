import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_BASE_URL, RESEND_API_ENDPOINTS } from '../constants';

/**
 * Execute the send broadcast operation
 */
export async function sendBroadcast(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const broadcastId = this.getNodeParameter('broadcastId', index) as string;
	const options = this.getNodeParameter('options', index, {}) as IDataObject;

	const body: IDataObject = {};

	if (options.scheduledAt) {
		body.scheduledAt = options.scheduledAt;
	}

	const responseData = await this.helpers.requestWithAuthentication.call(this, 'resendApi', {
		method: 'POST',
		baseURL: RESEND_API_BASE_URL,
		url: RESEND_API_ENDPOINTS.BROADCAST_SEND(broadcastId),
		body,
		json: true,
	});

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
