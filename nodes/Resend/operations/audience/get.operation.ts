import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_ENDPOINTS } from '../constants';
import { resendApiRequest } from '../helpers';

/**
 * Execute the get audience operation
 */
export async function getAudience(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const audienceId = this.getNodeParameter('audienceId', index) as string;

	const responseData = await resendApiRequest.call(
		this,
		'GET',
		RESEND_API_ENDPOINTS.AUDIENCE_BY_ID(audienceId),
	);

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
