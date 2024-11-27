'use client'
import { Box } from '@mui/material'
import DOMPurify from 'isomorphic-dompurify'
import { useEffect, useMemo } from 'react'
import { useTheme } from '@mui/material'
import dynamic from 'next/dynamic'

// Dynamically import Quill and its components
const QuillWrapper = dynamic(
  async () => {
    const Quill = (await import('quill')).default
    const { useQuill } = await import('react-quilljs')
    await import('quill/dist/quill.snow.css')

    // Create Delta instance
    const Delta = Quill.import('delta')

    // Return the component
    const QuillEditor = ({
      children,
      value,
      onChange,
      isEditing,
      themeConfig,
      ...props
    }) => {
      const modules = {
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
      }

      const { quill, quillRef } = useQuill({
        ...props,
        modules,
      })

      // Handle value updates
      useEffect(() => {
        const sanitizedValue = DOMPurify.sanitize(value)
        if (quill && sanitizedValue !== quill.root.innerHTML) {
          quill.root.innerHTML = sanitizedValue || ''
        }
      }, [quill, value])

      // Handle text changes
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

      // Handle styling and editing state
      useEffect(() => {
        if (quill) {
          quill.root.style.color = themeConfig.palette.text.primary
          const toolbar = document.querySelector('.ql-toolbar')
          if (toolbar) {
            toolbar.style.display = isEditing ? 'block' : 'none'
          }
          const container = document.querySelector('.ql-container')
          if (container) {
            container.style.border = isEditing
              ? `1px solid ${themeConfig.palette.divider}`
              : 'none'
            quill.enable(isEditing)
          }
        }
      }, [
        quill,
        themeConfig.palette.mode,
        isEditing,
        themeConfig.palette.text.primary,
        themeConfig.palette.divider,
      ])

      return <Box ref={quillRef}>{children}</Box>
    }

    // Set the displayName
    QuillEditor.displayName = 'QuillEditor'

    return QuillEditor
  },
  {
    ssr: false,
    loading: () => <Box>Loading editor...</Box>,
  }
)

const RichTextEditor = ({ onChange, isEditing, sx, value, children }) => {
  const theme = useTheme()

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

  return (
    <Box sx={{ ...editorStyles, ...sx }}>
      {children}
      <QuillWrapper
        theme="snow"
        readOnly={!isEditing}
        value={value}
        onChange={onChange}
        isEditing={isEditing}
        themeConfig={theme}
      />
    </Box>
  )
}

export default RichTextEditor
