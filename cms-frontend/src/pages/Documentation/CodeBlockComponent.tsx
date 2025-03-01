import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, Maximize, Minimize } from 'lucide-react';

// Define the blog code to be displayed
const blogCode = `// Blog.jsx

import React, { useState, useEffect } from 'react';
import Head from './home/Head';
import axios from 'axios';
import MyComponent from './blog/MyComponent';

export default function Blog() {
    const [data, setData] = useState([]);
    const [test, setTest] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // insert the actual values from website
    const CMS_URL = 'schema_url';
    const API_KEY = 'your_api_key';

    // use it if you want to fetch other api
    const URL = 'other_schema_url';
    const API = 'your_other_api_key';

    // for first API fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(CMS_URL, {
                    headers: {
                        'X-API-Key': API_KEY
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch blog content');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // for another API fetch (if needed)
    useEffect(() => {
        const fetchTest = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(URL, {
                    headers: {
                        'X-API-Key': API
                    }
                });
                setTest(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch test content');
            } finally {
                setLoading(false);
            }
        }
        fetchTest();
    }, [])

    if (loading) {
        return <div className="p-5 text-center">Loading...</div>;
    }

    if (error) {
        return <div className="p-5 text-red-500">{error}</div>;
    }

    return (
        <div>
            <Head />
            {/* Example for the string data type */}
            <div className='flex flex-col gap-5 p-5'>
                {data.length > 0 ? (
                    <div>
                        {data.map((item, index) => (
                            <div key={index} className='flex flex-col gap-2'>
                                <div className='text-3xl font-bold underline text-orange-600 self-center'>
                                    {item.Title}
                                </div>
                                <div className='text-lg font-medium'>
                                    {/* This component is for the long string with paragraphs */}
                                    <MyComponent text={item.Data} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No blog content available</div>
                )}
            </div>

            {/* Example for all other data types */}
            <div>
                {test.length > 0 ? (
                    <div>
                        {test.map((item, index) => (
                            <div key={index} className="mb-4 p-4 border-b border-gray-300">
                                <div className="font-bold">ID: {item.Id}</div>
                                <div>Boolean: {item.Bool ? 'True' : 'False'}</div>

                                {/* List Items */}
                                <ul className="list-disc list-inside">
                                    {item.Data?.map((dataItem, i) => (
                                        <li key={i}>{dataItem}</li>
                                    ))}
                                </ul>

                                {/* Image Display */}
                                {item.Image && (
                                    <div className="mt-2">
                                        <img src={item.Image} alt="Test" className="w-40 h-40 object-cover rounded-lg" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>No test content available</div>
                )}
            </div>
        </div>
    );
}
    
// MyComponent.jsx
import React from 'react';

export default function MyComponent({ text }) {
    if (!text) return null;

    return (
        <div>
            {text.split('\\n\\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                    {paragraph}
                </p>
            ))}
        </div>
    );
}
`;

const CodeBlockComponent = () => {
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

export default CodeBlockComponent;