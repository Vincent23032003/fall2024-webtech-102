import React, { useEffect, useRef, useState } from 'react';
import { Editor } from '@tiptap/core';
import { useRouter } from "next/navigation";
import { supabase } from "../supabaseClient";
import { User } from "@supabase/supabase-js";
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { Color } from '@tiptap/extension-color';
import Bold from '@tiptap/extension-bold';

const WysiwygEditor: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const editorRef = useRef<Editor | null>(null);
    const editorRef2 = useRef<HTMLDivElement>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleInput = () => {
        if (editorRef2.current) {
            setDescription(editorRef2.current.textContent || "");
        }
    };

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error("User recovery error :", error.message);
                setUser(null);
            } else {
                setUser(user);
            }
        };

        checkUser();
    }, []);

    const handleCreateArticle = async () => {
        if (!title || !description) {
            setError("Fill all required fields please.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            if (!user) {
                throw new Error("User not logged in.");
            }

            const createdDate = new Date().toISOString();

            const { data, error } = await supabase
                .from("articles")
                .insert({
                    title,
                    description,
                    authorid: user.id,
                    created_date: createdDate,
                    likes: 0,
                    comments: [],
                })
                .select();

            if (error) {
                throw error;
            }

            if (data) {

                router.push("/blog");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "Error when creating the article.");
            } else {
                setError("An unexpected error has occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!document.getElementById('wysiwyg-text-example')) return;


        const FontSizeTextStyle = TextStyle.extend({
            addAttributes() {
                return {
                    fontSize: {
                        default: null,
                        parseHTML: (element: HTMLElement) => element.style.fontSize,
                        renderHTML: (attributes: { fontSize: string | null }) => {
                            if (!attributes.fontSize) {
                                return {};
                            }
                            return { style: `font-size: ${attributes.fontSize}` };
                        },
                    },
                };
            },
        });


        const CustomBold = Bold.extend({
            renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, any> }) {
                return ['span', { ...HTMLAttributes, style: 'font-weight: bold;' }, 0];
            },
            excludes: '',
        });


        const editor = new Editor({
            element: document.querySelector('#wysiwyg-text-example') as HTMLElement,
            extensions: [
                StarterKit,
                CustomBold,
                Highlight,
                Underline,
                Subscript,
                Superscript,
                TextStyle,
                FontSizeTextStyle,
                Color,
                FontFamily,
            ],
            content: '',
            editorProps: {
                attributes: {
                    class: 'format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none',
                },
            },
        });

        editorRef.current = editor;


        const setupButtonListeners = () => {
            document
                .getElementById('toggleBoldButton')
                ?.addEventListener('click', () => editor.chain().focus().toggleBold().run());
            document
                .getElementById('toggleItalicButton')
                ?.addEventListener('click', () => editor.chain().focus().toggleItalic().run());
            document
                .getElementById('toggleUnderlineButton')
                ?.addEventListener('click', () => editor.chain().focus().toggleUnderline().run());
            document
                .getElementById('toggleHighlightButton')
                ?.addEventListener('click', () => {
                    const isHighlighted = editor.isActive('highlight');
                    editor.chain().focus().toggleHighlight().run();
                });
        };

        setupButtonListeners();

        return () => {
            editor.destroy();
        };
    }, []);

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateArticle();
                }}
                className="space-y-6"
            >
                <div>
                    <label htmlFor="title" className="block text-lg font-bold text-white">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}

                <div className='wysiwyg-container'>
                    <label htmlFor="title" className="block mt-4 text-lg font-bold text-white">
                        Content of the article
                    </label>
                    <div className="w-full border border-gray-200 rounded-lg bg-gray-50">
                        <div className="px-3 py-2 border-b">
                            <div className="flex items-center space-x-1 rtl:space-x-reverse flex-wrap"></div>
                            <div className="wysiwyg-container">
                                {/* Toolbar Buttons */}
                                <div className="toolbar">
                                    <button id="toggleBoldButton" type='button' className='p-1.5 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'>
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6" />
                                        </svg>
                                    </button>
                                    <button id="toggleItalicButton" type='button' className='p-1.5 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'>
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m8.874 19 6.143-14M6 19h6.33m-.66-14H18" />
                                        </svg>
                                    </button>
                                    <button id="toggleUnderlineButton" type='button' className='p-1.5 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'>
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M6 19h12M8 5v9a4 4 0 0 0 8 0V5M6 5h4m4 0h4" />
                                        </svg>
                                    </button>
                                    <button id="toggleHighlightButton" type='button' className='p-1.5 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600'>
                                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M9 19.2H5.5c-.3 0-.5-.2-.5-.5V16c0-.2.2-.4.5-.4h13c.3 0 .5.2.5.4v2.7c0 .3-.2.5-.5.5H18m-6-1 1.4 1.8h.2l1.4-1.7m-7-5.4L12 4c0-.1 0-.1 0 0l4 8.8m-6-2.7h4m-7 2.7h2.5m5 0H17" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Editor Content */}
                                <div className="px-4 py-2 bg-white rounded-b-lg">
                                    <div
                                        id="wysiwyg-text-example"
                                        ref={editorRef2}
                                        contentEditable={true}
                                        onInput={handleInput}
                                        className="block w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                        style={{
                                            minHeight: "100px",
                                            overflowY: "auto",
                                        }}
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex justify-center bg-blue-900 text-white px-4 py-2 rounded-lg hover:text-yellow-400 border hover:border-yellow-400 border-2 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {loading ? "Publish in progress..." : "Publish article !"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WysiwygEditor;
