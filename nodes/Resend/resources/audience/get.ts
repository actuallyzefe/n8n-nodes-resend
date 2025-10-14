import type { INodeProperties } from 'n8n-workflow';

export const audienceGetDescription: INodeProperties[] = [
	{
		displayName: 'Audience ID',
		name: 'audienceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['audience'],
				operation: ['get'],
			},
		},
		required: true,
		default: '',
		placeholder: '78261eea-8f8b-4381-83c6-79fa7120f1cf',
		description: 'The unique identifier of the audience',
	},
];
