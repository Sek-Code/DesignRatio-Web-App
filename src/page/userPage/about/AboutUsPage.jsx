import React from 'react';

// Data for tea types
const teas = [
  {
    name: 'Green Tea',
    image: '/teaImageData/japanese green tea.png',
    description: 'Green tea is unfermented, allowing it to retain its green color and high antioxidant levels, particularly the renowned EGCG.',
    benefits: [
      'Weight management and metabolism boost',
      'Reduced risk of cardiovascular diseases',
      'Enhanced brain function and focus',
      'Improved oral health and fresher breath',
    ],
  },
  {
    name: 'Black Tea',
    image: '/teaImageData/ceylon black tea.png',
    description: 'Black tea is fully fermented, resulting in its dark color and robust flavor. It also contains higher caffeine levels than other types of tea.',
    benefits: [
      'Energizes and refreshes the body',
      'Supports heart health and reduces cholesterol',
      'Improves digestive system functions',
      'Contains L-Theanine to help reduce stress',
    ],
  },
  {
    name: 'White Tea',
    image: '/teaImageData/white tea.png',
    description: 'White tea is made from young tea buds still covered in fine white hairs. It is minimally processed, resulting in a smooth and delicate flavor.',
    benefits: [
      'Highest in antioxidants to help slow down aging.',
      'Protects and nourishes the skin',
      'Strengthens the immune system',
      'Low in caffeine',
    ],
  },
];

const AboutUsPage = () => {
  return (
    <div>
      <div className="container mx-auto px-10 py-10 lg:px-37.5">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="lg:text-6xl mb-4">The Story of Tea</h1>
          <p className="lg:text-xl lg:pt-4 text-(--color-brown) max-w-3xl mx-auto">
            From ancient legends to a beloved beverage cherished worldwide, discover the long-standing history and remarkable benefits of tea.
          </p>
        </div>

        {/* History Section */}
        <div className="flex flex-col md:flex-row items-center mb-16">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <img
              src="/teaImageData/brewing-chinese-tea-ceramic-gaiwan-tea-ceremony-closeup.jpg"
              alt="Tea Ceremony"
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="lg:text-4xl font-semibold text-matcha mb-4">The History of Tea</h2>
            <p className="text-(--color-brown) leading-relaxed mb-4">
              Legend has it that tea was discovered in China over 2,737 BC by Emperor Shen Nong. It began when tea leaves drifted into his pot of boiling water. Upon tasting it, the Emperor was surprised by its remarkably refreshing and energizing effects.
            </p>
            <p className="text-(--color-brown) leading-relaxed">
              Since then, tea has become a vital part of Asian culture—influencing medicine, lifestyle, and philosophy. In the 17th century, it traveled via the Silk Road and maritime trade routes to the West, eventually becoming the world’s most popular beverage, second only to water.
            </p>
          </div>
        </div>

        {/* Tea Types Section */}
        <div className="text-center mb-12">
          <h2 className="lg:text-4xl font-bold text-matcha">Essential Teas You Must Try</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teas.map((tea) => (
            <div key={tea.name} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <img src={tea.image} alt={tea.name} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-matcha mb-2">{tea.name}</h3>
                <p className="text-(--color-brown) mb-4">{tea.description}</p>
                <h4 className="font-semibold text-(--color-brown) mb-2">Benefits:</h4>
                <ul className="list-disc list-inside text-(--color-brown) space-y-1">
                  {tea.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AboutUsPage;