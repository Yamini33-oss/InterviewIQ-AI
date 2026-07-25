import { supabase } from "../lib/supabase";
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Bot, Clock, Send, SkipForward, X, Brain, Sparkles,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import GlassCard from '../components/GlassCard';
import { questionBank, type InterviewType, type Difficulty } from '../data/mockData';

interface SetupState {
  type: InterviewType;
  difficulty: Difficulty;
  numQuestions: number;
}

export default function InterviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state as SetupState) || {
    type: 'React' as InterviewType,
    difficulty: 'Intermediate' as Difficulty,
    numQuestions: 5,
  };

  const questions = questionBank[state.type].slice(0, state.numQuestions);
  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState('');
  const [thinking, setThinking] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [completed, setCompleted] = useState(0);
const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

const evaluateAnswer = async (question: string, answer: string) => {
  const response = await fetch("https://zippy-freedom-production.up.railway.app/api/evaluate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      answer,
    }),
  });

  if (!response.ok) {
    throw new Error("Evaluation failed");
  }

  return await response.json();
};
  const handleSubmit = async () => {
  if (!answer.trim()) return;

  setThinking(true);

  const currentAnswer = answer;
  setAnswer("");

  try {
    const aiResult = await evaluateAnswer(
      questions[current],
      currentAnswer
    );
    setResults(prev => [...prev, aiResult]);

    console.log("Groq Result:", aiResult);
    const allResults = [...results, aiResult];

const totalScore = allResults.reduce(
  (sum, r) => sum + r.score,
  0
);

const averageScore = Math.round(
  totalScore / allResults.length
);

    if (current < questions.length - 1) {
      setThinking(false);
      setCompleted((c) => c + 1);
      setCurrent((c) => c + 1);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("interviews")
        .insert({
          user_id: user.id,
          interview_type: state.type,
          difficulty: state.difficulty,
          duration: formatTime(elapsed),
          questions: questions.length,
          feedback: aiResult.feedback,
          strengths: aiResult.strengths,
          weaknesses: aiResult.weaknesses,
        });

      console.log("Interview Insert:", data);
      console.log("Interview Error:", error);
    }

    navigate("/result", {
  state: {
    score: averageScore,
    feedback: allResults.map(r => r.feedback),
    strengths: allResults.flatMap(r => r.strengths),
    weaknesses: allResults.flatMap(r => r.weaknesses),
    results: allResults
  }
});

  } catch (err) {
  console.error("FULL ERROR:", err);
  alert("ERROR: " + JSON.stringify(err));
  setThinking(false);
}
};


  const handleSkip = () => {
  if (current < questions.length - 1) {
    setCurrent((c) => c + 1);
    setAnswer("");
  } else {
    navigate("/result");
  }
};

  const handleEnd = () => navigate('/result');

  const progress = ((current) / questions.length) * 100;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6">
        {/* Header bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <span className="section-label">{state.type} · {state.difficulty}</span>
            <h1 className="mt-1 font-display text-2xl font-bold text-white">AI Interview Session</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass flex items-center gap-2 rounded-xl px-4 py-2.5">
              <Clock className="h-4 w-4 text-cyanx-400" />
              <span className="font-mono text-sm font-medium text-white">{formatTime(elapsed)}</span>
            </div>
            <button
              onClick={handleEnd}
              className="flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-medium text-rose-300 transition-all hover:bg-rose-500/20"
            >
              <X className="h-4 w-4" />
              End Interview
            </button>
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div
            className="h-full rounded-full bg-brand-gradient"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left: AI Interviewer */}
          <div className="lg:col-span-2">
            <GlassCard className="sticky top-28 p-6">
              {/* Avatar */}
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className={`absolute inset-0 rounded-full blur-2xl ${thinking ? 'bg-cyanx-500/40 animate-pulse' : 'bg-brand-500/30'}`} />
                  <motion.div
                    animate={thinking ? { scale: [1, 1.05, 1] } : { y: [0, -6, 0] }}
                    transition={thinking ? { duration: 0.8, repeat: Infinity } : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative grid h-24 w-24 place-items-center rounded-3xl bg-brand-gradient shadow-glow"
                  >
                    <Bot className="h-12 w-12 text-white" />
                  </motion.div>
                  {/* Status indicator */}
                  <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-medium ${
                    thinking ? 'bg-cyanx-500 text-white' : 'bg-emerald-500 text-white'
                  }`}>
                    {thinking ? 'Thinking...' : 'Online'}
                  </div>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">AI Interviewer</h3>
                <p className="text-sm text-slate-400">{state.type} Specialist</p>
              </div>

              {/* Question info */}
              <div className="mt-6 border-t border-white/5 pt-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Question</span>
                  <span className="font-semibold text-white">
                    {current + 1} <span className="text-slate-500">/ {questions.length}</span>
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded-full transition-all ${
                        i < current ? 'bg-emerald-500' :
                        i === current ? 'bg-brand-500' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thinking animation */}
              <AnimatePresence>
                {thinking && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-5 overflow-hidden"
                  >
                    <div className="flex items-center gap-3 rounded-xl border border-cyanx-500/20 bg-cyanx-500/5 p-4">
                      <Sparkles className="h-5 w-5 animate-pulse text-cyanx-400" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-cyanx-300">AI is analyzing your answer...</p>
                        <div className="mt-2 flex gap-1">
                          {[0, 1, 2].map((d) => (
                            <motion.div
                              key={d}
                              className="h-1.5 w-1.5 rounded-full bg-cyanx-400"
                              animate={{ opacity: [0.3, 1, 0.3] }}
                              transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tips */}
              <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <Brain className="h-4 w-4 text-violetx-400" />
                  Interview Tip
                </div>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Structure your answer clearly: state your approach, explain trade-offs, and provide a concrete example.
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Right: Question + Answer */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-center gap-2">
                    <span className="chip text-brand-300">Question {current + 1}</span>
                    <span className="chip">{state.difficulty}</span>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-semibold leading-relaxed text-white">
                    {questions[current]}
                  </h2>
                </GlassCard>

                <GlassCard delay={0.1} className="mt-6 p-6">
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Your Answer
                  </label>
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    disabled={thinking}
                    rows={10}
                    placeholder="Type your answer here... Be thorough and explain your reasoning."
                    className="input-field resize-none font-mono text-sm leading-relaxed"
                  />
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>{answer.length} characters</span>
                    <span>{answer.trim().split(/\s+/).filter(Boolean).length} words</span>
                  </div>
                  <p className="mt-3 text-xs text-cyanx-300">
  💡 Write your complete answer first. Your response will be evaluated only after you click <strong>Submit Answer</strong>.
</p>

                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      onClick={handleSkip}
                      disabled={thinking}
                      className="btn-ghost px-5 py-2.5 text-sm"
                    >
                      <SkipForward className="h-4 w-4" />
{current === questions.length - 1
  ? "Finish Interview"
  : "Next Question"}
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={thinking || !answer.trim()}
                      className="btn-primary px-6 py-2.5 text-sm"
                    >
                      {thinking ? (
                        <>Analyzing...</>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Answer
                        </>
                      )}
                    </button>
                  </div>
                </GlassCard>

                {/* Completed indicator */}
                {completed > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-4 flex items-center gap-2 text-sm text-emerald-400"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    {completed} {completed === 1 ? 'answer' : 'answers'} submitted
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
