import { Edit3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { LanguageType, DocumentContent } from "@/hooks/use-document-editor";

interface TextEditorProps {
  language: LanguageType;
  content: DocumentContent;
  onContentChange: (content: Partial<DocumentContent>) => void;
  wordCount: number;
}

export default function TextEditor({ language, content, onContentChange, wordCount }: TextEditorProps) {
  const showEnglish = language === 'english' || language === 'bilingual';
  const showArabic = language === 'arabic' || language === 'bilingual';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Edit3 className="w-5 h-5 mr-2" />
          Document Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showEnglish && (
          <div className="space-y-2">
            <Label htmlFor="englishText" className="text-sm font-medium">
              English Text
            </Label>
            <Textarea
              id="englishText"
              placeholder="Write your content in English..."
              value={content.english}
              onChange={(e) => onContentChange({ english: e.target.value })}
              className="min-h-40 resize-none"
              dir="ltr"
            />
          </div>
        )}

        {showArabic && (
          <div className="space-y-2">
            <Label htmlFor="arabicText" className="text-sm font-medium">
              Arabic Text (النص العربي)
            </Label>
            <Textarea
              id="arabicText"
              placeholder="اكتب المحتوى باللغة العربية..."
              value={content.arabic}
              onChange={(e) => onContentChange({ arabic: e.target.value })}
              className="min-h-40 resize-none font-arabic"
              dir="rtl"
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Formatting:</span>
            <button className="text-xs text-primary hover:text-primary-hover font-medium">Bold</button>
            <button className="text-xs text-primary hover:text-primary-hover font-medium">Italic</button>
            <button className="text-xs text-primary hover:text-primary-hover font-medium">Underline</button>
          </div>
          <div className="text-xs text-gray-500">
            <span>{wordCount}</span> words
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
