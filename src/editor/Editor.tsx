import React from "react";
import { createEditor, Node, Transforms, Editor, Text, Range, Point } from "slate";
import {
  Editable,
  withReact,
  Slate,
  RenderElementProps,
  RenderLeafProps,
  useSlate,
} from "slate-react";
import { DefaultElement } from "./elements";
import { Toolbar } from "./Toolbar";


function renderElement(props: RenderElementProps) {
  const { attributes, children } = props;
  return <DefaultElement {...attributes}>{children}</DefaultElement>;
}

function renderLeaf(props: RenderLeafProps) {
  const { attributes, children } = props;
  return <span {...attributes}>{children}</span>;
}

const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format)
  console.log(isActive, 666)
  if (isActive) {
    editor.removeMark(editor, format)
  } else {
    editor.addMark('bold', format)
    console.log(editor, format, 44444)
  }
}
const isMarkActive = (editor: any, format: any) => {
  console.log(editor, '------Z', format)
  const marks = Editor.marks(editor)
  console.log(marks)
  return marks ? marks[format] === true : false
}

export interface EditorProps {
  value: Node[];
  onChange: (value: Node[]) => void;
  placeholder?: string;
  autoFocus?: boolean;
  spellCheck?: boolean;
  renderMark?: any; 
}

export function EditorComponent(props: EditorProps) {
  const { value, onChange, ...other } = props;
  const editor = React.useMemo(() => withReact(createEditor()), []);

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <Toolbar open={true} editor={editor} toggleMark={toggleMark} />
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        spellCheck
        autoFocus
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return
          }

          switch (event.key) {
            case '`': {
              event.preventDefault()
              console.log(editor, 888)
              Transforms.setNodes(
                editor,
                { bold: true },
                { match: n => Text.isText(n), split: true }
              )
              break
            }

            case 'b': {
              event.preventDefault()
              console.log(editor, 888)


              Transforms.setNodes(
                editor,
                { bold: false },
                { match: n => Text.isText(n), split: true }
              )
              break
            }
          }
        }}
      />
    </Slate>
  );
}

export { Node };
