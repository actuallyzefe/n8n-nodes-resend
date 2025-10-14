import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { emailDescription } from './resources/email';
import { audienceDescription } from './resources/audience';
import { contactDescription } from './resources/contact';
import { broadcastDescription } from './resources/broadcast';
import {
	sendEmail,
	sendBatchEmails,
	getEmail,
	updateEmail,
	cancelEmail,
	createAudience,
	getAudience,
	listAudiences,
	deleteAudience,
	createContact,
	getContact,
	updateContact,
	deleteContact,
	listContacts,
	createBroadcast,
	sendBroadcast,
} from './operations';

export class Resend implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Resend',
		name: 'resend',
		icon: 'file:resend.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Resend Email API',
		defaults: {
			name: 'Resend',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'resendApi', required: true }],
		requestDefaults: {
			baseURL: 'https://api.resend.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Audience',
						value: 'audience',
					},
					{
						name: 'Broadcast',
						value: 'broadcast',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Email',
						value: 'email',
					},
				],
				default: 'email',
			},
			...emailDescription,
			...audienceDescription,
			...contactDescription,
			...broadcastDescription,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: INodeExecutionData;

				if (resource === 'email') {
					switch (operation) {
						case 'send':
							responseData = await sendEmail.call(this, i);
							break;

						case 'sendBatch':
							responseData = await sendBatchEmails.call(this, i);
							break;

						case 'get':
							responseData = await getEmail.call(this, i);
							break;

						case 'update':
							responseData = await updateEmail.call(this, i);
							break;

						case 'cancel':
							responseData = await cancelEmail.call(this, i);
							break;

						default:
							throw new NodeOperationError(
								this.getNode(),
								`The operation "${operation}" is not supported for Email`,
								{ itemIndex: i },
							);
					}
				} else if (resource === 'audience') {
					switch (operation) {
						case 'create':
							responseData = await createAudience.call(this, i);
							break;

						case 'get':
							responseData = await getAudience.call(this, i);
							break;

						case 'list':
							responseData = await listAudiences.call(this, i);
							break;

						case 'delete':
							responseData = await deleteAudience.call(this, i);
							break;

						default:
							throw new NodeOperationError(
								this.getNode(),
								`The operation "${operation}" is not supported for Audience`,
								{ itemIndex: i },
							);
					}
				} else if (resource === 'contact') {
					switch (operation) {
						case 'create':
							responseData = await createContact.call(this, i);
							break;

						case 'get':
							responseData = await getContact.call(this, i);
							break;

						case 'update':
							responseData = await updateContact.call(this, i);
							break;

						case 'delete':
							responseData = await deleteContact.call(this, i);
							break;

						case 'list':
							responseData = await listContacts.call(this, i);
							break;

						default:
							throw new NodeOperationError(
								this.getNode(),
								`The operation "${operation}" is not supported for Contact`,
								{ itemIndex: i },
							);
					}
				} else if (resource === 'broadcast') {
					switch (operation) {
						case 'create':
							responseData = await createBroadcast.call(this, i);
							break;

						case 'send':
							responseData = await sendBroadcast.call(this, i);
							break;

						default:
							throw new NodeOperationError(
								this.getNode(),
								`The operation "${operation}" is not supported for Broadcast`,
								{ itemIndex: i },
							);
					}
				} else {
					throw new NodeOperationError(
						this.getNode(),
						`The resource "${resource}" is not supported`,
						{ itemIndex: i },
					);
				}

				returnData.push(responseData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
