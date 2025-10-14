import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_ENDPOINTS } from '../constants';
import { resendApiRequest } from '../helpers';

/**
 * Execute the get email operation
 */
export async function getEmail(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const emailId = this.getNodeParameter('emailId', index) as string;

	const responseData = await resendApiRequest.call(
		this,
		'GET',
		RESEND_API_ENDPOINTS.EMAIL_BY_ID(emailId),
	);

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
