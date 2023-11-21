import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class OnchangeService {
  constructor(private sanitizer: DomSanitizer) { }

  extractorSrc = async (pic: any): Promise<{ code: string }> => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(pic);
  
      return new Promise((res, rej) => {
        reader.onload = () => {
          res({ code: reader.result as string });
        };
  
        reader.onerror = (err) => {
          rej('ExtractorSrc: Error reading file: ' + err);
        };
      });
    } catch (err) {
      console.log(err);
      throw new Error('ExtractorSrc: Error reading file: ' + err);
    }
  };
  
  recompileSrc = (pic: any, width: number, height: number): Promise<{ code: string }> => {
    try {
      const img = new Image();
  
      return new Promise((res, rej) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  
          canvas.width = width;
          canvas.height = height;
  
          ctx.drawImage(img, 0, 0, width, height);
  
          const resolved = canvas.toDataURL('image/jpeg');
          res({ code: resolved });
        };
  
        img.onerror = (err) => {
          rej('RecompileSrc: Error reading file: ' + err);
        };
  
        img.src = pic;
      });
    } catch (err) {
      console.log(err);
      throw new Error('RecompileSrc: Error reading file: ' + err);
    }
  };
  
  async compileBase64(blob: Blob): Promise<string> {
    return new Promise((res, rej) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const string64 = reader.result as string;
        res(string64);
      };
  
      reader.onerror = (err) => {
        rej('CompileBase64: Error reading file: ' + err);
      };
  
      reader.readAsDataURL(blob);
    });
  }
  
}
