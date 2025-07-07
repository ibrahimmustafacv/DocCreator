import { Languages } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { LanguageType } from "@/hooks/use-document-editor";

interface LanguageSelectorProps {
  selectedLanguage: LanguageType;
  onLanguageChange: (language: LanguageType) => void;
}

export default function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Languages className="w-5 h-5 mr-2" />
          Language Selection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedLanguage}
          onValueChange={(value) => onLanguageChange(value as LanguageType)}
          className="space-y-3"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="arabic" id="arabic" />
            <Label htmlFor="arabic" className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">
              Arabic Only (عربي فقط)
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="english" id="english" />
            <Label htmlFor="english" className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">
              English Only
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="bilingual" id="bilingual" />
            <Label htmlFor="bilingual" className="text-sm font-medium cursor-pointer hover:text-primary transition-colors">
              Arabic + English (مزدوج)
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
