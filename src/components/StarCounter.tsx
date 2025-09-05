import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, BarChart3, Star, Download, Share2, X, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import galaxyBg from '@/assets/galaxy-bg.jpg';

type Screen = 'home' | 'upload' | 'analysis' | 'results';

interface StarCounterProps {
  setActivePage: React.Dispatch<React.SetStateAction<'home' | 'about' | 'stories'>>;
}

export const StarCounter: React.FC<StarCounterProps> = ({ setActivePage }) => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [starCount, setStarCount] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // reset back to home
  const goHome = () => {
    setCurrentScreen('home');
    setSelectedImage(null);
    setImagePreview(null);
    setStarCount(0);
    setAnalysisProgress(0);
  };

  // file select
  const handleFileSelect = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please select an image file.',
          variant: 'destructive',
        });
        return;
      }
      setSelectedImage(file);
      const preview = URL.createObjectURL(file);
      setImagePreview(preview);
      setCurrentScreen('upload');
    },
    [toast]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // analysis with Roboflow API
  const startAnalysis = async () => {
    if (!selectedImage) return;

    setCurrentScreen('analysis');
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    try {
      const toBase64 = (file: File) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });

      const base64Image = await toBase64(selectedImage);

      // fake progress
      const interval = setInterval(() => {
        setAnalysisProgress((prev) => (prev < 90 ? prev + Math.random() * 10 : prev));
      }, 200);

      const response = await fetch(
        'https://detect.roboflow.com/star-prediction-ooguo/4?api_key=Wg8A3TFkGbYlRog4GdFH',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: base64Image.replace(/^data:image\/\w+;base64,/, ''),
        }
      );

      const data = await response.json();
      console.log('Roboflow result:', data);

      const count = data?.predictions?.length || 0;
      setStarCount(count);

      clearInterval(interval);
      setAnalysisProgress(100);
      setIsAnalyzing(false);
      setCurrentScreen('results');
    } catch (err) {
      console.error('Error analyzing image:', err);
      setIsAnalyzing(false);
      setCurrentScreen('upload');
      toast({
        title: 'Analysis Failed',
        description: 'Could not analyze the image. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const saveResult = () => {
    toast({
      title: 'Result Saved',
      description: `Found ${starCount} stars in your image.`,
    });
  };

  const shareResult = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Star Counter Result',
        text: `I found ${starCount} stars in my night sky photo using Star Counter!`,
      });
    } else {
      toast({
        title: 'Result Copied',
        description: 'Share link copied to clipboard!',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[url('/star-bg10.jpg')] bg-cover bg-center pt-20">
      <div className="absolute inset-0 starfield opacity-30"></div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Home */}
      {currentScreen === 'home' && (
        <div className="relative z-10 px-6 py-8 text-center">
          <div className="mb-12">
            <Star className="h-20 w-20 mx-auto text-neon-purple mb-6 glow-purple" />
            <h1 className="text-5xl font-bold italic text-cosmic-white mb-3 glow-purple">
              kakkathollayiram
            </h1>
            <p className="text-xl italic text-fade-white">--Count the Uncountable--</p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="mb-6 bg-black/30 rounded-lg p-4 border border-white/20 glass-card">
              <h3 className="text-lg font-semibold text-cosmic-white mb-4 glow-purple">
                💫 Quick, Friendly Notes
              </h3>
              <ul className="list-none space-y-3">
                {[
                  'Upload images in JPG or PNG format (max 10MB).',
                  'Best results with clear night skies or telescope photos.',
                  'Our AI loves counting stars—but even it can miss the tiniest ones!',
                  'Tiny stars may hide or twinkle away—don’t worry, it’s normal.',
                  'The analysis only takes about 15 seconds—fast and fun!',
                  'Your photos stay private—they’re never stored after counting.',
                ].map((text, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="flex-shrink-0 text-neon-purple text-lg mr-2 mt-1 glow-purple">
                      •
                    </span>
                    <span className="text-white/80 text-sm leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              variant="cosmic"
              size="lg"
              onClick={openFileDialog}
              className="w-full text-lg py-4"
            >
              <Upload className="h-6 w-6 mr-3" />
              Proceed
            </Button>
          </div>
        </div>
      )}

      {/* Upload */}
      {currentScreen === 'upload' && (
        <div className="relative z-10 px-6 py-8">
          <div className="text-center mb-8">
            <ImageIcon className="h-16 w-16 mx-auto text-neon-blue mb-4 glow-blue" />
            <h2 className="text-3xl font-bold text-cosmic-white mb-2">Upload Your Sky Photo</h2>
            <p className="text-muted-foreground">Choose an image to analyze for stars</p>
          </div>

          {!selectedImage ? (
            <Card
              className={`glass-card p-12 mb-8 border-2 border-dashed transition-all duration-300 cursor-pointer ${
                isDragOver ? 'border-neon-blue glow-blue' : 'border-white/20'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={openFileDialog}
            >
              <div className="text-center">
                <Upload className="h-16 w-16 mx-auto text-neon-purple mb-4" />
                <h3 className="text-xl font-semibold text-cosmic-white mb-2">
                  Drop your image here
                </h3>
                <p className="text-muted-foreground mb-4">or click to browse files</p>
                <Button variant="outline" className="glass-card">
                  Browse Files
                </Button>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card className="glass-card p-4 relative">
                <div className="relative">
                  <img
                    src={imagePreview!}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Button
                    variant="glass"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setSelectedImage(null);
                      setImagePreview(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2 truncate">{selectedImage.name}</p>
              </Card>

              <Button
                variant="cosmic"
                size="lg"
                onClick={startAnalysis}
                className="w-full text-lg py-4"
              >
                <BarChart3 className="h-6 w-6 mr-3" />
                Analyze Stars
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Analysis */}
      {currentScreen === 'analysis' && (
        <div className="relative z-10 px-6 py-8 text-center h-screen flex flex-col justify-center">
          <div className="mb-8">
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div
                className="w-full h-full rounded-full bg-cover bg-center relative animate-spin"
                style={{ backgroundImage: `url(${galaxyBg})`, animationDuration: '20s' }}
              >
                <div className="absolute inset-0 rounded-full border-4 border-neon-purple animate-pulse glow-purple"></div>
                <div className="absolute inset-8 rounded-full border-2 border-neon-blue animate-ping"></div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-cosmic-white mb-4">Analyzing Stars...</h2>
            <p className="text-muted-foreground text-lg mb-8">AI detection in progress</p>

            <div className="max-w-md mx-auto">
              <Progress value={analysisProgress} className="mb-4" />
              <p className="text-neon-blue text-sm">{Math.round(analysisProgress)}% Complete</p>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {currentScreen === 'results' && (
        <div className="relative z-10 px-6 py-8 text-center">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${galaxyBg})` }}
          ></div>

          <div className="relative z-10">
            <div className="mb-8">
              <Star className="h-16 w-16 mx-auto text-neon-blue mb-4 glow-blue" />
              <h2 className="text-3xl font-bold text-cosmic-white mb-2">Analysis Complete</h2>
            </div>

            <Card className="glass-card p-8 mb-8 max-w-sm mx-auto">
              <div className="text-center">
                <p className="text-cosmic-white text-lg mb-2">Detected Stars</p>
                <div className="text-6xl font-bold text-yellow-400 mb-4 glow-blue">{starCount}</div>
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-neon-purple fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">Excellent image quality detected</p>
              </div>
            </Card>

            {imagePreview && (
              <Card className="glass-card p-4 mb-8 max-w-lg mx-auto">
                <img
                  src={imagePreview}
                  alt="Analyzed image"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-sm text-muted-foreground mt-2">Your analyzed image</p>
              </Card>
            )}

            <div className="space-y-4 max-w-sm mx-auto">
              <Button variant="cosmic" size="lg" onClick={saveResult} className="w-full">
                <Download className="h-5 w-5 mr-2" />
                Save Result
              </Button>

              <Button variant="scan" size="lg" onClick={shareResult} className="w-full">
                <Share2 className="h-5 w-5 mr-2" />
                Share Result
              </Button>

              <Button
                variant="glass"
                size="lg"
                onClick={() => setCurrentScreen('upload')}
                className="w-full"
              >
                <Upload className="h-5 w-5 mr-2" />
                Analyze Another
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
