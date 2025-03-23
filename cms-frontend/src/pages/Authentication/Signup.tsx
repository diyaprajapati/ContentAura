import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserIcon, MailIcon, LockIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

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

  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({})
  const [loading, setLoading] = useState(false)
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token !== null) {
      navigate('/dashboard');
    }
  }, [navigate])

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
        if (error.response?.status === 429) {
          startCooldown(60); // Start cooldown for 60 seconds
          alert("Too many signup attempts. Try again after 1 minute.");
        } else {
          alert("Signup failed. Please try again.");
        }
      }
      finally {
        setLoading(false);
      }
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
        {["firstname", "lastname", "email", "password", "confirmPassword"].map((field, index) => (
          <motion.div key={index} variants={item} className="mb-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                {field === "email" ? <MailIcon className="h-4 w-4 text-zinc-400" /> :
                  field === "password" || field === "confirmPassword" ? <LockIcon className="h-4 w-4 text-zinc-400" /> :
                    <UserIcon className="h-4 w-4 text-zinc-400" />}
              </div>
              <Input
                name={field}
                type={
                  field === "password"
                    ? (showPassword ? "text" : "password")
                    : field === "confirmPassword"
                      ? (showConfirmPassword ? "text" : "password")
                      : "text"
                }
                placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                value={formData[field as keyof SignupFormData]}
                onChange={handleChange}
                disabled={isCooldown}
                className="auth-input pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 hover:border-indigo-500/50 focus:border-indigo-500"
              />

              {/* Toggle Password Visibility Button */}
              {field.includes("password") && (
                <button
                  type="button"
                  onClick={() =>
                    field === "password"
                      ? setShowPassword(!showPassword)
                      : setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-white"
                >
                  {field === "password"
                    ? (showPassword ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />)
                    : (showConfirmPassword ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />)}
                </button>

              )}

            </div>
            {errors[field as keyof SignupFormData] && (
              <p className="text-sm text-red-500 mt-1 ml-1">
                {errors[field as keyof SignupFormData]}
              </p>
            )}
          </motion.div>
        ))}
        <motion.div variants={item} className="flex items-center space-x-2 mb-6">
          <Checkbox id="terms" className="border-white/20 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500" required />
          <Label htmlFor="terms" className="text-sm font-medium text-zinc-300 flex gap-2">
            I agree to the
            <span className="text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors"><Link to='/public/terms'>Terms of Service</Link></span>
            and
            <span className="text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors"><Link to='/public/privacy'>Privacy Policy</Link></span>
          </Label>
        </motion.div>

        <motion.div variants={item}>
          <Button
            type="submit"
            disabled={loading || isCooldown}
            className="text-white w-full md:w-fit"
          >
            {isCooldown ? `Try again in ${cooldownTime}s` : (loading ? 'Signing up...' : 'Sign Up')}
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
            Log in
          </span>
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Signup;