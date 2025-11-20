import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Label, Input } from '../components/ui/FormElements'
import Logo from '../components/ui/Logo'
import { Button } from '../components/ui/Button'
import { Users } from 'lucide-react'
import api from '../services/api'

const Auth = () => {
    const [authType, setAuthType] = useState('in')
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: ''
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // add logic
    }

    const googleAuth = () => {
        const apiURI = import.meta.env.VITE_API_URL;
        console.log(apiURI);
        window.open(`${apiURI}/auth/google/callback`, "_self")  
        // window.open(`http://localhost:3000/api/auth/google/callback`, "_self")
    };

    return (
        <div className='w-screen h-screen bg-gray-50 flex justify-center items-center'>
            <div className='w-full px-6 md:px-0 md:w-1/4 flex flex-col gap-4 justify-center items-center'>
                <Link to={'/'}>
                    <Logo />
                </Link>
                <div className='border w-full bg-white border-muted p-4 rounded-xl shadow-md'>
                    <div className='w-2/3 bg-muted p-1 rounded-xl mb-10 mx-auto flex gap-1 justify-center items-center'>
                        <button
                            className={`${authType === 'in' && 'bg-white'} flex-1 rounded-lg px-4 py-2`}
                            onClick={() => setAuthType('in')}
                        >
                            Sign In
                        </button>
                        <button
                            className={`${authType === 'up' && 'bg-white'} flex-1 rounded-lg px-4 py-2`}
                            onClick={() => setAuthType('up')}
                        >
                            Sign Up
                        </button>
                    </div>
                    <div className='my-4 bg-red-300 text-red-600 text-md rounded-lg border-2 border-red-600 text-center py-2 px-4'>This does not work, please proceed with <div>'Sign in with Google'</div></div>
                    <form className='flex flex-col gap-5'>
                        {authType === 'in' ? (
                            <>
                                <Label htmlFor="email">
                                    University Email
                                    <Input className='mt-2' type="text" name="email" id="email" onChange={handleChange} />
                                </Label>
                                <Label htmlFor="password">
                                    Password
                                    <Input className='mt-2' type="password" name="password" id="password" onChange={handleChange} />
                                </Label>
                                <button
                                    className='w-full bg-primary hover:bg-primary-glow text-white rounded-lg px-4 py-2 transition-all duration-200 cursor-pointer'
                                    onClick={handleSubmit}
                                >
                                    Sign In

                                </button>
                            </>
                        ) : (
                            <>
                                <Label htmlFor="name">
                                    Full Name
                                    <Input className='mt-2' type="text" name="name" id="name" onChange={handleChange} />
                                </Label>
                                <Label htmlFor="email">
                                    University Email
                                    <Input className='mt-2' type="email" name="email" id="email" onChange={handleChange} />
                                </Label>
                                <Label htmlFor="password">
                                    Password
                                    <Input className='mt-2' type="password" name="password" id="password" onChange={handleChange} />
                                </Label>
                                <button
                                    className='w-full bg-primary hover:bg-primary-glow text-white rounded-lg px-4 py-2 transition-all duration-200 cursor-pointer'
                                    onClick={handleSubmit}
                                >
                                    Create Account
                                </button>
                            </>
                        )
                        }
                    </form>
                </div>
                <div className='flex gap-2 w-full text-muted-foreground'>
                    <div className='flex-1 border border-muted-foreground h-0 my-auto' />
                    <p>Or Continue With</p>
                    <div className='flex-1 border border-muted-foreground h-0 my-auto' />
                </div>
                <Button
                    size='lg'
                    className="w-full justify-center gap-1"
                    onClick={googleAuth}
                >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Auth
