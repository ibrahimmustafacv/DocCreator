import { FileText, ExternalLink, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/document-editor/language-selector";
import ImageUploader from "@/components/document-editor/image-uploader";
import TextEditor from "@/components/document-editor/text-editor";
import DocumentPreview from "@/components/document-editor/document-preview";
import ExportActions from "@/components/document-editor/export-actions";
import { useDocumentEditor } from "@/hooks/use-document-editor";

export default function DocumentEditor() {
  const documentEditor = useDocumentEditor();

  return (
    <div className="min-h-screen surface-bg">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-semibold text-primary-custom">افتح اكتب نزل</h1>
                <p className="text-sm text-secondary-custom">Simple Document Editor</p>
              </div>
              <div className="block sm:hidden">
                <h1 className="text-lg font-semibold text-primary-custom">DocCreator</h1>
              </div>
            </div>
            
            {/* Navigation Buttons in Header */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button
                onClick={() => window.open('https://ibrahimmustafacv.github.io/', '_blank')}
                size="sm"
                className="flex items-center gap-1 sm:gap-2 bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-xs sm:text-sm"
              >
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">للمزيد من المشاريع</span>
                <span className="sm:hidden">المشاريع</span>
              </Button>
              <Button
                onClick={() => window.open('https://ibrahimmustafacv.github.io/my-social-media-page/', '_blank')}
                size="sm"
                className="flex items-center gap-1 sm:gap-2 bg-purple-600 hover:bg-purple-700 text-white px-2 sm:px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-xs sm:text-sm"
              >
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">تابعنا هنا</span>
                <span className="sm:hidden">تابعنا</span>
              </Button>
              
              <div className="hidden lg:flex items-center space-x-2 ml-4">
                <span className="text-sm text-secondary-custom">Ready to create</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <LanguageSelector
              selectedLanguage={documentEditor.language}
              onLanguageChange={documentEditor.updateLanguage}
            />
            
            <ImageUploader
              images={documentEditor.images}
              onImagesAdd={documentEditor.addImages}
              onImageRemove={documentEditor.removeImage}
            />
            
            <ExportActions
              documentState={documentEditor}
            />
          </div>

          {/* Right Panel - Editor and Preview */}
          <div className="lg:col-span-2 space-y-6">
            <TextEditor
              language={documentEditor.language}
              content={documentEditor.content}
              onContentChange={documentEditor.updateContent}
              wordCount={documentEditor.getWordCount()}
            />
            
            <DocumentPreview
              language={documentEditor.language}
              content={documentEditor.content}
              images={documentEditor.images}
              lastUpdated={documentEditor.lastUpdated}
              hasContent={documentEditor.hasContent()}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
