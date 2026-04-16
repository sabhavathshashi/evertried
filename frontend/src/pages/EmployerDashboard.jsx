import { useState, useContext } from 'react';
import { Briefcase, MapPin, Users, Search, Star, MessageSquare, LayoutDashboard } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const EmployerDashboard = () => {
    const { user } = useContext(AuthContext);
    const [jobTitle, setJobTitle] = useState('');
    const [requiredSkill, setRequiredSkill] = useState('');
    const [workerCount, setWorkerCount] = useState(1);
    const [scale, setScale] = useState('small');
    const [isSearching, setIsSearching] = useState(false);
    const [matchedWorkers, setMatchedWorkers] = useState([]);

    const handleCreateJob = async (e) => {
        e.preventDefault();
        setIsSearching(true);
        setMatchedWorkers([]);

        // Mocking AI "Thinking System" time for UI UX 
        setTimeout(() => {
            if (scale === 'large') {
                // If large scale, show coordinator dispatch mock
                setMatchedWorkers('coordinator_dispatched');
            } else {
                setMatchedWorkers([
                    { id: 1, name: 'Srinivas G.', skills: [{name: 'Plumber', experience: 5}], rating: 4.8, distance: 1.2 },
                    { id: 2, name: 'Ravi T.', skills: [{name: 'Plumber', experience: 3}], rating: 4.5, distance: 3.4 }
                ]);
            }
            setIsSearching(false);
        }, 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Job Request Form */}
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Post a Job</h1>
                    <p className="text-slate-500 mt-1">Our algorithms will instantly dispatch this to nearby skilled workers.</p>
                </div>
                
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <form onSubmit={handleCreateJob} className="space-y-5 relative z-10">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Job Title</label>
                            <input type="text" required value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-DEFAULT focus:ring-4 focus:ring-brand-DEFAULT/10 transition-all bg-white" placeholder="e.g. Commercial Pipe Fitting" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Required Skill</label>
                                <select required value={requiredSkill} onChange={e => setRequiredSkill(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-DEFAULT focus:ring-4 focus:ring-brand-DEFAULT/10 transition-all bg-white">
                                    <option value="">Select...</option>
                                    <option value="Plumber">Plumber</option>
                                    <option value="Electrician">Electrician</option>
                                    <option value="Carpenter">Carpenter</option>
                                    <option value="Painter">Painter</option>
                                    <option value="Mason">Mason</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Workers Needed</label>
                                <input type="number" min="1" max="50" required value={workerCount} onChange={e => setWorkerCount(e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-DEFAULT focus:ring-4 focus:ring-brand-DEFAULT/10 transition-all bg-white" />
                            </div>
                        </div>

                        {/* Hackathon Project Scale */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Job Scale (Smart Routing)</label>
                            <div className="grid grid-cols-2 gap-3">
                                <label className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border cursor-pointer transition-all ${scale === 'small' ? 'bg-brand-light border-brand-DEFAULT text-brand-dark shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}>
                                    <input type="radio" value="small" checked={scale === 'small'} onChange={() => setScale('small')} className="hidden" />
                                    <span className="font-bold text-sm">Small Scale</span>
                                    <span className="text-[10px] text-center opacity-80">Direct to Workers</span>
                                </label>
                                <label className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border cursor-pointer transition-all ${scale === 'large' ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}>
                                    <input type="radio" value="large" checked={scale === 'large'} onChange={() => setScale('large')} className="hidden" />
                                    <span className="font-bold text-sm">Large Project</span>
                                    <span className="text-[10px] text-center opacity-80">Routes to Coordinator</span>
                                </label>
                            </div>
                        </div>

                        <button disabled={isSearching} type="submit" className="w-full bg-slate-900 text-white rounded-xl py-3.5 font-bold hover:bg-slate-800 transition-all shadow-lg active:scale-[0.98] mt-4 flex justify-center items-center gap-2 cursor-pointer">
                            {isSearching ? <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div> : <><Briefcase className="w-5 h-5" /> Launch Matching Agent</>}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right: Agent Interface */}
            <div>
                {!isSearching && matchedWorkers.length === 0 && (
                    <div className="h-full border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-12 text-center text-slate-400 bg-slate-50/50 min-h-[500px]">
                        <Users className="w-16 h-16 mb-4 text-slate-300" />
                        <h3 className="text-xl font-bold text-slate-700 mb-2">Awaiting Job Parameters</h3>
                        <p className="max-w-sm leading-relaxed">Enter your requirements and our engine will execute hyperlocal Discovery algorithms to ping the nearest workers.</p>
                        <div className="mt-8 flex gap-2">
                            <span className="text-xs bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm font-semibold">1-5km Hyperlocal</span>
                        </div>
                    </div>
                )}

                {isSearching && (
                    <div className="h-full border border-brand-DEFAULT/20 bg-brand-light/30 rounded-3xl flex flex-col items-center justify-center p-12 text-center relative overflow-hidden min-h-[500px]">
                        <div className="relative w-24 h-24 mb-6">
                            <div className="absolute inset-0 border-4 border-brand-DEFAULT rounded-full border-t-transparent animate-spin"></div>
                            <div className="absolute inset-2 border-4 border-indigo-500 rounded-full border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                            <Search className="absolute inset-0 m-auto w-8 h-8 text-brand-DEFAULT animate-pulse" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Agent is matching profiles...</h3>
                        <p className="text-slate-500">Checking trust ratings and availability.</p>
                    </div>
                )}

                {matchedWorkers === 'coordinator_dispatched' && !isSearching && (
                    <div className="h-full border border-amber-200 bg-amber-50 rounded-3xl flex flex-col items-center justify-center p-12 text-center relative overflow-hidden min-h-[500px]">
                        <LayoutDashboard className="w-20 h-20 text-amber-500 mb-6 drop-shadow-md" />
                        <h3 className="text-2xl font-bold text-amber-900 mb-2">Routed to Coordinators</h3>
                        <p className="text-amber-800/80 max-w-sm">This is a Large-Scale Job requiring complex management. The system has successfully routed it to local active Coordinators to assemble a trusted crew.</p>
                    </div>
                )}

                {Array.isArray(matchedWorkers) && matchedWorkers.length > 0 && !isSearching && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900">Matches Found (Hyperlocal)</h2>
                            <span className="bg-brand-DEFAULT text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-sm">
                                {matchedWorkers.length} NEAR 1-5km
                            </span>
                        </div>
                        
                        <div className="grid gap-4">
                            {matchedWorkers.map((worker) => (
                                <div key={worker.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:border-brand-DEFAULT/40 transition-all hover:shadow-md">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-DEFAULT to-indigo-500 flex items-center justify-center text-white font-bold text-lg shrink-0 outline outline-4 outline-white shadow-sm">
                                                {worker.name[0]}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                                    {worker.name} 
                                                    <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded uppercase font-black tracking-widest border border-green-200">Trusted</span>
                                                </h3>
                                                <div className="flex flex-wrap gap-2 mt-1.5">
                                                    {worker.skills?.map(s => (
                                                        <span key={s.name} className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs font-semibold uppercase tracking-wider">{s.name} ({s.experience}y)</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="flex items-center gap-1 text-amber-500 font-bold mb-1">
                                                <Star className="w-4 h-4 fill-current" /> {worker.rating}
                                            </div>
                                            <span className="text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 font-semibold flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {worker.distance} km
                                            </span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50 mt-2">
                                        <button className="col-span-1 bg-brand-light text-brand-dark font-semibold py-2 rounded-xl text-sm hover:bg-brand-DEFAULT hover:text-white transition-colors cursor-pointer border border-brand-DEFAULT/10">View Work History</button>
                                        <button className="col-span-1 bg-slate-900 text-white font-semibold py-2 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors cursor-pointer shadow-md">
                                            <MessageSquare className="w-4 h-4" /> Instant Hire
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployerDashboard;
