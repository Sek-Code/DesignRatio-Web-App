import React from 'react';

// Data for tea types
const teas = [
  {
    name: 'ชาเขียว (Green Tea)',
    image: '/public/teaImageData/japanese green tea.png',
    description: 'ชาเขียวคือชาที่ไม่ผ่านการหมัก ทำให้คงสีเขียวและสารต้านอนุมูลอิสระไว้ได้สูง โดยเฉพาะสาร EGCG ที่มีชื่อเสียง',
    benefits: [
      'ช่วยในการควบคุมน้ำหนักและเร่งการเผาผลาญ',
      'ลดความเสี่ยงโรคหัวใจและหลอดเลือด',
      'บำรุงสมองและเพิ่มสมาธิ',
      'ช่วยสุขภาพช่องปากและลดกลิ่นปาก',
    ],
  },
  {
    name: 'ชาดำ (Black Tea)',
    image: '/public/teaImageData/ceylon black tea.png',
    description: 'ชาดำเป็นชาที่ผ่านกระบวนการหมักอย่างสมบูรณ์ ทำให้มีสีเข้มและรสชาติที่หนักแน่น มีคาเฟอีนสูงกว่าชาชนิดอื่น',
    benefits: [
      'กระตุ้นร่างกายให้สดชื่นและกระปรี้กระเปร่า',
      'บำรุงสุขภาพหัวใจและลดคอเลสเตอรอล',
      'ช่วยปรับปรุงการทำงานของระบบย่อยอาหาร',
      'มีสารแอล-ธีอะนีน ช่วยลดความเครียด',
    ],
  },
  {
    name: 'ชาขาว (White Tea)',
    image: '/public/teaImageData/white tea.png',
    description: 'ชาขาวทำจากยอดอ่อนของใบชาที่ยังปกคลุมด้วยขนอ่อนสีขาว ผ่านการแปรรูปน้อยที่สุด ทำให้มีรสชาติที่นุ่มนวลและละเอียดอ่อน',
    benefits: [
      'มีสารต้านอนุมูลอิสระสูงที่สุด ช่วยชะลอวัย',
      'ปกป้องและบำรุงผิวพรรณ',
      'เสริมสร้างภูมิคุ้มกันให้ร่างกาย',
      'มีคาเฟอีนในปริมาณที่น้อย',
    ],
  },
];

const AboutUsPage = () => {
  return (
    <div className="bg-cream text-brown font-body">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-matcha mb-4 tracking-tight">The Story of Tea</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From ancient legends to a beloved beverage cherished worldwide, discover the long-standing history and remarkable benefits of tea.
          </p>
        </div>

        {/* History Section */}
        <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg p-8 mb-16">
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
            <img 
              src="/public/teaImageData/brewing-chinese-tea-ceramic-gaiwan-tea-ceremony-closeup.jpg" 
              alt="Tea Ceremony" 
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold text-matcha mb-4">The History of Tea</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Legend has it that tea was discovered in China over 2,737 BC by Emperor Shen Nong. It began when tea leaves drifted into his pot of boiling water. Upon tasting it, the Emperor was surprised by its remarkably refreshing and energizing effects.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Since then, tea has become a vital part of Asian culture—influencing medicine, lifestyle, and philosophy. In the 17th century, it traveled via the Silk Road and maritime trade routes to the West, eventually becoming the world’s most popular beverage, second only to water.
            </p>
          </div>
        </div>

        {/* Tea Types Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-matcha">3 Essential Teas You Must Try</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teas.map((tea) => (
            <div key={tea.name} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
              <img src={tea.image} alt={tea.name} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-matcha mb-2">{tea.name}</h3>
                <p className="text-gray-600 mb-4">{tea.description}</p>
                <h4 className="font-semibold text-gray-800 mb-2">สรรพคุณเด่น:</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
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