# Services Documentation

This folder contains documentation for all external services and integrations used in the Kimberly Ryan website.

## 📋 Available Services

### 📧 Email Service
- **[Email Service Documentation](./email-service/README.md)**
- **Purpose**: Automated email notifications for form submissions
- **Technology**: Resend + React Email
- **Features**: Contact forms, newsletter subscriptions, training registrations

## 🔧 Service Integration

All services are integrated through:
- **Environment Variables**: Configuration via `.env.local`
- **API Routes**: Next.js API routes for service communication
- **Type Safety**: Full TypeScript support for all service integrations
- **Error Handling**: Graceful error handling that doesn't break user experience

## 📊 Service Status

| Service | Status | Documentation | Last Updated |
|---------|--------|---------------|--------------|
| Email Service | ✅ Active | [View Docs](./email-service/README.md) | Current |
| Sanity CMS | ✅ Active | [View Docs](../sanity/SANITY_SETUP.md) | Current |

## 🚀 Adding New Services

When integrating a new service:

1. **Create Documentation**: Add a new folder with comprehensive README
2. **Environment Variables**: Document all required environment variables
3. **API Integration**: Create appropriate API routes
4. **Type Definitions**: Add TypeScript interfaces
5. **Error Handling**: Implement proper error handling
6. **Testing**: Include testing instructions
7. **Update This Table**: Add the service to the status table above

## 🔍 Service Monitoring

- **Email Service**: Check Resend dashboard for delivery status
- **Sanity CMS**: Monitor through Sanity dashboard
- **Application Logs**: Check console logs for service errors
- **Environment Validation**: Use `npm run check:env` to validate configuration
