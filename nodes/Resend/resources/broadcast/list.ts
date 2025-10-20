import type { INodeProperties } from 'n8n-workflow';

export const broadcastListDescription: INodeProperties[] = [
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['broadcast'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				default: 50,
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
				description: 'Max number of results to return',
			},
			{
				displayName: 'After',
				name: 'after',
				type: 'string',
				default: '',
				placeholder: '559ac32e-9ef5-46fb-82a1-b76b840c0f7b',
				description:
					'Return broadcasts after this ID (for pagination). Cannot be used with Before.',
			},
			{
				displayName: 'Before',
				name: 'before',
				type: 'string',
				default: '',
				placeholder: '559ac32e-9ef5-46fb-82a1-b76b840c0f7b',
				description:
					'Return broadcasts before this ID (for pagination). Cannot be used with After.',
			},
		],
	},
];
