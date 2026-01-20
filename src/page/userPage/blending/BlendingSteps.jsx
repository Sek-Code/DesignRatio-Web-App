import { useState } from 'react';

export default function BlendingSteps() {
  const [selectedSize, setSelectedSize] = useState();
  const [selectedBases, setSelectedBases] = useState();

  // const handleBaseChange = (base) => {
  //   setSelectedBases((prev) =>
  //     prev.includes(base) ? prev.filter((b) => b !== base) : [...prev, base]
  //   );
  // };

  const sizeOptions = [
    { value: 'size-s', label: 'Size S (approx. 50 g.) + 50 THB' },
    { value: 'size-m', label: 'Size M (approx. 70 g.) + 70 THB' },
    { value: 'size-l', label: 'Size L (approx. 100 g.) + 100 THB' },
  ];

  const baseOptions = [
    { value: 'black-tea', label: 'Black Tea + 20 THB' },
    { value: 'green-tea', label: 'Green Tea + 20 THB' },
    { value: 'oolong-tea', label: 'Oolong Tea + 30 THB' },
    { value: 'white-tea', label: 'White Tea + 30 THB' },
  ];

  return (
    <div className="blending-steps w-full space-y-8">
      {/* Step 1: Choose Your Tea Base */}
      <div className="step-1">
        <h2
          className="w-full text-left text-2xl font-bold mb-4 lg:text-2xl"
          style={{ color: 'var(--color-brown)', fontFamily: 'var(--font-body)' }}
        >
          Step 1: Choose Your Tea Base
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-3/4">
          {baseOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer"
              style={{ color: 'var(--color-brown)' }}
            >
              <input
                type="radio"
                value={option.value}
                checked={selectedBases===option.value}
                onChange={(e) => setSelectedBases(e.target.value)}
                className="w-4 h-4 accent-(--color-brown)"
              />
              <span className="ml-2 text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Step 2: Choose Your Tea Size */}
      <div className="step-2">
        <h2
          className="w-full text-left text-2xl font-bold mb-4 lg:text-2xl"
          style={{ color: 'var(--color-brown)', fontFamily: 'var(--font-body)' }}
        >
          Step 2: Choose Your Tea Size
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-3/4">
          {sizeOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer"
              style={{ color: 'var(--color-brown)' }}
            >
              <input
                type="radio"
                name="tea-size"
                value={option.value}
                checked={selectedSize === option.value}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-4 h-4 accent-(--color-brown)"
              />
              <span className="ml-2 text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      
    </div>
  );
}
