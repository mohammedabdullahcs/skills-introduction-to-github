# Quran CRM & LMS Monorepo

A comprehensive Quran Customer Relationship Management and Learning Management System built with modern technologies in a Turborepo monorepo structure.

## 🏗️ Architecture

This monorepo contains:

- **apps/web** - Next.js 14 frontend with TypeScript, Tailwind CSS, and shadcn/ui
- **apps/api** - NestJS backend API with TypeScript, Prisma, Zod validation, and BullMQ
- **packages/db** - Shared database layer with Prisma schema, migrations, and seed scripts
- **packages/ui** - Shared UI components library
- **packages/events** - Event schemas and emitter using Zod
- **infra/** - Docker infrastructure setup

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Git

### Automated Setup (Recommended)

\`\`\`bash
git clone <repository-url>
cd quran-crm-lms-monorepo
npm run setup
\`\`\`

This will automatically:

1. Start Docker infrastructure
2. Create environment file
3. Install dependencies
4. Build packages
5. Set up database connection

### Manual Setup

\`\`\`bash

# 1. Clone and Install

git clone <repository-url>
cd quran-crm-lms-monorepo
npm install

# 2. Environment Setup

cp .env.example .env

# Edit .env with your configuration

# 3. Start Infrastructure

npm run docker:up

# 4. Database Setup

npm run db:generate
npm run db:migrate
npm run db:seed

# 5. Start Development

npm run dev
\`\`\`

Your applications will be available at:

- 🌐 **Web App**: http://localhost:3000
- 🔗 **API**: http://localhost:3001
- 📧 **MailHog UI**: http://localhost:8025
- 🗄️ **Prisma Studio**: \`npx prisma studio\` (from packages/db)

## 📦 Available Scripts

### Root Commands

\`\`\`bash
npm run dev # Start all apps in development
npm run build # Build all packages and apps
npm run lint # Lint all code
npm run type-check # Type check all TypeScript
npm run test # Run all tests
npm run format # Format code with Prettier
\`\`\`

### Database Commands

\`\`\`bash
npm run db:generate # Generate Prisma client
npm run db:migrate # Run database migrations
npm run db:seed # Seed the database
\`\`\`

### Docker Commands

\`\`\`bash
npm run docker:up # Start all services
npm run docker:down # Stop all services
\`\`\`

## 🔧 Offline Development

If you encounter network connectivity issues (especially with Prisma client generation), the project includes offline development support:

### Prisma Offline Mode

- A stub client is automatically used when `prisma generate` fails
- This allows building and type-checking without internet connectivity
- For full database functionality, ensure proper network access to Prisma binaries

### Troubleshooting

- If `npm run db:generate` fails, the build will continue with offline stubs
- Use `npm run build` and `npm run type-check` to verify everything works
- For production deployments, ensure proper network access for Prisma

## 🏢 Project Structure

\`\`\`
quran-crm-lms-monorepo/
├── apps/
│ ├── web/ # Next.js frontend
│ │ ├── src/
│ │ ├── package.json
│ │ └── next.config.js
│ └── api/ # NestJS backend
│ ├── src/
│ ├── package.json
│ └── nest-cli.json
├── packages/
│ ├── db/ # Database layer
│ │ ├── prisma/
│ │ ├── package.json
│ │ └── index.ts
│ ├── ui/ # Shared components
│ │ ├── components/
│ │ ├── package.json
│ │ └── index.ts
│ └── events/ # Event system
│ ├── schemas.ts
│ ├── emitter.ts
│ └── package.json
├── infra/
│ └── docker-compose.yml # Infrastructure setup
├── .github/
│ └── workflows/
│ └── ci.yml # CI/CD pipeline
├── turbo.json # Turborepo configuration
├── package.json # Root package.json
└── README.md
\`\`\`

## 🧪 Testing

\`\`\`bash

# Run all tests

npm run test

# Run tests in watch mode

npm run test:watch

# Run tests for specific package

npx turbo test --filter=@quran-crm-lms/web
\`\`\`

## 📝 Code Quality

This project uses:

- **ESLint** for code linting
- **Prettier** for code formatting
- **Husky** for pre-commit hooks
- **lint-staged** for staged file linting
- **TypeScript** for type safety

Pre-commit hooks automatically:

1. Lint and fix code issues
2. Format code with Prettier
3. Run type checking
4. Run tests

## 🔧 Development

### Adding Dependencies

\`\`\`bash

# Add to specific workspace

npm install <package> --workspace=@quran-crm-lms/web

# Add to root (dev dependencies)

npm install <package> --save-dev
\`\`\`

### Creating New Packages

\`\`\`bash

# Create new package directory

mkdir packages/new-package
cd packages/new-package
npm init -y

# Update package.json name to @quran-crm-lms/new-package

# Add to turbo.json pipeline if needed

\`\`\`

## 📊 Database Schema

The database includes models for:

- **Users** (Admin, Teacher, Student roles)
- **Courses** with lessons and enrollment
- **Progress** tracking
- **Assignments** and submissions

See \`packages/db/prisma/schema.prisma\` for the complete schema.

## 🚀 Deployment

### CI/CD Pipeline

The GitHub Actions workflow (\`.github/workflows/ci.yml\`) runs:

1. **Lint** - Code quality checks
2. **Type Check** - TypeScript validation
3. **Test** - Unit and integration tests
4. **Build** - Production builds
5. **Database** - Migration validation

### Production Deployment

1. Set production environment variables
2. Build the applications: \`npm run build\`
3. Deploy using your preferred platform (Vercel, AWS, etc.)
4. Run database migrations: \`npm run db:migrate\`

## 🛠️ Technologies Used

### Frontend (apps/web)

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- next-seo for SEO
- Vitest for testing

### Backend (apps/api)

- NestJS
- TypeScript
- Prisma ORM
- Zod validation
- BullMQ for job queues
- Jest for testing

### Shared Packages

- Prisma for database
- Zod for schemas
- EventEmitter3 for events
- Shared UI components

### Infrastructure

- PostgreSQL database
- Redis for caching/queues
- MailHog for email testing
- Docker Compose for local development

### Development Tools

- Turborepo for monorepo management
- ESLint + Prettier for code quality
- Husky + lint-staged for git hooks
- GitHub Actions for CI/CD

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Ensure all checks pass
6. Submit a pull request

## 📞 Support

For questions and support, please open an issue in the GitHub repository.
