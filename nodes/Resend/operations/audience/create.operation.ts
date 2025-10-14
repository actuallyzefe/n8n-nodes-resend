import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_ENDPOINTS } from '../constants';
import { resendApiRequest } from '../helpers';

/**
 * Execute the create audience operation
 */
export async function createAudience(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const name = this.getNodeParameter('name', index) as string;

	const responseData = await resendApiRequest.call(this, 'POST', RESEND_API_ENDPOINTS.AUDIENCES, {
		name,
	});

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
