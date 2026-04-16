import { useState } from 'react';
import { Search, MapPin, Users, Star } from 'lucide-react';

const EmployerDashboard = () => {
    const [title, setTitle] = useState('');
    const [reqSkill, setReqSkill] = useState('');
    const [count, setCount] = useState('1');
    
    const [isSearching, setIsSearching] = useState(false);
    const [matchedWorkers, setMatchedWorkers] = useState([]);

    const handleCreateJob = (e) => {
        e.preventDefault();
        if(!title || !reqSkill) return;

        setIsSearching(true);
        setMatchedWorkers([]);

        // Simulate API call and Agent Matching execution
        setTimeout(() => {
            setIsSearching(false);
            setMatchedWorkers([
                { name: 'Ravi', rating: 4.8, distance: '1.2 km', skills: 4, exp: 5 },
                { name: 'Suresh', rating: 4.5, distance: '2.5 km', skills: 2, exp: 8 },
                { name: 'Ramesh', rating: 4.2, distance: '4.1 km', skills: 3, exp: 3 },
            ]);
        }, 1500);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Employer Panel</h1>
                <p className="text-slate-500 mt-1">Post a task and our AI Agent will instantly match you with nearby workers.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Left: Job Creation Form */}
                <div>
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-brand-light text-brand-DEFAULT flex items-center justify-center">1</span>
                            Define The Job
                        </h2>
                        
                        <form onSubmit={handleCreateJob} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Job Title</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Fix broken water pipe"
                                    className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-DEFAULT focus:ring-4 focus:ring-brand-DEFAULT/10 transition-all bg-white"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Required Skill</label>
                                    <select 
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-DEFAULT focus:ring-4 focus:ring-brand-DEFAULT/10 transition-all bg-white"
                                        value={reqSkill}
                                        onChange={(e) => setReqSkill(e.target.value)}
                                        required
                                    >
                                        <option value="">Select...</option>
                                        <option value="Plumber">Plumber</option>
                                        <option value="Electrician">Electrician</option>
                                        <option value="Mason">Mason</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Workers Needed</label>
                                    <input 
                                        type="number" 
                                        min="1"
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-DEFAULT focus:ring-4 focus:ring-brand-DEFAULT/10 transition-all bg-white"
                                        value={count}
                                        onChange={(e) => setCount(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                                <div className="mt-0.5"><MapPin className="w-5 h-5 text-slate-400" /></div>
                                <div>
                                    <p className="font-medium text-slate-700 text-sm">Location auto-detected</p>
                                    <p className="text-xs text-slate-500">Matching within 5km radius</p>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSearching}
                                className="w-full bg-slate-900 text-white rounded-xl py-3.5 font-bold flex justify-center items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mt-4"
                            >
                                {isSearching ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Agent is scanning...
                                    </>
                                ) : (
                                    <>
                                        <Search className="w-5 h-5" /> Post Job & Find Match
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right: Matches Display */}
                <div>
                    {!isSearching && matchedWorkers.length === 0 && (
                        <div className="h-full border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center text-slate-400">
                            <Users className="w-12 h-12 mb-4 text-slate-300" />
                            <p className="font-medium text-slate-600 mb-1">Waiting for job posting</p>
                            <p className="text-sm">Matched workers will automatically appear here based on the algorithm.</p>
                        </div>
                    )}

                    {isSearching && (
                        <div className="h-full flex flex-col items-center justify-center">
                            <div className="relative flex items-center justify-center w-24 h-24 mb-6">
                                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-brand-DEFAULT rounded-full border-t-transparent animate-spin"></div>
                                <Search className="w-8 h-8 text-brand-DEFAULT animate-pulse" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Running Haversine Formula...</h3>
                            <p className="text-slate-500 mt-2 text-center max-w-sm">Calculating precise distances and sorting by our 50/30/20 ranking matrix.</p>
                        </div>
                    )}

                    {!isSearching && matchedWorkers.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">2</span>
                                    Ranked Matches
                                </h2>
                                <span className="bg-brand-DEFAULT text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                                    {matchedWorkers.length} Found
                                </span>
                            </div>
                            
                            <div className="space-y-4 relative">
                                {/* Connecting line */}
                                <div className="absolute left-6 top-10 bottom-10 w-px bg-slate-200 -z-10"></div>
                                
                                {matchedWorkers.map((worker, idx) => (
                                    <div key={idx} className="bg-white border text-left border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                                        {/* Rank Badge */}
                                        <div className="absolute top-0 right-0 bg-slate-100 px-3 py-1.5 rounded-bl-xl border-b border-l border-slate-200">
                                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Rank #{idx + 1}</span>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-DEFAULT to-indigo-500 flex items-center justify-center text-white font-bold text-lg shrink-0 outline outline-4 outline-white shadow-sm">
                                                {worker.name.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg text-slate-900">{worker.name}</h3>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                                                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                        <span className="font-bold">{worker.rating}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                                        <MapPin className="w-4 h-4 text-brand-DEFAULT" />
                                                        <span className="font-medium">{worker.distance}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-3 flex gap-2">
                                                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{worker.exp} yrs exp</span>
                                                    <span className="text-xs font-medium bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{worker.skills} verified skills</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-5 grid grid-cols-2 gap-3">
                                            <button className="col-span-1 bg-brand-light text-brand-dark font-semibold py-2 rounded-xl text-sm hover:bg-brand-DEFAULT hover:text-white transition-colors cursor-pointer">View Profile</button>
                                            <button className="col-span-1 bg-slate-900 text-white font-semibold py-2 rounded-xl text-sm hover:bg-slate-800 transition-colors cursor-pointer">Hire Now</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;
