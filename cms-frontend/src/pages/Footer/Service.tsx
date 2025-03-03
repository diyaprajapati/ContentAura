import { Separator } from "@/components/ui/separator";

export default function Service() {
    return (
        <div className="space-y-6 content-section">
            <div className="space-y-2">
                <div>
                    <span className="chip mb-2">Legal</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Terms of Service</h2>
                <p className="text-muted-foreground">
                    Rules and guidelines for using ContentAura
                </p>
            </div>
            <Separator className="my-6" />

            <section className="space-y-4">
                <h3 className="text-xl font-medium text-violet-300">1. Acceptance of Terms</h3>
                <p>
                    By using ContentAura, you agree to comply with these Terms of Service. If you do not agree, please discontinue use of our services.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-medium text-violet-300">2. User Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>You must provide accurate information when creating an account.</li>
                    <li>You are responsible for maintaining account security.</li>
                    <li>Content uploaded must comply with applicable laws and our guidelines.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-medium text-violet-300">3. Prohibited Activities</h3>
                <p>Users may not:</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Use ContentAura for illegal or harmful activities.</li>
                    <li>Attempt to exploit, hack, or disrupt the service.</li>
                    <li>Upload harmful or malicious content.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-medium text-violet-300">4. Content Ownership</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Users retain ownership of their content.</li>
                    <li>ContentAura may use anonymized data for analytics and improvements.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-medium text-violet-300">5. Service Modifications</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>ContentAura reserves the right to update or discontinue services at any time.</li>
                    <li>Terms may be updated periodically, and continued use constitutes agreement to changes.</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-medium text-violet-300">6. Limitation of Liability</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>ContentAura is provided "as is" without warranties.</li>
                    <li>We are not liable for data loss, downtime, or unforeseen issues.</li>
                </ul>
                <p className="mt-4">
                    For any legal concerns, contact <a href="mailto:legal@contentaura.com" className="text-primary hover:underline">legal@contentaura.com</a>.
                </p>
            </section>

            <div className="mt-10 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                    © 2025 ContentAura. All Rights Reserved.
                </p>
            </div>
        </div>
    );
}