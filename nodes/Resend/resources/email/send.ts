import type { INodeProperties } from 'n8n-workflow';

export const emailSendDescription: INodeProperties[] = [
	// Send Email - From
	{
		displayName: 'From',
		name: 'from',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['send'],
			},
		},
		required: true,
		default: '',
		placeholder: 'sender@yourdomain.com',
		description: 'Sender email address. Must be a verified domain in Resend.',
	},
	// Send Email - To
	{
		displayName: 'To',
		name: 'to',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['send'],
			},
		},
		required: true,
		default: '',
		placeholder: 'recipient@example.com',
		description: 'Recipient email address. Separate multiple addresses with commas.',
	},
	// Send Email - Subject
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['send'],
			},
		},
		required: true,
		default: '',
		description: 'Email subject line',
	},
	// Send Email - Body Type
	{
		displayName: 'Body Type',
		name: 'bodyType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['send'],
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
	// Send Email - HTML Body
	{
		displayName: 'HTML Body',
		name: 'html',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['send'],
				bodyType: ['html'],
			},
		},
		required: true,
		default: '',
		typeOptions: {
			rows: 5,
		},
		description: 'HTML content of the email',
	},
	// Send Email - Text Body
	{
		displayName: 'Text Body',
		name: 'text',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['send'],
				bodyType: ['text'],
			},
		},
		required: true,
		default: '',
		typeOptions: {
			rows: 5,
		},
		description: 'Plain text content of the email',
	},
	// Send Email - Additional Fields
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['email'],
				operation: ['send'],
			},
		},
		options: [
			{
				displayName: 'CC',
				name: 'cc',
				type: 'string',
				default: '',
				placeholder: 'cc@example.com',
				description: 'CC recipients. Separate multiple addresses with commas.',
			},
			{
				displayName: 'BCC',
				name: 'bcc',
				type: 'string',
				default: '',
				placeholder: 'bcc@example.com',
				description: 'BCC recipients. Separate multiple addresses with commas.',
			},
			{
				displayName: 'Reply To',
				name: 'replyTo',
				type: 'string',
				default: '',
				placeholder: 'reply@example.com',
				description: 'Reply-to email address',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				placeholder: 'Add Tag',
				description: 'Custom tags for categorizing emails',
				options: [
					{
						name: 'tag',
						displayName: 'Tag',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Tag name',
							},
							{
								displayName: 'Value',
								name: 'value',
								type: 'string',
								default: '',
								description: 'Tag value',
							},
						],
					},
				],
			},
			{
				displayName: 'Scheduled At',
				name: 'scheduledAt',
				type: 'dateTime',
				default: '',
				description: 'Schedule email to be sent at a specific time (ISO 8601 format)',
			},
			{
				displayName: 'Attachments',
				name: 'attachments',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				placeholder: 'Add Attachment',
				description: 'Email attachments',
				options: [
					{
						name: 'attachment',
						displayName: 'Attachment',
						values: [
							{
								displayName: 'Attachment Type',
								name: 'attachmentType',
								type: 'options',
								options: [
									{
										name: 'Binary Data',
										value: 'binary',
									},
									{
										name: 'URL',
										value: 'url',
									},
								],
								default: 'binary',
								description: 'Source of the attachment',
							},
							{
								displayName: 'Binary Property',
								name: 'binaryProperty',
								type: 'string',
								default: 'data',
								required: true,
								displayOptions: {
									show: {
										attachmentType: ['binary'],
									},
								},
								description: 'Name of the binary property containing the file data',
							},
							{
								displayName: 'File URL',
								name: 'path',
								type: 'string',
								default: '',
								required: true,
								displayOptions: {
									show: {
										attachmentType: ['url'],
									},
								},
								description: 'URL of the file to attach',
							},
							{
								displayName: 'Filename',
								name: 'filename',
								type: 'string',
								default: '',
								description: 'Custom filename for the attachment',
							},
						],
					},
				],
			},
		],
	},
];
