'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/api";
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
import Link from "next/link";

type User = {
    id: string,
    email: string,
    name: string,
};

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            await api<User>('/auth/register',{
                method: 'POST',
                body: {email, password, name},
            });
        } catch(err) {
            setError(err instanceof Error ? err.message : 'Register Failed')
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="flex flex-1 justify-center items-center">
            <form 
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded-lg border border-gray-200 space-y-4 p-6"
            >
                <h1 className="text-center text-2xl font-bold">Sign Up</h1>
    
                <InputGroup className="h-auto">
                    <InputGroupInput
                        id="block-start-input"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </InputGroup>
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
                    Already have account?{' '}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </form>
        </main>
    )
}