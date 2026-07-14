import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Download, QrCode, Copy, Check, RotateCcw, Image, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useDebounce } from '@/hooks/use-debounce';

interface QRSettings {
  size: number;
  margin: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  darkColor: string;
  lightColor: string;
  format: 'PNG' | 'SVG';
  filename: string;
}

const defaultSettings: QRSettings = {
  size: 300,
  margin: 2,
  errorCorrectionLevel: 'M',
  darkColor: '#1a1a2e',
  lightColor: '#ffffff',
  format: 'PNG',
  filename: 'qrcode'
};

const QRGenerator = () => {
  const [text, setText] = useState('https://lovable.dev');
  const [settings, setSettings] = useState<QRSettings>(defaultSettings);
  const [qrDataURL, setQrDataURL] = useState('');
  const [qrSVG, setQrSVG] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loadingStart, setLoadingStart] = useState(0);
  
  const debouncedText = useDebounce(text, 300);

  // Load settings from localStorage
  useEffect(() => {
    try {
      const savedText = localStorage.getItem('qr-text');
      const savedSettings = localStorage.getItem('qr-settings');
      
      if (savedText) setText(savedText);
      if (savedSettings) setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('qr-text', text);
      localStorage.setItem('qr-settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [text, settings]);

  const generateQR = async (inputText: string, currentSettings: QRSettings) => {
    if (!inputText.trim()) {
      setQrDataURL('');
      setQrSVG('');
      return;
    }

    setIsLoading(true);
    setLoadingStart(Date.now());
    
    try {
      const options = {
        width: currentSettings.size,
        margin: currentSettings.margin,
        color: {
          dark: currentSettings.darkColor,
          light: currentSettings.lightColor
        },
        errorCorrectionLevel: currentSettings.errorCorrectionLevel
      };

      const [dataURL, svgString] = await Promise.all([
        QRCode.toDataURL(inputText, options),
        QRCode.toString(inputText, { ...options, type: 'svg' })
      ]);

      // Only show loading if it takes more than 150ms
      if (Date.now() - loadingStart < 150) {
        await new Promise(resolve => setTimeout(resolve, 150 - (Date.now() - loadingStart)));
      }

      setQrDataURL(dataURL);
      setQrSVG(svgString);
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Erro",
        description: "Não foi possível gerar o código QR",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateQR(debouncedText, settings);
  }, [debouncedText, settings]);

  const downloadQR = () => {
    if (settings.format === 'PNG' && qrDataURL) {
      const link = document.createElement('a');
      link.download = `${settings.filename}.png`;
      link.href = qrDataURL;
      link.click();
    } else if (settings.format === 'SVG' && qrSVG) {
      const blob = new Blob([qrSVG], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${settings.filename}.svg`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }

    toast({
      title: "Download iniciado",
      description: `Seu código QR ${settings.format} foi baixado com sucesso!`,
    });
  };

  const copyImage = async () => {
    if (!qrDataURL) return;

    try {
      const response = await fetch(qrDataURL);
      const blob = await response.blob();
      
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      
      toast({
        title: "Imagem copiada!",
        description: "QR Code copiado para a área de transferência",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar a imagem",
        variant: "destructive"
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copiado!",
        description: "Texto copiado para a área de transferência",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível copiar o texto",
        variant: "destructive"
      });
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    toast({
      title: "Configurações resetadas",
      description: "Todas as configurações foram restauradas ao padrão",
    });
  };

  const updateSetting = <K extends keyof QRSettings>(key: K, value: QRSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const truncateText = (text: string, maxLength: number = 50) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-2xl gradient-primary shadow-glow animate-float">
            <QrCode className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          Gerador de QR Code
        </h1>
        <p className="text-muted-foreground text-lg">
          Transforme qualquer texto ou URL em um código QR instantaneamente
        </p>
      </div>

      {/* Input Section */}
      <Card className="p-6 shadow-card transition-smooth hover:shadow-primary border-border/50 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qr-input" className="text-sm font-medium text-foreground">
              Digite seu texto ou URL
            </Label>
            <div className="relative">
              <Input
                id="qr-input"
                type="text"
                placeholder="Ex: https://seusite.com ou seu texto aqui..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="pr-12 h-12 text-base transition-smooth focus:shadow-glow focus:border-primary/50"
                aria-describedby="qr-input-description"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent/50"
                aria-label="Copiar texto"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <p id="qr-input-description" className="text-xs text-muted-foreground">
              O QR code será gerado automaticamente conforme você digita
            </p>
          </div>
        </div>
      </Card>

      {/* Customization Section */}
      <Card className="p-6 shadow-card transition-smooth hover:shadow-primary border-border/50 backdrop-blur-sm">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Personalização</h3>
            <Button variant="outline" size="sm" onClick={resetSettings}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Resetar
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="size-slider">Tamanho: {settings.size}px</Label>
                <Slider
                  id="size-slider"
                  min={200}
                  max={800}
                  step={50}
                  value={[settings.size]}
                  onValueChange={(value) => updateSetting('size', value[0])}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="margin-slider">Margem: {settings.margin}</Label>
                <Slider
                  id="margin-slider"
                  min={0}
                  max={10}
                  step={1}
                  value={[settings.margin]}
                  onValueChange={(value) => updateSetting('margin', value[0])}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="error-correction">Correção de erro</Label>
                <Select value={settings.errorCorrectionLevel} onValueChange={(value) => updateSetting('errorCorrectionLevel', value as 'L' | 'M' | 'Q' | 'H')}>
                  <SelectTrigger id="error-correction">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Baixa (L)</SelectItem>
                    <SelectItem value="M">Média (M)</SelectItem>
                    <SelectItem value="Q">Alta (Q)</SelectItem>
                    <SelectItem value="H">Muito Alta (H)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dark-color">Cor escura</Label>
                  <div className="flex items-center gap-2">
                    <input
                      id="dark-color"
                      type="color"
                      value={settings.darkColor}
                      onChange={(e) => updateSetting('darkColor', e.target.value)}
                      className="w-12 h-10 rounded border border-input bg-background"
                    />
                    <Input
                      value={settings.darkColor}
                      onChange={(e) => updateSetting('darkColor', e.target.value)}
                      className="flex-1 h-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="light-color">Cor clara</Label>
                  <div className="flex items-center gap-2">
                    <input
                      id="light-color"
                      type="color"
                      value={settings.lightColor}
                      onChange={(e) => updateSetting('lightColor', e.target.value)}
                      className="w-12 h-10 rounded border border-input bg-background"
                    />
                    <Input
                      value={settings.lightColor}
                      onChange={(e) => updateSetting('lightColor', e.target.value)}
                      className="flex-1 h-10"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="format-select">Formato de exportação</Label>
                <Select value={settings.format} onValueChange={(value) => updateSetting('format', value as 'PNG' | 'SVG')}>
                  <SelectTrigger id="format-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PNG">PNG (Imagem)</SelectItem>
                    <SelectItem value="SVG">SVG (Vetor)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="filename">Nome do arquivo</Label>
                <Input
                  id="filename"
                  value={settings.filename}
                  onChange={(e) => updateSetting('filename', e.target.value)}
                  placeholder="qrcode"
                  className="h-10"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* QR Code Display */}
      <Card className="p-8 shadow-card transition-smooth hover:shadow-primary border-border/50 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-foreground">Seu Código QR</h3>
            <p className="text-muted-foreground text-sm">
              Escaneie com qualquer leitor de QR code
            </p>
          </div>

          <div className="relative">
            {isLoading ? (
              <div 
                className="bg-accent/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-border/50"
                style={{ width: `${settings.size}px`, height: `${settings.size}px` }}
              >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : qrDataURL ? (
              <div className="p-4 bg-white rounded-2xl shadow-card transition-smooth hover:scale-105 animate-scale-in">
                <img 
                  src={qrDataURL} 
                  alt={`QR Code contendo: ${truncateText(text)}`}
                  className="rounded-lg"
                  style={{ width: `${settings.size}px`, height: `${settings.size}px` }}
                />
              </div>
            ) : (
              <div 
                className="bg-accent/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-border/50"
                style={{ width: `${settings.size}px`, height: `${settings.size}px` }}
              >
                <div className="text-center space-y-2">
                  <QrCode className="w-12 h-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground text-sm">
                    Digite algo para gerar o QR code
                  </p>
                </div>
              </div>
            )}
          </div>

          {qrDataURL && (
            <div className="flex flex-wrap gap-3 justify-center">
              <Button 
                onClick={downloadQR}
                className="gradient-primary hover:opacity-90 shadow-primary transition-smooth hover:shadow-glow px-6 py-3 text-base font-medium"
              >
                <Download className="w-5 h-5 mr-2" />
                Baixar {settings.format}
              </Button>
              
              <Button 
                onClick={copyImage}
                variant="outline"
                className="px-6 py-3 text-base font-medium"
              >
                <Image className="w-5 h-5 mr-2" />
                Copiar Imagem
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 shadow-card transition-smooth hover:shadow-primary border-border/50 backdrop-blur-sm text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-foreground">Instantâneo</h4>
            <p className="text-sm text-muted-foreground">Geração em tempo real conforme você digita</p>
          </div>
        </Card>
        
        <Card className="p-4 shadow-card transition-smooth hover:shadow-primary border-border/50 backdrop-blur-sm text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 gradient-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
              <Download className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-foreground">Download Fácil</h4>
            <p className="text-sm text-muted-foreground">Baixe em alta qualidade formato PNG</p>
          </div>
        </Card>
        
        <Card className="p-4 shadow-card transition-smooth hover:shadow-primary border-border/50 backdrop-blur-sm text-center">
          <div className="space-y-2">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3">
              <Copy className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold text-foreground">Compartilhe</h4>
            <p className="text-sm text-muted-foreground">Copie facilmente seu texto ou URL</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QRGenerator;