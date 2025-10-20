import type { INodeProperties } from 'n8n-workflow';

export const broadcastCreateDescription: INodeProperties[] = [
	{
		displayName: 'Audience',
		name: 'audienceId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['broadcast'],
				operation: ['create'],
			},
		},
		description: 'The audience to send the broadcast to',
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
		displayName: 'From',
		name: 'from',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['broadcast'],
				operation: ['create'],
			},
		},
		required: true,
		default: '',
		placeholder: 'Acme <onboarding@resend.dev>',
		description: 'Sender email address. Must be a verified domain in Resend.',
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['broadcast'],
				operation: ['create'],
			},
		},
		required: true,
		default: '',
		placeholder: 'Weekly Newsletter',
		description: 'Email subject line',
	},
	{
		displayName: 'Body Type',
		name: 'bodyType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['broadcast'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'HTML',
				value: 'html',
			},
			{
				name: 'Text',
				value: 'text',
			},
		],
		default: 'html',
		description: 'Email body format',
	},
	{
		displayName: 'HTML Body',
		name: 'html',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['broadcast'],
				operation: ['create'],
				bodyType: ['html'],
			},
		},
		required: true,
		default: '',
		typeOptions: {
			rows: 5,
		},
		description: 'HTML content of the broadcast email',
	},
	{
		displayName: 'Text Body',
		name: 'text',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['broadcast'],
				operation: ['create'],
				bodyType: ['text'],
			},
		},
		required: true,
		default: '',
		typeOptions: {
			rows: 5,
		},
		description: 'Plain text content of the broadcast email',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['broadcast'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Reply To',
				name: 'replyTo',
				type: 'string',
				default: '',
				placeholder: 'reply@example.com',
				description: 'Reply-to email address',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name for the broadcast (for identification purposes)',
			},
		],
	},
];
