'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

const Tiptap = ({ value, onChange, className }) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: value || '',
        immediatelyRender: false,
        onUpdate({ editor }) {
            onChange?.(editor.getHTML())
        },
    })

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || '')
        }
    }, [value, editor])

    if (!editor) return null

    return (
        <div className="border rounded-xl bg-white shadow-sm">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 border-b p-2 bg-gray-50 rounded-t-xl">
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-3 py-1 text-sm rounded ${editor.isActive('bold')
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border'
                        }`}
                >
                    Bold
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-3 py-1 text-sm rounded ${editor.isActive('italic')
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border'
                        }`}
                >
                    Italic
                </button>

                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className={`px-3 py-1 text-sm rounded ${editor.isActive('heading', { level: 1 })
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border'
                        }`}
                >
                    H1
                </button>

                <button
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={`px-3 py-1 text-sm rounded ${editor.isActive('bulletList')
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border'
                        }`}
                >
                    Bullet List
                </button>
            </div>

            {/* Editor Area */}
            <EditorContent
                editor={editor}
                className={`p-4 min-h-[300px] focus:outline-none ${className}`}
            />
        </div>
    )
}

export default Tiptap