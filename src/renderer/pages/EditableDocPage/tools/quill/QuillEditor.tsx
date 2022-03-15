import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function QuillEditor(props: any) {
  const [editor, setEditor] = useState({
    theme: 'core',
    editor: '',
  });

  const handleChange = (html) => {
    setEditor({ editor: html });
  };

  const handleThemeChange = (newTheme) => {
    if (newTheme === 'core') newTheme = null;
      setEditor({ theme: html });
  };

  return (
    <div>
      <ReactQuill
        // theme='core'
        onChange={handleChange}
        value={editor.editor}
        // modules={Editor.modules}
        // formats={Editor.formats}
        // bounds={'.app'}
        // placeholder={this.props.placeholder}
      />
      <div className="themeSwitcher">
        <label>Theme </label>
        <select onChange={(e) => handleThemeChange(e.target.value)}>
          <option value="snow">Snow</option>
          <option value="bubble">Bubble</option>
          <option value="core">Core</option>
        </select>
      </div>
    </div>
  );
}
