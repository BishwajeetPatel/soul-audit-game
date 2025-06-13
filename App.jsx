import React, { useState, useEffect } from 'react';
import { Share2, Download, RefreshCw } from 'lucide-react';

const questions = [
  {
    question: "What would you trade your soul for?",
    options: [
      "Unlimited Wi-fi",
      "5 more minutes of sleep", 
      "A decent conversation",
      "I already sold it last week"
    ]
  },
  {
    question: "What's your toxic trait?",
    options: [
      "Laughing in serious situations",
      "Ghosting group chats",
      "Saying 'LOL' but not laughing",
      "Offering life advice at 2 AM"
    ]
  },
  {
    question: "If your brain had a background noise, what would it be?",
    options: [
      "Elevator music",
      "Screaming goats",
      "Conspiracy podcasts",
      "'Oops I did it again' on loop"
    ]
  },
  {
    question: "What's inside your head right now?",
    options: [
      "2 shrimps sword fighting",
      "An empty theater",
      "Ringtone from 2007",
      "IKEA manuals (without pictures)"
    ]
  },
  {
    question: "What does your inner voice sound like?",
    options: [
      "A sarcastic auntie",
      "A cricket commentator",
      "A kid who just learned the word 'capitalism'",
      "An unpaid intern narrating a TED Talk"
    ]
  },
  {
    question: "What would your autobiography be titled?",
    options: [
      "Oops. Anyway.",
      "Chronicles of a Sleep-Deprived Goblin",
      "Spiritually Unavailable",
      "404: Soul Not Found"
    ]
  },
  {
    question: "What's your default reaction to emotional intimacy?",
    options: [
      "Change the subject to aliens",
      "Nervous joke, then vanish",
      "Pretend to tie your shoelace",
      "Initiate a meme exchange"
    ]
  },
  {
    question: "What's the last thing your brain Googled in a crisis?",
    options: [
      "Can ghosts sue you?",
      "Bananas for emotional support",
      "How to fake confidence in 2 steps",
      "How loud is too loud when screaming internally?"
    ]
  },
  {
    question: "Your inner child just filed a complaint. What for?",
    options: [
      "Too many Excel sheets",
      "Not enough naps",
      "Zero magic, 100% cringe",
      "Still waiting on that pet dinosaur"
    ]
  },
  {
    question: "What's your soul's biggest flex?",
    options: [
      "Survived 37 identity crises",
      "Still knows all the lyrics to 'Barbie Girl'",
      "Went to therapy once (mentally)",
      "Has 12 followers and no regrets"
    ]
  },
  {
    question: "How do you emotionally respond to a low battery warning?",
    options: [
      "Close all apps like it's a ritual",
      "Whisper apologies to your phone",
      "Panic, then forget about it",
      "Immediately question life decisions"
    ]
  },
  {
    question: "What lives rent-free in your head?",
    options: [
      "A duck in sunglasses",
      "That one embarrassing voice note",
      "The smell of school glue",
      "Your friend's dog's LinkedIn"
    ]
  },
  {
    question: "How do you usually exit a social situation?",
    options: [
      "Faint dramatically",
      "Say 'brb' and disappear forever",
      "Start narrating your escape like a documentary",
      "Pretend to take a phone call from your plant"
    ]
  }
];

const SoulAuditQuiz = () => {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [certificate, setCertificate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (currentScreen === 'quiz') {
      // Select 5 random questions
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      setSelectedQuestions(shuffled.slice(0, 5));
    }
  }, [currentScreen]);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, {
      question: selectedQuestions[currentQuestionIndex].question,
      answer: answer
    }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      generateCertificate(newAnswers);
    }
  };

  const generateCertificate = async (userAnswers) => {
    setCurrentScreen('loading');
    setIsGenerating(true);

    try {
      // This would call your backend API
      const response = await fetch('/api/generate-certificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: userAnswers }),
      });

      if (response.ok) {
        const data = await response.json();
        setCertificate(data.certificate);
      } else {
        // Fallback certificate for demo
        setCertificate(generateFallbackCertificate(userAnswers));
      }
    } catch (error) {
      // Fallback certificate for demo
      setCertificate(generateFallbackCertificate(userAnswers));
    }

    setIsGenerating(false);
    setCurrentScreen('certificate');
  };

  const generateFallbackCertificate = (userAnswers) => {
    const funnyValues = [
      "Worth exactly 3 Wi-Fi passwords and a half-eaten banana 🍌",
      "Current market value: one really good sneeze 🤧",
      "Appraised at 2.5 rubber bands and yesterday's leftover anxiety 😅",
      "Valued at one slightly used motivational quote from 2019 ✨",
      "Worth approximately 47 unread notifications and a parking ticket 🎫",
      "Current soul price: three deep sighs and a forgotten password 🔐"
    ];
    const randomValue = funnyValues[Math.floor(Math.random() * funnyValues.length)];
    
    return randomValue;
  };

  const resetQuiz = () => {
    setCurrentScreen('landing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCertificate('');
    setSelectedQuestions([]);
  };

  const shareResult = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Soul Audit Results',
          text: 'I just got my soul audited! Check out what it\'s worth in today\'s cursed economy 😂',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`I just got my soul audited! Check it out: ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  if (currentScreen === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                Wanna know what your soul's worth in today's 
                <span className="text-yellow-400"> cursed economy</span>?
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Get ready for an existential crisis disguised as entertainment 🎭
              </p>
            </div>
            
            <button
              onClick={() => setCurrentScreen('quiz')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-xl px-12 py-4 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Begin my soul audit
            </button>
            
            <div className="mt-8 text-sm text-gray-400">
              <p>⚠️ Side effects may include: questioning life choices, uncontrollable laughter, and temporary enlightenment</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'quiz' && selectedQuestions.length > 0) {
    const currentQ = selectedQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/10">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-300 mb-2">
                <span>Question {currentQuestionIndex + 1} of {selectedQuestions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              {currentQ.question}
            </h2>

            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white p-4 rounded-xl text-left transition-all duration-300 hover:scale-105 hover:shadow-lg border border-white/10"
                >
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-white/10">
            <div className="animate-spin text-6xl mb-6">🍌</div>
            <h2 className="text-3xl font-bold text-white mb-4">Soul evaluation in progress...</h2>
            <p className="text-xl text-gray-300 mb-6">Benny (The Banana Overlord) is reviewing your existential choices</p>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'certificate') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Soul evaluation complete</h1>
            <p className="text-xl text-gray-300">Your official certificate of existential chaos</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-8 shadow-2xl border-4 border-yellow-400 mb-8">
            <div className="bg-white rounded-2xl p-8 shadow-inner">
              <pre className="text-black whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {certificate}
              </pre>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-lg text-gray-300 mb-2">Evaluated by <span className="text-yellow-400 font-bold">Benny (The Banana Overlord)</span></p>
            <p className="text-sm text-gray-400">Approved by the department of soul affairs - <span className="text-yellow-400">Banana Threads</span></p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={shareResult}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <Share2 size={20} />
              Share Results
            </button>
            
            <button
              onClick={resetQuiz}
              className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105"
            >
              <RefreshCw size={20} />
              Audit Another Soul
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default SoulAuditQuiz;
