import type { INodeProperties } from 'n8n-workflow';

export const contactCreateDescription: INodeProperties[] = [
	{
		displayName: 'Audience ID',
		name: 'audienceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create'],
			},
		},
		required: true,
		default: '',
		placeholder: '78261eea-8f8b-4381-83c6-79fa7120f1cf',
		description: 'The ID of the audience to add the contact to',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create'],
			},
		},
		required: true,
		default: '',
		placeholder: 'steve.wozniak@gmail.com',
		description: 'The email address of the contact',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create'],
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
