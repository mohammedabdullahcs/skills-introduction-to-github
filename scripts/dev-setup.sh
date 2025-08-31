#!/bin/bash

# Quran CRM & LMS Development Setup Script
# This script sets up and starts the development environment

set -e

echo "🕌 Quran CRM & LMS Development Setup"
echo "====================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please review and update the values if needed."
fi

echo "🚀 Starting infrastructure services..."
npm run docker:up

echo "⏳ Waiting for databases to be ready..."
sleep 10

echo "🗄️  Setting up database..."
npm run db:generate

echo "📦 Installing dependencies..."
npm install

echo "🏗️  Building packages..."
npm run build

echo "🌱 Database is ready. You can now run:"
echo "  - npm run db:migrate (to run migrations)"
echo "  - npm run db:seed (to seed the database)"
echo "  - npm run dev (to start development servers)"
echo ""
echo "🌐 Services will be available at:"
echo "  - Web App: http://localhost:3000"
echo "  - API: http://localhost:3001"
echo "  - MailHog: http://localhost:8025"
echo ""
echo "💡 Useful commands:"
echo "  - npm run docker:down (stop infrastructure)"
echo "  - npm run db:studio (open Prisma Studio)"
echo "  - npm run lint (run linting)"
echo "  - npm run type-check (run type checking)"
echo ""
echo "✅ Setup complete! Happy coding! 🎉"