import type { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { RESEND_API_ENDPOINTS } from '../constants';
import { resendApiRequest } from '../helpers';

/**
 * Execute the delete audience operation
 */
export async function deleteAudience(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData> {
	const audienceId = this.getNodeParameter('audienceId', index, '', {
		extractValue: true,
	}) as string;

	const responseData = await resendApiRequest.call(
		this,
		'DELETE',
		RESEND_API_ENDPOINTS.AUDIENCE_BY_ID(audienceId),
	);

	return {
		json: responseData as IDataObject,
		pairedItem: { item: index },
	};
}
