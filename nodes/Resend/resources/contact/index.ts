import type { INodeProperties } from 'n8n-workflow';
import { contactCreateDescription } from './create';
import { contactGetDescription } from './get';
import { contactUpdateDescription } from './update';
import { contactDeleteDescription } from './delete';
import { contactListDescription } from './list';

const showOnlyForContact = {
	resource: ['contact'],
};

export const contactDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForContact,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a contact',
				description: 'Add a contact to an audience',
				routing: {
					request: {
						method: 'POST',
						url: '=/audiences/{{$parameter.audienceId}}/contacts',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete a contact',
				description: 'Remove a contact from an audience',
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a contact',
				description: 'Retrieve details of a contact',
			},
			{
				name: 'List',
				value: 'list',
				action: 'List contacts',
				description: 'Get all contacts in an audience',
				routing: {
					request: {
						method: 'GET',
						url: '=/audiences/{{$parameter.audienceId}}/contacts',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a contact',
				description: 'Update contact information',
			},
		],
		default: 'create',
	},
	...contactCreateDescription,
	...contactGetDescription,
	...contactUpdateDescription,
	...contactDeleteDescription,
	...contactListDescription,
];
