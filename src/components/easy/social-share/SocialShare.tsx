/*
  SOCIAL SHARE (Share Links + Copy URL)
  ----------------------------------------
  Difficulty: Easy
  Concepts: typed ShareUrls record, encodeURIComponent for URL safety,
            window.open for share popups, navigator.clipboard API,
            setTimeout for "Copied" feedback reset

  How it works:
  1. Buttons open share dialogs for various social platforms
  2. Each URL is built with encoded page URL + share text
  3. "Copy Link" copies the current URL to clipboard
  4. Brief "Copied" feedback shown for 2 seconds
*/

import { useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegramPlane,
  FaRedditAlien,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";
import "./styles.css";

// ─── Types ──────────────────────────────────────────────────────────

type ShareUrls = {
  facebook: string;
  linkedin: string;
  whatsapp: string;
  telegram: string;
  reddit: string;
  email: string;
};

type SocialPlatform = {
  key: keyof ShareUrls;
  label: string;
  icon: React.ReactNode;
};

// ─── Constants ──────────────────────────────────────────────────────

const PLATFORMS: SocialPlatform[] = [
  { key: "linkedin", label: "LinkedIn", icon: <FaLinkedinIn /> },
  { key: "telegram", label: "Telegram", icon: <FaTelegramPlane /> },
  { key: "reddit", label: "Reddit", icon: <FaRedditAlien /> },
  { key: "email", label: "Email", icon: <FaEnvelope /> },
  { key: "facebook", label: "Facebook", icon: <FaFacebookF /> },
  { key: "whatsapp", label: "WhatsApp", icon: <FaWhatsapp /> },
];

// ─── Component ──────────────────────────────────────────────────────

function SocialShare() {
  const [copied, setCopied] = useState(false);

  const pageUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent("Check this out!");

  const shareUrls: ShareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    whatsapp: `https://wa.me/?text=${shareText}%20${pageUrl}`,
    telegram: `https://t.me/share/url?url=${pageUrl}&text=${shareText}`,
    reddit: `https://www.reddit.com/submit?url=${pageUrl}&title=${shareText}`,
    email: `mailto:?subject=${shareText}&body=${pageUrl}`,
  };

  function handleCopy(): void {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function openWindow(url: string): void {
    window.open(url, "_blank", "width=600,height=400");
  }

  return (
    <div className="ss-container">
      <h2>Share</h2>

      <div className="ss-buttons">
        {PLATFORMS.map((p) => (
          <button
            key={p.key}
            className={`ss-btn ss-${p.key}`}
            aria-label={p.label}
            title={p.label}
            onClick={() => openWindow(shareUrls[p.key])}
          >
            {p.icon}
          </button>
        ))}
      </div>

      <div className="ss-copy-section">
        <p className="ss-copy-label">Or copy link:</p>
        <div className="ss-copy-box">
          <FaLink className="ss-link-icon" />
          <input type="text" value={window.location.href} readOnly />
          <button className="ss-copy-btn" onClick={handleCopy}>
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SocialShare;
