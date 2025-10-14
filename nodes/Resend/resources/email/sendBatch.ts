import type { INodeProperties } from 'n8n-workflow';

export const emailSendBatchDescription: INodeProperties[] = [
	{
		displayName: 'Emails',
		name: 'emails',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add Email',
		},
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['sendBatch'],
			},
		},
		default: {},
		placeholder: 'Add Email',
		description: 'Batch of emails to send (up to 100)',
		options: [
			{
				name: 'email',
				displayName: 'Email',
				values: [
					{
						displayName: 'BCC',
						name: 'bcc',
						type: 'string',
						default: '',
						description: 'BCC recipients (comma-separated)',
					},
					{
						displayName: 'Body Type',
						name: 'bodyType',
						type: 'options',
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
						displayName: 'CC',
						name: 'cc',
						type: 'string',
						default: '',
						description: 'CC recipients (comma-separated)',
					},
					{
						displayName: 'From',
						name: 'from',
						type: 'string',
						default: '',
						required: true,
						placeholder: 'sender@yourdomain.com',
						description: 'Sender email address',
					},
					{
						displayName: 'HTML Body',
						name: 'html',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								bodyType: ['html'],
							},
						},
						typeOptions: {
							rows: 3,
						},
						description: 'HTML content',
					},
					{
						displayName: 'Reply To',
						name: 'replyTo',
						type: 'string',
						default: '',
						description: 'Reply-to address',
					},
					{
						displayName: 'Subject',
						name: 'subject',
						type: 'string',
						default: '',
						required: true,
						description: 'Email subject',
					},
					{
						displayName: 'Text Body',
						name: 'text',
						type: 'string',
						default: '',
						displayOptions: {
							show: {
								bodyType: ['text'],
							},
						},
						typeOptions: {
							rows: 3,
						},
						description: 'Plain text content',
					},
					{
						displayName: 'To',
						name: 'to',
						type: 'string',
						default: '',
						required: true,
						placeholder: 'recipient@example.com',
						description: 'Recipient email address',
					},
				],
			},
		],
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['sendBatch'],
			},
		},
		options: [
			{
				displayName: 'Batch Size Limit',
				name: 'batchSizeLimit',
				type: 'number',
				default: 100,
				description: 'Maximum number of emails to send in one batch (max 100)',
				typeOptions: {
					minValue: 1,
					maxValue: 100,
				},
			},
		],
	},
];
