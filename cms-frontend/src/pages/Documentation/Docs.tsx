import { Label } from "@/components/ui/label";
import { useEffect, useState, useRef } from "react";
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

    // Create refs for each section
    const gettingStartedRef = useRef<HTMLDivElement>(null);
    const apiStepRef = useRef<HTMLDivElement>(null);
    const conclusionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSteps(data.steps);
    }, []);

    // Scroll handler function
    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col gap-8 mx-8 my-4 pb-8">
            <div className="flex justify-between w-full items-center ml-5 md:mx-16">
                {/* Title */}
                <div>
                    <Label className="font-bold md:text-5xl text-4xl">Documentation</Label>
                </div>
            </div>
            {/* intro */}
            <div className="ml-5 md:w-[90%] self-center w-screen">
                <div className="mb-2">
                    <Label className="font-semibold text-2xl text-violet-200">Introduction</Label>
                </div>
                <div className="text-gray-200">
                    <p>ContentAura allows you to create, manage, and use dynamic content schemas, making it easy to integrate structured content into your applications via APIs. This guide walks you through how to create projects, define schemas, insert data, and use the provided API for seamless integration into your front-end applications.</p>
                </div>
                {/* Table of contents */}
                <div className="mt-5">
                    <Label className="font-semibold text-2xl text-violet-200">Table Of Contents</Label>
                    <ul className="mt-3 space-y-2 text-lg">
                        <li
                            onClick={() => scrollToSection(gettingStartedRef)}
                            className="cursor-pointer text-white hover:text-violet-200 transition-colors"
                        >
                            1. Getting Started
                        </li>
                        <li
                            onClick={() => scrollToSection(apiStepRef)}
                            className="cursor-pointer text-white hover:text-violet-200 transition-colors"
                        >
                            2. Using the API in React
                        </li>
                        <li
                            onClick={() => scrollToSection(conclusionRef)}
                            className="cursor-pointer text-white hover:text-violet-200 transition-colors"
                        >
                            3. Conclusion
                        </li>
                    </ul>
                </div>
                {/* getting started */}
                <div ref={gettingStartedRef} className="mt-5 text-violet-200">
                    <Label className="font-semibold text-2xl">Getting Started</Label>
                </div>
                <div>
                    {steps.length > 0 ? (
                        steps.map((step, index) => (
                            <div key={index} className="mt-4">
                                <h3 className="text-xl font-semibold text-violet-300">
                                    Step {step.step_number}: {step.title}
                                </h3>
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    {step.instructions.map((instruction, idx) => (
                                        <li key={idx} className="text-gray-200">
                                            {typeof instruction === 'object' ? (
                                                <div>
                                                    <strong>{instruction.field_name}</strong>: {instruction.field_type}
                                                </div>
                                            ) : (
                                                instruction
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>Loading documentation...</p>
                    )}
                </div>

                {/* code */}
                <div ref={apiStepRef} className="mt-4 flex flex-col gap-2">
                    <div>
                        <Label className="text-xl font-semibold text-violet-300">Step 6: Using the API in React</Label>
                    </div>
                    <div>
                        <p>You can use the dynamic URL and API key in your React application to fetch and display the data from ContentAura.</p>
                    </div>

                    {/* example code */}
                    <div>
                        <CodeBlockComponent />
                    </div>

                    {/* explanation */}
                    <div className="flex flex-col gap-2">
                        <div>
                            <Label className="text-xl text-violet-300">Explanation</Label>
                        </div>
                        <div className="flex flex-col gap-2">
                            <li><span className="font-semibold">CMS_URL:</span> Replace this with the dynamic URL from the Schema Tab. </li>
                            <li><span className="font-semibold">API_KEY:</span> Replace this with the API key from the API Tab. </li>
                        </div>
                        <div className="text-gray-200">
                            This React component fetches data from ContentAura and displays it dynamically on the front-end.
                        </div>
                    </div>

                    {/* Conclusion */}
                    <div ref={conclusionRef} className="flex flex-col gap-3">
                        <div>
                            <Label className="text-2xl text-violet-300 font-semibold">Conclusion</Label>
                        </div>
                        <div className="text-gray-200">
                            ContentAura makes it easy to manage structured content through dynamic forms and APIs. By following the steps outlined in this guide, you can create projects, define schemas, insert data, and use the API in your applications seamlessly.
                        </div>
                        <div className="text-gray-200">
                            For more help or troubleshooting, feel free to reach out.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}