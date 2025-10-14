import type { INodeProperties } from 'n8n-workflow';
import { audienceCreateDescription } from './create';
import { audienceGetDescription } from './get';
import { audienceDeleteDescription } from './delete';

const showOnlyForAudience = {
	resource: ['audience'],
};

export const audienceDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForAudience,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create an audience',
				description: 'Create a new audience for grouping contacts',
				routing: {
					request: {
						method: 'POST',
						url: '/audiences',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				action: 'Delete an audience',
				description: 'Delete an audience',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/audiences/{{$parameter.audienceId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an audience',
				description: 'Retrieve details of an audience',
				routing: {
					request: {
						method: 'GET',
						url: '=/audiences/{{$parameter.audienceId}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				action: 'List audiences',
				description: 'Get all audiences',
				routing: {
					request: {
						method: 'GET',
						url: '/audiences',
					},
				},
			},
		],
		default: 'create',
	},
	...audienceCreateDescription,
	...audienceGetDescription,
	...audienceDeleteDescription,
];
