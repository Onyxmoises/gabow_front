import { useState } from 'react';
import mergeImages from 'merge-images';
import { ReactSVG } from 'react-svg';

const ImageMergeForm = () => {
  const [jpgImage, setJpgImage] = useState(null);
  const [svgImage, setSvgImage] = useState(null);
  const [mergedImage, setMergedImage] = useState(null);

  const handleFileChange = (event, setImage) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const mergeImagesAndSetResult = async () => {
    if (jpgImage && svgImage) {
      const merged = await mergeImages([{ src: jpgImage }, { src: svgImage, x: 0, y: 0 }]);
      setMergedImage(merged);
    }
  };

  const handleSvgClick = () => {
    console.log('Haz interactuado con el SVG');
  };

  return (
    <div>
      <h1>Superponer imágenes</h1>
      <div>
        <h2>Cargar imagen JPG</h2>
        <input type="file" accept=".jpg,.jpeg" onChange={(e) => handleFileChange(e, setJpgImage)} />
        {jpgImage && <img src={jpgImage} alt="Imagen JPG" />}
      </div>
      <div>
        <h2>Cargar archivo SVG</h2>
        <input type="file" accept=".svg" onChange={(e) => handleFileChange(e, setSvgImage)} />
        {svgImage && (
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={jpgImage} alt="Imagen superpuesta" />
            <ReactSVG
              src={svgImage}
              afterInjection={(error, svg) => {
                if (!error) {
                  svg.addEventListener('click', handleSvgClick);
                }
              }}
              beforeInjection={(svg) => {
                svg.setAttribute('width', '100%');
                svg.setAttribute('height', '100%');
              }}
              wrapper="div"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none',
              }}
            />
          </div>
        )}
      </div>
      <button onClick={mergeImagesAndSetResult} disabled={!jpgImage || !svgImage}>
        Superponer imágenes
      </button>
      {mergedImage && (
        <div>
          <h2>Imagen superpuesta</h2>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={mergedImage} alt="Imagen superpuesta" />
            <ReactSVG
              src={svgImage}
              afterInjection={(error, svg) => {
                if (!error) {
                  svg.addEventListener('click', handleSvgClick);
                }
              }}
              beforeInjection={(svg) => {
                svg.setAttribute('width', '100%');
                svg.setAttribute('height', '100%');
              }}
              wrapper="div"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: 'none',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageMergeForm;
