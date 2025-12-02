import React, { useState, useEffect } from 'react';
import { Gift, Heart, Lock, Check, User, LogOut, Star } from 'lucide-react';

// ===== IMAGE IMPORTS =====
import maltesePose1 from './img/maltese_christmas_dogs.png'; // or .png
import maltesePose2 from './img/maltese_christmas_dogs_2.png';
import retrieverPose1 from './img/retriever_christmas_dogs.png';
import retrieverPose2 from './img/retriever_christmas_dogs_2.png';
import gingerbreadHouseImg from './img/gingerbread_house.png'; 
import snowmanImg from './img/snowman.png';
import day1Img from './img/day1.png';
import day2Img from './img/day2.png'
import day3Img from './img/day3.png'
import day4Img from './img/day4.png'
import day5Img from './img/day5.png'

// ===== DEBUG SETTING =====
// Set to a number (1-25) to simulate that date in December, or null for real date
const DEBUG_DATE = null; // Set to null for production

// ===== USER CONFIGURATION =====
const USERS = {
  TALIA: 'Talia',
  TIMOTHY: 'Timothy',
  NEW: 'New',
  ADMIN: 'Admin'
};

const ADMIN_PASSWORD = 'debug123';

// ===== QUESTION BANK =====
const QUESTION_BANK = [
  {
    id: 1,
    question: "What month and year did we start dating?",
    answer: "April 2025"
  },
  {
    id: 2,
    question: "Where was our first date?",
    answer: "Gaming cafe"
  },
  {
    id: 3,
    question: "What did we do on our first date?",
    answer: "CSGO"
  },
  {
    id: 4,
    question: "Where did we go for our first trip together?",
    answer: "Shenzhen"
  },
  {
    id: 5,
    question: "What nickname do I love being called?",
    answer: "Honey"
  },
  {
    id: 6,
    question: "What activity did we do on your birthday?",
    answer: "Go karting"
  },
  {
    id: 7,
    question: "What is our son's name",
    answer: "Theo"
  },
  {
    id: 8,
    question: "What is our daughter's name?",
    answer: "Anuta"
  },
  {
    id: 9,
    question: "What is my favourite restaurant in Shanghai",
    answer: "Hainanese chicken",
  },
  {
    id: 10,
    question: "Where did we have our first kiss",
    answer: "Your house",
  }
];

// ===== MASCOT CONFIGURATION =====
// Replace these URLs with the actual images of the Maltese and Retriever
const MASCOTS = {
  MALTESE: {
    // Left side dog (White)
    frames: [
      maltesePose1,
      maltesePose2
    ]
  },
  RETRIEVER: {
    // Right side dog (Brown)
    frames: [
      retrieverPose1,
      retrieverPose2
    ]
  }
};

// ===== MASCOT COMPONENT =====
const AnimatedMascot = ({ side, frames, sizes, bottomOffset = '0px', horizontalOffset = '0px' }) => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFrame((prev) => (prev === 0 ? 1 : 0));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const isLeft = side === 'left';

  const getValue = (prop, index) => Array.isArray(prop) ? prop[index] : prop;

  return (
    <>
      {frames.map((frameSrc, index) => {
        const isActive = currentFrame === index;
        
        const frameSize = getValue(sizes, index);
        const frameBottom = getValue(bottomOffset, index);
        const frameHorizontal = getValue(horizontalOffset, index);

        return (
          <div 
            key={index}
            className="fixed z-20 pointer-events-none"
            style={{
              display: isActive ? 'block' : 'none',
              padding: '0',
              bottom: frameBottom,        
              [side]: frameHorizontal,    
            }}
          >
            <img 
              src={frameSrc} 
              alt={`${side} mascot frame ${index}`}
              className="object-contain drop-shadow-2xl"
              style={{
                width: frameSize,
                height: 'auto',
              }}
            />
          </div>
        );
      })}
    </>
  );
};

// ===== FLASHING LIGHTS COMPONENT =====
const ChristmasLights = () => {
  // Create an array of bulbs with different colors and delays
  const bulbs = Array.from({ length: 20 }).map((_, i) => {
    const colors = ['#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff'];
    const color = colors[i % colors.length];
    const delay = `${(i * 0.1).toFixed(1)}s`;
    return { id: i, color, delay };
  });

  return (
    <div className="fixed top-0 left-0 w-full z-30 pointer-events-none" style={{ height: '60px' }}>
      {/* CSS Animation Styles */}
      <style>{`
        @keyframes flash {
          0%, 100% { opacity: 1; box-shadow: 0 5px 15px currentColor; }
          50% { opacity: 0.4; box-shadow: none; }
        }
        .bulb {
          width: 16px;
          height: 24px;
          border-radius: 50%;
          position: relative;
          animation: flash 2s infinite alternate ease-in-out;
        }
        /* The little socket connection */
        .bulb::before {
          content: '';
          position: absolute;
          top: -6px;
          left: 3px;
          width: 10px;
          height: 8px;
          background: #333;
          border-radius: 2px;
        }
      `}</style>
      
      {/* The wire */}
      <div className="absolute top-0 left-0 w-full h-2 border-b-2 border-gray-800 rounded-[50%]" style={{ transform: 'translateY(-5px)' }}></div>
      
      {/* The bulbs */}
      <div className="flex justify-around pt-2 px-4 relative">
        {bulbs.map(bulb => (
          <div 
            key={bulb.id} 
            className="bulb" 
            style={{ 
              backgroundColor: bulb.color,
              color: bulb.color, // Used by currentColor in box-shadow
              animationDelay: bulb.delay 
            }} 
          />
        ))}
      </div>
    </div>
  );
};

// ===== STATIC DECORATION COMPONENT =====
const StaticDecoration = ({ src, width, bottom, left, right }) => {
  return (
    <div 
      className="fixed z-10 pointer-events-none"
      style={{
        bottom: bottom,
        left: left,
        right: right,
        padding: '0',
      }}
    >
      <img 
        src={src} 
        alt="decoration"
        className="object-contain drop-shadow-xl"
        style={{
          width: width,
          height: 'auto',
        }}
      />
    </div>
  );
};

// ===== DATA STRUCTURE =====
const MEMORIES = [
  {
    day: 1,
    type: 'image',
    title: 'Our First Date',
    content: 'Our first date was so special to me. It started off rough with a test of my pateience, but I\'m glad that I waited because I loved getting know you more. It was especially cute when we got to trade gifts and have matching phone cases and backpack charms!',
    image: day1Img,
  },
  {
    day: 2,
    type: 'image',
    title: 'Our Daughter Anuta',
    content: 'These are some photos of the day we welcomed our first child to our family, Anuta! I remember we were at the mall afte reating and we bought it from this cute grandma. I still can\'t believe that you forgot her name even though you named her.',
    image: day2Img,
  },
  {
    day: 3,
    type: 'image',
    title: 'Lego Flowers',
    content: 'Remember that time when I bought us lego flowers to make together for a date but ended up making me build it lol. I remember that the day I showed you, you had a sleepover with me and you wanted to go home. Originally, I wanted to keep the flowers as a surprise but, I didn\'t want you to leave so I spoiled the surprise earlier so that you might stay with me to build them.',
    image: day3Img,
  },
  {
    day: 4,
    type: 'image',
    title: 'The Day We Became Official',
    content: 'This flowers are from the day I asked you to become my girlfriend! It was the day after I stole your first kiss, and we planned to go to church at 9am. I knew for sure that I wanted to ask you out and I was so nervous. But you were so late that you came at like 11am that we completely missed the church. The good thing about that is that I was able to walk around the neighbourhood and pickup these flowers for you as a gift to go with me asking you to be my girlfriend.',
    image: day4Img,
  },
  {
    day: 5,
    type: 'image',
    title: 'The Night I said I love you',
    content: 'This photo was taken on the day that I said I loved you. I remember that you were basically watching me drink so much. While I was drunk I was cuddled up to you and I felt so good and safe with you. I really wanted to say that I loved you but I was so shy that I nearly didn\'t say it. I basically whispered it into your ear.',
    image: day5Img,
  },
  ...Array.from({ length: 19 }, (_, i) => {
    const day = i + 6;
    const types = ['text', 'image', 'challenge'];
    const type = types[i % 3];
    
    return {
      day,
      type,
      title: `Day ${day} - ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      content: `Placeholder content for day ${day}. Replace this with your personalized ${type} content.`,
      image: type === 'image' ? `https://images.unsplash.com/photo-placeholder-${day}?w=800` : null,
    };
  }),
  {
    day: 25,
    type: 'text',
    title: 'Merry Christmas! 🎄',
    content: 'Merry Christmas, my love! Thank you for being the most amazing gift in my life. Here\'s to many more Christmases together. I love you so much! ❤️🎁',
    image: null,
  }
];

// ===== HELPER FUNCTIONS =====
const getCurrentDate = () => {
  if (DEBUG_DATE !== null) {
    const year = new Date().getFullYear();
    return new Date(year, 11, DEBUG_DATE);
  }
  return new Date();
};

const isDayUnlocked = (dayNumber) => {
  const currentDate = getCurrentDate();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  return currentMonth === 11 && currentDay >= dayNumber;
};

// Device detection hook
const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isIPhone16ProMax, setIsIPhone16ProMax] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const userAgent = navigator.userAgent;
      
      // Detect iPhone 16 Pro Max (6.9" display, ~430x932 logical pixels in portrait)
      const isIPhone = /iPhone/i.test(userAgent);
      const isLargeIPhone = isIPhone && width >= 400 && width <= 450 && height >= 850;
      
      setIsIPhone16ProMax(isLargeIPhone);
      setIsMobile(width < 768);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isIPhone16ProMax };
};

// ===== SNOW EFFECT COMPONENT =====
const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: Math.random() * 3 + 7,
      opacity: Math.random() * 0.4 + 0.2,
      size: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute animate-fall"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.delay}s`,
          }}
        >
          <div className="w-full h-full bg-white rounded-full shadow-sm" />
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) translateX(0); }
          100% { transform: translateY(110vh) translateX(20px); }
        }
        .animate-fall { animation: fall linear infinite; }
      `}</style>
    </div>
  );
};

// ===== LOGIN PAGE COMPONENT =====
const LoginPage = ({ onLoginSuccess }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [showHints, setShowHints] = useState({});

  const selectRandomQuestions = () => {
    const shuffled = [...QUESTION_BANK].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setError('');
    setPassword('');
    setAnswers({});
    setShowHints({});

    // FIX 1: Ensure "New" (Guest) users also have to take the quiz
    if (user === USERS.ADMIN) {
      setShowPasswordInput(true);
      setShowQuiz(false);
    } else {
      // This runs for Talia, Timothy, AND New (Guest)
      setShowQuiz(true);
      setShowPasswordInput(false);
      setQuizQuestions(selectRandomQuestions());
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLoginSuccess(USERS.ADMIN);
    } else {
      setError('Incorrect password. Try again!');
      setPassword('');
    }
  };

  const validateAnswers = () => {
    const allCorrect = quizQuestions.every((q) => {
      const userAnswer = (answers[q.id] || '').trim().toLowerCase();
      const correctAnswer = q.answer.toLowerCase();
      return userAnswer === correctAnswer;
    });

    if (allCorrect) {
      onLoginSuccess(selectedUser);
    } else {
      setError('One or more answers are incorrect. Try again!');
      setAnswers({});
      setShowHints({});
      setQuizQuestions(selectRandomQuestions());
    }
  };

  const handleQuizSubmit = (e) => {
    e.preventDefault();
    validateAnswers();
  };

  const toggleHint = (questionId) => {
    setShowHints(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-green-900 flex items-center justify-center p-4">
      <SnowEffect />

      <div className="relative z-10 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="text-red-300 w-12 h-12 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Our Advent Calendar
            </h1>
            <Gift className="text-green-300 w-12 h-12" />
          </div>
          <p className="text-red-100 text-lg">Welcome darling, please log in!</p>
        </div>

        {!selectedUser && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border-2 border-white/20">
            <div className="space-y-4">
              {Object.values(USERS).map((user) => (
                <button
                  key={user}
                  onClick={() => handleUserSelect(user)}
                  className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-3"
                >
                  <User className="w-6 h-6" />
                  {user}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedUser && showPasswordInput && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border-2 border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/60 text-lg"
                autoFocus
              />
              {error && <p className="text-red-300 text-sm font-semibold">{error}</p>}
              <div className="flex gap-3">
                <button type="button" onClick={() => setSelectedUser(null)} className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all">Back</button>
                <button type="submit" className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all">Login</button>
              </div>
            </form>
          </div>
        )}

        {selectedUser && showQuiz && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border-2 border-white/20">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Welcome, {selectedUser}! ❤️</h2>
            <p className="text-red-100 text-center mb-6">Answer these questions to unlock your calendar</p>
            <form onSubmit={handleQuizSubmit} className="space-y-6">
              {quizQuestions.map((q, index) => (
                <div key={q.id} className="space-y-2">
                  <label className="text-white font-semibold text-lg">{index + 1}. {q.question}</label>
                  <input
                    type="text"
                    value={answers[q.id] || ''}
                    onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border-2 border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-white/60"
                    placeholder="Your answer..."
                    required
                  />
                  
                  {/* FIX 2: Correctly commented out section using curly braces */}
                  {/* <button type="button" onClick={() => toggleHint(q.id)} className="text-sm text-yellow-300 hover:text-yellow-200 underline">
                    {showHints[q.id] ? 'Hide hint' : 'Show hint'}
                  </button>
                  {showHints[q.id] && <p className="text-sm text-yellow-200 italic">Hint: {q.hint}</p>}
                  */}
                  
                </div>
              ))}
              {error && (
                <div className="bg-red-500/20 border-2 border-red-400 rounded-lg p-4">
                  <p className="text-red-200 text-center font-semibold">{error}</p>
                </div>
              )}
              <div className="flex gap-3">
                <button type="button" onClick={() => setSelectedUser(null)} className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all">Back</button>
                <button type="submit" className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all">Submit</button>
              </div>
            </form>
          </div>
        )}

        <p className="text-center mt-6 text-red-100/70 text-sm">
          I love you baby <Heart className="inline w-4 h-4 text-red-400 fill-red-400" />
        </p>
      </div>
    </div>
  );
};

// ===== MEMORY MODAL COMPONENT =====
const MemoryModal = ({ memory, onClose }) => {
  if (!memory) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gradient-to-br from-red-50 to-green-50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-200 hover:scale-110 shadow-lg" aria-label="Close">
          <span className="text-2xl font-bold">×</span>
        </button>
        <div className="p-8 sm:p-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-red-600 to-green-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              Day {memory.day}
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-red-900">{memory.title}</h2>
          {memory.type === 'text' && (
            <div className="space-y-4">
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 sm:p-8 shadow-inner border-2 border-red-200">
                {memory.content}
              </div>
            </div>
          )}
{memory.type === 'image' && (
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-inner border-2 border-red-200">
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 text-center">{memory.content}</p>
              </div>
              
              {memory.image && (
                <div className="flex justify-center">
                  <div className="rounded-xl overflow-hidden shadow-xl border-4 border-white max-w-[80%] sm:max-w-[60%] max-h-[60vh]">
                    <img 
                      src={memory.image} 
                      alt={memory.title} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {memory.type === 'challenge' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 sm:p-8 shadow-2xl border-4 border-yellow-300 transform rotate-1">
                <div className="bg-white/20 backdrop-blur rounded-lg p-6 border-2 border-white/50">
                  <p className="text-lg sm:text-xl font-bold leading-relaxed text-white text-center drop-shadow-lg">{memory.content}</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 text-orange-700 font-semibold">
                <span className="text-2xl">🎯</span>
                <span>Are you up for the challenge?</span>
                <span className="text-2xl">🎯</span>
              </div>
            </div>
          )}
          <div className="flex justify-center gap-4 mt-8 opacity-50">
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <Heart className="w-6 h-6 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap" rel="stylesheet" />
    </div>
  );
};

// ===== ADVENT GRID COMPONENT =====
const AdventGrid = ({ openedDays, onDayClick }) => {
  const { isMobile, isIPhone16ProMax } = useDeviceType();
  const regularDays = MEMORIES.filter(m => m.day <= 24);
  const christmasDay = MEMORIES.find(m => m.day === 25);

  // Dynamic sizing based on device - optimized for 8 rows x 3 cols on iPhone, 4 rows x 6 cols on desktop
  const gridCols = isIPhone16ProMax ? 'grid-cols-3' : 'grid-cols-6'; // 8 rows x 3 cols on iPhone, 4 rows x 6 cols on desktop
  const gridGap = isIPhone16ProMax ? 'gap-1.5' : isMobile ? 'gap-2' : 'gap-4';
  const iconSize = isIPhone16ProMax ? 'w-3 h-3' : isMobile ? 'w-4 h-4' : 'w-4 h-4';
  const textSize = isIPhone16ProMax ? 'text-sm' : isMobile ? 'text-base' : 'text-2xl';
  const day25MaxW = isIPhone16ProMax ? 'max-w-[280px]' : isMobile ? 'max-w-xs' : 'max-w-lg';
  const day25Icon = isIPhone16ProMax ? 'w-4 h-4' : isMobile ? 'w-6 h-6' : 'w-6 h-6';
  const day25Text = isIPhone16ProMax ? 'text-xl' : isMobile ? 'text-3xl' : 'text-5xl';
  const day25Padding = isIPhone16ProMax ? 'py-2 px-3' : isMobile ? 'py-3 px-3' : 'py-8 px-6';
  const day25LabelSize = isIPhone16ProMax ? 'text-xs' : isMobile ? 'text-sm' : 'text-xl';

  return (
    <div className={`w-full mx-auto space-y-2 ${isIPhone16ProMax ? 'max-w-md' : 'max-w-xl'}`}>
      {/* Days 1-24 */}
      <div className={`grid ${gridCols} ${gridGap}`}>
        {regularDays.map((memory) => {
          const isUnlocked = isDayUnlocked(memory.day);
          const isOpened = openedDays.includes(memory.day);

          return (
            <button
              key={memory.day}
              onClick={() => isUnlocked && onDayClick(memory.day)}
              disabled={!isUnlocked}
              className={`
                aspect-square rounded-xl flex flex-col items-center justify-center
                transition-all duration-300 relative overflow-hidden
                ${!isUnlocked ? 'bg-red-950/50 border-2 border-red-700/30 opacity-50 cursor-not-allowed'
                  : isOpened ? 'bg-gradient-to-br from-yellow-500 to-amber-600 border-2 border-yellow-300/70 shadow-lg cursor-pointer hover:scale-105'
                  : 'bg-gradient-to-br from-green-600 to-green-700 border-2 border-green-400/50 cursor-pointer hover:scale-105 hover:shadow-xl'}
              `}
            >
              <div className="mb-1">
                {!isUnlocked ? (
                  <Lock className={iconSize + ' text-red-300/50'} />
                ) : isOpened ? (
                  <Check className={iconSize + ' text-white'} strokeWidth={3} />
                ) : (
                  <Gift className={iconSize + ' text-white'} />
                )}
              </div>
              <div className={`${textSize} font-bold ${!isUnlocked ? 'text-red-300/50' : 'text-white'}`}>
                {memory.day}
              </div>
              {isUnlocked && !isOpened && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              )}
            </button>
          );
        })}
      </div>

      {/* Day 25 */}
      {christmasDay && (
        <div className="flex justify-center">
          <button
            onClick={() => isDayUnlocked(25) && onDayClick(25)}
            disabled={!isDayUnlocked(25)}
            className={`
              w-full ${day25MaxW} rounded-2xl flex flex-col items-center justify-center
              transition-all duration-300 relative overflow-hidden ${day25Padding}
              ${!isDayUnlocked(25) ? 'bg-red-950/50 border-4 border-red-700/30 opacity-50 cursor-not-allowed'
                : openedDays.includes(25) ? 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 border-4 border-yellow-300 shadow-2xl cursor-pointer hover:scale-105'
                : 'bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600 border-4 border-yellow-400 cursor-pointer hover:scale-105 hover:shadow-2xl animate-pulse'}
            `}
          >
            {isDayUnlocked(25) && !openedDays.includes(25) && (
              <>
                <Star className="absolute top-2 left-2 w-4 h-4 text-white animate-pulse" />
                <Star className="absolute top-2 right-2 w-4 h-4 text-white animate-pulse" style={{ animationDelay: '0.5s' }} />
                <Star className="absolute bottom-2 left-4 w-3 h-3 text-white animate-pulse" style={{ animationDelay: '0.25s' }} />
                <Star className="absolute bottom-2 right-4 w-3 h-3 text-white animate-pulse" style={{ animationDelay: '0.75s' }} />
              </>
            )}
            <div className="mb-2">
              {!isDayUnlocked(25) ? (
                <Lock className={day25Icon + ' text-red-300/50'} />
              ) : openedDays.includes(25) ? (
                <Check className={day25Icon + ' text-white'} strokeWidth={3} />
              ) : (
                <Gift className={day25Icon + ' text-white animate-bounce'} />
              )}
            </div>
            <div className="text-center">
              <div className={`${day25Text} font-bold mb-1 ${!isDayUnlocked(25) ? 'text-red-300/50' : 'text-white'}`}>25</div>
              {isDayUnlocked(25) && (
                <div className={`text-white ${day25LabelSize} font-semibold`}>🎄 Christmas Day! 🎄</div>
              )}
            </div>
            {isDayUnlocked(25) && !openedDays.includes(25) && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            )}
          </button>
        </div>
      )}

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer { animation: shimmer 3s infinite; }
      `}</style>
    </div>
  );
};

// ===== MAIN APP COMPONENT =====
const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [openedDays, setOpenedDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const { isMobile, isIPhone16ProMax } = useDeviceType();

  const getStorageKey = () => {
    if (!currentUser) return null;
    if (currentUser === USERS.NEW) return null;
    return `openedDays_${currentUser}`;
  };

  useEffect(() => {
    if (currentUser) {
      const storageKey = getStorageKey();
      if (storageKey) {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          setOpenedDays(JSON.parse(saved));
        } else {
          setOpenedDays([]);
        }
      } else {
        setOpenedDays([]);
      }
    }
  }, [currentUser]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setOpenedDays([]);
    setSelectedDay(null);
  };

  const handleDayClick = (day) => {
    if (!openedDays.includes(day)) {
      const updated = [...openedDays, day];
      setOpenedDays(updated);
      const storageKey = getStorageKey();
      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
    }
    setSelectedDay(day);
  };

  const handleCloseModal = () => {
    setSelectedDay(null);
  };

  const selectedMemory = selectedDay ? MEMORIES.find(m => m.day === selectedDay) : null;

  if (!currentUser) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Dynamic padding based on device
  const containerPadding = isIPhone16ProMax 
    ? 'px-2 pt-16 pb-2' 
    : isMobile 
      ? 'px-3 pt-16 pb-3' 
      : 'px-8 py-8';

  const headerSize = isIPhone16ProMax ? 'text-xl' : isMobile ? 'text-2xl' : 'text-4xl';
  const headerIconSize = isIPhone16ProMax ? 'w-5 h-5' : isMobile ? 'w-6 h-6' : 'w-10 h-10';
  const headerSpacing = isIPhone16ProMax ? 'mb-1' : isMobile ? 'mb-2' : 'mb-6';

  // 1. MALTESE CONFIG
  const malteseConfig = isMobile ? {
    // Mobile
    sizes: ["120px", "100px"],
    bottom: ["5vh", "6vh"], 
    horizontal: ["30px", "40px"]
  } : {
    // Desktop
    sizes: ["250px", "200px"], 
    bottom: ["150px", "150px"],
    horizontal: ["50px", "70px"]
  };

  // 2. RETRIEVER CONFIG
  const retrieverConfig = isMobile ? {
    // Mobile
    sizes: ["140px", "140px"],
    bottom: ["5vh", "5vh"],
    horizontal: ["30px", "30px"]
  } : {
    // Desktop
    sizes: ["250px", "250px"],
    bottom: ["150px", "150px"],
    horizontal: ["50px", "70px"]
  };

  // 3. DECORATION CONFIG
  const decorConfig = isMobile ? {
    houseWidth: "110px", houseBottom: "74vh", houseLeft: "13%",
    snowManWidth: "130px", snowManBottom: "73vh", snowManRight: "13%"
  } : {
    houseWidth: "200px", houseBottom: "500px", houseLeft: "4.5%",
    snowManWidth: "250px", snowManBottom: "500px", snowManRight: "4.5%"
  };

  return (
    <div className="min-h-screen max-h-screen bg-gradient-to-br from-red-900 via-red-800 to-green-900 relative overflow-hidden">
      <style>{`
        html, body {
          overscroll-behavior: none;
          position: fixed;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
        #root {
          position: fixed;
          overflow-y: auto;
          overflow-x: hidden;
          width: 100%;
          height: 100%;
          -webkit-overflow-scrolling: touch;
        }
        button, a {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
        }
        input, select, textarea {
          font-size: 16px !important;
        }
      `}</style>
      
      <SnowEffect />
      
      <ChristmasLights />

      <StaticDecoration 
        src={gingerbreadHouseImg}
        width={decorConfig.houseWidth}
        bottom={decorConfig.houseBottom}
        left={decorConfig.houseLeft}
      />
      
      <StaticDecoration 
        src={snowmanImg}
        width={decorConfig.snowManWidth}
        bottom={decorConfig.snowManBottom}
        right={decorConfig.snowManRight}
      />

      <AnimatedMascot 
        side="left" 
        frames={MASCOTS.MALTESE.frames}
        sizes={malteseConfig.sizes} 
        bottomOffset={malteseConfig.bottom}
        horizontalOffset={malteseConfig.horizontal}
      />
      <AnimatedMascot 
        side="right" 
        frames={MASCOTS.RETRIEVER.frames} 
        sizes={retrieverConfig.sizes}
        bottomOffset={retrieverConfig.bottom}
        horizontalOffset={retrieverConfig.horizontal}
      />

      <div className={`relative z-10 h-screen flex flex-col ${containerPadding}`}>
        {/* User Header */}
        <div className={`w-full mx-auto mb-1.5 ${isIPhone16ProMax ? 'max-w-md' : 'max-w-3xl'}`}>
          <div className="flex justify-between items-center bg-white/10 backdrop-blur-lg rounded-xl px-3 py-1.5 border border-white/20">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-white" />
              <span className="text-white font-semibold text-xs">
                {currentUser === USERS.NEW ? 'Guest Preview' : currentUser}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-200 text-xs font-semibold"
            >
              <LogOut className="w-3 h-3" />
              Logout
            </button>
          </div>
        </div>
        
        {/* Header */}
        <header className={`text-center ${headerSpacing}`}>
          <div className="flex items-center justify-center gap-2 mb-1">
            <Heart className={`${headerIconSize} text-red-300 animate-pulse`} />
            <h1 className={`${headerSize} font-bold text-white tracking-wide`}>
              Our Advent Calendar
            </h1>
            <Gift className={`${headerIconSize} text-green-300`} />
          </div>
          
          {DEBUG_DATE !== null && (
            <div className="mt-1 inline-block bg-yellow-500/20 border border-yellow-400/50 rounded-lg px-2.5 py-0.5">
              <p className="text-yellow-200 text-[10px] font-semibold">
                🧪 DEBUG: Dec {DEBUG_DATE}
              </p>
            </div>
          )}
          
          {currentUser === USERS.NEW && (
            <div className="mt-1 inline-block bg-blue-500/20 border border-blue-400/50 rounded-lg px-2.5 py-0.5">
              <p className="text-blue-200 text-[10px] font-semibold">
                👁️ PREVIEW MODE
              </p>
            </div>
          )}
        </header>

        {/* Advent Grid - Centered and taking up remaining space */}
        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <AdventGrid openedDays={openedDays} onDayClick={handleDayClick} />
        </div>

        {/* Footer */}
        <footer className="text-center mt-1.5 text-red-100/70 text-[10px]">
          I love you baby <Heart className="inline w-3 h-3 text-red-400 fill-red-400" />
        </footer>
      </div>

      {selectedMemory && (
        <MemoryModal memory={selectedMemory} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;