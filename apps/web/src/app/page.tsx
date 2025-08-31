import { Button } from "@quran-crm-lms/ui";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center">
          Quran CRM & LMS
        </h1>
        <p className="text-lg text-center text-gray-600 max-w-2xl">
          A comprehensive Quran Customer Relationship Management and Learning Management System
        </p>
        
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Button className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            Get Started
          </Button>
          <Button 
            variant="outline"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          >
            Learn More
          </Button>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li>🕌 Course Management System</li>
            <li>👥 Student Progress Tracking</li>
            <li>📊 Analytics & Reporting</li>
            <li>💬 Event-Driven Architecture</li>
            <li>🔐 Role-Based Access Control</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
