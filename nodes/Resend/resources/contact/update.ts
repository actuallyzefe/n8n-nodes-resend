import type { INodeProperties } from 'n8n-workflow';

export const contactUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Audience',
		name: 'audienceId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['update'],
			},
		},
		description: 'The audience containing the contact',
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
		displayName: 'Lookup By',
		name: 'lookupBy',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['update'],
			},
		},
		options: [
			{
				name: 'Contact ID',
				value: 'id',
			},
			{
				name: 'Email',
				value: 'email',
			},
		],
		default: 'id',
		description: 'How to identify the contact',
	},
	{
		displayName: 'Contact',
		name: 'contactId',
		type: 'resourceLocator',
		default: { mode: 'list', value: '' },
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['update'],
				lookupBy: ['id'],
			},
		},
		description: 'The contact to update',
		modes: [
			{
				displayName: 'From List',
				name: 'list',
				type: 'list',
				typeOptions: {
					searchListMethod: 'searchContacts',
					searchable: true,
				},
			},
			{
				displayName: 'By ID',
				name: 'id',
				type: 'string',
				placeholder: 'e169aa45-1ecf-4183-9955-b1499d5701d3',
				validation: [
					{
						type: 'regex',
						properties: {
							regex: '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
							errorMessage: 'Not a valid Contact ID',
						},
					},
				],
			},
		],
	},
	{
		displayName: 'Email',
		name: 'contactEmail',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['update'],
				lookupBy: ['email'],
			},
		},
		required: true,
		default: '',
		placeholder: 'steve.wozniak@gmail.com',
		description: 'The email address of the contact',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'The first name of the contact',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'The last name of the contact',
			},
			{
				displayName: 'Unsubscribed',
				name: 'unsubscribed',
				type: 'boolean',
				default: false,
				description: 'Whether the contact is unsubscribed from emails',
			},
		],
	},
];
