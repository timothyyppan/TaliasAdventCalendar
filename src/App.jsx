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
import day6Img from './img/day6.png'
import day7Img from './img/day7.png'
import day8Img from './img/day8.png'
import day9Img from './img/day9.png'
import day11Img from './img/day11.png'
import day12Img from './img/day12.png'
import day13Video from './img/day13.mp4'
import day14Img from './img/day14.png'
import day15Img from './img/day15.png'
import day16Img from './img/day16.png'
import day17Video from './img/day17.mp4'
import day18Img from './img/day18picture.png'
import day18Video from './img/day18video.mp4'
import day19Img from './img/day19.png'

// ===== DEBUG SETTING =====
// Set to a number (1-25) to simulate that date in December, or null for real date
const DEBUG_DATE = null; /// Set to null for production

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
  {
    day: 6,
    type: 'image',
    title: 'Even the Small Moments',
    content: 'Every so often when I go through my photos, I enjoy taking the time to look at and reminisce about the time we got to spend together in person. At the time, I feel like we took it for granted. I love reminiscing about just having you in my arms and having the privilege of just looking at how beuatiful you are. In the moment I took this photo, I remembered that we would be going long disance in 2 months and we were just on our phones. Knowing that, I specifically took this picture so I can look back at it when I still had you in my arms.',
    image: day6Img,
  },
  {
    day: 7,
    type: 'image',
    title: 'Matching Stitch!',
    content: 'Darling, look at me and you matching with stitch hats. We are so cute when we match. This is us at Disneyland and you were going crazy for Stitch. Honestly when I brought you in to watch Lilo and Stitch, I knew you would like it, but I didn\'t know you would love Stitch this much. Either way, I love that you did as I was so happy to watch you be happy wearing so much Stitch merchandise around Disneyland that everyone, even children, stopped to look at you. I love you darling ❤️',
    image: day7Img,
  },
  {
    day: 8,
    type: 'image',
    title: 'Hiking...',
    content: 'Okay honey, before you saying anything about the photos, I know they aren\'t the most flattering pictures of us, but to me they mean a lot. As its obvious in the pictures, you weren\'t having a good time hiking, but because I wanted to go you still did it with me. I really appreciate it from the bottom of my heart because not only did I really enjoy it, it was really memorable for me (and I guess you for other more traumatic reasons...) I love you so much honey ❤️, and no matter what we do together, I will always cherish the time we spend together. (btw I owe you one for making you hike lol)',
    image: day8Img,
  },
  {
    day: 9,
    type: 'image',
    title: 'When I Finally Understood How Much You Love Me',
    content: 'I\'m sorry for the bad photo for the second day in a row, but I took this picture because in this moment you melted my heart. When we went to go eat food at the 24hr spa, I said I really liked crawfish. But being the spoiled brat I am, I said that I wouldn\'t eat any because I didn\'t want to get my hands dirty. I was really fine with eating other things but I vividly remember you instantly going to grab an entire plate of them, even though you don\'t know how to peel them. I watched you look up tutorials and struggle (as you can see on your face), and you were so happy to watch me eat them. That\'s when I realized how much you love me and how much you\'re willing to do for me. I love you my future wife ❤️',
    image: day9Img,
  },
  {
    day: 10,
    type: 'text',
    title: 'Appreaciating You',
    content: 'I thought for today I would slightly switch up the format. Instead of talking about a memory of us, I thought it would be nice to reflect on how much I appreciate you and really express that to you. I appreciate how commited, loyal, understanding, and loving you are. There\'s been so many times where I have been stinky, stupid, unreasonable, and selfish. In those times, you have always been there for me, stuck by my side, and given me more chances than I deserve. I don\'t give you enough credit for that and I wanted to just express my gratitude for that. Furthermore, I appreciate your beauty and personality. I believe its almost impossible to find someone that is as pretty as you, but also as charming and funny as you are. You really are special (not in that way) and I want you to know that I love you, and thank you for picking me 🥺',
  },
  {
    day: 11,
    type: 'image',
    title: 'Chicky!!',
    content: 'Baby look 🥹🥹🥹, its Chicky. I came across this photo of when we first bought Chicky and I just instantly remembered how happy you were. Specifically, when we were in the hotel elevator in front of two other people and you were so happy that you started making it walk on your hand in front of them. You were so cute 🥹, and it was even funnier when we left the elevator, the other people couldn\'t even wait until the door closed before they burst out laughing. It was really funnny at the time but now that I think on it, I find it so endearing that you loved our Chicky so much that you didn\'t care about what other people thought about us (in a good way). I love you and our Chicky ❤️❤️❤️',
    image: day11Img,
  },
  {
    day: 12,
    type: 'image',
    title: 'Our Last Night Together',
    content: 'Darling, the bad photos are unfortunately back... But I wanted to share this memory with you. This photo was taken on our last night together before we had to go long distance again. I remember feeling so sad that you had to go next day, but at the same time I felt so grateful that I got to spend that time with you. You were in my arms so nicely and cuddly and in my hoodie 🙂‍↔️. But the next day you woke up so funny that I had to take a picture for you darling. You look amazing ❤️. I love you so much baby, and I can\'t wait until we can be together again ❤️❤️❤️',
    image: day12Img,
  },
  {
    day: 13,
    type: 'video',
    title: 'My Special Snowflake...',
    content: 'Take a minute to watch this video baby! I forgot that I even had this video but it was from all the way back in May. Its so funny because I managed to catch you being funny and quirky on camera. But whats more to me is that listening to the way you talked back then and listening to the way you talked now is so different. Your English is actually so much better now than it was before. I don\'t think I noticed just because it slowly got better over time, but I\'m so proud of you and also thankful for you learning to speak English. My beatiful special snowflake darling 🙂‍↔️🥹❤️',
    video: day13Video,
  },
  {
    day: 14,
    type: 'image',
    title: 'The Birth of our Son Theo!',
    content: 'Baby, did you know that our son Theo has the same birthday as you? Look at how cute and how small and what a young man Theo is here. He is so happy to get to meet his mama on her birthday and to be in a loving family. In all seriousness I found it so cute how the other day you mentioned that you can\'t even sleep without Theo and you start tweaking if you can\'t find him. I\'m glad that you\'re able to find comfort with our son when I can\'t be there with you in person. However, I do miss my little boy so much and can\'t wait to see both of you again. I love you both so much ❤️❤️❤️',
    image: day14Img,
  },
  {
    day: 15,
    type: 'image',
    title: 'Our Promise',
    content: 'My future wife, I wanted to share this photo with you because its so special to me. This photo was taken on the day that we made rings to signify our promise to be together forever and marry. I remember feeling so happy when you first said that you want to be my wife and when we first started calling eachother our future husband/wife. I know that we have a long way to go before we can actually be married, but just knowing that we have that promise makes me so happy. I love you so much baby, and I can\'t wait to spend the rest of my life with you ❤️❤️❤️',
    image: day15Img,
  },
  {
    day: 16,
    type: 'image',
    title: 'Feet...',
    content: 'I know this isn\'t what you were expecting to see today, but its your feet! You have such pretty beautiful feet darling 🙂‍↔️. When you first showed me your feet like this, and especially with your toe socks, I was a bit shocked. But honestly it was hilarious and I still laugh about it today whenever I think about you doing it. This is one of the reasons why I love you so much baby, you have the best sense of humour, and thats what makes you special to me 😉. I love you my beautiful girl ❤️❤️❤️',
    image: day16Img
  },
  {
    day: 17,
    type: 'video',
    title: 'A Fun Little Video',
    content: 'If I\'m being honest, I have no idea what was happening in this video lol. I was going through my gallery and I found this and it just instantly brought me back to Shanghai. We had just gone to the FamilyMart at the end of my street, and you bought a bunch of these Kinder eggs. We were just being silly on my bed and you just started tweaking out for some reason. I just knew I had to take a video of you and show it to you one day, just because I think it really shows a side of you that you normally don\'t share with other people except for me🙂‍↔️🥺! I love you so much baby ❤️❤️❤️', 
    video: day17Video,
  },
  {
    day: 18,
    type: 'mixed',
    title: 'How to Train Your Dragon',
    content: 'Baby 🥺 I really loved it when we watched How to Train Your Dragon together! I especially loved how you enjoyed it so much so we watched all three movies when we went home. How to Train Your Dragon is one of my favourite childhood movies so it really made me happy that you loved it! An unexpected side effect was when we bought matching plushies that ended up roaring. I took a beautiful picture of him, and also found a video of him roaring inside my bag. To this day, whenever I touch my desk a little bit, he still roars and makes noise lol. I miss you and I love you my future wife ❤️❤️❤️',
    image: day18Img,
    video: day18Video,
  },
  ...Array.from({ length: 18 }, (_, i) => {
    const day = i + 19;
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
    const normalize = (text) => text ? text.toLowerCase().trim().replace(/\s+/g, ' ') : '';

    const allCorrect = quizQuestions.every((q) => {
      const userAnswer = normalize(answers[q.id]);
      const correctAnswer = normalize(q.answer);
      
      return userAnswer === correctAnswer;
    });

    if (allCorrect) {
      onLoginSuccess(selectedUser);
    } else {
      setError('One or more answers are incorrect. Try again!');
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

};// ===== MEMORY MODAL COMPONENT =====
const MemoryModal = ({ memory, onClose }) => {
  if (!memory) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gradient-to-br from-red-50 to-green-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
          
          {/* TEXT TYPE */}
          {memory.type === 'text' && (
            <div className="bg-white/80 backdrop-blur rounded-xl p-6 sm:p-8 shadow-inner border-2 border-red-200">
              {memory.content}
            </div>
          )}

          {/* IMAGE TYPE */}
          {memory.type === 'image' && (
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-inner border-2 border-red-200">
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 text-center">{memory.content}</p>
              </div>
              {memory.image && (
                <div className="flex justify-center">
                  <div className="rounded-xl overflow-hidden shadow-xl border-4 border-white max-w-[80%] sm:max-w-[60%] max-h-[60vh]">
                    <img src={memory.image} alt={memory.title} className="w-full h-full object-contain" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VIDEO TYPE */}
          {memory.type === 'video' && (
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-inner border-2 border-red-200">
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 text-center">{memory.content}</p>
              </div>
              {memory.video && (
                <div className="flex justify-center">
                  <div className="rounded-xl overflow-hidden shadow-xl border-4 border-white w-full">
                    <video controls className="w-full h-auto max-h-[60vh]" preload="metadata">
                      <source src={memory.video} type="video/mp4" />
                    </video>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ✨ NEW MIXED TYPE (SIDE BY SIDE) ✨ */}
          {memory.type === 'mixed' && (
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-inner border-2 border-red-200">
                <p className="text-base sm:text-lg leading-relaxed text-gray-700 text-center">{memory.content}</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
                {/* Left Side: Image */}
                {memory.image && (
                  <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-xl border-4 border-white">
                    <img src={memory.image} alt="Memory" className="w-full h-auto object-cover" />
                  </div>
                )}
                
                {/* Right Side: Video */}
                {memory.video && (
                  <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-xl border-4 border-white">
                    <video controls className="w-full h-auto" preload="metadata">
                      <source src={memory.video} type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CHALLENGE TYPE */}
          {memory.type === 'challenge' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl p-6 sm:p-8 shadow-2xl border-4 border-yellow-300 transform rotate-1">
                <div className="bg-white/20 backdrop-blur rounded-lg p-6 border-2 border-white/50">
                  <p className="text-lg sm:text-xl font-bold leading-relaxed text-white text-center drop-shadow-lg">{memory.content}</p>
                </div>
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

  // ===== UPDATED TIGHTER SIZING =====
  // 1. Columns: Using 5 columns on mobile makes the squares much smaller than 3 or 4
  const gridCols = isMobile ? 'grid-cols-4' : 'grid-cols-6'; 
  
  // 2. Gap: Reduced to gap-1 (4px) or gap-0.5 (2px) for a very tight grid
  const gridGap = isMobile ? 'gap-1' : 'gap-4';
  
  // 3. Icons: Smallest readable size
  const iconSize = isMobile ? 'w-3 h-3' : 'w-4 h-4';
  
  // 4. Text: Hardcoded to 10px on mobile
  const textSize = isMobile ? 'text-[10px]' : 'text-2xl';
  
  // 5. Margin: Space between Icon and Number (Removed on mobile)
  const iconMargin = isMobile ? 'mb-0' : 'mb-1';

  // 6. Day 25 Sizing: Drastically reduced padding
  const day25MaxW = isMobile ? 'max-w-[200px]' : 'max-w-lg';
  const day25Icon = isMobile ? 'w-4 h-4' : 'w-6 h-6';
  const day25Text = isMobile ? 'text-base' : 'text-5xl';
  const day25Padding = isMobile ? 'py-1 px-4' : 'py-8 px-6'; // Very small padding
  const day25LabelSize = isMobile ? 'text-[10px]' : 'text-xl';

  return (
    <div className={`w-full mx-auto space-y-2 ${isMobile ? 'max-w-xs' : 'max-w-xl'}`}>
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
                aspect-square rounded-lg flex flex-col items-center justify-center
                transition-all duration-300 relative overflow-hidden
                ${!isUnlocked ? 'bg-red-950/50 border border-red-700/30 opacity-50 cursor-not-allowed'
                  : isOpened ? 'bg-gradient-to-br from-yellow-500 to-amber-600 border border-yellow-300/70 shadow-sm cursor-pointer'
                  : 'bg-gradient-to-br from-green-600 to-green-700 border border-green-400/50 cursor-pointer shadow-sm'}
              `}
            >
              {/* Applied the smaller margin here */}
              <div className={iconMargin}>
                {!isUnlocked ? (
                  <Lock className={iconSize + ' text-red-300/50'} />
                ) : isOpened ? (
                  <Check className={iconSize + ' text-white'} strokeWidth={3} />
                ) : (
                  <Gift className={iconSize + ' text-white'} />
                )}
              </div>
              <div className={`${textSize} font-bold leading-none ${!isUnlocked ? 'text-red-300/50' : 'text-white'}`}>
                {memory.day}
              </div>
              {isUnlocked && !isOpened && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              )}
            </button>
          );
        })}
      </div>

      {/* Day 25 - Compact Version */}
      {christmasDay && (
        <div className="flex justify-center">
          <button
            onClick={() => isDayUnlocked(25) && onDayClick(25)}
            disabled={!isDayUnlocked(25)}
            className={`
              w-full ${day25MaxW} rounded-xl flex flex-col items-center justify-center
              transition-all duration-300 relative overflow-hidden ${day25Padding}
              ${!isDayUnlocked(25) ? 'bg-red-950/50 border-2 border-red-700/30 opacity-50 cursor-not-allowed'
                : openedDays.includes(25) ? 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 border-2 border-yellow-300 shadow-lg cursor-pointer'
                : 'bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600 border-2 border-yellow-400 cursor-pointer animate-pulse'}
            `}
          >
            <div className={iconMargin}>
              {!isDayUnlocked(25) ? (
                <Lock className={day25Icon + ' text-red-300/50'} />
              ) : openedDays.includes(25) ? (
                <Check className={day25Icon + ' text-white'} strokeWidth={3} />
              ) : (
                <Gift className={day25Icon + ' text-white animate-bounce'} />
              )}
            </div>
            <div className="text-center">
              <div className={`${day25Text} font-bold leading-tight ${!isDayUnlocked(25) ? 'text-red-300/50' : 'text-white'}`}>25</div>
              {isDayUnlocked(25) && (
                <div className={`text-white ${day25LabelSize} font-semibold leading-none mt-0.5`}>Christmas!</div>
              )}
            </div>
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
    horizontal: ["20px", "30px"]
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
    horizontal: ["20px", "20px"]
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