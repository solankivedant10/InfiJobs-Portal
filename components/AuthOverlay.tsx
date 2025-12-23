import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { login as authLogin, register as authRegister } from '../features/auth/authService';

const AuthOverlay: React.FC = () => {
  const { login } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirm, setConfirm] = useState('');

  // Typing Animation
  useEffect(() => {
    const text = "Build Real Skills. Accelerate Your Career!";
    let currentIndex = 0;

    // Clear previous text just in case
    setTypedText('');

    const typingInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setTypedText(prev => prev + text.charAt(currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Validation
        if (password !== confirm) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setIsLoading(false);
          return;
        }
        if (!name.trim()) {
          setError('Name is required');
          setIsLoading(false);
          return;
        }

        // Register with Supabase
        const result = await authRegister(name, email, password);

        if (result.success && result.user) {
          login({
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
            isAdmin: result.user.isAdmin
          });
        } else {
          setError(result.message || 'Registration failed');
        }
      } else {
        // Login with Supabase
        const result = await authLogin(email, password);

        if (result.success && result.user) {
          login({
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
            isAdmin: result.user.isAdmin
          });
        } else {
          setError(result.message || 'Invalid credentials');
        }
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900">
      {/* Background Layers */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* ✅ FIX 1: Increased opacity to 40% and removed 'mix-blend-overlay' so colors show through */}
        <img
          src="/assets/logo.gif"
          alt="Background animation"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        {/* ✅ FIX 2: Reduced the black overlay slightly so the GIF shines more */}
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-10"></div>

        {/* Fallback gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-[-1]"></div>
      </div>

      <div className="relative z-20 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-300">

        {/* Header Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-[0_0_25px_rgba(59,130,246,0.5)] mb-6 animate-float border-2 border-white/10">
            <img src="./assets/logo.gif" alt="InfiJobs Logo" className="w-full h-full object-cover" />
          </div>
          <div className="h-12 text-blue-400 font-bold text-xl text-center leading-tight drop-shadow-md">
            {typedText}
            <span className="animate-pulse text-white ml-1">|</span>
          </div>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              value={name}
              onChange={e => setName(e.target.value)}
              disabled={isLoading}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
              disabled={isLoading}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              disabled={isLoading}
              required
            />
          )}

          {error && (
            <div
              id="signin-error"
              className="p-3 rounded bg-red-500/20 border border-red-500/50 text-red-200 text-sm text-center font-semibold animate-in fade-in slide-in-from-top-2 duration-300"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold shadow-lg shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
              </>
            ) : (
              <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
            )}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-6 text-center text-sm text-gray-400">
          {isSignUp ? "Already have an account? " : "New to InfiJobs? "}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setEmail('');
              setPassword('');
              setName('');
              setConfirm('');
            }}
            disabled={isLoading}
            className="text-blue-400 hover:text-blue-300 font-bold hover:underline transition-colors ml-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSignUp ? 'Sign In' : 'Join Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthOverlay;