import type { INodeProperties } from 'n8n-workflow';

export const emailGetDescription: INodeProperties[] = [
	{
		displayName: 'Email ID',
		name: 'emailId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['get'],
			},
		},
		required: true,
		default: '',
		placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
		description: 'The unique identifier of the email to retrieve',
	},
];
