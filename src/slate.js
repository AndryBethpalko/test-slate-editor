// Import React dependencies.
import React, {useState} from 'react'
// Import the Slate editor factory.
import {createEditor} from 'slate'
import './slate.css'

// Import the Slate components and React plugin.
import {Slate, Editable, withReact} from 'slate-react'

const initialValue = [
  {
    type: 'paragraph',
    children: [{text: 'A line of text in a paragraph.'}],
  },
];

function SlateEditor() {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()));

  return (
    <div className='editor'>
      <Slate editor={editor} value={initialValue}>
        <Editable
          onKeyDown={event => {
            if (event.key === '&') {
              // Prevent the ampersand character from being inserted.
              event.preventDefault()
              // Execute the `insertText` method when the event occurs.
              editor.insertText('and')
            }
          }}
        />
      </Slate>
    </div>
  )
}

export default SlateEditor;