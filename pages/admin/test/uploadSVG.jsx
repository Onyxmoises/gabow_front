import { useState } from 'react';

const SvgForm = () => {
  const [svgCode, setSvgCode] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const svgText = e.target.result;
        setSvgCode(svgText);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="file" onChange={handleFileChange} accept=".svg" />
        <button type="submit">Obtener código SVG</button>
      </form>
      {svgCode && (
        <div>
          <h2>Código SVG:</h2>
          <pre>{svgCode}</pre>
        </div>
      )}
    </div>
  );
};

export default SvgForm;
