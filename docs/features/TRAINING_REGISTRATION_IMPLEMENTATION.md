# Training Registration System Implementation

## Overview

This document outlines the comprehensive training registration system that has been implemented for the Kimberly Ryan website. The system allows for dynamic form creation, submission handling, and data management through Sanity CMS.

## 🎯 Features Implemented

### 1. YouTube Video Section

- **Component**: `components/specific/training-video-section.tsx`
- **Location**: Added between hero and "designed for" sections on training page
- **Features**:
  - Responsive 16:9 aspect ratio iframe
  - Loading animation with spinner
  - Decorative animated elements
  - Mobile-friendly design

### 2. Dynamic Registration Form System

- **Sanity Schema**: `sanity/schemas/training-registration-form.ts`
- **Features**:
  - Configurable form fields with validation
  - Multiple field types (text, email, number, select, textarea, radio, checkbox)
  - Field ordering and width control
  - Form settings (button text, success message, etc.)

### 3. Registration Submission Management

- **Sanity Schema**: `sanity/schemas/training-registration-submission.ts`
- **Features**:
  - Comprehensive submission tracking
  - Status management (new, reviewed, contacted, registered, etc.)
  - Communication log
  - Payment tracking
  - Internal notes and tags

### 4. API Integration

- **Endpoint**: `app/api/training-registration/route.ts`
- **Features**:
  - Form validation
  - Sanity data storage
  - Error handling
  - Metadata capture (IP, user agent, referrer)

### 5. Dynamic Registration Pages

- **Route**: `app/(site)/training/registration/[slug]/page.tsx`
- **Features**:
  - Dynamic form rendering based on Sanity configuration
  - React Hook Form with Zod validation
  - Responsive design matching application theme
  - Success state handling

## 📋 Form Fields (All Dynamic)

All form fields are now completely configurable through Sanity. There are no hardcoded/static fields. However, for proper functionality, it's recommended to include these core fields:

### Recommended Core Fields:

1. **firstName** - First Name field
2. **lastName** - Last Name field
3. **personalEmail** or **email** - Personal Email field
4. **workEmail** - Work Email field (falls back to personalEmail if not provided)
5. **jobRole** or **position** - Job Role field
6. **yearsOfExperience** or **experience** - Years of Experience field

### Field Name Mapping:

The system automatically maps common field name variations:

- **Name**: `firstName`, `first_name`, `firstname`, `name`
- **Surname**: `lastName`, `last_name`, `lastname`, `surname`
- **Email**: `personalEmail`, `personal_email`, `email`, `personal_email_address`
- **Work Email**: `workEmail`, `work_email`, `business_email`, `company_email`
- **Role**: `jobRole`, `job_role`, `position`, `title`, `job_title`, `role`
- **Experience**: `yearsOfExperience`, `years_of_experience`, `experience`, `work_experience`

## 🔧 Dynamic Form Configuration

### Field Types Supported

- **Text Input** - Basic text entry
- **Email Input** - Email with validation
- **Number Input** - Numeric input with min/max
- **Phone Input** - Telephone number
- **Dropdown Select** - Single selection from options
- **Textarea** - Multi-line text
- **Radio Buttons** - Single selection from options
- **Checkboxes** - Multiple selections

### Field Configuration Options

- **Field Name** - Internal identifier (camelCase)
- **Label** - Display name for users
- **Placeholder** - Helper text
- **Required** - Mandatory field flag
- **Options** - For select/radio/checkbox fields
- **Validation Rules**:
  - Min/max length for text
  - Min/max value for numbers
  - Custom regex patterns
  - Custom error messages
- **Display Order** - Field positioning
- **Width** - Layout width (full, half, third, two-thirds)

## 🚀 How to Use the System

### 1. Create a Registration Form in Sanity

1. Go to Sanity Studio
2. Create a new "Training Registration Form"
3. Configure form fields and settings
4. Associate with a training program
5. Publish the form

### 2. Link Training to Registration Form

1. Edit the training program in Sanity
2. Select the registration form in the "Registration Form" field
3. Save the training program

### 3. Users Can Now Register

- The "Register Now" button will automatically link to the custom form
- Form submissions are stored in Sanity
- Admins can track and manage submissions

## 📁 File Structure

```
app/
├── (site)/
│   └── training/
│       ├── page.tsx (updated with video section)
│       └── registration/
│           └── [slug]/
│               ├── page.tsx (dynamic registration page)
│               └── not-found.tsx (error page)
└── api/
    └── training-registration/
        └── route.ts (form submission handler)

components/specific/
├── training-video-section.tsx (new video component)
└── dynamic-training-registration-form.tsx (dynamic form component)

sanity/schemas/
├── training.ts (updated with registration form reference)
├── training-registration-form.ts (new form schema)
└── training-registration-submission.ts (new submission schema)

types/
└── sanity.ts (updated with new interfaces)

lib/
└── sanity.ts (updated getLatestTraining function)
```

## 🎨 Design Consistency

- Uses same color scheme as existing application
- Consistent spacing and typography
- Responsive design patterns
- Framer Motion animations matching site style
- Form styling consistent with existing forms

## 🔄 Data Flow

1. **Form Creation**: Admin creates form in Sanity with custom fields
2. **Training Association**: Form is linked to training program
3. **User Registration**: User clicks "Register Now" → redirected to custom form
4. **Form Submission**: Data validated and sent to API
5. **Data Storage**: Submission stored in Sanity with all metadata
6. **Management**: Admin can track, update, and manage submissions

## 📊 Admin Features

### Form Management

- Create/edit registration forms
- Configure field types and validation
- Set form expiry dates
- Control maximum submissions

### Submission Management

- View all submissions with status tracking
- Communication logging
- Payment status tracking
- Internal notes and tagging
- Priority assignment

## 🛡️ Security & Validation

### Client-Side Validation

- Zod schema validation
- Real-time form validation
- User-friendly error messages

### Server-Side Validation

- API endpoint validation
- Required field checking
- Email format validation
- Data sanitization

### Data Privacy

- IP address logging for analytics
- User agent tracking
- Secure data storage in Sanity

## 🔧 Configuration Options

### Form Settings

- Custom submit button text
- Success message customization
- Redirect URL after submission
- Notification email for new submissions

### Field Validation

- Required/optional fields
- Character limits
- Number ranges
- Custom regex patterns
- Custom error messages

## 📈 Scalability

The system is designed to be:

- **Scalable**: Handle multiple training programs with unique forms
- **Flexible**: Support various field types and configurations
- **Maintainable**: Clean code structure and TypeScript types
- **Extensible**: Easy to add new field types or features

## 🎯 Next Steps

To use this system:

1. Create registration forms in Sanity Studio
2. Associate forms with training programs
3. Test the registration flow
4. Monitor submissions and manage registrants

The system is now fully functional and ready for production use!
