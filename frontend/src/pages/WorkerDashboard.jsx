import { useState } from 'react';
import { Plus, Trash2, CheckCircle, MapPin, Award } from 'lucide-react';

const WorkerDashboard = () => {
    const [skills, setSkills] = useState([
        { name: 'Plumber', experience: 5 }
    ]);
    const [newSkillName, setNewSkillName] = useState('');
    const [newSkillExp, setNewSkillExp] = useState('');

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

    const suggestedJobs = [
        { title: 'Commercial Pipe Fitting', location: '1.2 km away', employer: 'Kiran T.', match: '98%', status: 'New' },
        { title: 'Fix Leaky Sink', location: '3.4 km away', employer: 'Rahul M.', match: '85%', status: 'Active' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Worker Dashboard</h1>
                <p className="text-slate-500 mt-1">Manage your skills and view local job suggestions.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Skills Management */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                            <h2 className="font-semibold text-lg flex items-center gap-2">
                                <Award className="w-5 h-5 text-brand-DEFAULT" />
                                My Skills
                                <span className="ml-auto text-xs font-semibold bg-brand-light text-brand-dark px-2 py-1 rounded-full">
                                    {skills.length}/10 Max
                                </span>
                            </h2>
                        </div>
                        
                        <div className="p-6">
                            <form onSubmit={handleAddSkill} className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Select Skill</label>
                                    <select 
                                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-DEFAULT focus:ring-2 focus:ring-brand-DEFAULT/20 transition-all bg-slate-50"
                                        value={newSkillName}
                                        onChange={(e) => setNewSkillName(e.target.value)}
                                    >
                                        <option value="">Choose...</option>
                                        <option value="Plumber">Plumber</option>
                                        <option value="Electrician">Electrician</option>
                                        <option value="Carpenter">Carpenter</option>
                                        <option value="Painter">Painter</option>
                                        <option value="Mason">Mason</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Experience (Years)</label>
                                    <input 
                                        type="number" 
                                        min="0"
                                        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-brand-DEFAULT focus:ring-2 focus:ring-brand-DEFAULT/20 transition-all bg-slate-50"
                                        value={newSkillExp}
                                        onChange={(e) => setNewSkillExp(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="w-full bg-slate-900 text-white rounded-xl py-2.5 font-medium flex justify-center items-center gap-2 hover:bg-slate-800 transition-colors cursor-pointer">
                                    <Plus className="w-4 h-4" /> Add Skill
                                </button>
                            </form>

                            <div className="space-y-3">
                                {skills.map((skill, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white group hover:border-brand-DEFAULT/30 transition-colors">
                                        <div>
                                            <p className="font-semibold text-slate-800 text-sm">{skill.name}</p>
                                            <p className="text-xs text-slate-500">{skill.experience} yrs experience</p>
                                        </div>
                                        <button onClick={() => removeSkill(idx)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Suggested Jobs */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-lg text-slate-900">Recommended for You</h2>
                        <div className="flex items-center gap-2 text-sm text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                            <span className="relative flex h-2 w-2 mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Looking for jobs within 5km
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {suggestedJobs.map((job, idx) => (
                            <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2.5 py-0.5 bg-green-100 text-green-700 font-bold text-xs rounded-full uppercase tracking-wider">{job.status}</span>
                                            <span className="text-slate-500 text-sm flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5" /> {job.location}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-brand-DEFAULT transition-colors">{job.title}</h3>
                                        <p className="text-sm text-slate-500 mt-1">Employer: {job.employer}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="inline-flex flex-col items-center justify-center bg-brand-light border border-brand-DEFAULT/20 rounded-xl px-4 py-2">
                                            <span className="text-xs text-brand-dark font-semibold uppercase tracking-wider">Fit</span>
                                            <span className="text-xl font-black text-brand-DEFAULT">{job.match}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                    <button className="flex-1 bg-brand-DEFAULT text-white py-2.5 rounded-xl font-medium hover:bg-brand-dark transition-colors cursor-pointer flex items-center justify-center gap-2">
                                        <CheckCircle className="w-4 h-4" /> Accept Job
                                    </button>
                                    <button className="px-4 py-2.5 text-slate-500 hover:bg-slate-100 rounded-xl font-medium transition-colors cursor-pointer">
                                        Decline
                                    </button>
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
