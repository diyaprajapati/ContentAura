import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import data from './data.json';

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

    useEffect(() => {
        setSteps(data.steps);
    }, []);

    return (
        <div className="flex flex-col gap-8 mx-8 my-4 pb-8">
            <div className="flex justify-between w-full items-center ml-5 md:mx-16">
                {/* Title */}
                <div>
                    <Label className="font-bold md:text-5xl text-4xl">Documentation</Label>
                </div>
            </div>
            {/* intro */}
            <div className="ml-5 md:w-[90%] self-center">
                <div className="mb-2">
                    <Label className="font-semibold text-2xl">Introduction</Label>
                </div>
                <div className="text-gray-200">
                    <p>ContentAura allows you to create, manage, and use dynamic content schemas, making it easy to integrate structured content into your applications via APIs. This guide walks you through how to create projects, define schemas, insert data, and use the provided API for seamless integration into your front-end applications.</p>
                </div>
                {/* Table of contents */}
                <div className="mt-5">
                    <Label className="font-semibold text-2xl">Table Of Contents</Label>
                </div>
                {/* getting started */}
                <div className="mt-5">
                    <Label className="font-semibold text-2xl">Getting Started</Label>
                </div>
                <div>
                    {steps.length > 0 ? (
                        steps.map((step, index) => (
                            <div key={index} className="mt-4">
                                <h3 className="text-xl font-semibold">
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
                <div className="mt-4 flex flex-col gap-2">
                    <div>
                        <Label className="text-xl font-semibold">Step 6: Using the API in React</Label>
                    </div>
                    <div>
                        <p>You can use the dynamic URL and API key in your React application to fetch and display the data from ContentAura.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}