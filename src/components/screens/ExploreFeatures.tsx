import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Users, 
  Calendar, 
  FileText, 
  MessageSquare, 
  BarChart3, 
  Clock, 
  Shield,
  Zap,
  Globe,
  Smartphone,
  ArrowLeft,
  Star,
  TrendingUp,
  Target,
  Bell
} from 'lucide-react';
import { Logo } from '../ui/Logo';

export const ExploreFeatures: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team members on projects and tasks.',
      benefits: ['Real-time collaboration', 'Team chat', 'Shared workspaces', 'Role-based permissions']
    },
    {
      icon: Calendar,
      title: 'Project Management',
      description: 'Organize and track your projects with powerful management tools.',
      benefits: ['Gantt charts', 'Milestone tracking', 'Resource allocation', 'Progress monitoring']
    },
    {
      icon: FileText,
      title: 'Task Management',
      description: 'Create, assign, and track tasks with advanced filtering and sorting.',
      benefits: ['Custom task fields', 'Priority levels', 'Due date tracking', 'Task dependencies']
    },
    {
      icon: MessageSquare,
      title: 'Communication Hub',
      description: 'Stay connected with integrated messaging and notification systems.',
      benefits: ['Team messaging', 'File sharing', 'Video calls', 'Smart notifications']
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Get insights into your team\'s productivity and project performance.',
      benefits: ['Performance metrics', 'Custom reports', 'Data visualization', 'Export options']
    },
    {
      icon: Clock,
      title: 'Time Tracking',
      description: 'Monitor time spent on tasks and projects with detailed reporting.',
      benefits: ['Automatic tracking', 'Manual entries', 'Billable hours', 'Time reports']
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Enterprise-grade security to protect your data and privacy.',
      benefits: ['End-to-end encryption', 'SSO integration', 'Audit logs', 'GDPR compliance']
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Automate repetitive tasks and workflows to boost productivity.',
      benefits: ['Workflow automation', 'Smart triggers', 'Custom rules', 'Integration APIs']
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Users' },
    { number: '50K+', label: 'Projects Completed' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Project Manager',
      company: 'TechCorp',
      content: 'Superpage has transformed how our team collaborates. The intuitive interface and powerful features make project management effortless.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Team Lead',
      company: 'StartupXYZ',
      content: 'The automation features have saved us countless hours. Our productivity has increased by 40% since implementing Superpage.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'CEO',
      company: 'InnovateLab',
      content: 'The analytics and reporting capabilities give us the insights we need to make data-driven decisions. Highly recommended!',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Logo size="sm" />
              <span className="font-semibold text-lg text-gray-900">Superpage</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors rounded-md"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="px-4 py-2 text-white bg-black hover:bg-gray-800 transition-colors rounded-md"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Powerful Project Management
            <span className="text-purple-600"> Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Superpage brings together all the tools your team needs to collaborate, 
            manage projects, and achieve your goals in one unified platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools helps teams of all sizes 
              collaborate effectively and deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Teams Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users have to say about their experience with Superpage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Join thousands of teams who have already discovered the power of Superpage. 
            Start your free trial today and see the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 border border-purple-300 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Logo size="sm" />
              <span className="font-semibold text-lg text-white">Superpage</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Superpage. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
