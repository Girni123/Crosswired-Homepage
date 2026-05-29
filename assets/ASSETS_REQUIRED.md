# Crosswired V01 — Required Image Assets

All images should be placed in `/assets/images/` and referenced from `index.html`.

---

## HERO SECTION

| Filename | Description | Specs |
|---|---|---|
| `hero-hand-phone.png` | Person holding a smartphone showing a stylized editorial product page ("DRESSES / BOILED MERINO WOOL"). Hand visible from below, dark sleeve or bare hand. Shot on dark/neutral background for easy compositing. | PNG freisteller (transparent bg), min 1200×1400px, shot against dark bg |

---

## TWO PATHS SECTION

| Filename | Description | Specs |
|---|---|---|
| `qr-label-dress.png` | Close-up of a woven clothing label on a green dress (or other garment). Label shows a clean, unique QR code printed in black. Fabric texture should be visible (merino/wool aesthetic). | PNG freisteller, min 800×1000px, high detail |
| `qr-label-macro.png` | Extreme macro shot of the QR code label — crisp, editorial. The weave of the fabric around the label should be visible. | JPG/PNG, min 1200×800px |
| `nfc-luxury-bag.jpg` | A luxury accessory (leather bag, structured handbag or small clutch) with a subtle metallic NFC tag visible on or near the hardware/lining. | JPG freisteller or dark background, min 1000×1000px |
| `nfc-chip-macro.jpg` | Macro/close-up of the NTAG 424 DNA NFC chip inlay, showing the antenna coil. The small silver/copper chip should be clearly visible. | JPG, min 800×600px |

---

## STORY SECTION

| Filename | Description | Specs |
|---|---|---|
| `bootshaus-event-1.jpg` | Wide-angle editorial shot of the Bootshaus fashion event — crowd, lighting, runway. Dark, dramatic atmosphere with stage lighting. | JPG, min 1600×900px, landscape |
| `bootshaus-event-2.jpg` | Close-up candid of a designer or model at the event — backstage or runway moment. | JPG, min 800×1000px |
| `rtl-screenshot.jpg` | Screenshot or still from the RTL coverage of the event — the TV screen/broadcast frame adds authenticity. Can be styled as a retro TV screen graphic. | JPG, min 600×400px |
| `designer-portrait.jpg` | (Optional) Editorial portrait of a Crosswired founder or key team member. Dark background, fashion-forward styling. | JPG, min 800×1000px |

---

## BACKGROUND TEXTURES & GRAPHICS

| Filename | Description | Specs |
|---|---|---|
| `noise-texture.png` | Subtle film grain / noise overlay (tileable). Used to add depth to glass panels and dark sections. | PNG, tileable, ~200×200px |
| `glass-orb-lime.png` | A photorealistic liquid glass orb with lime-green refraction — for decorative use in hero/story sections. | PNG freisteller, min 800×800px |
| `glass-orb-dark.png` | A photorealistic liquid glass orb with dark blue/purple refraction. | PNG freisteller, min 800×800px |

---

## LOGO & BRAND

| Filename | Description | Specs |
|---|---|---|
| `logo-crosswired.svg` | Final vector logo — the X mark with crosshair lines and "CROSSWIRED" wordmark. Dark and light versions. | SVG |
| `og-image.jpg` | Open Graph / Social Share image (1200×630px). Shows logo + headline "Der Digitale Produktpass für Modemarken" on dark background with lime accent. | JPG, exactly 1200×630px |
| `favicon.png` | Square favicon showing the X mark on dark background. | PNG, 512×512px |

---

## INTEGRATION NOTES

Once assets are available, update the following sections in `index.html`:

1. **Hero phone screen** (`#hero .pscreen-img`): Replace the CSS gradient with `<img src="assets/images/hero-hand-phone.png" alt="..." />` or use it as a `background-image`.

2. **QR Path card visual** (`#product .path-card:first-child .path-visual`): Add `<img src="assets/images/qr-label-dress.png" />` inside `.path-visual-content`.

3. **NFC Path card visual** (`#product .path-card:last-child .path-visual`): Add `<img src="assets/images/nfc-luxury-bag.png" />` inside `.path-visual-content`.

4. **Story section background**: Apply `bootshaus-event-1.jpg` as a low-opacity background to the `#story` section with `mix-blend-mode: luminosity` for a dramatic editorial effect.

5. **OG Meta tags**: Add to `<head>`:
   ```html
   <meta property="og:image" content="assets/images/og-image.jpg" />
   <meta property="og:title" content="Crosswired — Digitaler Produktpass für Modemarken" />
   <meta property="og:description" content="EU-konform. NFC-gesichert. Designorientiert." />
   ```

---

*All freisteller (transparent background) assets should be shot against a neutral gray or pure white background for easy post-processing. Prefer PNG-24 with alpha for clothing/product shots.*
