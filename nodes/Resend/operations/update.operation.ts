import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_ENDPOINTS } from './constants';
import { resendApiRequest } from './helpers';

/**
 * Execute the update scheduled email operation
 */
export async function updateEmail(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const emailId = this.getNodeParameter('emailId', index) as string;
	const scheduledAt = this.getNodeParameter('scheduledAt', index) as string;

	const responseData = await resendApiRequest.call(
		this,
		'PATCH',
		RESEND_API_ENDPOINTS.EMAIL_BY_ID(emailId),
		{
			scheduled_at: scheduledAt,
		},
	);

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
