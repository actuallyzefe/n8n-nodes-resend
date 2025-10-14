import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_ENDPOINTS } from './constants';
import { resendApiRequest } from './helpers';

/**
 * Execute the cancel scheduled email operation
 */
export async function cancelEmail(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const emailId = this.getNodeParameter('emailId', index) as string;

	const responseData = await resendApiRequest.call(
		this,
		'POST',
		RESEND_API_ENDPOINTS.EMAIL_CANCEL(emailId),
	);

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
