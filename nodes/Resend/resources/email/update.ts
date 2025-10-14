import type { INodeProperties } from 'n8n-workflow';

export const emailUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Email ID',
		name: 'emailId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['update'],
			},
		},
		required: true,
		default: '',
		placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
		description: 'The unique identifier of the scheduled email to update',
	},
	{
		displayName: 'Scheduled At',
		name: 'scheduledAt',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['update'],
			},
		},
		required: true,
		default: '',
		description: 'New scheduled time for the email (must be in the future)',
	},
];
