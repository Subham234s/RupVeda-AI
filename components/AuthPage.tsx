import React, { useState } from 'react';
import { 
  signInWithGoogle, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  updateProfile,
  auth
} from '../services/firebase';

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.657-3.356-11.303-7.962l-6.571,4.819C9.656,39.663,16.318,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.233,44,34,44,31C44,27.202,44,23.338,43.611,20.083z"></path>
    </svg>
);


export const AuthPage: React.FC = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleAuthAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage('');

        try {
            if (isLoginView) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                if (!username.trim()) throw new Error("Username is required.");
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                if (userCredential.user) {
                  await updateProfile(userCredential.user, { displayName: username });
                }
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            await signInWithGoogle();
        } catch (err: any) {
            setError(err.message || 'Failed to sign in with Google.');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordReset = async () => {
        if (!email) {
            setError('Please enter your email address to reset your password.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent! Please check your inbox.');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-background text-text-primary p-4 flex flex-col items-center justify-center animate-fade-in">
            <div className="text-center mb-8">
                <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-cyan-400 to-amber-400 tracking-wider">
                    RupVeda AI
                </h1>
                <p className="mt-2 text-lg text-text-secondary">Craft Your Digital Soul.</p>
            </div>

            <div className="w-full max-w-sm p-8 glassmorphic rounded-2xl">
                <h2 className="text-2xl font-bold text-center text-text-primary mb-6">
                    {isLoginView ? 'Welcome Back' : 'Create Account'}
                </h2>
                <form onSubmit={handleAuthAction} className="flex flex-col gap-4">
                    {!isLoginView && (
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="w-full p-3 bg-white/5 border border-slate-300/20 rounded-lg focus:ring-2 focus:ring-cyan-400 transition-all duration-300 placeholder-slate-400/70 text-text-primary"
                        />
                    )}
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="w-full p-3 bg-white/5 border border-slate-300/20 rounded-lg focus:ring-2 focus:ring-cyan-400 transition-all duration-300 placeholder-slate-400/70 text-text-primary"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="w-full p-3 bg-white/5 border border-slate-300/20 rounded-lg focus:ring-2 focus:ring-cyan-400 transition-all duration-300 placeholder-slate-400/70 text-text-primary"
                    />
                    
                    {error && <p className="text-red-400 text-sm text-center animate-fade-in">{error}</p>}
                    {message && <p className="text-green-400 text-sm text-center animate-fade-in">{message}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 py-3 px-6 text-lg font-bold text-white bg-gradient-to-r from-amber-500 to-cyan-500 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
                    >
                        {loading && <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>}
                        {loading ? 'Processing...' : (isLoginView ? 'Log In' : 'Sign Up')}
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <hr className="flex-grow border-t border-slate-300/20" />
                    <span className="mx-4 text-xs text-text-secondary">OR</span>
                    <hr className="flex-grow border-t border-slate-300/20" />
                </div>
                
                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full py-3 px-6 text-md font-semibold text-text-primary bg-white/5 border border-slate-300/20 rounded-full hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    <GoogleIcon />
                    Sign in with Google
                </button>

                <div className="text-center mt-6 text-sm">
                    <button onClick={() => setIsLoginView(!isLoginView)} className="text-cyan-400 hover:underline">
                        {isLoginView ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
                    </button>
                    {isLoginView && (
                        <button onClick={handlePasswordReset} className="block mx-auto mt-2 text-text-secondary hover:underline">
                            Forgot Password?
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
