'use client'
import { Box } from '@mui/material'
import DOMPurify from 'isomorphic-dompurify'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import { useEffect, useMemo } from 'react'
import Quill from 'quill'
import { useTheme } from '@mui/material'

const Block = Quill.import('blots/block')
Block.tagName = 'div'
Quill.register(Block, true)

const Delta = Quill.import('delta')

const RichTextEditor = ({ onChange, isEditing, sx, value, children }) => {
  const theme = useTheme()

  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ header: [1, 2, 3, false] }],
        ['clean'],
      ],
      clipboard: {
        matchers: [
          [
            Node.ELEMENT_NODE,
            function (node, delta) {
              return delta.compose(
                new Delta().retain(delta.length(), {
                  color: false,
                  background: false,
                  font: false,
                  size: false,
                  indent: false,
                  align: false,
                })
              )
            },
          ],
        ],
      },
    },
    theme: 'snow',
    readOnly: !isEditing,
  })

  const editorStyles = useMemo(
    () => ({
      '.ql-container': {
        minHeight: '200px',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '0 0 4px 4px',
        border: `1px solid ${theme.palette.divider}`,
        borderTop: 0,
        fontSize: '0.8rem',
      },
      '& .ql-editor': {
        minHeight: '200px',
        height: 'auto',
        overflow: 'hidden',
      },
      '.ql-toolbar': {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '4px 4px 0 0',
        border: `1px solid ${theme.palette.divider}`,
      },
      '.ql-stroke': {
        stroke: `${theme.palette.text.primary} !important`,
      },
      '.ql-fill': {
        fill: `${theme.palette.text.primary} !important`,
      },
      '.ql-picker': {
        color: `${theme.palette.text.primary} !important`,
      },
      '.ql-picker-options': {
        backgroundColor: `${theme.palette.background.paper} !important`,
        border: `1px solid ${theme.palette.divider}`,
      },
      '.ql-tooltip': {
        backgroundColor: `${theme.palette.background.paper} !important`,
        color: `${theme.palette.text.primary} !important`,
        border: `1px solid ${theme.palette.divider}`,
      },
      '.ql-toolbar.ql-snow .ql-formats': {
        marginRight: '10px',
      },
      // Style for active buttons
      '.ql-active': {
        '.ql-stroke': {
          stroke: `${theme.palette.secondary.main} !important`,
        },
        '.ql-fill': {
          fill: `${theme.palette.secondary.main} !important`,
        },
      },
      // Hover states
      '.ql-toolbar button:hover': {
        '.ql-stroke': {
          stroke: `${theme.palette.secondary.main} !important`,
        },
        '.ql-fill': {
          fill: `${theme.palette.secondary.main} !important`,
        },
      },
      '.ql-toolbar & .ql-picker-label:hover': {
        color: `${theme.palette.secondary.main} !important`,
      },
      // Style for header dropdown
      '.ql-picker.ql-header': {
        '.ql-picker-label:hover': {
          color: `${theme.palette.secondary.main} !important`,
        },
        '.ql-picker-item:hover': {
          color: `${theme.palette.secondary.main} !important`,
        },
        '.ql-picker-item.ql-selected': {
          color: `${theme.palette.secondary.main} !important`,
        },
        '.ql-picker-label.ql-active': {
          color: `${theme.palette.secondary.main} !important`,
        },
      },
    }),
    [theme]
  )

  useEffect(() => {
    const sanitizedValue = DOMPurify.sanitize(value)
    if (quill && sanitizedValue !== quill.root.innerHTML) {
      quill.root.innerHTML = sanitizedValue || ''
    }
  }, [quill, value])

  useEffect(() => {
    if (quill) {
      const handleTextChange = () => {
        onChange?.(DOMPurify.sanitize(quill.root.innerHTML))
      }

      quill.on('text-change', handleTextChange)

      return () => {
        quill.off('text-change', handleTextChange)
      }
    }
  }, [quill, onChange])

  useEffect(() => {
    if (typeof window !== 'undefined' && quill) {
      // Set text color
      quill.root.style.color = theme.palette.text.primary

      // Handle toolbar visibility
      const toolbar = document.querySelector('.ql-toolbar')
      if (toolbar) {
        toolbar.style.display = isEditing ? 'block' : 'none'
      }

      // Handle container styling
      const container = document.querySelector('.ql-container')
      if (container) {
        container.style.border = isEditing
          ? `1px solid ${theme.palette.divider}`
          : 'none'
        quill.enable(isEditing)
      }
    }
  }, [
    quill,
    theme.palette.mode,
    isEditing,
    theme.palette.text.primary,
    theme.palette.divider,
  ])

  return (
    <Box sx={{ ...editorStyles, ...sx }}>
      {children}
      <Box ref={quillRef} />
    </Box>
  )
}

export default RichTextEditor
