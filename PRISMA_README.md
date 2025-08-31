# Prisma Education Platform Schema

This repository contains a comprehensive Prisma schema designed for an educational platform with multiple business domains organized by logical namespaces.

## Database Schema Overview

The schema includes six main namespaces:

### 🔐 Auth Namespace
- **User**: Core user management with role-based access
  - Roles: student, teacher, parent, admin
  - Fields: id, role, name, email, hashedPassword, createdAt

### 🎯 CRM Namespace  
- **Lead**: Lead management system
  - Fields: id, name, email, phone, source, status
  - Statuses: new, contacted, qualified, converted, lost

### 📚 LMS Namespace
- **TeacherProfile**: Teacher-specific information
  - Fields: id, userId→User, bio, languages, gender, certifications
- **StudentProfile**: Student-specific information  
  - Fields: id, userId→User, goals, timezone

### 💰 Billing Namespace
- **Invoice**: Invoice management
  - Fields: id, studentId→StudentProfile, amount, currency, status, createdAt
  - Statuses: pending, paid, failed, cancelled

### 📨 Communications Namespace
- **MessageLog**: Message tracking across channels
  - Fields: id, to, channel, template, status, metadata (JSONB), sentAt
  - Channels: email, sms, push, webhook
  - Statuses: pending, sent, delivered, failed

### 📊 Analytics Namespace
- **Event**: Event tracking for analytics
  - Fields: id, userId (nullable)→User, name, properties (JSONB), timestamp

## Getting Started

### Prerequisites
- Node.js 16+
- SQLite3

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   npm run db:reset
   ```

### Available Scripts

- `npm run db:reset` - Reset database and run seeds
- `npm run db:seed` - Run seed data only
- `node prisma/verify.js` - Verify database setup

## Seeded Data

The database comes pre-populated with:

### Teachers (1 female + 2 male as requested)
1. **Sarah Johnson** (Female)
   - Email: sarah.johnson@example.com
   - Bio: Experienced mathematics teacher with 8 years of teaching experience
   - Languages: English, Spanish
   - Certifications: M.Ed Mathematics, Certified Secondary Mathematics Teacher

2. **Michael Chen** (Male)
   - Email: michael.chen@example.com  
   - Bio: Computer Science instructor specializing in programming and web development
   - Languages: English, Mandarin
   - Certifications: B.S. Computer Science, AWS Certified Solutions Architect

3. **David Rodriguez** (Male)
   - Email: david.rodriguez@example.com
   - Bio: Physics and chemistry teacher who enjoys conducting hands-on experiments
   - Languages: English, Spanish, Portuguese
   - Certifications: M.S. Physics, B.S. Chemistry, Secondary Science Teaching License

### Sample Data
- CRM leads for potential students
- Analytics events for user tracking
- Message logs for communication tracking

## Database Schema Design

### Namespace Organization
The schema uses table prefixes to simulate database schemas/namespaces in SQLite:
- `auth_*` - Authentication and user management
- `crm_*` - Customer relationship management  
- `lms_*` - Learning management system
- `billing_*` - Financial and billing operations
- `comms_*` - Communications and messaging
- `analytics_*` - Events and analytics tracking

### Key Features
- **Type Safety**: Enums for all status fields and roles
- **JSON Support**: JSONB-style fields stored as JSON strings in SQLite
- **Referential Integrity**: Foreign key relationships between related entities
- **Audit Fields**: CreatedAt timestamps on key entities
- **Flexible Metadata**: JSON properties for extensible data storage

## File Structure

```
prisma/
├── schema.prisma          # Main Prisma schema definition
├── migrations/            # Database migration files
│   └── 001_init/
│       └── migration.sql  # Initial database setup
├── seed.js               # Database seeding script
├── setup.js              # Database initialization
├── verify.js             # Database verification
└── dev.db               # SQLite database file (generated)
```

## Notes

- This implementation uses SQLite for simplicity and portability
- JSON fields are stored as TEXT in SQLite but should be treated as JSONB in application code
- The schema is designed to be easily migrated to PostgreSQL or other databases that support true schemas
- All passwords are hashed using bcryptjs with salt rounds of 10