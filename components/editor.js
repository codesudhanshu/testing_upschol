'use client'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
// import FileHandler from '@tiptap-pro/extension-file-handler'
import { Button, Modal, Input } from 'antd'
import React, { useState } from 'react'
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';

const MenuBar = ({ editor }) => {

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [linkUrl, setLinkUrl] = useState('');

	const handleAddLink = () => {
		if (linkUrl) {
			editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run();
			setIsModalOpen(false);
			setLinkUrl('');
			editor.commands.unsetMark('Link', { extendEmptyMarkRange: true })
		}
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const imageUrl = reader.result;
				editor.commands.setImage({
					src: imageUrl, 
					alt: file.name, 
					title: file.name,
				});
				editor.commands.deleteNode('Image', { extendEmptyMarkRange: true })
			};
			reader.readAsDataURL(file);
		}
	};
	if (!editor) {
		return null
	}
	return (
		<>
			<Button
				type='text'
				onClick={() => editor.chain().focus().toggleBold().run()}
				disabled={
					!editor.can()
						.chain()
						.focus()
						.toggleBold()
						.run()
				}
				style={{
					backgroundColor: editor.isActive('bold') ? '#7F56D9' : 'white',
					color: editor.isActive('bold') ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
				shape='round'
			>
				bold
			</Button>
			<Button
				type='text'
				onClick={() => editor.chain().focus().toggleItalic().run()}
				disabled={
					!editor.can()
						.chain()
						.focus()
						.toggleItalic()
						.run()
				}
				shape='round'
				style={{
					backgroundColor: editor.isActive('italic') ? '#7F56D9' : 'white',
					color: editor.isActive('italic') ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				italic
			</Button>
			<Button
				type='text'
				onClick={() => editor.chain().focus().toggleStrike().run()}
				disabled={
					!editor.can()
						.chain()
						.focus()
						.toggleStrike()
						.run()
				}
				shape='round'
				style={{
					backgroundColor: editor.isActive('strike') ? '#7F56D9' : 'white',
					color: editor.isActive('strike') ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				strike
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleCode().run()}
				disabled={
					!editor.can()
						.chain()
						.focus()
						.toggleCode()
						.run()
				}
				type='text'
				shape='round'
				style={{
					backgroundColor: editor.isActive('code') ? '#7F56D9' : 'white',
					color: editor.isActive('code') ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				code
			</Button>
			<Button onClick={() => editor.chain().focus().unsetAllMarks().run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: 'white',
					color: 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				clear marks
			</Button>
			<Button onClick={() => editor.chain().focus().clearNodes().run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: 'white',
					color: 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				clear nodes
			</Button>
			<Button
				onClick={() => editor.chain().focus().setParagraph().run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: editor.isActive('paragraph') ? '#7F56D9' : 'white',
					color: editor.isActive('paragraph') ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				paragraph
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: editor.isActive('heading', { level: 1 }) ? '#7F56D9' : 'white',
					color: editor.isActive('heading', { level: 1 }) ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				H1
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: editor.isActive('heading', { level: 2 }) ? '#7F56D9' : 'white',
					color: editor.isActive('heading', { level: 2 }) ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				H2
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: editor.isActive('heading', { level: 3 }) ? '#7F56D9' : 'white',
					color: editor.isActive('heading', { level: 3 }) ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				H3
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: editor.isActive('heading', { level: 4 }) ? '#7F56D9' : 'white',
					color: editor.isActive('heading', { level: 4 }) ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				H4
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: editor.isActive('heading', { level: 5 }) ? '#7F56D9' : 'white',
					color: editor.isActive('heading', { level: 5 }) ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				H5
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: editor.isActive('heading', { level: 6 }) ? '#7F56D9' : 'white',
					color: editor.isActive('heading', { level: 6 }) ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				H6
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: editor.isActive('bulletList') ? '#7F56D9' : 'white',
					color: editor.isActive('bulletList') ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				bullet list
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: editor.isActive('orderedList') ? '#7F56D9' : 'white',
					color: editor.isActive('orderedList') ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				ordered list
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: editor.isActive('codeBlock') ? '#7F56D9' : 'white',
					color: editor.isActive('codeBlock') ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				code block
			</Button>
			<Button
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: editor.isActive('blockquote') ? '#7F56D9' : 'white',
					color: editor.isActive('blockquote') ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				blockquote
			</Button>
			<Button onClick={() => editor.chain().focus().setHorizontalRule().run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: 'white',
					color: 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				horizontal rule
			</Button>
			<Button onClick={() => editor.chain().focus().setHardBreak().run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: 'white',
					color: 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				hard break
			</Button>
			<Button
				onClick={() => editor.chain().focus().undo().run()}
				disabled={
					!editor.can()
						.chain()
						.focus()
						.undo()
						.run()
				}
				type='text'
				shape='round'
				style={{
					backgroundColor: 'white',
					color: 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				undo
			</Button>
			<Button
				onClick={() => editor.chain().focus().redo().run()}
				disabled={
					!editor.can()
						.chain()
						.focus()
						.redo()
						.run()
				}
				type='text'
				shape='round'
				style={{
					backgroundColor: 'white',
					color: 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				redo
			</Button>
			<Button
				onClick={() => editor.chain().focus().setColor('#958DF1').run()}
				type='text'
				shape='round'
				style={{
					backgroundColor: editor.isActive('textStyle', { color: '#958DF1' }) ? '#7F56D9' : 'white',
					color: editor.isActive('textStyle', { color: '#958DF1' }) ? 'white' : 'black',
					margin: '3px 5px',
					border: '1px solid #7F56D9',
				}}
			>
				purple
			</Button>
			<div>
				<Button
					onClick={() => setIsModalOpen(true)}
					type="text"
					shape="round"
					style={{
						backgroundColor: editor.isActive('link') ? '#7F56D9' : 'white',
						color: editor.isActive('link') ? 'white' : 'black',
						margin: '3px 5px',
						border: '1px solid #7F56D9',
					}}
				>
					Add Link
				</Button>

				<Modal
					title="Add Link"
					visible={isModalOpen}
					onOk={handleAddLink}
					onCancel={() => setIsModalOpen(false)}
					okButtonProps={{
						style: {
							borderColor: '#eeefee',
							color: 'black',
							shadow: 'none',
						},
					}}
				>
					<Input
						placeholder="Enter URL"
						value={linkUrl}
						onChange={(e) => setLinkUrl(e.target.value)}
					/>
				</Modal>
			</div>
			<div>
				<Button
					type="text"
					shape="round"
					style={{
						margin: '3px 5px',
						border: '1px solid #7F56D9',
					}}
					onClick={() => document.getElementById('image-upload').click()}
				>
					Upload Image
				</Button>

				<input
					type="file"
					id="image-upload"
					accept="image/*"
					style={{ display: 'none' }}
					onChange={handleFileChange}
				/>
			</div>
		</>
	)
}

export default function Editor({
	handleContentChange, content
}) {
	const editor = useEditor({
		extensions: [
			Color.configure({ types: [TextStyle.name, ListItem.name] }),
			TextStyle.configure({ types: [ListItem.name] }),
			StarterKit.configure({
				bulletList: {
					keepMarks: true,
					addAttributes: {
						bullet: '•',
					},
					keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
				},
			}),
			Link.configure({
				defaultProtocol: 'https',
				autolink: true,
				linkOnPaste: true,
				HTMLAttributes: {
					class: 'my-custom-class',
				},
			}),

			Image.configure({
				inline: true,
				allowBase64: true,
				HTMLAttributes: {
					class: 'my-custom-class',
				},
			})
		],
		onUpdate: ({ editor }) => {
			const html = editor.getHTML()
			handleContentChange(html)
		},
		content: content,
	});

	return (
		<div
			className='editor-component'
		>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} style={{
				marginTop: '10px',
			}} />
		</div>
	)
}