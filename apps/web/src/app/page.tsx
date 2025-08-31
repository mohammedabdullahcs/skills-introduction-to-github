"use client";
import { CTAButton, TeacherCard, Testimonial, FAQList } from '@quran-platform/ui';

const teachersData = [
  {
    name: "Ustaza Aisha Rahman",
    title: "Certified Quran Teacher",
    experience: "8 years",
    specialization: ["Tajweed", "Memorization", "Tafsir"],
    image: "/images/teacher-female.svg",
    gender: "female" as const
  },
  {
    name: "Sheikh Muhammad Hassan",
    title: "Senior Quran Scholar",
    experience: "15 years",
    specialization: ["Qiraʼat", "Arabic Grammar", "Islamic Studies"],
    image: "/images/teacher-male-1.svg",
    gender: "male" as const
  },
  {
    name: "Ustaz Ahmed Ali",
    title: "Quran Memorization Expert",
    experience: "12 years",
    specialization: ["Hifz Program", "Revision Techniques", "Student Mentoring"],
    image: "/images/teacher-male-2.svg",
    gender: "male" as const
  }
];

const testimonialsData = [
  {
    name: "Sarah Johnson",
    role: "Student",
    content: "Learning Quran with certified teachers has been an incredible journey. The one-on-one attention and personalized approach helped me memorize 5 chapters in just 6 months!",
    rating: 5,
    image: "/images/student-1.svg"
  },
  {
    name: "Omar Abdullah",
    role: "Parent",
    content: "My children love their Quran classes. The teachers are patient, knowledgeable, and create a nurturing environment for learning. Highly recommended!",
    rating: 5,
    image: "/images/student-2.svg"
  },
  {
    name: "Fatima Al-Zahra",
    role: "Adult Learner",
    content: "As a working professional, the flexible scheduling made it possible for me to learn Quran. The teachers adapt to my pace and provide excellent guidance.",
    rating: 5,
    image: "/images/student-3.svg"
  }
];

const faqData = [
  {
    question: "How do I book a free trial lesson?",
    answer: "Simply click the 'Book Free Trial' button and fill out our quick form. We'll match you with a certified teacher based on your preferences and schedule your first free lesson within 24 hours."
  },
  {
    question: "Are your teachers certified?",
    answer: "Yes, all our teachers are certified with recognized Islamic qualifications and have extensive experience in teaching Quran. They undergo a rigorous selection process and continuous training to ensure the highest quality of education."
  },
  {
    question: "Can I choose between male and female teachers?",
    answer: "Absolutely! We understand the importance of comfort in learning. You can specify your preference for male or female teachers when booking your trial lesson, and we'll match you accordingly."
  },
  {
    question: "What age groups do you teach?",
    answer: "We welcome students of all ages, from children as young as 4 years old to adults. Our teachers adapt their teaching methods to suit different age groups and learning styles."
  },
  {
    question: "Do you offer group classes or only individual lessons?",
    answer: "We offer both individual one-on-one lessons and small group classes. Individual lessons provide personalized attention, while group classes offer a collaborative learning environment at a more affordable rate."
  },
  {
    question: "What technology do I need for online lessons?",
    answer: "You'll need a device with internet connection (computer, tablet, or smartphone), a webcam, and a microphone. We use user-friendly video conferencing software that works on all devices."
  }
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "EducationalOrganization"],
  "name": "Quran Learning Platform",
  "description": "Learn Quran Online with Certified Teachers - Professional online Quran education for all ages",
  "url": "https://quran-learning-platform.com",
  "telephone": "+1-555-0123",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "US"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday", 
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "opens": "06:00",
    "closes": "23:00"
  },
  "offers": {
    "@type": "Offer",
    "name": "Free Trial Lesson",
    "description": "Complimentary first lesson with certified Quran teacher",
    "price": "0",
    "priceCurrency": "USD"
  },
  "employee": [
    {
      "@type": "Person",
      "name": "Ustaza Aisha Rahman",
      "jobTitle": "Certified Quran Teacher"
    },
    {
      "@type": "Person", 
      "name": "Sheikh Muhammad Hassan",
      "jobTitle": "Senior Quran Scholar"
    },
    {
      "@type": "Person",
      "name": "Ustaz Ahmed Ali", 
      "jobTitle": "Quran Memorization Expert"
    }
  ]
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Hero Section */}
        <section className="relative px-4 py-20 text-center">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Learn Qur&apos;an Online with
              <span className="text-green-600 block">Certified Teachers</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect with qualified Islamic scholars for personalized Qur&apos;an education. 
              Start your spiritual journey with our expert guidance and flexible online classes.
            </p>
            <CTAButton 
              size="large"
              className="mb-8"
              aria-label="Book your free trial lesson today"
            >
              Book Free Trial
            </CTAButton>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2" aria-hidden="true"></span>
                Free Trial Lesson
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2" aria-hidden="true"></span>
                Certified Teachers
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2" aria-hidden="true"></span>
                Flexible Scheduling
              </span>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16">
              Why Choose Our Qur&apos;an Learning Platform?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-green-600" aria-hidden="true">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Certified Teachers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Learn from qualified Islamic scholars with extensive experience in Qur&apos;an education and proper Tajweed pronunciation.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-green-600" aria-hidden="true">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Personalized Learning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Customized lesson plans tailored to your pace, goals, and learning style for optimal progress and understanding.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-green-600" aria-hidden="true">⏰</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Flexible Scheduling</h3>
                <p className="text-gray-600 leading-relaxed">
                  Book lessons at your convenience with 24/7 availability and easy rescheduling options to fit your busy lifestyle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Teachers Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Meet Our Certified Teachers
            </h2>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
              Our experienced educators bring years of Islamic scholarship and teaching expertise to guide your Qur&apos;an learning journey.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {teachersData.map((teacher, index) => (
                <TeacherCard
                  key={index}
                  {...teacher}
                  className="hover:transform hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
              Join thousands of satisfied students who have transformed their Qur&apos;an learning experience with our platform.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonialsData.map((testimonial, index) => (
                <Testimonial
                  key={index}
                  {...testimonial}
                  className="hover:transform hover:scale-105 transition-transform duration-300"
                />
              ))}
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 text-center mb-16">
              Get answers to common questions about our online Qur&apos;an learning platform.
            </p>
            <FAQList items={faqData} allowMultiple={false} />
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-green-600 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Begin Your Qur&apos;an Learning Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Take the first step towards deepening your connection with the Qur&apos;an. 
              Book your free trial lesson today and experience personalized Islamic education.
            </p>
            <CTAButton 
              variant="secondary"
              size="large"
              className="mb-8"
              aria-label="Book your free trial lesson now"
            >
              Book Free Trial Now
            </CTAButton>
            <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
              <div>
                <h3 className="font-semibold mb-2">Contact Us</h3>
                <p className="opacity-80">support@quranlearning.com</p>
                <p className="opacity-80">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Available Hours</h3>
                <p className="opacity-80">7 Days a Week</p>
                <p className="opacity-80">6:00 AM - 11:00 PM EST</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Languages</h3>
                <p className="opacity-80">English, Arabic</p>
                <p className="opacity-80">Urdu, Turkish</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
