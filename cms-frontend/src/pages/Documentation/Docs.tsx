import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, FileText, ChevronRight } from "lucide-react";
import data from './data.json';
import CodeBlockComponent from "./CodeBlockComponent";

// Define interfaces for our data structure
interface Instruction {
    field_name?: string;
    field_type?: string;
}

interface Step {
    step_number: number;
    title: string;
    instructions: (string | Instruction)[];
}

export default function Docs() {
    // Initialize state with proper type
    const [steps, setSteps] = useState<Step[]>([]);
    const [activeSection, setActiveSection] = useState<string>("intro");

    // Create refs for each section
    const introRef = useRef<HTMLDivElement>(null);
    const gettingStartedRef = useRef<HTMLDivElement>(null);
    const apiStepRef = useRef<HTMLDivElement>(null);
    const conclusionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSteps(data.steps);

        // Add scroll event listener to update active section
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100;

            const sections = [
                { ref: introRef, id: "intro" },
                { ref: gettingStartedRef, id: "getting-started" },
                { ref: apiStepRef, id: "api" },
                { ref: conclusionRef, id: "conclusion" }
            ];

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section.ref.current && section.ref.current.offsetTop <= scrollPosition) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll handler function
    const scrollToSection = (ref: React.RefObject<HTMLDivElement>, id: string) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(id);
    };

    return (
        <div className="min-h-screen from-gray-950 to-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header with gradient */}
                <div className="relative mb-16 text-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-lg blur-3xl opacity-20"></div>
                    <div className="relative">
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r  from-violet-400 to-indigo-300 bg-clip-text text-transparent mb-4">
                            Documentation
                        </h1>
                        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                            Learn how to create, manage, and use dynamic content schemas with ContentAura
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-8">
                            <Card className="border-gray-700 shadow-xl backdrop-blur-sm">
                                <CardContent className="p-5">
                                    <h2 className="text-xl font-bold mb-4 text-violet-300">Contents</h2>
                                    <nav className="space-y-1">
                                        <Button
                                            variant="ghost"
                                            className={`w-full justify-start text-left ${activeSection === "intro" ? "bg-violet-900/50 text-violet-200" : "text-gray-300 hover:text-violet-200"}`}
                                            onClick={() => scrollToSection(introRef, "intro")}
                                        >
                                            <BookOpen className="mr-2 h-4 w-4" />
                                            Introduction
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className={`w-full justify-start text-left ${activeSection === "getting-started" ? "bg-violet-900/50 text-violet-200" : "text-gray-300 hover:text-violet-200"}`}
                                            onClick={() => scrollToSection(gettingStartedRef, "getting-started")}
                                        >
                                            <FileText className="mr-2 h-4 w-4" />
                                            Getting Started
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className={`w-full justify-start text-left ${activeSection === "api" ? "bg-violet-900/50 text-violet-200" : "text-gray-300 hover:text-violet-200"}`}
                                            onClick={() => scrollToSection(apiStepRef, "api")}
                                        >
                                            <Code className="mr-2 h-4 w-4" />
                                            Using the API
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            className={`w-full justify-start text-left ${activeSection === "conclusion" ? "bg-violet-900/50 text-violet-200" : "text-gray-300 hover:text-violet-200"}`}
                                            onClick={() => scrollToSection(conclusionRef, "conclusion")}
                                        >
                                            <ChevronRight className="mr-2 h-4 w-4" />
                                            Conclusion
                                        </Button>
                                    </nav>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="lg:col-span-9 space-y-12">
                        {/* Introduction section */}
                        <section ref={introRef} id="intro" className="scroll-mt-24">
                            <Card className="backdrop-blur-sm border border-gray-700/50 shadow-lg">
                                <CardContent className="p-8">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-violet-300">Introduction</h2>
                                    <p className="text-gray-300 leading-relaxed">
                                        ContentAura allows you to create, manage, and use dynamic content schemas, making it easy to integrate structured content into your applications via APIs. This guide walks you through how to create projects, define schemas, insert data, and use the provided API for seamless integration into your front-end applications.
                                    </p>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Getting Started section */}
                        <section ref={gettingStartedRef} id="getting-started" className="scroll-mt-24">
                            <Card className="backdrop-blur-sm border border-gray-700/50 shadow-lg">
                                <CardContent className="p-8">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-violet-300">Getting Started</h2>

                                    {steps.length > 0 ? (
                                        <div className="space-y-8">
                                            {steps.map((step, index) => (
                                                <div key={index} className="border-b border-gray-700/50 pb-6 last:border-0 last:pb-0">
                                                    <h3 className="text-xl font-semibold mb-4 flex items-center text-violet-200">
                                                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-600/20 text-violet-300 mr-3">
                                                            {step.step_number}
                                                        </div>
                                                        {step.title}
                                                    </h3>
                                                    <ul className="space-y-3 ml-12">
                                                        {step.instructions.map((instruction, idx) => (
                                                            <li key={idx} className="flex items-start text-gray-300">
                                                                <ChevronRight className="h-5 w-5 text-violet-400 mr-2 flex-shrink-0 mt-0.5" />
                                                                <span>
                                                                    {typeof instruction === 'object' ? (
                                                                        <span>
                                                                            <span className="font-medium text-violet-200">{instruction.field_name}</span>: {instruction.field_type}
                                                                        </span>
                                                                    ) : (
                                                                        instruction
                                                                    )}
                                                                </span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="animate-pulse flex space-x-4 p-4 bg-gray-800/50 rounded-lg">
                                            <div className="flex-1 space-y-4 py-1">
                                                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                                <div className="space-y-2">
                                                    <div className="h-4 bg-gray-700 rounded"></div>
                                                    <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </section>

                        {/* API section */}
                        <section ref={apiStepRef} id="api" className="scroll-mt-24">
                            <Card className="backdrop-blur-sm border border-gray-700/50 shadow-lg">
                                <CardContent className="p-8">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-violet-300">Using the API in React</h2>
                                    <p className="text-gray-300 mb-6">
                                        You can use the dynamic URL and API key in your React application to fetch and display the data from ContentAura.
                                    </p>

                                    {/* Code example */}
                                    <div className="my-8">
                                        <CodeBlockComponent />
                                    </div>

                                    {/* Key points */}
                                    <div className="rounded-lg mt-6">
                                        <h3 className="text-xl font-semibold mb-4 text-violet-200">Key Points</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start text-gray-300">
                                                <ChevronRight className="h-5 w-5 text-violet-400 mr-2 flex-shrink-0 mt-0.5" />
                                                <span>
                                                    <span className="font-medium text-violet-200">CMS_URL:</span> Replace this with the dynamic URL from the Schema Tab.
                                                </span>
                                            </li>
                                            <li className="flex items-start text-gray-300">
                                                <ChevronRight className="h-5 w-5 text-violet-400 mr-2 flex-shrink-0 mt-0.5" />
                                                <span>
                                                    <span className="font-medium text-violet-200">API_KEY:</span> Replace this with the API key from the API Tab.
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Conclusion section */}
                        <section ref={conclusionRef} id="conclusion" className="scroll-mt-24">
                            <Card className="backdrop-blur-sm border border-gray-700/50 shadow-lg">
                                <CardContent className="p-8">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-violet-300">Conclusion</h2>
                                    <p className="text-gray-300 mb-6 leading-relaxed">
                                        ContentAura makes it easy to manage structured content through dynamic forms and APIs. By following the steps outlined in this guide, you can create projects, define schemas, insert data, and use the API in your applications seamlessly.
                                    </p>
                                    <div className="bg-violet-900/20 border border-violet-700/30 rounded-lg p-6">
                                        <p className="text-violet-200 font-medium">
                                            For more help or troubleshooting, feel free to reach out through our support channels.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}