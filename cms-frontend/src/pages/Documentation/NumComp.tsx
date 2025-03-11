import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Maximize, Minimize } from 'lucide-react';

// Define the blog code to be displayed
const blogCode = `//here courses is the state component in which you store the response data 

// For the Number datatype
<div className="font-bold">ID: {courses.FieldName}</div>

// For the Boolean datatype
<div className='text-lg'>Is Free: {course.FieldName ? 'Yes' : 'No'}</div>
`;

const NumComp = () => {
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(blogCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={`w-full relative transition-all duration-300 ${expanded ? 'h-[70vh]' : ''}`}>
            <div className="absolute top-4 right-4 flex space-x-2 z-10">
                <button
                    onClick={toggleExpand}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                    title={expanded ? "Collapse" : "Expand"}
                >
                    {expanded ? (
                        <Minimize className="h-4 w-4 text-gray-300" />
                    ) : (
                        <Maximize className="h-4 w-4 text-gray-300" />
                    )}
                </button>
                <button
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                    title={copied ? "Copied!" : "Copy code"}
                >
                    {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                    ) : (
                        <Copy className="h-4 w-4 text-gray-300" />
                    )}
                </button>
            </div>
            <div className={`${expanded ? 'h-full overflow-auto' : ''}`}>
                <SyntaxHighlighter
                    language="jsx"
                    style={oneDark}
                    showLineNumbers={true}
                    wrapLines={true}
                    customStyle={{
                        margin: '0',
                        borderRadius: '8px',
                        fontSize: '14px',
                        backgroundColor: '#1a1b26',
                        padding: '2.5rem 1rem 1rem 1rem',
                        height: expanded ? '100%' : 'auto',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    {blogCode}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default NumComp;