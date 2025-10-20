import type { INodeProperties } from 'n8n-workflow';

export const contactListDescription: INodeProperties[] = [
	{
		displayName: 'Audience',
		name: 'audienceId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['list'],
			},
		},
		description: 'The audience to list contacts from',
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'searchAudiences',
					searchable: true,
				},
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: '78261eea-8f8b-4381-83c6-79fa7120f1cf',
				validation: [
					{
						type: 'regex',
						properties: {
							regex: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
							errorMessage: 'Not a valid Audience ID',
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
				description: 'Max number of results to return',
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
