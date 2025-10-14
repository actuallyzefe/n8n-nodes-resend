import type { INodeProperties } from 'n8n-workflow';

export const contactDeleteDescription: INodeProperties[] = [
	{
		displayName: 'Audience ID',
		name: 'audienceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['delete'],
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
				operation: ['delete'],
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
				operation: ['delete'],
				lookupBy: ['id'],
			},
		},
		required: true,
		default: '',
		placeholder: 'e169aa45-1ecf-4183-9955-b1499d5701d3',
		description: 'The unique identifier of the contact to delete',
	},
	{
		displayName: 'Email',
		name: 'contactEmail',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['delete'],
				lookupBy: ['email'],
			},
		},
		required: true,
		default: '',
		placeholder: 'steve.wozniak@gmail.com',
		description: 'The email address of the contact to delete',
	},
];
