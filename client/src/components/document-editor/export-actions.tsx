import { useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { DocumentContent, ImageFile, LanguageType } from "@/hooks/use-document-editor";

interface ExportActionsProps {
  documentState: {
    language: LanguageType;
    content: DocumentContent;
    images: ImageFile[];
    hasContent: () => boolean;
  };
}

// Declare global variables for external libraries
declare global {
  interface Window {
    jsPDF: any;
    docx: any;
    saveAs: any;
    jspdf: any;
    html2canvas: any;
  }
}

export default function ExportActions({ documentState }: ExportActionsProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { toast } = useToast();

  const generateDocument = async () => {
    if (!documentState.hasContent()) {
      toast({
        title: "لا يوجد محتوى",
        description: "يرجى إضافة نص أو صور قبل إنشاء الوثيقة.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate document processing
    setTimeout(() => {
      setIsGenerating(false);
      setIsReady(true);
      toast({
        title: "الوثيقة جاهزة",
        description: "وثيقتك جاهزة للتصدير. اختر صيغة PDF أو Word.",
      });
    }, 2000);
  };

  const downloadPDF = async () => {
    try {
      // Wait for libraries to load
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Check for required libraries
      let jsPDF;
      if (window.jsPDF) {
        jsPDF = window.jsPDF;
      } else if ((window as any).jspdf?.jsPDF) {
        jsPDF = (window as any).jspdf.jsPDF;
      } else if ((window as any).jspdf) {
        jsPDF = (window as any).jspdf;
      }
      
      if (!jsPDF || !window.html2canvas) {
        toast({
          title: "خطأ",
          description: "مكتبة PDF غير محملة. يرجى إعادة تحديث الصفحة والمحاولة مرة أخرى.",
          variant: "destructive",
        });
        return;
      }

      // Create a temporary container for PDF content
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '210mm'; // A4 width
      tempDiv.style.minHeight = '297mm'; // A4 height
      tempDiv.style.padding = '20mm';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.fontFamily = 'Noto Sans Arabic, Inter, sans-serif';
      tempDiv.style.fontSize = '16px';
      tempDiv.style.color = '#000';
      
      // Add content to temp div with high-quality formatting
      let htmlContent = '';
      
      // Add title
      htmlContent += '<h1 style="font-size: 28px; margin-bottom: 40px; text-align: center; color: #1a1a1a; font-weight: 600; font-family: Noto Sans Arabic;">وثيقة مُصدرة</h1>';
      
      // Add English content
      if (documentState.content.english && (documentState.language === 'english' || documentState.language === 'bilingual')) {
        htmlContent += '<div style="margin-bottom: 50px;">';
        htmlContent += '<h2 style="font-size: 22px; margin-bottom: 20px; color: #2c3e50; direction: ltr; font-weight: 500; border-bottom: 2px solid #3498db; padding-bottom: 10px;">English Content</h2>';
        
        // Split English content into paragraphs
        const englishParagraphs = documentState.content.english.split('\n').filter(p => p.trim());
        for (const paragraph of englishParagraphs) {
          htmlContent += `<p style="font-size: 16px; line-height: 1.8; margin-bottom: 20px; direction: ltr; color: #2c3e50; text-align: justify;">${paragraph}</p>`;
        }
        htmlContent += '</div>';
      }

      // Add Arabic content
      if (documentState.content.arabic && (documentState.language === 'arabic' || documentState.language === 'bilingual')) {
        htmlContent += '<div style="margin-bottom: 50px;">';
        htmlContent += '<h2 style="font-size: 22px; margin-bottom: 20px; color: #2c3e50; direction: rtl; font-family: Noto Sans Arabic; font-weight: 500; border-bottom: 2px solid #e74c3c; padding-bottom: 10px; text-align: right;">المحتوى العربي</h2>';
        
        // Split Arabic content into paragraphs
        const arabicParagraphs = documentState.content.arabic.split('\n').filter(p => p.trim());
        for (const paragraph of arabicParagraphs) {
          htmlContent += `<p style="font-size: 18px; line-height: 2.2; margin-bottom: 25px; direction: rtl; text-align: right; font-family: Noto Sans Arabic; color: #2c3e50;">${paragraph}</p>`;
        }
        htmlContent += '</div>';
      }

      // Add images
      for (const image of documentState.images) {
        htmlContent += `<div style="margin: 40px 0; text-align: center; page-break-inside: avoid;">`;
        htmlContent += `<img src="${image.src}" style="max-width: 85%; height: auto; border: 2px solid #bdc3c7; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" alt="${image.name}" />`;
        htmlContent += `<p style="margin-top: 10px; font-size: 14px; color: #7f8c8d; font-style: italic;">${image.name}</p>`;
        htmlContent += `</div>`;
      }
      
      tempDiv.innerHTML = htmlContent;
      document.body.appendChild(tempDiv);

      // Generate PDF with proper content and formatting
      const canvas = await window.html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        height: tempDiv.scrollHeight,
        width: tempDiv.scrollWidth
      });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // Calculate scaling to fit page width
      const scale = pdfWidth / (canvasWidth / 2); // Divide by 2 because of scale: 2
      const scaledHeight = (canvasHeight / 2) * scale; // Divide by 2 because of scale: 2
      
      // Calculate how many pages we need
      const pagesNeeded = Math.ceil(scaledHeight / pdfHeight);
      
      for (let pageIndex = 0; pageIndex < pagesNeeded; pageIndex++) {
        if (pageIndex > 0) {
          pdf.addPage();
        }
        
        // Calculate the portion of canvas for this page
        const startY = pageIndex * (pdfHeight / scale) * 2; // Multiply by 2 because of scale: 2
        const endY = Math.min(startY + (pdfHeight / scale) * 2, canvasHeight);
        const sectionHeight = endY - startY;
        
        if (sectionHeight <= 0) break;
        
        // Create a new canvas for this page section
        const pageCanvas = document.createElement('canvas');
        const pageCtx = pageCanvas.getContext('2d');
        
        if (pageCtx) {
          pageCanvas.width = canvasWidth;
          pageCanvas.height = sectionHeight;
          
          // Draw the section
          pageCtx.drawImage(
            canvas,
            0, startY,           // Source x, y
            canvasWidth, sectionHeight,  // Source width, height
            0, 0,                // Destination x, y
            canvasWidth, sectionHeight   // Destination width, height
          );
          
          // Convert to image and add to PDF
          const pageImgData = pageCanvas.toDataURL('image/png');
          const imgHeight = (sectionHeight / 2) * scale; // Divide by 2 because of scale: 2
          
          pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, Math.min(imgHeight, pdfHeight));
        }
      }

      // Clean up
      document.body.removeChild(tempDiv);

      // Save the PDF
      pdf.save('document.pdf');
      
      toast({
        title: "تم التحميل",
        description: "تم تحميل الملف بصيغة PDF بنجاح مع دعم النصوص العربية.",
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "خطأ في التصدير",
        description: "فشل في إنشاء ملف PDF. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  };

  const downloadWord = async () => {
    try {
      // Wait for libraries to load
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const docx = window.docx;
      if (!docx) {
        toast({
          title: "خطأ",
          description: "مكتبة Word غير محملة. يرجى إعادة تحديث الصفحة والمحاولة مرة أخرى.",
          variant: "destructive",
        });
        return;
      }

      const { Document, Packer, Paragraph, TextRun } = docx;
      
      const children = [];

      // Add title
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: "Document Export",
              bold: true,
              size: 32,
            }),
          ],
          spacing: { after: 400 },
        })
      );

      // Add English content
      if (documentState.content.english && (documentState.language === 'english' || documentState.language === 'bilingual')) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "English Content:",
                bold: true,
                size: 28,
              }),
            ],
            spacing: { before: 200, after: 200 },
          })
        );

        const englishParagraphs = documentState.content.english.split('\n').filter(para => para.trim());
        englishParagraphs.forEach(para => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: para,
                  size: 24,
                }),
              ],
              spacing: { after: 200 },
            })
          );
        });
      }

      // Add Arabic content
      if (documentState.content.arabic && (documentState.language === 'arabic' || documentState.language === 'bilingual')) {
        children.push(
          new Paragraph({
            children: [
              new TextRun({
                text: "Arabic Content:",
                bold: true,
                size: 28,
              }),
            ],
            spacing: { before: 200, after: 200 },
          })
        );

        const arabicParagraphs = documentState.content.arabic.split('\n').filter(para => para.trim());
        arabicParagraphs.forEach(para => {
          children.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: para,
                  size: 24,
                }),
              ],
              spacing: { after: 200 },
              bidirectional: true,
            })
          );
        });
      }

      const doc = new Document({
        sections: [
          {
            properties: {},
            children: children,
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      
      if (window.saveAs) {
        window.saveAs(blob, "document.docx");
      } else {
        // Fallback download method
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.docx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }

      toast({
        title: "تم التحميل",
        description: "تم تحميل الملف بصيغة Word بنجاح.",
      });
    } catch (error) {
      console.error('Word generation error:', error);
      toast({
        title: "خطأ في التصدير",
        description: "فشل في إنشاء ملف Word. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Download className="w-5 h-5 mr-2" />
          Export Document
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={generateDocument}
          disabled={isGenerating || !documentState.hasContent()}
          className="w-full bg-primary hover:primary-hover text-white py-3 font-medium"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Creating Document...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5 mr-2" />
              Create Document
            </>
          )}
        </Button>

        {isReady && (
          <div className="space-y-2">
            <Button
              onClick={downloadPDF}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button
              onClick={downloadWord}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Word
            </Button>
          </div>
        )}
      </CardContent>

      {/* Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-8 max-w-sm mx-4 text-center">
            <div className="space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
              <h3 className="text-lg font-semibold">Creating Document</h3>
              <p className="text-sm text-gray-600">Please wait while we generate your document...</p>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
}
