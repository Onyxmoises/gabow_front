import { useState } from 'react';

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64String, setBase64String] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64String(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(base64String)
      .then(() => {
        console.log('Cadena copiada al portapapeles');
      })
      .catch((error) => {
        console.error('Error al copiar la cadena al portapapeles:', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes realizar acciones adicionales con la cadena base64String

    // Reiniciar el formulario
    setSelectedFile(null);
    setBase64String('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      <div>
        {selectedFile && (
          <div>
            <img src={base64String} alt="Preview" style={{ maxWidth: '300px' }} />
          </div>
        )}
      </div>
      <div>
        <button type="submit">Subir imagen</button>
      </div>
      <div>
        {base64String && (
          <div>
            <h3>Base64:</h3>
            <p>{base64String}</p>
            <button type="button" onClick={handleCopyToClipboard}>Copiar al portapapeles</button>
          </div>
        )}
      </div>
    </form>
  );
}
