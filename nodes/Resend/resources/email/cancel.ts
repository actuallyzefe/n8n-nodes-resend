import type { INodeProperties } from 'n8n-workflow';

export const emailCancelDescription: INodeProperties[] = [
	{
		displayName: 'Email ID',
		name: 'emailId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['cancel'],
			},
		},
		required: true,
		default: '',
		placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
		description: 'The unique identifier of the scheduled email to cancel',
	},
];
