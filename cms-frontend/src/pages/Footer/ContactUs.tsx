import { Separator } from "@/components/ui/separator";
import { MailIcon, MapPinIcon, ClockIcon, BuildingIcon } from "lucide-react";

export default function ContactUs() {
    return (
        <div className="space-y-6 content-section">
            <div className="space-y-2">
                <div>
                    <span className="chip mb-2">Support</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Contact Us</h2>
                <p className="text-muted-foreground">
                    We'd love to hear from you! Get in touch with our team.
                </p>
            </div>
            <Separator className="my-6" />

            <p className="mb-8">
                Whether you have questions, feedback, or need support, feel free to reach out to us through any of the channels below.
            </p>

            <div className="grid grid-cols-1 gap-6">
                <div className="glass-panel p-6 rounded-lg">
                    <div className="flex items-start space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <MailIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-1">Email Support</h3>
                            <p className="text-muted-foreground mb-2">Reach our support team</p>
                            <a href="mailto:support@contentaura.com" className="text-primary hover:underline">support@contentaura.com</a>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-lg">
                    <div className="flex items-start space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <MapPinIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-1">Office Address</h3>
                            <p className="text-muted-foreground mb-2">Visit our headquarters</p>
                            <p>123, Tech Park, Nadiad, India</p>
                        </div>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-lg">
                    <div className="flex items-start space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <ClockIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-1">Support Hours</h3>
                            <p className="text-muted-foreground mb-2">When we're available</p>
                            <p>Monday – Friday, 9 AM – 6 PM IST</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 glass-panel p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <BuildingIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-1">Business Partnerships</h3>
                        <p className="text-muted-foreground mb-2">For partnership opportunities</p>
                        <a href="mailto:business@contentaura.com" className="text-primary hover:underline">business@contentaura.com</a>
                    </div>
                </div>
            </div>
        </div>
    );
}