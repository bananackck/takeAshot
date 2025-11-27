import html2canvas from 'html2canvas-oklch';
import { saveAs } from 'file-saver';

export const handleDownload = async (divRef: React.RefObject<HTMLDivElement | null>) => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 1 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "result.png");
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };