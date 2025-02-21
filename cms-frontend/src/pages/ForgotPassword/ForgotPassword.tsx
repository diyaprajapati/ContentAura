import React, { useState } from "react"
import axios from "axios"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { toast } from "@/hooks/use-toast"

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/

// Define the schema using Zod
const forgotPasswordSchema = z
    .object({
        email: z.string().email({ message: "Invalid email address" }),
        newPassword: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .max(50, "Password must not exceed 50 characters")
            .regex(
                passwordRegex,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number"
            ),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

export function ForgotPassword() {
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Validate form data using zod
        const result = forgotPasswordSchema.safeParse({
            email,
            newPassword,
            confirmPassword,
        })

        if (!result.success) {
            // Grab the first error message to display
            const errorMsg = result.error.errors[0].message
            toast({ title: "Error", description: errorMsg })
            return
        }

        setLoading(true)
        try {
            // Send POST request with axios
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/forgot-password`, {
                email,
                newPassword,
            })
            if (response.status === 200) {
                toast({ title: "Success" })
            }
            console.log(response.status);
            console.log("success", response.data);
        } catch (error: any) {
            // Check for error response message
            const message = error.response?.data?.message || "Something went wrong!"
            toast({ title: "Failed", description: message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Label className="cursor-pointer hover:underline hover:text-slate-300 transition-all">
                    Forgot password?
                </Label>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-5">
                <SheetHeader>
                    <SheetTitle>Reset Password</SheetTitle>
                    <SheetDescription>
                        Make changes to your password here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                placeholder="Email"
                                className="col-span-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="newpassword" className="text-right">
                                New Password
                            </Label>
                            <Input
                                id="newpassword"
                                placeholder="New password"
                                className="col-span-3"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="confirmpass" className="text-right">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmpass"
                                placeholder="Confirm password"
                                className="col-span-3"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Saving..." : "Save changes"}
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    )
}
