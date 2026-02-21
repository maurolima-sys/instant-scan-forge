import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QrCode, Zap, BarChart3, Image, History, Shield, Check, ArrowRight } from 'lucide-react';

const features = [
  { icon: Zap, title: 'QR Codes Dinâmicos', description: 'Edite o destino do seu QR code a qualquer momento sem reimprimir' },
  { icon: BarChart3, title: 'Analytics Detalhado', description: 'Acompanhe escaneamentos, localização e dispositivos em tempo real' },
  { icon: Image, title: 'Logo Personalizado', description: 'Adicione seu logotipo ao centro do QR code para reforçar sua marca' },
  { icon: History, title: 'Histórico Completo', description: 'Acesse e gerencie todos os seus QR codes em um painel centralizado' },
  { icon: Shield, title: 'Alta Confiabilidade', description: 'Correção de erro avançada garante leitura mesmo com danos parciais' },
  { icon: QrCode, title: 'Múltiplos Formatos', description: 'Exporte em PNG ou SVG com tamanho e cores personalizáveis' },
];

const plans = [
  {
    name: 'Gratuito',
    price: 'R$ 0',
    period: '/mês',
    description: 'Para uso pessoal e testes',
    features: ['5 QR codes estáticos/mês', 'Download PNG/SVG', 'Personalização de cores', 'Sem marca d\'água'],
    cta: 'Começar grátis',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 'R$ 29',
    period: '/mês',
    description: 'Para profissionais e pequenos negócios',
    features: ['QR codes ilimitados', 'QR codes dinâmicos', 'Logo personalizado', 'Analytics básico', 'Histórico completo', 'Suporte por email'],
    cta: 'Assinar Pro',
    highlighted: true,
  },
  {
    name: 'Business',
    price: 'R$ 79',
    period: '/mês',
    description: 'Para empresas e equipes',
    features: ['Tudo do Pro', 'Analytics avançado', 'API de integração', 'QR codes em lote', 'Suporte prioritário', 'Domínio personalizado'],
    cta: 'Assinar Business',
    highlighted: false,
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-xl gradient-primary">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">QR Pro</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link to="/auth">
              <Button size="sm" className="gradient-primary hover:opacity-90 shadow-primary">
                Começar grátis
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary">
            <Zap className="w-4 h-4" />
            A ferramenta #1 de QR Codes no Brasil
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-foreground">QR Codes que</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              impulsionam resultados
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Crie, personalize e rastreie QR codes dinâmicos. Saiba exatamente quem escaneia,
            quando e de onde — tudo em tempo real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="gradient-primary hover:opacity-90 shadow-glow px-8 py-6 text-lg font-semibold">
                Criar QR Code grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/app">
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                Experimentar agora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 border-t border-border/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Tudo que você precisa em QR Codes
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Recursos profissionais para criar, gerenciar e monitorar seus QR codes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6 shadow-card transition-smooth hover:shadow-primary border-border/50 backdrop-blur-sm group">
                <div className="space-y-4">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center group-hover:shadow-glow transition-smooth">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 border-t border-border/30" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Planos para cada necessidade
            </h2>
            <p className="text-muted-foreground text-lg">
              Comece grátis e escale conforme seu negócio cresce
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`p-8 shadow-card border-border/50 backdrop-blur-sm relative flex flex-col ${
                  plan.highlighted ? 'border-primary/50 shadow-glow scale-105' : ''
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-white text-xs font-semibold">
                    Mais popular
                  </div>
                )}
                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/auth">
                  <Button
                    className={`w-full ${plan.highlighted ? 'gradient-primary hover:opacity-90 shadow-primary' : ''}`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 border-t border-border/30">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Pronto para começar?
          </h2>
          <p className="text-muted-foreground text-lg">
            Junte-se a milhares de profissionais que já usam QR Pro para impulsionar seus negócios.
          </p>
          <Link to="/auth">
            <Button size="lg" className="gradient-primary hover:opacity-90 shadow-glow px-8 py-6 text-lg font-semibold">
              Criar conta gratuita
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg gradient-primary">
              <QrCode className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-foreground">QR Pro</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} QR Pro. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
