// Import React dependencies.
import React, {useState, useCallback} from 'react'
// Import the Slate editor factory.
import {createEditor} from 'slate'
import './slate.css'

// Import the Slate components and React plugin.
import {Slate, Editable, withReact} from 'slate-react'
// Import the `Editor` and `Transforms` helpers from Slate.
import { Editor, Transforms } from 'slate'


const initialValue = [
  {
    type: 'paragraph',
    children: [{text: 'A line of text in a paragraph.'}],
  },
];

// Define a React component renderer for our code blocks.
function CodeElement (props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}
function DefaultElement(props) {
  return <p {...props.attributes}>{props.children}</p>
}


function SlateEditor() {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()));

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])


  return (
    <div className='editor'>
      <Slate editor={editor} value={initialValue}>
        <Editable
          renderElement={renderElement}
          onKeyDown={event => {
            if (event.key === '`' && event.ctrlKey) {
              // Prevent the "`" from being inserted by default.
              event.preventDefault()
              // Otherwise, set the currently selected blocks type to "code".
              Transforms.setNodes(
                editor,
                { type: 'code' },
                { match: n => Editor.isBlock(editor, n) }
              )
            }
          }}
        />
      </Slate>
    </div>
  )
}

export default SlateEditor;