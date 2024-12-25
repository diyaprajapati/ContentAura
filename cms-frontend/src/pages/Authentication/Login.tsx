import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

// validation schema 
const loginSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters")
})

// Infer TypeScript type from the schema
type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token !== null) {
      navigate('/dashboard');
    }
  }, [navigate])

  const onSubmit = async (data: LoginFormData) => {
    try {
      // API call
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/authenticate`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: false
        }
      );

      if (response.data?.token) {
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.token);
        navigate("/dashboard");
      }
      // Perform any redirection or state update here
    } catch (error: any) {
      // Handle error response
      const errorMessage =
        error.response?.data?.message || 'Something went wrong. Please try again.';
      console.error('Login error:', errorMessage);

      // You can show this message to the user, for example:
      alert(errorMessage);
    }
  }

  return (
    <div className="mt-3">
      <Card className="p-2">
        <CardContent className="space-y-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="hover:drop-shadow-sm hover:shadow-violet-800 hover:transition-all ease-in-out focus:drop-shadow-sm focus:shadow-violet-800"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="hover:drop-shadow-sm hover:shadow-violet-800 hover:transition-all ease-in-out focus:drop-shadow-sm focus:shadow-violet-800"
                {...register('password')}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
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
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}