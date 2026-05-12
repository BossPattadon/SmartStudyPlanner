'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { api } from '@/lib/api'

type User = {
    id: string,
    email: string,
    name: string,
};

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>){
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await api<{ user: User }>('/auth/login', {
                method: 'POST',
                body: { email, password },
            });
        } catch(err) {
            setError(err instanceof Error ? err.message : 'Login Failed');
        } finally {
            setLoading(false);
        };
    };

    return (
        <main className="flex flex-1 items-center justify-center p-6">
            <form 
                onSubmit={handleSubmit}
                className="w-full max-w-sm space-y-4 rounded-lg border border-gray-200 p-6"
            >
                <h1 className="text-2xl font-bold">Login</h1>

                <div>
                    <label className="mb-1 block text-sm font-medium">Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded border border-gray-300 px-3 py-2"
                    />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className="text-center text-sm">
                    No account?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </form>
        </main>
    );
}