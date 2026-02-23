/*
  IMAGE CROPPER (Canvas-based)
  ------------------------------
  Difficulty: Medium
  Concepts: useRef<HTMLCanvasElement> + useRef<HTMLImageElement>,
            CropArea type (x, y, width, height),
            FileReader with result narrowed to string,
            CanvasRenderingContext2D null guard,
            React.MouseEvent<HTMLCanvasElement> for drag-to-crop,
            canvas.toDataURL() for cropped output

  How it works:
  1. User uploads an image via file input → FileReader → data URL → drawn on canvas
  2. Mouse drag on canvas defines a crop rectangle (red stroke)
  3. "Crop" extracts the selected region into a new canvas → toDataURL → preview
*/

import { useRef, useState } from "react";
import "./styles.css";

// ─── Types ────────────────────────────────────────────────────────

type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// ─── Component ────────────────────────────────────────────────────

function ImageCropper() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<CropArea | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  // Load image from file input
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    // reader.result is string | ArrayBuffer | null — narrow to string
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageSrc(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  // Mouse down → start crop
  function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    setCrop({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      width: 0,
      height: 0,
    });
    setIsDragging(true);
  }

  // Mouse move → resize crop box
  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDragging || !crop || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const newWidth = e.clientX - rect.left - crop.x;
    const newHeight = e.clientY - rect.top - crop.y;

    setCrop({ ...crop, width: newWidth, height: newHeight });
    drawCanvas();
  }

  // Mouse up → stop crop
  function handleMouseUp() {
    setIsDragging(false);
  }

  // Draw image + crop rectangle overlay
  function drawCanvas() {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (!canvas || !img) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);

    if (crop) {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.strokeRect(crop.x, crop.y, crop.width, crop.height);
    }
  }

  // Extract cropped region into a new canvas → data URL
  function handleCrop() {
    if (!crop || !imageRef.current) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      imageRef.current,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height,
    );

    setCroppedImage(canvas.toDataURL("image/png"));
  }

  return (
    <div className="ic-container">
      <h2 className="ic-title">Image Cropper</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="ic-file-input"
      />

      {imageSrc && (
        <>
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            className="ic-canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          />

          <img
            ref={imageRef}
            src={imageSrc}
            alt="source"
            className="ic-hidden-img"
            onLoad={drawCanvas}
          />

          <button className="ic-btn" onClick={handleCrop}>
            Crop
          </button>
        </>
      )}

      {croppedImage && (
        <div className="ic-result">
          <h3>Cropped Image</h3>
          <img src={croppedImage} alt="cropped" className="ic-cropped-img" />
        </div>
      )}
    </div>
  );
}

export default ImageCropper;
