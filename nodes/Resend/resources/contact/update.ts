import type { INodeProperties } from 'n8n-workflow';

export const contactUpdateDescription: INodeProperties[] = [
	{
		displayName: 'Audience ID',
		name: 'audienceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['update'],
			},
		},
		required: true,
		default: '',
		placeholder: '78261eea-8f8b-4381-83c6-79fa7120f1cf',
		description: 'The ID of the audience',
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
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['update'],
				lookupBy: ['id'],
			},
		},
		required: true,
		default: '',
		placeholder: 'e169aa45-1ecf-4183-9955-b1499d5701d3',
		description: 'The unique identifier of the contact',
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
