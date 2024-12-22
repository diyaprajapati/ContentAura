import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { z } from 'zod'

// validation schema
const signupSchema = z.object({
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
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: ''
  })
  
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
      setIsSubmitting(true)
      try {
        // API call
        console.log('Form submitted:', formData)

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000)) 
      } catch (error) {
        console.error('Signup error:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <div className="mt-3">
      <Card className="p-2">
        <CardContent className="space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
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