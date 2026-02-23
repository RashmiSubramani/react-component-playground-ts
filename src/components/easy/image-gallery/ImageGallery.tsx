/*
  IMAGE GALLERY (URL Input + Modal Preview)
  -------------------------------------------
  Difficulty: Easy
  Concepts: typed string[] for image list, string | null for selected image,
            filter by index for delete, click-outside modal dismiss,
            stopPropagation to keep modal image clicks from closing

  How it works:
  1. Enter an image URL and click "Add Image" to add to gallery
  2. Images display in a responsive grid
  3. Click an image to open a full-screen modal preview
  4. Click outside the image (or the overlay) to close
  5. Delete button removes an image from the gallery
*/

import { useState } from "react";
import "./styles.css";

// ─── Component ──────────────────────────────────────────────────────

function ImageGallery() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageList, setImageList] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // ChangeEvent<HTMLInputElement> — typed event from the URL input
  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setImageUrl(e.target.value);
  }

  function addImage(): void {
    if (!imageUrl.trim()) return;
    setImageList((prev) => [...prev, imageUrl]);
    setImageUrl("");
  }

  function deleteImage(index: number): void {
    setImageList((prev) => prev.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") addImage();
  }

  return (
    <div className="ig-container">
      <h2>Image Gallery</h2>

      {/* Input + button */}
      <div className="ig-input-row">
        <input
          className="ig-input"
          type="text"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={handleUrlChange}
          onKeyDown={handleKeyDown}
        />
        <button className="ig-add-btn" onClick={addImage}>
          Add Image
        </button>
      </div>

      {/* Gallery grid */}
      <div className="ig-grid">
        {imageList.map((src, index) => (
          <div key={index} className="ig-card">
            <img
              className="ig-thumb"
              src={src}
              alt={`Gallery ${index + 1}`}
              onClick={() => setSelectedImage(src)}
            />
            <button
              className="ig-delete-btn"
              onClick={() => deleteImage(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {imageList.length === 0 && (
        <p className="ig-empty">No images yet. Add a URL above to get started.</p>
      )}

      {/* Modal overlay */}
      {selectedImage && (
        <div
          className="ig-modal-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <img
            className="ig-modal-img"
            src={selectedImage}
            alt="Selected"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
