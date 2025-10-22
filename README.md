# n8n-nodes-resend-api

This is an n8n community node that lets you integrate [Resend](https://resend.com) email API into your n8n workflows.

Resend is a modern email API for developers. Send transactional emails at scale with a simple REST API.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Usage](#usage)  
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Install via n8n UI

1. Go to **Settings > Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-resend-api` in **Enter npm package name**
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes
5. Select **Install**

### Manual Installation

To get started install the package in your n8n root directory:

```bash
npm install n8n-nodes-resend-api
```

For Docker-based deployments, add the following line to your `Dockerfile`:

```dockerfile
RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-resend-api
```

## Operations

### Email Resource (5 operations)

- **Send**: Send a single email with attachments, tags, and scheduling
- **Send Batch**: Send up to 100 emails in one request
- **Get**: Retrieve email status and delivery information
- **Update**: Modify scheduled email send time
- **Cancel**: Cancel scheduled emails before sending

### Audience Resource (4 operations)

- **Create**: Create a new audience for grouping contacts
- **Get**: Retrieve audience details
- **List**: Get all audiences
- **Delete**: Remove an audience

### Contact Resource (5 operations)

- **Create**: Add a contact to an audience with optional fields
- **Get**: Retrieve contact by ID or email address
- **Update**: Modify contact information (by ID or email)
- **Delete**: Remove a contact from an audience (by ID or email)
- **List**: Get all contacts in an audience with pagination

### Broadcast Resource (2 operations)

- **Create**: Create a broadcast email for an entire audience
- **Send**: Send or schedule a broadcast to all contacts

## Credentials

To use this node, you'll need a Resend API key:

1. Sign up for a [Resend account](https://resend.com/signup)
2. Navigate to [API Keys](https://resend.com/api-keys)
3. Create a new API key
4. Copy the API key (starts with `re_`)

### Setting up credentials in n8n

1. Open your n8n instance
2. Go to **Credentials** → **New**
3. Search for **Resend API**
4. Enter your API Key
5. Click **Create**

The credentials will be automatically tested by making a request to the Resend API.

## Compatibility

- Minimum n8n version: 1.0.0
- Tested with n8n version: 1.0.0+

## Usage

### Basic Email Sending

1. Add the **Resend** node to your workflow
2. Select **Email** as the resource
3. Select **Send** as the operation
4. Fill in:
   - **From**: Your verified sender email (e.g., `onboarding@resend.dev`)
   - **To**: Recipient email address
   - **Subject**: Email subject line
   - **Body Type**: Choose HTML or Text
   - **HTML Body** or **Text Body**: Your email content

### Sending with Attachments

To send emails with attachments:

1. Use a previous node to read files (e.g., **Read Binary File** node)
2. In the Resend node, expand **Additional Fields**
3. Click **Add** under **Attachments**
4. Select **Binary Data** as attachment type
5. Enter the binary property name (usually `data`)

### Batch Email Sending

To send multiple emails efficiently:

1. Use **Send Batch** operation
2. Click **Add Email** to add each email
3. Configure each email with its own recipients and content
4. Batch operations support up to 100 emails per request

### Scheduling Emails

To schedule an email for later:

1. In **Additional Fields**, add **Scheduled At**
2. Use the date/time picker or provide an ISO 8601 timestamp
3. The email will be queued and sent at the specified time
4. You can update or cancel scheduled emails before they're sent

### Email Tracking with Tags

Add custom tags to track and categorize your emails:

1. In **Additional Fields**, add **Tags**
2. Add tag name-value pairs
3. Use tags for analytics and filtering in your Resend dashboard

## Features

### Email Operations

- ✅ **Send transactional emails** with HTML or plain text
- ✅ **Batch sending** up to 100 emails per request
- ✅ **File attachments** via binary data or URL
- ✅ **Schedule emails** for future delivery
- ✅ **Email tracking** with custom tags
- ✅ **CC/BCC support** for multiple recipients
- ✅ **Reply-To** configuration
- ✅ **Retrieve email status** and delivery information
- ✅ **Update and cancel** scheduled emails

### Audience Management

- ✅ **Create and manage audiences** for contact grouping
- ✅ **List all audiences** in your account
- ✅ **Delete audiences** when no longer needed

### Contact Management

- ✅ **Add contacts** to audiences with names and subscription status
- ✅ **Find contacts** by ID or email address
- ✅ **Update contact information** including unsubscribe status
- ✅ **Remove contacts** from audiences
- ✅ **List contacts** with pagination (after/before cursors)

### Broadcast Campaigns

- ✅ **Create broadcast emails** for entire audiences
- ✅ **Send or schedule broadcasts** to all contacts
- ✅ **HTML and text formats** supported

## Rate Limits

Resend API has a rate limit of **2 requests per second**. If you're sending high volumes:

- Use the **Send Batch** operation to send up to 100 emails per request
- Add delays between operations using the **Wait** node
- Handle rate limit errors (429) gracefully with error workflows

## API Documentation

For more details about the Resend API:

- [Resend API Documentation](https://resend.com/docs/api-reference/introduction)
- [Resend Dashboard](https://resend.com/home)

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Resend Documentation](https://resend.com/docs)
- [GitHub Repository](https://github.com/actuallyzefe/n8n-nodes-resend)

## Version History

### 0.1.0

- Initial release

## Development

```bash
# Install dependencies
npm install

# Build the node
npm run build

# Run in development mode
npm run dev

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE.md)

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/actuallyzefe/n8n-nodes-resend).
