import { Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { LanguageType, DocumentContent, ImageFile } from "@/hooks/use-document-editor";

interface DocumentPreviewProps {
  language: LanguageType;
  content: DocumentContent;
  images: ImageFile[];
  lastUpdated: string | null;
  hasContent: boolean;
}

export default function DocumentPreview({ 
  language, 
  content, 
  images, 
  lastUpdated, 
  hasContent 
}: DocumentPreviewProps) {
  const showEnglish = language === 'english' || language === 'bilingual';
  const showArabic = language === 'arabic' || language === 'bilingual';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Eye className="w-5 h-5 mr-2" />
          Document Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div 
          className="min-h-96 border border-gray-200 rounded-lg p-6 bg-white"
          style={{ boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)" }}
        >
          {!hasContent ? (
            <div className="text-center text-gray-400 py-12">
              <Eye className="w-16 h-16 mx-auto mb-4" strokeWidth={1} />
              <p className="text-lg font-medium">Document Preview</p>
              <p className="text-sm">Start writing to see your document preview here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {showEnglish && content.english && (
                <div className="space-y-3" dir="ltr">
                  <p className="text-base leading-relaxed text-gray-900 whitespace-pre-wrap">
                    {content.english}
                  </p>
                </div>
              )}

              {showArabic && content.arabic && (
                <div className="space-y-3 font-arabic" dir="rtl">
                  <p className="text-base leading-relaxed text-gray-900 whitespace-pre-wrap">
                    {content.arabic}
                  </p>
                </div>
              )}

              {images.length > 0 && (
                <div className="space-y-3">
                  {images.map((image) => (
                    <div key={image.id} className="flex justify-center">
                      <img
                        src={image.src}
                        alt={image.name}
                        className="max-w-full h-auto rounded-lg shadow-sm border border-gray-200"
                        style={{ maxHeight: "300px" }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Preview:</span>
            <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary-hover h-auto p-1">
              Zoom In
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary-hover h-auto p-1">
              Zoom Out
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary-hover h-auto p-1">
              Reset
            </Button>
          </div>
          <div className="text-xs text-gray-500">
            Last updated: <span>{lastUpdated || "Never"}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
