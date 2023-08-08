import { useRef, useState, useEffect } from 'react';
import Layout from '@/components/layout';
import styles from '@/styles/Home.module.css';
import { Message } from '@/types/chat';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import LoadingDots from '@/components/ui/LoadingDots';
import { Document } from 'langchain/document';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const showSources = false;

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordVerified, setPasswordVerified] = useState<boolean>(false);

  const [messageState, setMessageState] = useState<{
    messages: Message[];
    pending?: string;
    history: [string, string][];
    pendingSourceDocs?: Document[];
  }>({
    messages: [
      {
        message: 'Welcome to AIHR, what would you like to study?',
        type: 'apiMessage',
      },
    ],
    history: [],
  });

  const messageListRef = useRef<HTMLDivElement>(null); // Ref for message list container
  const textAreaRef = useRef<HTMLTextAreaElement>(null); // Ref for the text area

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();

    setError(null);

    if (!query) {
      alert('Please input a question');
      return;
    }

    if (!passwordVerified) {
      if (query.trim() !== 'Paulus2happy') {
        setError('Incorrect password. Please enter the correct password.');
        return;
      }
      setPasswordVerified(true);
      setQuery('');
      return;
    }

    // hardcoded messages
    if (query.trim().startsWith('What does') || query.trim().startsWith('How much')) {
      setMessageState((state) => ({
        ...state,
        messages: [
          ...state.messages,
          {
            type: 'userMessage',
            message: query.trim(),
          },
          {
            type: 'apiMessage',
            message: `The single course is € 875 but the Full Access program is only € 1,450 for 11 courses instead of € 8,750. This is our best investment deal.  `,
          },
        ],
      }));
      setQuery('');
      return;
    }

    if (query.trim().startsWith('Can I buy')) {
      setMessageState((state) => ({
        ...state,
        messages: [
          ...state.messages,
          {
            type: 'userMessage',
            message: query.trim(),
          },
          {
            type: 'apiMessage',
            message: `The single course is €875. Consider the People Analytics and HR Data Analyst courses for a well-rounded expertise that fit your goal. Instead of 3 x € 875 we have a Full Access option of € 1,450 for 11 courses!`,
          },
        ],
      }));
      setQuery('');
      return;
    }



    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: 'userMessage',
          message: query.trim(),
        },
      ],
    }));

    setLoading(true);
    setQuery('');

    // Continue with the existing logic...
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: query.trim(),
          //history: messageState.history,
        }),
      });
      const data = await response.json();
      console.log('data', data);

      if (data.error) {
        setError(data.error);
      } else {
        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: data.text,
              sourceDocs: data.sourceDocuments,
            },
          ],
          //history: [...state.history, [query.trim(), data.text]],
        }));
      }

      setLoading(false);
      messageListRef.current?.scrollTo(0, messageListRef.current.scrollHeight);
    } catch (error) {
      setLoading(false);
      setError('An error occurred while fetching the data. Please try again.');
      console.log('error', error);
    }
  }

  const handleEnter = (e: any) => {
    if (e.key === 'Enter' && query) {
      handleSubmit(e);
    } else if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <>
      <Layout>
        <div className="mx-auto flex flex-col gap-4">
          <h1 className="text-2xl font-bold leading-[1.1] tracking-tighter text-center text-black-500">
            waypost.ai AIHR demo
          </h1>
          <main className={styles.main}>
            <div className={styles.cloud}>
              <div ref={messageListRef} className={styles.messagelist}>
                {messageState.messages.map((message, index) => {
                  let icon;
                  let className;
                  if (message.type === 'apiMessage') {
                    icon = (
                      <Image
                        key={index}
                        //src="/images/waypost_icon.png"
                        src="/waypost_icon4.png"
                        alt="AI"
                        width="40"
                        height="40"
                        className={styles.boticon}
                        priority
                      />
                    );
                    className = styles.apimessage;
                  } else {
                    icon = (
                      <Image
                        key={index}
                        src="/usericon2.png"
                        alt="Me"
                        width="30"
                        height="30"
                        className={styles.usericon}
                        priority
                      />
                    );
                    // The latest message sent by the user will be animated while waiting for a response
                    className =
                      loading && index === messageState.messages.length - 1
                        ? styles.usermessagewaiting
                        : styles.usermessage;
                  }
                  return (
                    <div key={`chatMessage-${index}`} className={className}>
                      {icon}
                      <div className={styles.markdownanswer}>
                        <ReactMarkdown linkTarget="_blank">
                          {message.message}
                        </ReactMarkdown>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className={styles.center}>
              <div className={styles.cloudform}>
                <form onSubmit={handleSubmit}>
                  {!passwordVerified && (
                    <input
                      type="password"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Enter password here"
                      className={styles.passwordInput}
                    />
                  )}
                  {passwordVerified && (
                    <>
                      <textarea
                        disabled={loading}
                        onKeyDown={handleEnter}
                        ref={textAreaRef}
                        autoFocus={false}
                        rows={1}
                        maxLength={512}
                        id="userInput"
                        name="userInput"
                        placeholder={
                          loading
                            ? 'Waiting for response...'
                            : 'Post here and I will guide your way'
                        }
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className={styles.textarea}
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className={styles.generatebutton}
                      >
                        {loading ? (
                          <div className={styles.loadingwheel}>
                            <LoadingDots color="#000" />
                          </div>
                        ) : (
                          <svg
                            viewBox="0 0 20 20"
                            className={styles.svgicon}
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                          </svg>
                        )}
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>
            {error && (
              <div className="border border-red-400 rounded-md p-4">
                <p className="text-red-500">{error}</p>
              </div>
            )}
          </main>
        </div>
        <footer className="m-auto p-4">
          <a href="https://waypost.ai">developed by waypost.ai with care</a>
        </footer>
      </Layout>
    </>
  );
}
