import type { INodeProperties } from 'n8n-workflow';

export const broadcastSendDescription: INodeProperties[] = [
	{
		displayName: 'Broadcast ID',
		name: 'broadcastId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['broadcast'],
				operation: ['send'],
			},
		},
		required: true,
		default: '',
		placeholder: '559ac32e-9ef5-46fb-82a1-b76b840c0f7b',
		description: 'The unique identifier of the broadcast to send',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['broadcast'],
				operation: ['send'],
			},
		},
		options: [
			{
				displayName: 'Scheduled At',
				name: 'scheduledAt',
				type: 'string',
				default: '',
				placeholder: 'in 1 min',
				description:
					'Schedule the broadcast to be sent at a specific time. Use formats like "in 1 min", "in 1 hour", or ISO 8601 timestamp.',
			},
		],
	},
];
