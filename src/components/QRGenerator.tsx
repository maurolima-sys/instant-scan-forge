import { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Download, QrCode, Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const QRGenerator = () => {
  const [text, setText] = useState('https://lovable.dev');
  const [qrDataURL, setQrDataURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQR = async (inputText: string) => {
    if (!inputText.trim()) {
      setQrDataURL('');
      return;
    }

    setIsLoading(true);
    try {
      const url = await QRCode.toDataURL(inputText, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1a1a2e',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      });
      setQrDataURL(url);
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
    generateQR(text);
  }, [text]);

  const downloadQR = () => {
    if (!qrDataURL) return;

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataURL;
    link.click();

    toast({
      title: "Download iniciado",
      description: "Seu código QR foi baixado com sucesso!",
    });
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
            <label className="text-sm font-medium text-foreground">
              Digite seu texto ou URL
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Ex: https://seusite.com ou seu texto aqui..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="pr-12 h-12 text-base transition-smooth focus:shadow-glow focus:border-primary/50"
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-accent/50"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
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
              <div className="w-[300px] h-[300px] bg-accent/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-border/50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : qrDataURL ? (
              <div className="p-4 bg-white rounded-2xl shadow-card transition-smooth hover:scale-105 animate-scale-in">
                <img 
                  src={qrDataURL} 
                  alt="QR Code" 
                  className="w-[300px] h-[300px] rounded-lg"
                />
              </div>
            ) : (
              <div className="w-[300px] h-[300px] bg-accent/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-border/50">
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
            <Button 
              onClick={downloadQR}
              className="gradient-primary hover:opacity-90 shadow-primary transition-smooth hover:shadow-glow px-8 py-3 text-base font-medium"
            >
              <Download className="w-5 h-5 mr-2" />
              Baixar QR Code
            </Button>
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