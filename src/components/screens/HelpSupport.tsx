import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  Rocket, 
  CreditCard, 
  FileText, 
  ArrowRightLeft, 
  Plus, 
  ChevronDown, 
  ChevronUp,
  Eye,
  X,
  MoreHorizontal
} from 'lucide-react';

export const HelpSupport: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0);
  const [email, setEmail] = useState('Johnsonwillamson@gmail.com');

  const topics = [
    {
      id: 1,
      title: 'Getting Started',
      subtitle: '30+ Blog Posts',
      icon: Rocket,
      color: '#6B40ED'
    },
    {
      id: 2,
      title: 'Payment',
      subtitle: '23+ Blog Posts',
      icon: CreditCard,
      color: '#6B40ED'
    },
    {
      id: 3,
      title: 'How to use',
      subtitle: '46+ Blog Posts',
      icon: FileText,
      color: '#6B40ED'
    },
    {
      id: 4,
      title: 'Integrations',
      subtitle: '14+ Blog Posts',
      icon: ArrowRightLeft,
      color: '#6B40ED'
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'How to use superpage?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      id: 2,
      question: 'How to download superpage UI kits?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 3,
      question: 'How to use Change Superpage UI kit\'s Colors?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 4,
      question: 'How to customize master components in figma?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 5,
      question: 'How to buy superpage Saas UI kits?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  ];

  const handleFAQToggle = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleSubscribe = () => {
    // Handle newsletter subscription
    console.log('Subscribing with email:', email);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Help and Support</h1>
              <p className="text-gray-600">You can find answers and get direct support here.</p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white  hover:opacity-80 transition-opacity">
                <MessageCircle className="w-4 h-4" />
                <span>Chat Support</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border-2  hover:opacity-80 transition-opacity" style={{ borderColor: '#6B40ED', color: '#6B40ED' }}>
                <Mail className="w-4 h-4" />
                <span>Email Support</span>
              </button>
            </div>
          </div>
        </div>

        {/* Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {topics.map((topic) => (
            <div key={topic.id} className="bg-gray-100  p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12  flex items-center justify-center mb-4" style={{ backgroundColor: '#e3d8ff' }}>
                <topic.icon className="w-6 h-6" style={{ color: topic.color }} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{topic.title}</h3>
              <p className="text-sm text-gray-600">{topic.subtitle}</p>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-black text-white  hover:opacity-80 transition-opacity">
              <Plus className="w-4 h-4" />
              <span>Ask Question</span>
            </button>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={faq.id} className="relative">
                <div 
                  className="bg-white border border-gray-200  p-4 cursor-pointer hover:shadow-sm transition-shadow"
                  onClick={() => handleFAQToggle(faq.id)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                  {expandedFAQ === faq.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>

                {/* Interactive overlay for questions 2 and 3 */}
                {index === 1 && (
                  <div className="absolute inset-0 bg-gray-100 bg-opacity-80  flex items-center justify-center">
                    <div className="flex items-center space-x-4">
                      <button className="p-2  hover:bg-gray-200 transition-colors">
                        <Eye className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2  hover:bg-gray-200 transition-colors">
                        <X className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2  hover:bg-gray-200 transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-white border border-gray-200  p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16  flex items-center justify-center" style={{ backgroundColor: '#e3d8ff' }}>
                <Mail className="w-8 h-8" style={{ color: '#6B40ED' }} />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Subscribe to our newsletter</h3>
              <p className="text-gray-600 mb-4">We'll notify you for new updates on superpage</p>
              <div className="flex space-x-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button 
                  onClick={handleSubscribe}
                  className="px-6 py-2 bg-black text-white  hover:opacity-80 transition-opacity"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500">
          <p>© Superpage team</p>
        </div>
      </div>
    </div>
  );
};
