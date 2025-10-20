import type {
	IExecuteFunctions,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodeListSearchResult,
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
	listBroadcasts,
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

	methods = {
		listSearch: {
			async searchAudiences(
				this: ILoadOptionsFunctions,
				filter?: string,
				paginationToken?: string,
			): Promise<INodeListSearchResult> {
				const credentials = await this.getCredentials('resendApi');

				// Build query parameters
				let url = 'https://api.resend.com/audiences?limit=100';

				if (paginationToken) {
					url += `&after=${paginationToken}`;
				}

				const options = {
					method: 'GET' as const,
					url,
					headers: {
						Authorization: `Bearer ${credentials.apiKey}`,
						'Content-Type': 'application/json',
					},
					json: true,
				};

				const response = (await this.helpers.httpRequest(options)) as {
					object: string;
					has_more: boolean;
					data: Array<{ id: string; name: string }>;
				};

				const audiences = response.data || [];
				const results = audiences
					.filter((audience) => {
						if (!filter) return true;
						return audience.name.toLowerCase().includes(filter.toLowerCase());
					})
					.map((audience) => ({
						name: audience.name,
						value: audience.id,
						url: `https://resend.com/audiences/${audience.id}`,
					}));

				// Return pagination token if there are more results
				const paginationResult: INodeListSearchResult = { results };

				if (response.has_more && audiences.length > 0) {
					// Use the last audience ID as the pagination token for the next page
					paginationResult.paginationToken = audiences[audiences.length - 1].id;
				}

				return paginationResult;
			},
			async searchBroadcasts(
				this: ILoadOptionsFunctions,
				filter?: string,
				paginationToken?: string,
			): Promise<INodeListSearchResult> {
				const credentials = await this.getCredentials('resendApi');

				// Build query parameters
				let url = 'https://api.resend.com/broadcasts?limit=100';

				if (paginationToken) {
					url += `&after=${paginationToken}`;
				}

				const options = {
					method: 'GET' as const,
					url,
					headers: {
						Authorization: `Bearer ${credentials.apiKey}`,
						'Content-Type': 'application/json',
					},
					json: true,
				};

				const response = (await this.helpers.httpRequest(options)) as {
					object: string;
					has_more: boolean;
					data: Array<{
						id: string;
						audience_id: string;
						name?: string;
						status: string;
						created_at: string;
						scheduled_at: string | null;
						sent_at: string | null;
					}>;
				};

				const broadcasts = response.data || [];
				const results = broadcasts
					.filter((broadcast) => {
						if (!filter) return true;
						const searchText =
							`${broadcast.name || ''} ${broadcast.id} ${broadcast.status}`.toLowerCase();
						return searchText.includes(filter.toLowerCase());
					})
					.map((broadcast) => {
						const date = broadcast.sent_at || broadcast.scheduled_at || broadcast.created_at;
						const status = broadcast.status.charAt(0).toUpperCase() + broadcast.status.slice(1);
						const displayName = broadcast.name
							? `${broadcast.name} - ${status} (${new Date(date).toLocaleDateString()})`
							: `${status} - ${new Date(date).toLocaleDateString()} (${broadcast.id.slice(0, 8)}...)`;
						return {
							name: displayName,
							value: broadcast.id,
							url: `https://resend.com/broadcasts/${broadcast.id}`,
						};
					});

				// Return pagination token if there are more results
				const paginationResult: INodeListSearchResult = { results };

				if (response.has_more && broadcasts.length > 0) {
					// Use the last broadcast ID as the pagination token for the next page
					paginationResult.paginationToken = broadcasts[broadcasts.length - 1].id;
				}

				return paginationResult;
			},
			async searchContacts(
				this: ILoadOptionsFunctions,
				filter?: string,
				paginationToken?: string,
			): Promise<INodeListSearchResult> {
				// Get the audience ID from the current parameters
				const audienceId = this.getNodeParameter('audienceId', undefined, {
					extractValue: true,
				}) as string;

				if (!audienceId) {
					return { results: [] };
				}

				const credentials = await this.getCredentials('resendApi');

				// Build query parameters
				let url = `https://api.resend.com/audiences/${audienceId}/contacts?limit=100`;

				if (paginationToken) {
					url += `&after=${paginationToken}`;
				}

				const options = {
					method: 'GET' as const,
					url,
					headers: {
						Authorization: `Bearer ${credentials.apiKey}`,
						'Content-Type': 'application/json',
					},
					json: true,
				};

				const response = (await this.helpers.httpRequest(options)) as {
					object: string;
					has_more: boolean;
					data: Array<{
						id: string;
						email: string;
						first_name?: string;
						last_name?: string;
						created_at: string;
						unsubscribed: boolean;
					}>;
				};

				const contacts = response.data || [];
				const results = contacts
					.filter((contact) => {
						if (!filter) return true;
						const searchText =
							`${contact.email} ${contact.first_name || ''} ${contact.last_name || ''}`.toLowerCase();
						return searchText.includes(filter.toLowerCase());
					})
					.map((contact) => {
						const fullName = [contact.first_name, contact.last_name].filter(Boolean).join(' ');
						const displayName = fullName ? `${contact.email} (${fullName})` : contact.email;
						return {
							name: displayName,
							value: contact.id,
							url: `https://resend.com/audiences/${audienceId}/contacts/${contact.id}`,
						};
					});

				// Return pagination token if there are more results
				const paginationResult: INodeListSearchResult = { results };

				if (response.has_more && contacts.length > 0) {
					// Use the last contact ID as the pagination token for the next page
					paginationResult.paginationToken = contacts[contacts.length - 1].id;
				}

				return paginationResult;
			},
		},
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

						case 'list':
							responseData = await listBroadcasts.call(this, i);
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
