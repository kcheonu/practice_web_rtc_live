import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempted with:', email, password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-[350px] h-[760px] p-8 bg-white relative">
        {/* Camera icon at top */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <div className="w-4 h-4 rounded-full bg-gray-800"></div>
        </div>

        {/* Logo */}
        <div className="mt-16 mb-12 flex items-center justify-center">
          <h1 className="text-4xl font-bold">투당</h1>
          <img
            src="/api/placeholder/24/24"
            alt="Food delivery icon"
            className="ml-2 w-6 h-6"
          />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ID Input */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-600">아이디</label>
            <input
              type="email"
              placeholder="Example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-600">비밀번호</label>
            <input
              type="password"
              placeholder="8자리 이상"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 mt-8 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            로그인 하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;