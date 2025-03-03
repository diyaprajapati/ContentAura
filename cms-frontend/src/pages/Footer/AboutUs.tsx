import { Separator } from "@/components/ui/separator";

export default function AboutUs() {
    return (
        <div className="space-y-6 content-section">
            <div className="space-y-2">
                <div>
                    <span className="chip mb-2">Company</span>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">About Us</h2>
                <p className="text-muted-foreground">
                    Learn about ContentAura's mission and vision
                </p>
            </div>
            <Separator className="my-6" />

            <section className="space-y-4">
                <h3 className="text-xl font-medium text-violet-300">Welcome to ContentAura</h3>
                <p>
                    ContentAura is a next-generation content management platform designed to streamline the way businesses and developers manage structured content. With an intuitive schema-based approach, we empower users to create, organize, and retrieve content seamlessly.
                </p>
            </section>

            <section className="space-y-4">
                <h3 className="text-xl font-medium text-violet-300">Our Vision</h3>
                <p>
                    Our mission is to make content management more <strong>flexible, scalable, and developer-friendly</strong>. We believe in providing a system that adapts to your needs rather than forcing you into rigid structures. Whether you are building a website, an application, or managing large-scale enterprise data, ContentAura simplifies the process.
                </p>
            </section>

            {/* <section className="space-y-6">
                <h3 className="text-xl font-medium">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="glass-panel p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Schema-Based Content Management</h4>
                        <p className="text-sm text-muted-foreground">Define flexible data models with ease.</p>
                    </div>
                    <div className="glass-panel p-4 rounded-lg">
                        <h4 className="font-medium mb-2">API-First Approach</h4>
                        <p className="text-sm text-muted-foreground">Seamless integration with applications.</p>
                    </div>
                    <div className="glass-panel p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Dynamic Data Handling</h4>
                        <p className="text-sm text-muted-foreground">Manage content efficiently without complex setups.</p>
                    </div>
                    <div className="glass-panel p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Scalable & Secure</h4>
                        <p className="text-sm text-muted-foreground">Built to handle data at any scale.</p>
                    </div>
                    <div className="glass-panel p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Real-Time Analytics</h4>
                        <p className="text-sm text-muted-foreground">Gain insights into content usage.</p>
                    </div>
                </div>
            </section> */}

            <section className="space-y-4">
                <h3 className="text-xl font-medium text-violet-300">Join Us</h3>
                <p>
                    Be a part of ContentAura and transform the way you manage content. For inquiries, contact us at <a href="mailto:contact@contentaura.com" className="text-primary hover:underline">contact@contentaura.com</a>.
                </p>
            </section>
        </div>
    );
}