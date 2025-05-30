import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ForgotPassword } from '../ForgotPassword/ForgotPassword'
import { toast } from '@/hooks/use-toast'

// Validation Schema 
const loginSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters")
})

const Login = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string, password?: string }>({})
  const [loading, setLoading] = useState(false)
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token !== null) {
      navigate('/dashboard');
    }
  }, [navigate])

  const validateForm = () => {
    try {
      loginSchema.parse({ email, password })
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { email?: string, password?: string } = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as 'email' | 'password'] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      setLoading(true)
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/authenticate`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: false
        }
      );

      if (response.data?.token) {
        console.log('Login successful');
        localStorage.setItem('token', response.data.token);
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (error.response?.status === 429) {
        startCooldown(60); // Start cooldown for 60 seconds
        toast({
          title: "Too many login attempts. Try again after 1 minute",
        });
      } else {
        toast({
          title: "Login Failed. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  const startCooldown = (seconds: number) => {
    setIsCooldown(true);
    setCooldownTime(seconds);

    const interval = setInterval(() => {
      setCooldownTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Staggered animation for form fields
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="px-1"
    >
      <form onSubmit={handleSubmit}>
        <motion.div variants={item} className="mb-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MailIcon className="h-4 w-4 text-zinc-400" />
            </div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isCooldown}
              className="auth-input pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 hover:border-indigo-500/50 focus:border-indigo-500"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 mt-1 ml-1">
              {errors.email}
            </p>
          )}
        </motion.div>

        <motion.div variants={item} className="mb-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <LockIcon className="h-4 w-4 text-zinc-400" />
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isCooldown}
              className="auth-input pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 hover:border-indigo-500/50 focus:border-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-white"
            >
              {showPassword ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 mt-1 ml-1">
              {errors.password}
            </p>
          )}
        </motion.div>

        <motion.div variants={item} className="flex items-center justify-between mb-6">
          <span className="text-sm text-right font-medium text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors">
            <ForgotPassword />
          </span>
        </motion.div>

        <motion.div variants={item}>
          <Button
            type="submit"
            disabled={loading || isCooldown}
            className="text-white w-full md:w-fit"
          >
            {isCooldown ? `Try again in ${cooldownTime}s` : (loading ? 'Logging in...' : 'Log in')}
          </Button>
        </motion.div>
      </form>

      <motion.div variants={item} className="mt-6 text-center">
        <p className="text-sm text-zinc-400">
          Don't have an account?{' '}
          <span
            onClick={() => setActiveTab('signup')}
            className="font-medium text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors"
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Login;
