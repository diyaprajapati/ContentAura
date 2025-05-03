"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getUserDetails, updateUserDetails } from "@/lib/api/user";
import LogoSpinner from "../Spinner/LogoSpinner";

const profileFormSchema = z.object({
    firstname: z.string().min(1, { message: "First name is required." }).max(50),
    lastname: z.string().min(1, { message: "Last name is required." }).max(50),
    email: z.string().email({ message: "Please enter a valid email address." }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
    const [loading, setLoading] = useState(true);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        mode: "onChange",
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
        },
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await getUserDetails();
                if (res?.data) {
                    form.reset({
                        firstname: res.data.firstname || "",
                        lastname: res.data.lastname || "",
                        email: res.data.email || "",
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user details", error);
                toast({
                    title: "Error",
                    description: "Could not load user details",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        // Use requestIdleCallback to reduce blocking time on mount (optional but useful)
        if ("requestIdleCallback" in window) {
            (window as any).requestIdleCallback(fetchUserDetails);
        } else {
            fetchUserDetails();
        }
    }, []); // No need to add form.reset in dependency array

    async function onSubmit(data: ProfileFormValues) {
        try {
            await updateUserDetails(data);
            toast({ title: "Success", description: "Profile updated successfully" });
        } catch (error) {
            console.error("Error updating profile:", error);
            toast({ title: "Error", description: "Could not update profile", variant: "destructive" });
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <LogoSpinner />
            </div>
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Update Profile</Button>
            </form>
        </Form>
    );
}
