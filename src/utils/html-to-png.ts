import html2canvas, { Options } from "html2canvas";

export default async (params: {
  element: HTMLElement;
  options?: Partial<Options>;
}) => {
  const { element, options } = params;

  const canvas = await html2canvas(element, options || { scale: 2 });

  const link = document.createElement("a");
  document.body.appendChild(link);

  link.href = canvas.toDataURL("image/png");
  link.download = "image.png"; // 다운로드 이미지 파일 이름
  link.click();

  document.body.removeChild(link);
};
