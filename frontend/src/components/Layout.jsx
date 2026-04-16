import { Link, Outlet, useLocation } from 'react-router-dom';
import { Briefcase, HardHat, Home } from 'lucide-react';

const Layout = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
            {/* Premium Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-brand-DEFAULT rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-DEFAULT/30 group-hover:scale-105 transition-transform">
                                <span className="font-black text-xl tracking-tighter">ET</span>
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-brand-DEFAULT transition-colors">
                                EverTried.
                            </span>
                        </Link>
                        
                        <nav className="flex items-center gap-6">
                            <Link 
                                to="/" 
                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-brand-DEFAULT' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                                <Home className="w-4 h-4" /> Home
                            </Link>
                            <Link 
                                to="/worker" 
                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${location.pathname === '/worker' ? 'text-brand-DEFAULT' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                                <HardHat className="w-4 h-4" /> Worker Panel
                            </Link>
                            <div className="h-6 w-[1px] bg-slate-200"></div>
                            <Link 
                                to="/employer" 
                                className={`flex items-center gap-2 text-sm font-medium transition-colors ${location.pathname === '/employer' ? 'text-brand-DEFAULT' : 'text-slate-600 hover:text-slate-900'}`}
                            >
                                <Briefcase className="w-4 h-4" /> Employer Panel
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-brand-DEFAULT rounded-lg flex items-center justify-center text-white">
                            <span className="font-black text-sm tracking-tighter">ET</span>
                        </div>
                        <span className="font-bold text-lg text-white">EverTried AI Engine</span>
                    </div>
                    <p className="text-sm max-w-md mx-auto leading-relaxed">
                        Eliminating middlemen. Connecting skilled labor directly with opportunity based on proximity, skills, and intelligent matching.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
