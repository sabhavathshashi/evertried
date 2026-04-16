import { useState, useContext } from 'react';
import { Plus, Trash2, CheckCircle, MapPin, Award, Search, TrendingUp, BellRing, Navigation, Mic, Mic2, Sparkles } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const WorkerDashboard = () => {
    const { user } = useContext(AuthContext);
    
    // UI Mock States for Hackathon
    const [skills, setSkills] = useState([
        { name: 'Plumber', experience: 5 }
    ]);
    const [newSkillName, setNewSkillName] = useState('');
    const [newSkillExp, setNewSkillExp] = useState('');
    
    const [whatsappEnabled, setWhatsappEnabled] = useState(true);
    
    // Gemini AI Voice Setup
    const [isListeningAI, setIsListeningAI] = useState(false);
    const [aiMessage, setAiMessage] = useState('');

    const [jobs, setJobs] = useState([
        { id: 1, title: 'Commercial Pipe Fitting', location: '1.2 km away', employer: 'Kiran T.', match: '98%', status: 'New', actionState: null },
        { id: 2, title: 'Fix Leaky Sink', location: '3.4 km away', employer: 'Rahul M.', match: '85%', status: 'Active', actionState: null },
    ]);

    const handleGeminiVoiceProfile = async () => {
        // Step 1: Initialize Browser Native Web Speech API
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Your browser does not support Voice Recognition. Please try Google Chrome.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsListeningAI(true);
        setAiMessage('Listening to your microphone... Speak your skills!');

        recognition.start();

        recognition.onresult = async (event) => {
            const transcript = event.results[0][0].transcript;
            setAiMessage(`Heard: "${transcript}"`);
            
            // Step 2: Send Transcribed text to Gemini API
            setTimeout(async () => {
                try {
                    setAiMessage('Gemini AI analyzing unstructured audio text...');
                    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
                    
                    if (!apiKey || apiKey === "your_gemini_api_key_here") {
                        alert("API Key missing! Please add VITE_GEMINI_API_KEY to frontend/.env");
                        setIsListeningAI(false);
                        setAiMessage('');
                        return;
                    }

                    // Fine-tuned System Prompt
                    const prompt = `You are an AI assistant for a local worker job platform called EverTried. 
                    Extract the worker's skills and years of experience from the following spoken text. 
                    Format your response strictly as a JSON array of objects. 
                    Each object must have 'name' (string formatted as Title Case, e.g. 'Plumber', 'Electrician', 'Carpenter') and 'experience' (integer representing years).
                    If they do not specify experience years, default to 1.
                    Do not add any markdown formatting (like \`\`\`json), only return the raw JSON array.
                    If no clear skills are detected, return an empty array [].
                    Examples: 
                    Spoken: "I am an electrician for five years and also a painter"
                    Response: [{"name": "Electrician", "experience": 5}, {"name": "Painter", "experience": 1}]
                    
                    Worker's Spoken Text: "${transcript}"`;

                    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
                    });

                    const data = await response.json();
                    
                    if (data.error) throw new Error(data.error.message);
                    
                    const aiText = data.candidates[0].content.parts[0].text;
                    
                    // Robust JSON Extractions using Regex to find the array regardless of what Gemini says
                    const match = aiText.match(/\[.*\]/s);
                    const cleanJson = match ? match[0] : "[]";
                    const extractedSkills = JSON.parse(cleanJson);
                    
                    if (Array.isArray(extractedSkills) && extractedSkills.length > 0) {
                        setSkills(prev => [...prev, ...extractedSkills]);
                        setAiMessage(`Success! Gemini extracted ${extractedSkills.length} skill(s).`);
                    } else {
                        setAiMessage(`Could not detect specific skills from your voice. Try again!`);
                    }
                    
                    setTimeout(() => {
                        setIsListeningAI(false);
                        setAiMessage('');
                    }, 3500);

                } catch (err) {
                    console.error("Gemini System Error:", err);
                    setAiMessage(`Error: ${err.message || "Failed to parse API"}`);
                    setTimeout(() => { setIsListeningAI(false); setAiMessage(''); }, 5000);
                }
            }, 1500);
        };

        recognition.onerror = (event) => {
            setAiMessage(`Microphone Error: ${event.error}`);
            setTimeout(() => { setIsListeningAI(false); setAiMessage(''); }, 3000);
        };
        
        recognition.onspeechend = () => {
            recognition.stop();
        };
    };

    const handleAddSkill = (e) => {
        e.preventDefault();
        if (skills.length >= 10) return alert("Maximum 10 skills allowed");
        if (!newSkillName.trim() || !newSkillExp) return;

        setSkills([...skills, { name: newSkillName, experience: Number(newSkillExp) }]);
        setNewSkillName('');
        setNewSkillExp('');
    };

    const removeSkill = (indexToRemove) => {
        setSkills(skills.filter((_, idx) => idx !== indexToRemove));
    };

    const handleAccept = (id) => {
        setJobs(jobs.map(job => job.id === id ? { ...job, actionState: 'accepted' } : job));
        setTimeout(() => {
            setJobs(prev => prev.filter(job => job.id !== id));
        }, 1500);
    };

    const handleDecline = (id) => {
        setJobs(jobs.filter(job => job.id !== id));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Worker Dashboard</h1>
                    <p className="text-slate-500 mt-1">Manage your skills, rating, and hyper-local job discovery.</p>
                </div>
                {/* Hackathon Output: WhatsApp Integration */}
                <div role="button" onClick={() => setWhatsappEnabled(!whatsappEnabled)} className={`flex items-center gap-3 px-4 py-2 border rounded-xl cursor-pointer transition-all ${whatsappEnabled ? 'bg-green-50 border-green-200 shadow-sm' : 'bg-white border-slate-200'}`}>
                    <div className={`p-2 rounded-full ${whatsappEnabled ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        <BellRing className="w-4 h-4" />
                    </div>
                    <div>
                        <p className={`text-sm font-bold ${whatsappEnabled ? 'text-green-800' : 'text-slate-600'}`}>WhatsApp Alerts</p>
                        <p className={`text-[10px] uppercase font-bold tracking-wider ${whatsappEnabled ? 'text-green-600' : 'text-slate-400'}`}>{whatsappEnabled ? 'Active' : 'Disabled'}</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Intelligence Panels */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Skills Component */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                        
                        {/* Hackathon: Gemini Voice to Profile AI */}
                        <div className="bg-gradient-to-r from-indigo-50 to-brand-light border-b border-indigo-100 p-5">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-indigo-900 text-sm flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-brand-DEFAULT" /> AI Voice Profiling</h3>
                                <button 
                                    type="button" 
                                    onClick={handleGeminiVoiceProfile}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all shadow-md cursor-pointer ${isListeningAI ? 'bg-red-50 text-red-600 border border-red-200 animate-pulse' : 'bg-brand-DEFAULT text-white border border-brand-dark hover:bg-brand-dark hover:scale-105'}`}
                                >
                                    {isListeningAI ? <><Mic className="w-3 h-3 animate-bounce" /> Recording</> : <><Mic2 className="w-4 h-4" /> Speak Profile</>}
                                </button>
                            </div>
                            <p className="text-[13px] text-indigo-700 leading-relaxed font-medium">
                                Don't know how to type your skills? Just speak! Our Gemini AI engine will transcribe your voice and automatically extract your skills to build your professional portfolio.
                            </p>
                            {aiMessage && (
                                <div className="mt-4 text-xs font-bold text-brand-dark bg-white/70 p-3 rounded-lg flex items-center gap-3 border border-brand-DEFAULT/10 shadow-sm animate-in fade-in">
                                    <div className="w-4 h-4 border-2 border-brand-DEFAULT border-t-transparent rounded-full animate-spin"></div>
                                    {aiMessage}
                                </div>
                            )}
                        </div>

                        <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                            <h2 className="font-semibold text-sm flex items-center gap-2 text-slate-700">
                                <Award className="w-4 h-4 text-slate-400" />
                                Manual Override
                            </h2>
                        </div>
                        
                        <div className="p-6 flex-1">
                            {/* Manual Skill Addition Box */}
                            <form onSubmit={handleAddSkill} className="space-y-4 mb-6">
                                <div>
                                    <select 
                                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-DEFAULT focus:ring-2 focus:ring-brand-DEFAULT/20 transition-all bg-slate-50 text-sm"
                                        value={newSkillName}
                                        onChange={(e) => setNewSkillName(e.target.value)}
                                    >
                                        <option value="">Choose Skill...</option>
                                        <option value="Plumber">Plumber</option>
                                        <option value="Electrician">Electrician</option>
                                        <option value="Carpenter">Carpenter</option>
                                        <option value="Painter">Painter</option>
                                        <option value="Mason">Mason</option>
                                    </select>
                                </div>
                                <div className="flex gap-3">
                                    <input 
                                        type="number" placeholder="Exp (Years)" min="0" required
                                        className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-DEFAULT focus:ring-2 bg-slate-50 text-sm"
                                        value={newSkillExp} onChange={(e) => setNewSkillExp(e.target.value)}
                                    />
                                    <button type="submit" className="bg-slate-200 text-slate-700 rounded-xl px-4 py-2.5 font-medium hover:bg-slate-300 transition-colors cursor-pointer text-sm font-bold">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>

                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Extracted Portfolio ({skills.length})</h3>
                            <div className="space-y-3">
                                {skills.map((skill, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white group hover:border-brand-DEFAULT/30 transition-colors shadow-sm animate-in slide-in-from-left-2 duration-300">
                                        <div>
                                            <p className="font-bold text-slate-800 text-sm">{skill.name}</p>
                                            <p className="text-xs text-slate-500 font-medium">{skill.experience} yrs digital history</p>
                                        </div>
                                        <button onClick={() => removeSkill(idx)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Hackathon AI Logic: Income Predictor */}
                    <div className="bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl border border-slate-800 p-6 shadow-lg text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10"><TrendingUp className="w-24 h-24" /></div>
                        <h2 className="text-sm font-bold text-indigo-300 uppercase tracking-widest flex items-center gap-2 mb-4 relative z-10">
                            <Award className="w-4 h-4" /> Income Predictor Engine
                        </h2>
                        <div className="relative z-10 text-white">
                            <p className="text-3xl font-black mb-1">₹4,200</p>
                            <p className="text-sm text-slate-300 font-medium mb-4">Predicted demand this week</p>
                        </div>
                        <div className="relative z-10 bg-white/10 p-3 rounded-xl backdrop-blur-md border border-white/10 text-sm">
                            Add <span className="text-brand-light font-bold">Electrician</span> to your skills to boost projected income by 18%.
                        </div>
                    </div>

                </div>

                {/* Right Column: Suggested Jobs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-lg text-slate-900">Hyperlocal Search (1-5km)</h2>
                        <div className="flex items-center gap-2 text-sm text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm font-bold">
                            <span className="relative flex h-2 w-2 mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-DEFAULT opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-DEFAULT"></span>
                            </span>
                            <Navigation className="w-4 h-4" /> Active Subscriptions 
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {jobs.length === 0 && (
                            <div className="bg-white border-2 border-dashed border-slate-200 p-12 text-center rounded-3xl shadow-sm">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-slate-300" />
                                </div>
                                <h3 className="font-bold text-slate-700 text-lg">No active matches found</h3>
                                <p className="text-slate-500 max-w-sm mx-auto mt-2">Activate WhatsApp notifications to get instantly pinged when a job matches your skills.</p>
                            </div>
                        )}
                        {jobs.map((job) => (
                            <div key={job.id} className={`bg-white border border-slate-200 p-6 rounded-2xl shadow-sm transform transition-all duration-300 ${job.actionState === 'accepted' ? 'scale-[1.02] border-green-500 shadow-xl shadow-green-100 z-10' : 'hover:shadow-md cursor-pointer group'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className="px-2.5 py-0.5 bg-green-100 text-green-700 font-bold text-xs rounded-full uppercase tracking-wider shadow-sm">{job.status}</span>
                                            <span className="text-slate-600 text-xs font-bold flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                                <MapPin className="w-3.5 h-3.5 text-brand-DEFAULT" /> {job.location}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-xl text-slate-900 group-hover:text-brand-DEFAULT transition-colors">{job.title}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-200 text-xs font-bold flex items-center justify-center text-slate-500">{job.employer[0]}</div>
                                            <p className="text-sm font-semibold text-slate-600">{job.employer} <span className="font-normal opacity-50 ml-1">• Highly Rated Employer</span></p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="inline-flex flex-col items-center justify-center bg-brand-light border border-brand-DEFAULT/20 rounded-xl px-4 py-2 hover:bg-brand-DEFAULT hover:text-white transition-colors group relative overflow-hidden shadow-sm">
                                            <span className="text-[10px] text-brand-dark group-hover:text-brand-light font-bold uppercase tracking-wider mb-0.5">Engine Fit</span>
                                            <span className="text-xl font-black text-brand-DEFAULT group-hover:text-white leading-none relative z-10">{job.match}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pt-5 border-t border-slate-100 mt-2">
                                    {job.actionState === 'accepted' ? (
                                        <div className="flex-1 bg-green-50 text-green-700 border border-green-200 py-3 rounded-xl font-bold flex items-center justify-center gap-2 animate-pulse shadow-inner">
                                            <CheckCircle className="w-5 h-5 text-green-500" /> Start Instantly Working!
                                        </div>
                                    ) : (
                                        <>
                                            <button onClick={() => handleAccept(job.id)} className="flex-1 bg-brand-DEFAULT text-white py-3 rounded-xl font-bold hover:bg-brand-dark transition-colors cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-brand-DEFAULT/20 text-sm">
                                                <CheckCircle className="w-4 h-4" /> Apply & Accept (Instant Hiring)
                                            </button>
                                            <button onClick={() => handleDecline(job.id)} className="px-6 py-3 bg-white text-slate-500 hover:bg-red-50 hover:text-red-700 hover:border-red-200 rounded-xl font-bold border border-slate-200 transition-colors cursor-pointer active:scale-95 text-sm shadow-sm">
                                                Decline
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkerDashboard;
