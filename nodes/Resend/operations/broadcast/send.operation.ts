import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_ENDPOINTS } from '../constants';
import { resendApiRequest } from '../helpers';

/**
 * Execute the send broadcast operation
 */
export async function sendBroadcast(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const broadcastId = this.getNodeParameter('broadcastId', index, '', {
		extractValue: true,
	}) as string;
	const options = this.getNodeParameter('options', index, {}) as IDataObject;

	const body: IDataObject = {};

	if (options.scheduledAt) {
		body.scheduledAt = options.scheduledAt;
	}

	const responseData = await resendApiRequest.call(
		this,
		'POST',
		RESEND_API_ENDPOINTS.BROADCAST_SEND(broadcastId),
		body,
	);

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
