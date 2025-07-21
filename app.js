import React, { useState, useEffect } from 'react';

// Main App component for the Honeywell Alpha Keypad
const App = () => {
  // State to hold the current display text on the keypad screen
  const [displayText, setDisplayText] = useState('');
  // State to hold the current system status (e.g., "READY", "ARMED")
  const [systemStatus, setSystemStatus] = useState('READY TO ARM');
  // State to hold the entered code/input
  const [inputCode, setInputCode] = useState('');
  // State to manage a temporary message shown to the user
  const [message, setMessage] = useState('');

  // Effect to clear messages after a few seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000); // Message disappears after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Function to handle button clicks
  const handleButtonClick = (value) => {
    // Clear any existing message when a new button is pressed
    setMessage('');

    switch (value) {
      case 'ARM_AWAY':
        // Simulate arming away
        setSystemStatus('ARMED AWAY');
        setDisplayText('SYSTEM ARMED AWAY');
        setInputCode(''); // Clear input after action
        setMessage('System armed away. Exit now.');
        break;
      case 'ARM_STAY':
        // Simulate arming stay
        setSystemStatus('ARMED STAY');
        setDisplayText('SYSTEM ARMED STAY');
        setInputCode(''); // Clear input after action
        setMessage('System armed stay. Stay inside.');
        break;
      case 'OFF':
        // Simulate disarming - requires a code (for simplicity, any input will disarm)
        if (inputCode) { // In a real app, you'd validate the code
          setSystemStatus('DISARMED');
          setDisplayText('SYSTEM DISARMED');
          setInputCode('');
          setMessage('System disarmed.');
        } else {
          setMessage('Enter code to disarm.');
        }
        break;
      case 'MAX':
        // Simulate MAX function (e.g., maximum security)
        setDisplayText('MAX SECURITY ON');
        setInputCode('');
        setMessage('Max security activated.');
        break;
      case 'TEST':
        // Simulate TEST function
        setDisplayText('SYSTEM TEST MODE');
        setInputCode('');
        setMessage('Test mode active.');
        break;
      case 'BYPASS':
        // Simulate BYPASS function
        setDisplayText('BYPASS MODE');
        setInputCode('');
        setMessage('Bypass mode active.');
        break;
      case 'CHIME':
        // Simulate CHIME function
        setDisplayText('CHIME ON/OFF');
        setInputCode('');
        setMessage('Chime toggled.');
        break;
      case 'CODE':
        // Simulate CODE function (e.g., change code)
        setDisplayText('ENTER NEW CODE');
        setInputCode('');
        setMessage('Ready for new code input.');
        break;
      case 'READY':
        // Simulate READY function (check status)
        setDisplayText(systemStatus);
        setInputCode('');
        setMessage('System status displayed.');
        break;
      case 'BACK':
        // Remove the last character from the input code
        setInputCode((prev) => prev.slice(0, -1));
        setDisplayText((prev) => prev.slice(0, -1)); // Also remove from display
        break;
      case 'CLEAR':
        // Clear all input
        setInputCode('');
        setDisplayText('');
        setMessage('Input cleared.');
        break;
      case '#':
      case '*':
        // Append special characters to input and display
        setInputCode((prev) => prev + value);
        setDisplayText((prev) => prev + value);
        break;
      default:
        // Append numbers/letters to input and display
        if (inputCode.length < 16) { // Limit input length
          setInputCode((prev) => prev + value);
          setDisplayText((prev) => prev + value);
        } else {
          setMessage('Input limit reached.');
        }
        break;
    }
  };

  // Helper component for a single button
  const KeypadButton = ({ label, value, onClick, className = '' }) => (
    <button
      className={`
        flex flex-col items-center justify-center
        bg-gray-700 text-white text-sm font-medium
        rounded-md shadow-md hover:bg-gray-600
        transition-colors duration-200
        p-2 sm:p-3
        ${className}
      `}
      onClick={() => onClick(value)}
    >
      {label.split('\n').map((line, index) => (
        <span key={index} className={index === 0 ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'}>
          {line}
        </span>
      ))}
    </button>
  );

  // Define the keypad buttons with their labels and values
  const buttons = [
    { label: '1\nOFF', value: 'OFF', className: 'col-span-2' }, // OFF button spans 2 columns
    { label: '2\nAWAY', value: 'ARM_AWAY', className: 'col-span-2' }, // AWAY button spans 2 columns
    { label: '3\nSTAY', value: 'ARM_STAY', className: 'col-span-2' }, // STAY button spans 2 columns
    { label: '4\nMAX', value: 'MAX' },
    { label: '5\nTEST', value: 'TEST' },
    { label: '6\nBYPASS', value: 'BYPASS' },
    { label: '7\nCHIME', value: 'CHIME' },
    { label: '8\nCODE', value: 'CODE' },
    { label: '9\nREADY', value: 'READY' },
    { label: '*\nBACK', value: 'BACK' },
    { label: '0', value: '0' },
    { label: '#\nCLEAR', value: 'CLEAR' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4 font-inter">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-lg border-2 border-gray-600">
        {/* Keypad Display Area */}
        <div className="bg-gray-900 text-green-400 font-mono text-right p-4 rounded-lg mb-6 h-24 flex flex-col justify-between overflow-hidden relative">
          {/* Status Indicators (simplified) */}
          <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-1">
            <span>READY</span>
            <span>AC</span>
            <span>BATT</span>
            <span>FAULT</span>
          </div>
          {/* Main Display Text */}
          <div className="text-lg sm:text-2xl font-bold whitespace-nowrap overflow-hidden text-ellipsis">
            {displayText || 'ENTER CODE'}
          </div>
          {/* System Status Line */}
          <div className="text-xs sm:text-sm text-gray-400 mt-1">
            {systemStatus}
          </div>
          {/* Message Overlay */}
          {message && (
            <div className="absolute inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center text-yellow-300 text-center text-base sm:text-xl p-2 rounded-lg animate-fade-in-out">
              {message}
            </div>
          )}
        </div>

        {/* Keypad Buttons Grid */}
        <div className="grid grid-cols-6 gap-3 sm:gap-4">
          {buttons.map((button, index) => (
            <KeypadButton
              key={index}
              label={button.label}
              value={button.value}
              onClick={handleButtonClick}
              className={button.className}
            />
          ))}
        </div>

        {/* Tailwind CSS for animations */}
        <style>{`
          @keyframes fade-in-out {
            0% { opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { opacity: 0; }
          }
          .animate-fade-in-out {
            animation: fade-in-out 3s forwards;
          }
          .font-inter {
            font-family: 'Inter', sans-serif;
          }
        `}</style>
      </div>
    </div>
  );
};

export default App;
