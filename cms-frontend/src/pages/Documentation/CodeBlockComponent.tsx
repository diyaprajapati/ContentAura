import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

// Define the blog code to be displayed
const blogCode = `import React, { useState, useEffect } from 'react';
import Head from './home/Head';
import axios from 'axios';
import MyComponent from './blog/MyComponent';

// Define interfaces for type safety
interface BlogData {
  Title: string;
  Data: string;
  [key: string]: any; // For any additional fields
}

export default function Blog() {
  const [data, setData] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

//   Replace API_KEY and CMS_URL with your actual values.

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get<BlogData[]>(CMS_URL, {
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

  if (loading) {
    return <div className="p-5 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-500">{error}</div>;
  }

  return (
    <div>
      <Head />
      <div className='flex flex-col gap-5 p-5'>
        {data.length > 0 ? (
          <>
            <div className='text-3xl font-bold underline text-orange-600'>
              {data[0].Title}
            </div>
            <div className='text-lg font-medium'>
              <MyComponent text={data[0].Data} />
            </div>
          </>
        ) : (
          <div>No blog content available</div>
        )}
      </div>
    </div>
  );
}`;

const CodeBlockComponent = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(blogCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code:', err);
        }
    };

    return (
        <div className="w-full relative">
            <button
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
                title={copied ? "Copied!" : "Copy code"}
            >
                {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                ) : (
                    <Copy className="h-4 w-4 text-gray-300" />
                )}
            </button>
            <SyntaxHighlighter
                language="jsx"
                style={oneDark}
                showLineNumbers={true}
                wrapLines={true}
                customStyle={{
                    margin: '20px 0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: '#282c34',
                    padding: '2.5rem 1rem 1rem 1rem'
                }}
            >
                {blogCode}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlockComponent;

