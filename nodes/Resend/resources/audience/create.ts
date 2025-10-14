import type { INodeProperties } from 'n8n-workflow';

export const audienceCreateDescription: INodeProperties[] = [
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['audience'],
				operation: ['create'],
			},
		},
		required: true,
		default: '',
		placeholder: 'Registered Users',
		description: 'The name of the audience',
	},
];
