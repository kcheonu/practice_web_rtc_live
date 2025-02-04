
import React, { useState, useEffect } from 'react';
// import { ChevronLeft, ShoppingCart, Plus, Minus } from 'lucide-react';

const MenuDetailComponent = ({ menuId }) => {
  const [menuData, setMenuData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Fetch menu data when component mounts
  useEffect(() => {
    fetchMenuData();
  }, [menuId]);
  
  const fetchMenuData = async () => {
    // Simulated API call - replace with actual API endpoint
    const mockData = {
      id: menuId,
      name: "몽글계란 닭범",
      basePrice: 30000,
      image: "/api/placeholder/400/300",
      requiredSteps: [
        {
          id: 1,
          title: "1 단계(신라면 정도예요...)",
          options: []
        },
        {
          id: 2,
          title: "2 단계(불닭 정도예요...)",
          options: []
        },
        {
          id: 3,
          title: "3 단계(저세상 매운맛이에요...)",
          options: []
        }
      ],
      additionalOptions: [
        {
          id: 1,
          name: "계란 후라이",
          price: 30000
        },
        {
          id: 2,
          name: "스팸 구이(2조각)",
          price: 20000
        },
        {
          id: 3,
          name: "컵비 만두",
          price: 50000
        }
      ]
    };
    
    setMenuData(mockData);
  };
  
  const handleOptionChange = (optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: !prev[optionId]
    }));
  };
  
  const calculateTotal = () => {
    if (!menuData) return 0;
    
    const optionsTotal = Object.entries(selectedOptions)
      .reduce((sum, [optionId, isSelected]) => {
        if (!isSelected) return sum;
        const option = menuData.additionalOptions.find(opt => opt.id === parseInt(optionId));
        return sum + (option?.price || 0);
      }, 0);
      
    return (menuData.basePrice + optionsTotal) * quantity;
  };
  
  useEffect(() => {
    setTotalPrice(calculateTotal());
  }, [selectedOptions, quantity]);
  
  if (!menuData) return <div className="p-4">Loading...</div>;
  
  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <button className="p-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="p-2">
          <ShoppingCart className="w-6 h-6" />
        </button>
      </div>
      
      {/* Menu Image */}
      <div className="relative w-full aspect-video">
        <img 
          src={menuData.image} 
          alt={menuData.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Menu Details */}
      <div className="flex-1 p-4 overflow-auto">
        <h1 className="text-xl font-bold mb-4">{menuData.name}</h1>
        
        {/* Required Steps */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">맵기 조절</h2>
          {menuData.requiredSteps.map(step => (
            <div 
              key={step.id}
              className="flex items-center p-3 border rounded-lg mb-2"
            >
              <input
                type="radio"
                name="spicyLevel"
                id={`step-${step.id}`}
                className="mr-3"
              />
              <label htmlFor={`step-${step.id}`}>{step.title}</label>
            </div>
          ))}
        </div>
        
        {/* Additional Options */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">메뉴 추가하기</h2>
          {menuData.additionalOptions.map(option => (
            <div 
              key={option.id}
              className="flex items-center justify-between p-3 border rounded-lg mb-2"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`option-${option.id}`}
                  checked={selectedOptions[option.id] || false}
                  onChange={() => handleOptionChange(option.id)}
                  className="mr-3"
                />
                <label htmlFor={`option-${option.id}`}>{option.name}</label>
              </div>
              <span className="text-gray-600">
                {option.price.toLocaleString()}원
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t p-4">
        <div className="flex items-center justify-center mb-4">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="p-2 border rounded-full"
          >
            <Minus className="w-5 h-5" />
          </button>
          <span className="mx-4 text-xl font-semibold">{quantity}</span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="p-2 border rounded-full"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl">총 {totalPrice.toLocaleString()}원</span>
        </div>
        
        <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold">
          담기
        </button>
      </div>
    </div>
  );
};

export default MenuDetailComponent;