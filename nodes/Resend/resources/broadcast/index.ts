import type { INodeProperties } from 'n8n-workflow';
import { broadcastCreateDescription } from './create';
import { broadcastSendDescription } from './send';

const showOnlyForBroadcast = {
	resource: ['broadcast'],
};

export const broadcastDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForBroadcast,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a broadcast',
				description: 'Create a new broadcast email to send to an audience',
				routing: {
					request: {
						method: 'POST',
						url: '/broadcasts',
					},
				},
			},
			{
				name: 'Send',
				value: 'send',
				action: 'Send a broadcast',
				description: 'Send a broadcast email to an audience',
				routing: {
					request: {
						method: 'POST',
						url: '=/broadcasts/{{$parameter.broadcastId}}/send',
					},
				},
			},
		],
		default: 'create',
	},
	...broadcastCreateDescription,
	...broadcastSendDescription,
];
