import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { UserIcon, MailIcon, LockIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

// validation schema
const signupSchema = z.object({
  firstname: z.string()
    .min(1, "First name is required")
    .max(50, "First name must not exceed 50 characters"),
  lastname: z.string()
    .min(1, "Last name is required")
    .max(50, "Last name must not exceed 50 characters"),
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

// Infer the type from schema
type SignupFormData = z.infer<typeof signupSchema>

const Signup = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignupFormData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token !== null) {
      navigate('/dashboard');
    }
  }, [navigate])

  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({})
  const [loading, setLoading] = useState(false)

  const validateForm = () => {
    try {
      signupSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof SignupFormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof SignupFormData] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name as keyof SignupFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setLoading(true);
      const formDataNew = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
          formDataNew
        );
        if (response.status === 200) {
          console.log('Signup successful');
          localStorage.setItem('token', response.data.token);
          navigate('/dashboard');
        }
      }
      catch (error: any) {
        console.error('Signup error:', error);
        const message =
          error.response?.data?.message || 'Something went wrong. Please try again.';
        alert(message);
      }
      finally {
        setLoading(false);
      }
    }
  }

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
              <UserIcon className="h-4 w-4 text-zinc-400" />
            </div>
            <Input
              name="firstname"
              type="text"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
              className="auth-input pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 hover:border-indigo-500/50 focus:border-indigo-500"
            />
          </div>
          {errors.firstname && (
            <p className="text-sm text-red-500 mt-1 ml-1">
              {errors.firstname}
            </p>
          )}
        </motion.div>

        <motion.div variants={item} className="mb-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <UserIcon className="h-4 w-4 text-zinc-400" />
            </div>
            <Input
              name="lastname"
              type="text"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
              className="auth-input pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 hover:border-indigo-500/50 focus:border-indigo-500"
            />
          </div>
          {errors.lastname && (
            <p className="text-sm text-red-500 mt-1 ml-1">
              {errors.lastname}
            </p>
          )}
        </motion.div>

        <motion.div variants={item} className="mb-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <MailIcon className="h-4 w-4 text-zinc-400" />
            </div>
            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="auth-input pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 hover:border-indigo-500/50 focus:border-indigo-500"
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 mt-1 ml-1">
              {errors.password}
            </p>
          )}
          <p className="text-xs text-zinc-500 mt-1 ml-1">Must include uppercase, lowercase, and number</p>
        </motion.div>

        <motion.div variants={item} className="mb-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <LockIcon className="h-4 w-4 text-zinc-400" />
            </div>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="auth-input pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 hover:border-indigo-500/50 focus:border-indigo-500"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 mt-1 ml-1">
              {errors.confirmPassword}
            </p>
          )}
        </motion.div>

        <motion.div variants={item} className="flex items-center space-x-2 mb-6">
          <Checkbox id="terms" className="border-white/20 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500" required />
          <Label htmlFor="terms" className="text-sm font-medium text-zinc-300">
            I agree to the <span className="text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors">Terms of Service</span> and <span className="text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors">Privacy Policy</span>
          </Label>
        </motion.div>

        <motion.div variants={item}>
          <Button
            type="submit"
            disabled={loading}
            className="text-white w-full md:w-fit"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </motion.div>
      </form>

      <motion.div variants={item} className="mt-6 text-center">
        <p className="text-sm text-zinc-400">
          Already have an account?{' '}
          <span
            onClick={() => setActiveTab('login')}
            className="font-medium text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors"
          >
            Sign in
          </span>
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Signup