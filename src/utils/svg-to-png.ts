export default (id: string) => {
  try {
    const svg = document.querySelector(`#${id}`)!;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    const xml = new XMLSerializer().serializeToString(svg);
    const dataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(xml)}`;
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0);
      const imageData = canvas.toDataURL("image/png", 1.0);

      const a = document.createElement("a");
      a.href = imageData;
      a.download = "image.png";
      a.click();
    };

    img.src = dataUrl;
  } catch (error) {
    console.error("Error during SVG to PNG conversion:", error);
  }
}