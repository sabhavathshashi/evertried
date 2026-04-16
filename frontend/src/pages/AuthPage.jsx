import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Briefcase, HardHat } from 'lucide-react';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('worker');
    const [error, setError] = useState('');
    
    const { login, register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await register(name, email, password, role);
            }
            if (data.role === 'worker') navigate('/worker');
            else navigate('/employer');
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed. Make sure your local Backend server is running!');
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-4 py-16">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden transform transition-all">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="w-12 h-12 bg-brand-DEFAULT rounded-xl flex items-center justify-center text-white mx-auto shadow-lg shadow-brand-DEFAULT/30 mb-4 transform hover:-translate-y-1 transition-transform">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h2>
                        <p className="text-slate-500 mt-1">
                            {isLogin ? 'Sign in to access your platform dashboard' : 'Join the smart workforce matching engine'}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium text-center mb-6 border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {!isLogin && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <input 
                                        type="text" required
                                        className="w-full pl-10 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-DEFAULT focus:ring-4 focus:ring-brand-DEFAULT/10 transition-all bg-white"
                                        value={name} onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                        )}

                        {!isLogin && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-75">
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">I am a...</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${role === 'worker' ? 'bg-brand-light border-brand-DEFAULT text-brand-dark font-bold shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                                        <input type="radio" value="worker" checked={role === 'worker'} onChange={() => setRole('worker')} className="hidden" />
                                        <HardHat className="w-4 h-4" /> Worker
                                    </label>
                                    <label className={`flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${role === 'employer' ? 'bg-brand-light border-brand-DEFAULT text-brand-dark font-bold shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                                        <input type="radio" value="employer" checked={role === 'employer'} onChange={() => setRole('employer')} className="hidden" />
                                        <Briefcase className="w-4 h-4" /> Employer
                                    </label>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input 
                                    type="email" required
                                    className="w-full pl-10 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-DEFAULT focus:ring-4 focus:ring-brand-DEFAULT/10 transition-all bg-white"
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input 
                                    type="password" required
                                    className="w-full pl-10 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-brand-DEFAULT focus:ring-4 focus:ring-brand-DEFAULT/10 transition-all bg-white"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-slate-900 text-white rounded-xl py-3.5 font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 active:scale-[0.98] cursor-pointer mt-4"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="font-semibold text-brand-DEFAULT hover:text-brand-dark transition-colors border-none bg-transparent cursor-pointer p-0 underline-offset-4 hover:underline">
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
