import { useState } from 'react';

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      convertImageToBase64(file);
    }
  };

  const convertImageToBase64 = (image) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result);
    };
    reader.readAsDataURL(image);
  };

  const handleCopyButtonClick = () => {
    if (base64Image) {
      navigator.clipboard.writeText(base64Image);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div>
          <img src={selectedImage} alt="Selected" />
        </div>
      )}
      {base64Image && (
        <div>
          <p>Base64 Image:</p>
          <textarea value={base64Image} rows={5} readOnly />
          <button onClick={handleCopyButtonClick}>Copy</button>
        </div>
      )}
    </div>
  );
}
