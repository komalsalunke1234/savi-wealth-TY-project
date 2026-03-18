import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon,
  StarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  HeartIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import TeamCard from '../components/TeamCard';
import Counter from '../components/Counter';

const About: React.FC = () => {
  const whyChooseUs = [
    {
      title: 'Client Centric',
      description: 'Our clients are at the heart of everything we do. We prioritize their financial well-being and provide personalized service.',
      icon: <HeartIcon className="h-8 w-8" />
    },
    {
      title: 'Rich Product Basket',
      description: 'Comprehensive range of financial products and services to meet diverse investment needs and risk profiles.',
      icon: <UserGroupIcon className="h-8 w-8" />
    },
    {
      title: 'Customer Gratification',
      description: 'We measure our success by the satisfaction and financial growth of our clients over the long term.',
      icon: <StarIcon className="h-8 w-8" />
    },
    {
      title: 'Value Added Services',
      description: 'Beyond investment management, we provide holistic financial planning and advisory services.',
      icon: <CheckCircleIcon className="h-8 w-8" />
    },
    {
      title: 'Experienced & Skilled Team',
      description: 'Our team combines years of industry experience with professional certifications and market expertise.',
      icon: <AcademicCapIcon className="h-8 w-8" />
    },
    {
      title: 'Passionate Approach',
      description: 'We are passionate about helping our clients achieve financial freedom and building lasting relationships.',
      icon: <ShieldCheckIcon className="h-8 w-8" />
    }
  ];

  const team = [
{
  name: 'Sonali Wagh',
  role: 'Founder & CEO',
  bio: 'Sonali brings over 12 years of experience in financial advisory and client relationship management. She holds multiple certifications including NISM and AMFI qualifications, specializing in client-centric wealth management solutions.',
  image: '/images/team/sonali-wagh.jpg',
  qualifications: ['NISM Certified', 'AMFI Registered', 'MBA Finance', 'Client Relations Expert'],
  linkedin: '#',
  email: 'sonali@saviwealth.in',
  phone: '+91 98765 43210'
}
,
    {
      name: 'Vikas Wagh',
      role: 'Co-Founder & CTO',
      bio: 'Vikas has extensive experience in banking and financial services with expertise in investment advisory and portfolio management. His banking background provides valuable insights into financial markets and investment strategies.',
     image: '/images/team/vikas-wagh.jpg',
      qualifications: ['Banking Expert', 'Investment Advisor', 'Risk Management', 'Portfolio Strategy'],
      linkedin: '#',
      email: 'vikas@saviwealth.in',
      phone: '+91 87654 32109'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-6">
              About <span className="text-primary-600 dark:text-primary-400">SaviWealth</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Your trusted partner in wealth management since 2022, providing comprehensive financial advisory services 
              with personalized investment strategies and goal-based planning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Founded in 2022, SaviWealth emerged from a vision to democratize professional wealth management 
                  and make quality financial advisory services accessible to individuals and families across India.
                </p>
                <p>
                  We are NSE certified and AMFI registered, ensuring that our clients receive advice from qualified 
                  professionals who adhere to the highest standards of financial advisory practices.
                </p>
                <p>
                  Our goal-based advisory philosophy focuses on understanding each client's unique financial situation, 
                  risk tolerance, and life goals to create personalized investment strategies that evolve with their needs.
                </p>
                <p>
                  With a growing client base and a commitment to excellence, we continue to expand our services 
                  while maintaining the personal touch that sets us apart in the financial advisory landscape.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <Counter target={500} label="Happy Clients" suffix="+" isVisible={true} index={0} />
              <Counter target={100} label="Crores AUM" suffix="+" isVisible={true} index={1} />
              <Counter target={15} label="Industry Awards" isVisible={true} index={2} />
              <Counter target={2} label="Years Experience" suffix="+" isVisible={true} index={3} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
              Why Choose <span className="text-primary-600 dark:text-primary-400">Us</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our commitment to excellence and client satisfaction sets us apart in the financial advisory industry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 group hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6">
              Our <span className="text-primary-600 dark:text-primary-400">Leadership</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet the experienced professionals who lead SaviWealth with vision, expertise, and dedication to client success.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <TeamCard
                key={member.name}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
                qualifications={member.qualifications}
                linkedin={member.linkedin}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Compliance */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Certified & Compliant
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
              We maintain the highest standards of professional certification and regulatory compliance 
              to ensure our clients receive trustworthy and reliable financial advice.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <ShieldCheckIcon className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">NSE Certified</h3>
                <p className="text-white/80">National Stock Exchange certification for securities trading and advisory</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <CheckCircleIcon className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">AMFI Registered</h3>
                <p className="text-white/80">Association of Mutual Funds in India registration for mutual fund distribution</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                <AcademicCapIcon className="h-12 w-12 text-white mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Professional Standards</h3>
                <p className="text-white/80">Adherence to industry best practices and ethical standards</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;