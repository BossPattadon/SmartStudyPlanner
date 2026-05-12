'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { api } from '@/lib/api'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from "@/components/ui/input-group"
import { Button } from "@/components/ui/button"
import {
    CheckIcon,
    CreditCardIcon,
    InfoIcon,
    MailIcon,
    SearchIcon,
    StarIcon,
    EyeOffIcon,
} from "lucide-react"

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
            await api<User>('/auth/login', {
                method: 'POST',
                body: { email, password },
            });
            router.push("/register");
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
                <h1 className="text-center text-2xl font-bold">Login</h1>

                <InputGroup>
                    <InputGroupInput
                        type="email" 
                        placeholder="Enter your email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <InputGroupAddon>
                    <MailIcon />
                    </InputGroupAddon>
                </InputGroup>
                <InputGroup>
                    <InputGroupInput
                        id="inline-end-input"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <InputGroupAddon align="inline-end">
                        <EyeOffIcon />
                    </InputGroupAddon>
                </InputGroup>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <div className="mt-4 flex justify-center">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-3/4 text-center bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    >
                        {loading ? 'Signing up' : 'Sign up'}
                    </Button>
                </div>

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