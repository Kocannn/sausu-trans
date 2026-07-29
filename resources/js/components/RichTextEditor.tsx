import { useEffect, useRef, useState, useCallback } from 'react';
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Highlighter,
    Heading1,
    Heading2,
    Heading3,
    Quote,
    List,
    ListOrdered,
    Link as LinkIcon,
    Code,
    Eye,
    RemoveFormatting,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Minus
} from 'lucide-react';

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeight?: string;
};

export default function RichTextEditor({ value, onChange, placeholder = 'Tuliskan konten artikel di sini...', minHeight = '350px' }: Props) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isCodeMode, setIsCodeMode] = useState(false);
    const [htmlValue, setHtmlValue] = useState(value || '');

    // Active format states for visual toggle indicators
    const [activeStates, setActiveStates] = useState({
        h1: false,
        h2: false,
        h3: false,
        bold: false,
        italic: false,
        underline: false,
        strikeThrough: false,
        blockquote: false,
        ul: false,
        ol: false,
        alignLeft: false,
        alignCenter: false,
        alignRight: false,
    });

    const updateActiveStates = useCallback(() => {
        if (isCodeMode || typeof document === 'undefined') return;
        try {
            const isBold = document.queryCommandState('bold');
            const isItalic = document.queryCommandState('italic');
            const isUnderline = document.queryCommandState('underline');
            const isStrike = document.queryCommandState('strikeThrough');
            const isUl = document.queryCommandState('insertUnorderedList');
            const isOl = document.queryCommandState('insertOrderedList');
            const isLeft = document.queryCommandState('justifyLeft');
            const isCenter = document.queryCommandState('justifyCenter');
            const isRight = document.queryCommandState('justifyRight');

            let blockVal = '';
            try {
                blockVal = (document.queryCommandValue('formatBlock') || '').toLowerCase();
            } catch {
                blockVal = '';
            }

            setActiveStates({
                h1: blockVal.includes('h1'),
                h2: blockVal.includes('h2'),
                h3: blockVal.includes('h3'),
                bold: isBold,
                italic: isItalic,
                underline: isUnderline,
                strikeThrough: isStrike,
                blockquote: blockVal.includes('blockquote'),
                ul: isUl,
                ol: isOl,
                alignLeft: isLeft,
                alignCenter: isCenter,
                alignRight: isRight,
            });
        } catch {
            // Ignore range errors
        }
    }, [isCodeMode]);

    // Track cursor selection change for active formatting state updates
    useEffect(() => {
        const handleSelectionChange = () => {
            updateActiveStates();
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    }, [updateActiveStates]);

    // Sync initial value or external updates
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value && !isCodeMode) {
            editorRef.current.innerHTML = value || '';
        }
        setHtmlValue(value || '');
    }, [value, isCodeMode]);

    const handleInput = () => {
        if (editorRef.current) {
            const currentHtml = editorRef.current.innerHTML;
            setHtmlValue(currentHtml);
            onChange(currentHtml);
            updateActiveStates();
        }
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setHtmlValue(val);
        onChange(val);
    };

    const toggleMode = (targetCodeMode: boolean) => {
        if (targetCodeMode === isCodeMode) return;

        if (targetCodeMode) {
            if (editorRef.current) {
                setHtmlValue(editorRef.current.innerHTML);
            }
        } else {
            setTimeout(() => {
                if (editorRef.current) {
                    editorRef.current.innerHTML = htmlValue;
                    updateActiveStates();
                }
            }, 50);
        }
        setIsCodeMode(targetCodeMode);
    };

    const executeCommand = (command: string, arg: string = '') => {
        if (isCodeMode) return;
        document.execCommand(command, false, arg);
        handleInput();
        updateActiveStates();
        if (editorRef.current) {
            editorRef.current.focus();
        }
    };

    const promptLink = () => {
        if (isCodeMode) return;
        const url = prompt('Masukkan URL Link (Contoh: https://desa-sausu.id):');
        if (url) {
            executeCommand('createLink', url);
        }
    };

    const toggleHighlight = () => {
        if (isCodeMode) return;
        executeCommand('hiliteColor', '#fef08a');
    };

    const getBtnStyle = (isActive: boolean) => {
        if (isActive) {
            return 'bg-amber-700 text-white dark:bg-amber-600 shadow-inner font-bold scale-[0.98]';
        }
        return 'hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300';
    };

    return (
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-background shadow-sm">
            {/* Rich Text Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                
                {/* Formatting Tools */}
                <div className="flex flex-wrap items-center gap-1">
                    {/* Headings */}
                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Judul Utama (H1)"
                        onClick={() => executeCommand('formatBlock', '<h1>')}
                        className={`px-2 py-1.5 rounded-lg text-xs font-extrabold disabled:opacity-30 flex items-center gap-1 transition-all ${getBtnStyle(
                            activeStates.h1
                        )}`}
                    >
                        <Heading1 className={`h-4 w-4 ${activeStates.h1 ? 'text-white' : 'text-amber-700'}`} /> H1
                    </button>

                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Judul Bagian (H2)"
                        onClick={() => executeCommand('formatBlock', '<h2>')}
                        className={`px-2 py-1.5 rounded-lg text-xs font-bold disabled:opacity-30 flex items-center gap-1 transition-all ${getBtnStyle(
                            activeStates.h2
                        )}`}
                    >
                        <Heading2 className={`h-4 w-4 ${activeStates.h2 ? 'text-white' : 'text-amber-700'}`} /> H2
                    </button>

                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Subjudul (H3)"
                        onClick={() => executeCommand('formatBlock', '<h3>')}
                        className={`px-2 py-1.5 rounded-lg text-xs font-bold disabled:opacity-30 flex items-center gap-1 transition-all ${getBtnStyle(
                            activeStates.h3
                        )}`}
                    >
                        <Heading3 className={`h-4 w-4 ${activeStates.h3 ? 'text-white' : 'text-amber-700'}`} /> H3
                    </button>

                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Paragraf Normal (Teks Biasa)"
                        onClick={() => executeCommand('formatBlock', '<p>')}
                        className="px-2 py-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 rounded-lg text-xs font-medium disabled:opacity-30 transition-all"
                    >
                        Normal
                    </button>

                    <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1" />

                    {/* Text Styling */}
                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Teks Tebal (Bold)"
                        onClick={() => executeCommand('bold')}
                        className={`p-1.5 rounded-lg disabled:opacity-30 transition-all ${getBtnStyle(activeStates.bold)}`}
                    >
                        <Bold className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Teks Miring (Italic)"
                        onClick={() => executeCommand('italic')}
                        className={`p-1.5 rounded-lg disabled:opacity-30 transition-all ${getBtnStyle(activeStates.italic)}`}
                    >
                        <Italic className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Garis Bawah (Underline)"
                        onClick={() => executeCommand('underline')}
                        className={`p-1.5 rounded-lg disabled:opacity-30 transition-all ${getBtnStyle(activeStates.underline)}`}
                    >
                        <Underline className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Coret Teks (Strikethrough)"
                        onClick={() => executeCommand('strikeThrough')}
                        className={`p-1.5 rounded-lg disabled:opacity-30 transition-all ${getBtnStyle(activeStates.strikeThrough)}`}
                    >
                        <Strikethrough className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Stabilo / Highlight Teks"
                        onClick={toggleHighlight}
                        className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-amber-800 bg-yellow-100 dark:bg-yellow-900/40 rounded-lg disabled:opacity-30 transition-all"
                    >
                        <Highlighter className="h-4 w-4" />
                    </button>

                    <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1" />

                    {/* Alignment */}
                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Rata Kiri"
                        onClick={() => executeCommand('justifyLeft')}
                        className={`p-1.5 rounded-lg disabled:opacity-30 transition-all ${getBtnStyle(activeStates.alignLeft)}`}
                    >
                        <AlignLeft className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Rata Tengah"
                        onClick={() => executeCommand('justifyCenter')}
                        className={`p-1.5 rounded-lg disabled:opacity-30 transition-all ${getBtnStyle(activeStates.alignCenter)}`}
                    >
                        <AlignCenter className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Rata Kanan"
                        onClick={() => executeCommand('justifyRight')}
                        className={`p-1.5 rounded-lg disabled:opacity-30 transition-all ${getBtnStyle(activeStates.alignRight)}`}
                    >
                        <AlignRight className="h-4 w-4" />
                    </button>

                    <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1" />

                    {/* Lists & Quote & HR */}
                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Daftar Poin"
                        onClick={() => executeCommand('insertUnorderedList')}
                        className={`p-1.5 rounded-lg disabled:opacity-30 transition-all ${getBtnStyle(activeStates.ul)}`}
                    >
                        <List className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Daftar Angka"
                        onClick={() => executeCommand('insertOrderedList')}
                        className={`p-1.5 rounded-lg disabled:opacity-30 transition-all ${getBtnStyle(activeStates.ol)}`}
                    >
                        <ListOrdered className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Kutipan Penting (Blockquote)"
                        onClick={() => executeCommand('formatBlock', 'blockquote')}
                        className={`p-1.5 rounded-lg disabled:opacity-30 transition-all ${getBtnStyle(activeStates.blockquote)}`}
                    >
                        <Quote className={`h-4 w-4 ${activeStates.blockquote ? 'text-white' : 'text-amber-700'}`} />
                    </button>

                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Garis Pemisah (Horizontal Rule)"
                        onClick={() => executeCommand('insertHorizontalRule')}
                        className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 rounded-lg disabled:opacity-30 transition-all"
                    >
                        <Minus className="h-4 w-4" />
                    </button>

                    <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1" />

                    {/* Link */}
                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Sisipkan Link"
                        onClick={promptLink}
                        className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 disabled:opacity-30 transition-colors"
                    >
                        <LinkIcon className="h-4 w-4 text-amber-700" />
                    </button>

                    {/* Clear Format */}
                    <button
                        type="button"
                        disabled={isCodeMode}
                        title="Hapus Format"
                        onClick={() => executeCommand('removeFormat')}
                        className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 disabled:opacity-30 transition-colors"
                    >
                        <RemoveFormatting className="h-4 w-4" />
                    </button>
                </div>

                {/* Mode Switcher Toggle Pill */}
                <div className="flex items-center bg-slate-200/80 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-300/50 dark:border-slate-700 shrink-0">
                    <button
                        type="button"
                        onClick={() => toggleMode(false)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            !isCodeMode
                                ? 'bg-white dark:bg-slate-900 text-amber-800 dark:text-amber-400 shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                    >
                        <Eye className="h-3.5 w-3.5" /> Mode Visual
                    </button>
                    <button
                        type="button"
                        onClick={() => toggleMode(true)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isCodeMode
                                ? 'bg-white dark:bg-slate-900 text-amber-800 dark:text-amber-400 shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                    >
                        <Code className="h-3.5 w-3.5" /> Kode HTML
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="relative p-6 bg-background" style={{ minHeight }}>
                {isCodeMode ? (
                    <textarea
                        value={htmlValue}
                        onChange={handleCodeChange}
                        className="w-full h-full min-h-[300px] font-mono text-xs p-4 bg-slate-900 text-amber-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-700 leading-relaxed"
                        rows={14}
                    />
                ) : (
                    <>
                        <div
                            ref={editorRef}
                            contentEditable
                            onInput={handleInput}
                            onBlur={handleInput}
                            onKeyUp={updateActiveStates}
                            onMouseUp={updateActiveStates}
                            style={{ minHeight: '300px' }}
                            className="rich-content outline-none font-sans text-slate-900 dark:text-slate-100 leading-relaxed max-w-none"
                        />

                        {/* Empty Placeholder */}
                        {!htmlValue && (
                            <div className="absolute top-6 left-6 pointer-events-none text-slate-400 text-sm italic">
                                {placeholder}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
