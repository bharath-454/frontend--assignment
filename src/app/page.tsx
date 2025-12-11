"use client";
import { useState } from "react";

export default function Home() {
  // Questions from your Figma UI
  const questions = [
    {
      question: "1. What sound does a cat make?",
      options: ["Bhau-Bhau", "Meow-Meow", "Oink-Oink"],
      answer: 1,
    },
    {
      question: "2. What would you probably find in your fridge?",
      options: ["Shoes", "Ice Cream", "Books"],
      answer: 1,
    },
    {
      question: "3. What color are bananas?",
      options: ["Blue", "Yellow", "Red"],
      answer: 1,
    },
    {
      question: "4. How many stars are in the sky?",
      options: ["Two", "Infinite", "One Hundred"],
      answer: 1,
    },
  ];

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    if (selected === questions[step].answer) {
      setScore(score + 1);
    }
    setSelected(null);
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) {
      setSelected(null);
      setStep(step - 1);
    }
  };

  const restartQuiz = () => {
    setStep(0);
    setScore(0);
    setSelected(null);
  };

  // ---------------------------
  // FINAL SCORE SCREEN
  // ---------------------------
  if (step === questions.length) {
    const percent = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#b8e1ff] to-[#85c6ff] text-[#084c72]">

        <p className="text-sm bg-white shadow px-4 py-1 rounded-full mb-4">
          Keep Learning!
        </p>

        <h2 className="text-4xl font-serif font-bold mb-2">
          Your Final score is
        </h2>

        <p className="text-7xl font-extrabold">{percent}%</p>

        <button
          onClick={restartQuiz}
          className="mt-8 px-6 py-3 rounded-lg bg-[#d7efff] text-[#084c72] shadow hover:bg-[#c8e8ff] transition"
        >
          Start Again
        </button>
      </div>
    );
  }

  // ---------------------------
  // QUESTION SCREEN
  // ---------------------------
  return (
    <div className="min-h-screen w-full flex items-center justify-center 
    bg-gradient-to-br from-[#9bd3ff] via-[#bde6ff] to-[#63a4ff] 
    p-10">

      {/* MAIN CARD */}
      <div className="relative bg-white/90 shadow-2xl rounded-[45px] 
      max-w-5xl w-full p-20 border border-white 
      backdrop-blur-xl">

        {/* BEST OF LUCK + PAW (FIXED, LOOKS EXACTLY LIKE FIGMA) */}
        <div className="absolute left-[-5px] bottom-[45px] flex flex-col items-center">
          <img
            src="/best-of-luck.png"
            className="w-36 translate-x-8 drop-shadow-xl"
          />
          <img
            src="/paw.png"
            className="w-24 mt-[-8px] drop-shadow-md"
          />
        </div>

        {/* TITLE */}
        <h1 className="text-center text-6xl font-serif font-bold text-[#0A3D62] tracking-wide">
          Test Your Knowledge
        </h1>

        {/* SUBTITLE */}
        <p className="text-center text-sm text-gray-700 mt-4 bg-white px-5 py-1.5 rounded-full inline-block mx-auto shadow-sm">
          Answer all questions to see your results
        </p>

        {/* PROGRESS BAR */}
        <div className="flex justify-center gap-10 mt-12">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`h-[4px] rounded-full transition-all ${
                idx <= step ? "w-28 bg-[#0A3D62]" : "w-24 bg-gray-300"
              }`}
            ></div>
          ))}
        </div>

        {/* QUESTION BOX */}
        <div className="mt-12 bg-[#E4F4FF] p-6 text-center rounded-xl text-xl font-semibold text-[#0A3D62] shadow">
          {questions[step].question}
        </div>

        {/* OPTIONS */}
        <div className="mt-8 space-y-5 px-6">
          {questions[step].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full p-5 rounded-xl border text-center transition text-[#0A3D62] font-medium
                ${
                  selected === i
                    ? "bg-[#BBE2FF] border-[#63A4FF] shadow"
                    : "bg-[#F7FCFF] border-gray-200 hover:bg-[#EAF7FF]"
                }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* NAV BUTTONS */}
        <div className="flex justify-end gap-4 mt-12 mr-4">

          {/* BACK */}
          <button
            onClick={handleBack}
            className="p-4 rounded-xl bg-white border shadow hover:bg-gray-100 text-[#0A3D62] transition"
          >
            ←
          </button>

          {/* NEXT / SUBMIT */}
          <button
            onClick={handleNext}
            className="p-4 rounded-xl bg-[#DBF1FF] border shadow hover:bg-[#C8E9FF] text-[#0A3D62] transition"
          >
            {step === questions.length - 1 ? "Submit" : "→"}
          </button>

        </div>
      </div>
    </div>
  );
}
