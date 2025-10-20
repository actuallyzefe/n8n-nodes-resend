import type { INodeProperties } from 'n8n-workflow';

export const broadcastSendDescription: INodeProperties[] = [
	{
		displayName: 'Broadcast',
		name: 'broadcastId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['broadcast'],
				operation: ['send'],
			},
		},
		description: 'The broadcast to send',
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'searchBroadcasts',
					searchable: true,
				},
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: '559ac32e-9ef5-46fb-82a1-b76b840c0f7b',
				validation: [
					{
						type: 'regex',
						properties: {
							regex: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
							errorMessage: 'Not a valid Broadcast ID',
						},
					},
				],
			},
		],
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
