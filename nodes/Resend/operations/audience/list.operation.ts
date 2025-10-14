import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_ENDPOINTS } from '../constants';
import { resendApiRequest } from '../helpers';

/**
 * Execute the list audiences operation
 */
export async function listAudiences(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const responseData = await resendApiRequest.call(this, 'GET', RESEND_API_ENDPOINTS.AUDIENCES);

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
