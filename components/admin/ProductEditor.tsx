"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef } from "react";

export default function ProductEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const lastValueRef = useRef(value);
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      lastValueRef.current = html;
      onChange(html);
    },
  });

  useEffect(() => {
    if (editor && value !== lastValueRef.current) {
      editor.commands.setContent(value, { emitUpdate: false });
      lastValueRef.current = value;
    }
  }, [editor, value]);

  return (
    <div className="rounded-2xl border border-gold/20 bg-white p-3">
      <EditorContent editor={editor} className="min-h-32 text-sm text-navy" />
    </div>
  );
}
