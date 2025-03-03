import { Separator } from "@/components/ui/separator";

export default function Privacy() {
    return (
        <div className="space-y-6 content-section">
            <div className="space-y-2">
                <div>
                    <span className="chip mb-2">Legal</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Privacy Policy</h2>
                <p className="text-muted-foreground">
                    How we collect, use, and protect your data
                </p>
            </div>
            <Separator className="my-6" />

            <section className="space-y-4">
                <h3 className="text-xl font-medium text-violet-300">1. Introduction</h3>
                <p>
                    Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data when you use ContentAura.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-medium text-violet-300">2. Information We Collect</h3>
                <p>
                    We may collect the following types of information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Personal Information:</strong> Name, email address, and contact details.</li>
                    <li><strong>Usage Data:</strong> Interactions with the platform, logs, and analytics.</li>
                    <li><strong>Cookies:</strong> To enhance user experience and track preferences.</li>
                </ul>
            </section>

            <section className="space-y-4 ">
                <h3 className="text-xl font-medium text-violet-300">3. How We Use Your Information</h3>
                <p>
                    We use collected data to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Provide and improve our services.</li>
                    <li>Ensure security and prevent fraud.</li>
                    <li>Personalize user experience.</li>
                    <li>Analyze platform performance.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-medium text-violet-300">4. Data Sharing and Security</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>We do not sell user data to third parties.</li>
                    <li>Data is stored securely with encryption.</li>
                    <li>Third-party services (e.g., analytics, payment gateways) may process data in compliance with their policies.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-medium text-violet-300">5. User Rights</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Request access to your data.</li>
                    <li>Request correction or deletion of data.</li>
                    <li>Opt-out of certain data collection features.</li>
                </ul>
                <p className="mt-4">
                    For privacy-related inquiries, contact <a href="mailto:privacy@contentaura.com" className="text-primary hover:underline">privacy@contentaura.com</a>.
                </p>
            </section>
        </div>
    );
}