"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { toast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"

const accountFormSchema = z.object({
    currentPassword: z.string().min(6, {
        message: "Current password must be at least 6 characters.",
    }),
    newPassword: z.string().min(6, {
        message: "New password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
        message: "Confirm password must be at least 6 characters.",
    }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
})

type AccountFormValues = z.infer<typeof accountFormSchema>

export function PasswordForm() {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(data: AccountFormValues) {
        try {
            setIsLoading(true)
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error("Authentication token not found");
            }

            // Corrected axios configuration
            const response = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/auth/update-password`,
                {
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response.data);

            // Show success message
            toast({
                title: "Success",
                description: "Your password has been updated successfully.",
            })

            // Reset form
            form.reset()

        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.error || error.message;
                toast({
                    title: "Error",
                    description: errorMessage,
                    variant: "destructive",
                });

                // Handle specific status codes
                if (error.response?.status === 401) {
                    // Handle unauthorized - maybe redirect to login
                    localStorage.removeItem('token');
                    // Add your redirect logic here
                }
            } else {
                toast({
                    title: "Error",
                    description: "An unexpected error occurred",
                    variant: "destructive",
                });
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter current password"
                                    {...field}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter new password"
                                    {...field}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Confirm new password"
                                    {...field}
                                    disabled={isLoading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Password"}
                </Button>
            </form>
        </Form>
    )
}