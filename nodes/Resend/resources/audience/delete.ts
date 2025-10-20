import type { INodeProperties } from 'n8n-workflow';

export const audienceDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Audience',
		name: 'audienceId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['audience'],
				operation: ['delete'],
			},
		},
		description: 'The audience to delete',
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
];
