import type { INodeProperties } from 'n8n-workflow';
import { emailSendDescription } from './send';
import { emailSendBatchDescription } from './sendBatch';
import { emailGetDescription } from './get';
import { emailUpdateDescription } from './update';
import { emailCancelDescription } from './cancel';

const showOnlyForEmail = {
	resource: ['email'],
};

export const emailDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForEmail,
		},
		options: [
			{
				name: 'Cancel',
				value: 'cancel',
				action: 'Cancel a scheduled email',
				description: 'Cancel a scheduled email before it is sent',
				routing: {
					request: {
						method: 'POST',
						url: '=/emails/{{$parameter.emailId}}/cancel',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get an email',
				description: 'Retrieve details of a sent email',
				routing: {
					request: {
						method: 'GET',
						url: '=/emails/{{$parameter.emailId}}',
					},
				},
			},
			{
				name: 'Send',
				value: 'send',
				action: 'Send an email',
				description: 'Send a single email',
				routing: {
					request: {
						method: 'POST',
						url: '/emails',
					},
				},
			},
			{
				name: 'Send Batch',
				value: 'sendBatch',
				action: 'Send batch emails',
				description: 'Send up to 100 emails at once',
				routing: {
					request: {
						method: 'POST',
						url: '/emails/batch',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a scheduled email',
				description: 'Update the scheduled time of a scheduled email',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/emails/{{$parameter.emailId}}',
					},
				},
			},
		],
		default: 'send',
	},
	...emailSendDescription,
	...emailSendBatchDescription,
	...emailGetDescription,
	...emailUpdateDescription,
	...emailCancelDescription,
];
