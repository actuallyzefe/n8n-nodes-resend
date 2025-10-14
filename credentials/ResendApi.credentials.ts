import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ResendApi implements ICredentialType {
	name = 'resendApi';

	displayName = 'Resend API';

	icon = 'file:resend.svg' as const;

	documentationUrl = 'https://resend.com/docs/introduction';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			placeholder: 're_xxxxxxxxx',
			description: 'Your Resend API Key from https://resend.com/api-keys',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.resend.com',
			url: '/emails',
			method: 'GET',
		},
	};
}
