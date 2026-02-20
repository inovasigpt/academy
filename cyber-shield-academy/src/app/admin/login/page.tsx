import { createToken, verifyPassword } from '@/lib/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    'use server';
    
    const password = formData.get('password') as string;
    
    if (!verifyPassword(password)) {
      redirect('/admin/login?error=1');
    }
    
    const token = await createToken();
    (await cookies()).set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 8 * 60 * 60, // 8 hours
      path: '/',
    });
    
    redirect('/admin');
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-slate-900 rounded-2xl border border-slate-800">
        <h1 className="text-2xl font-bold text-slate-100 mb-2">Admin Login</h1>
        <p className="text-slate-500 mb-6">Enter your password to access admin panel</p>
        
        <form action={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-cyan-500"
              placeholder="Enter admin password"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
