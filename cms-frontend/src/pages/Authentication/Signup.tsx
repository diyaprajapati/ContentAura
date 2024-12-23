import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

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

export default function Signup() {

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
  }, [])

  const [errors, setErrors] = useState<Partial<Record<keyof SignupFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      setIsSubmitting(true);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
          formData
        );
        if (response.status === 200) {
          console.log('Signup successful:', response.data);
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
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="mt-3">
      <Card className="p-2">
        <CardContent className="space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* First name */}
            <div>
              <Label>First name</Label>
              <Input id='fname' name='firstname' type='text' placeholder='First name' value={formData.firstname} onChange={handleChange} />
              {errors.firstname && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.firstname}
                </p>
              )}
            </div>

            {/* Last name */}
            <div>
              <Label>Last name</Label>
              <Input id='lname' name='lastname' type='text' placeholder='Last name' value={formData.lastname} onChange={handleChange} />
            </div>
            {/* email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="hover:drop-shadow-sm hover:shadow-violet-800 hover:transition-all ease-in-out focus:drop-shadow-sm focus:shadow-violet-800"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="hover:drop-shadow-sm hover:shadow-violet-800 hover:transition-all ease-in-out focus:drop-shadow-sm focus:shadow-violet-800"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* confirm password */}
            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="hover:drop-shadow-sm hover:shadow-violet-800 hover:transition-all ease-in-out focus:drop-shadow-sm focus:shadow-violet-800"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* button */}
            <div className="w-full">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing up...' : 'Sign Up'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}