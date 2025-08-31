# API Domain Modules

This API is structured using domain-driven design with thin controllers and service functions.

## Domain Modules

### 1. Auth (`/auth`)
- `registerUser(input)` - Register a new user
- `loginUser(input)` - Authenticate and get token  
- `getCurrentUser(input)` - Get current user from token

### 2. Teachers (`/teachers`)
- `listTeachers()` - Get all available teachers
- `getTeacherById(input)` - Get teacher by ID

### 3. Booking (`/booking`) 
- `requestTrialClass(input)` - Request a trial class
- `approveBooking(input)` - Approve a booking request
- `rejectBooking(input)` - Reject a booking request

### 4. Lessons (`/lessons`)
- `scheduleLesson(input)` - Schedule a lesson
- `recordAttendance(input)` - Record lesson attendance
- `completeLesson(input)` - Mark lesson as completed

### 5. Billing (`/billing`)
- `createInvoice(input)` - Create a new invoice
- `markPaid(input)` - Mark invoice as paid
- `listInvoices()` - List all invoices

### 6. Communications (`/comms`)
- `sendEmail(input)` - Send email message
- `sendWhatsApp(input)` - Send WhatsApp message
- `queueReminder(input)` - Queue a scheduled reminder

### 7. Analytics (`/analytics`)
- `trackEvent(input)` - Track an analytics event
- `listEvents(input)` - List tracked events with filters

## Features

- **Input Validation**: All functions use Zod schemas for input validation
- **Result Types**: All functions return `Result<T>` types for consistent error handling
- **Pure Functions**: Service functions are pure where possible
- **Unit Tests**: Comprehensive test coverage for all service functions
- **Thin Controllers**: Controllers handle HTTP concerns only

## Usage

```typescript
import { registerUser, loginUser } from './src/auth/service.js';

// Register a new user
const result = await registerUser({
  email: 'user@example.com',
  password: 'securepassword',
  name: 'John Doe'
});

if (result.success) {
  console.log('User registered:', result.data);
} else {
  console.error('Registration failed:', result.error);
}
```

## Testing

Run tests with:
```bash
npm run test:run
```

Build the project:
```bash
npm run build
```