import type { INodeProperties } from 'n8n-workflow';

export const contactListDescription: INodeProperties[] = [
	{
		displayName: 'Audience ID',
		name: 'audienceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['list'],
			},
		},
		required: true,
		default: '',
		placeholder: '78261eea-8f8b-4381-83c6-79fa7120f1cf',
		description: 'The ID of the audience to list contacts from',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
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
				description: 'Maximum number of contacts to return (1-100)',
			},
			{
				displayName: 'After',
				name: 'after',
				type: 'string',
				default: '',
				placeholder: 'e169aa45-1ecf-4183-9955-b1499d5701d3',
				description: 'Return contacts after this ID (for pagination). Cannot be used with Before.',
			},
			{
				displayName: 'Before',
				name: 'before',
				type: 'string',
				default: '',
				placeholder: 'e169aa45-1ecf-4183-9955-b1499d5701d3',
				description: 'Return contacts before this ID (for pagination). Cannot be used with After.',
			},
		],
	},
];
