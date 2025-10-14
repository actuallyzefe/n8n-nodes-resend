# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-10-14

### Added

- Initial release of n8n-nodes-resend

- **Audience Resource** with 4 operations:
  - Create: Create new audiences for contact grouping
  - Get: Retrieve audience details by ID
  - List: Get all audiences
  - Delete: Remove audiences
- **Contact Resource** with 5 operations:
  - Create: Add contacts to audiences with optional fields (firstName, lastName, unsubscribed)
  - Get: Retrieve contact by ID or email address
  - Update: Modify contact information (supports lookup by ID or email)
  - Delete: Remove contacts from audiences (supports lookup by ID or email)
  - List: Get all contacts with pagination support (after/before cursors)
- **Broadcast Resource** with 2 operations:
  - Create: Create broadcast emails for entire audiences
  - Send: Send or schedule broadcasts to all contacts
- Contact lookup flexibility: Choose between ID or email address
- Pagination support for contact lists
- Validation for mutually exclusive parameters (after/before in list contacts)
- Validation for required body content (HTML or Text in broadcasts)
- Total of 16 operations across 4 resources

- Email resource with five operations:
  - Send: Send single emails with HTML/text content
  - Send Batch: Send up to 100 emails in one request
  - Get: Retrieve email details and delivery status
  - Update: Modify scheduled email send time
  - Cancel: Cancel scheduled emails before sending
- Support for email attachments (binary data and URLs)
- Email scheduling functionality
- Custom tags for email tracking and categorization
- CC, BCC, and Reply-To support
- Full TypeScript implementation with proper type definitions
- Comprehensive error handling
- Bearer token authentication for Resend API
- Production-ready code with inline documentation
