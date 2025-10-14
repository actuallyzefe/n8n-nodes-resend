import type { IExecuteFunctions, IHttpRequestMethods, IDataObject } from 'n8n-workflow';
import { RESEND_API_BASE_URL } from './constants';

/**
 * Make an authenticated API request to Resend
 */
export async function resendApiRequest(
	this: IExecuteFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject,
	qs?: IDataObject,
): Promise<IDataObject> {
	const options = {
		method,
		url: `${RESEND_API_BASE_URL}${endpoint}`,
		body,
		qs,
		json: true,
	};

	return (await this.helpers.httpRequestWithAuthentication.call(
		this,
		'resendApi',
		options,
	)) as IDataObject;
}
