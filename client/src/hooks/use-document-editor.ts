import { useState, useCallback } from "react";

export interface ImageFile {
  id: string;
  name: string;
  src: string;
  file: File;
}

export interface DocumentContent {
  english: string;
  arabic: string;
}

export type LanguageType = 'english' | 'arabic' | 'bilingual';

interface DocumentEditorState {
  language: LanguageType;
  content: DocumentContent;
  images: ImageFile[];
  lastUpdated: string | null;
}

export function useDocumentEditor() {
  const [state, setState] = useState<DocumentEditorState>({
    language: 'english',
    content: {
      english: '',
      arabic: ''
    },
    images: [],
    lastUpdated: null
  });

  const updateLanguage = useCallback((language: LanguageType) => {
    setState(prev => ({ ...prev, language }));
  }, []);

  const updateContent = useCallback((content: Partial<DocumentContent>) => {
    setState(prev => ({
      ...prev,
      content: { ...prev.content, ...content },
      lastUpdated: new Date().toLocaleTimeString()
    }));
  }, []);

  const addImages = useCallback((files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageFile: ImageFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          src: e.target?.result as string,
          file
        };
        
        setState(prev => ({
          ...prev,
          images: [...prev.images, imageFile],
          lastUpdated: new Date().toLocaleTimeString()
        }));
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const removeImage = useCallback((imageId: string) => {
    setState(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId),
      lastUpdated: new Date().toLocaleTimeString()
    }));
  }, []);

  const getWordCount = useCallback(() => {
    const englishWords = state.content.english.trim().split(/\s+/).filter(word => word).length;
    const arabicWords = state.content.arabic.trim().split(/\s+/).filter(word => word).length;
    return englishWords + arabicWords;
  }, [state.content]);

  const hasContent = useCallback(() => {
    return !!(state.content.english || state.content.arabic || state.images.length > 0);
  }, [state.content, state.images]);

  return {
    ...state,
    updateLanguage,
    updateContent,
    addImages,
    removeImage,
    getWordCount,
    hasContent
  };
}
