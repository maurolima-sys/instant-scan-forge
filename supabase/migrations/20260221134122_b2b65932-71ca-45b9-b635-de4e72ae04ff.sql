
-- Tabela de QR codes gerados pelos usuários
CREATE TABLE public.qr_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Sem título',
  original_url TEXT NOT NULL,
  short_code TEXT UNIQUE DEFAULT NULL,
  qr_settings JSONB NOT NULL DEFAULT '{}',
  logo_url TEXT DEFAULT NULL,
  scan_count INTEGER NOT NULL DEFAULT 0,
  is_dynamic BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de analytics de escaneamento
CREATE TABLE public.qr_scans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  qr_code_id UUID NOT NULL REFERENCES public.qr_codes(id) ON DELETE CASCADE,
  scanned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  user_agent TEXT DEFAULT NULL,
  ip_country TEXT DEFAULT NULL,
  referrer TEXT DEFAULT NULL
);

-- Índices
CREATE INDEX idx_qr_codes_user_id ON public.qr_codes(user_id);
CREATE INDEX idx_qr_codes_short_code ON public.qr_codes(short_code);
CREATE INDEX idx_qr_scans_qr_code_id ON public.qr_scans(qr_code_id);

-- RLS
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_scans ENABLE ROW LEVEL SECURITY;

-- QR codes: usuários veem/editam apenas os seus
CREATE POLICY "Users can view own qr_codes"
  ON public.qr_codes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own qr_codes"
  ON public.qr_codes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own qr_codes"
  ON public.qr_codes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own qr_codes"
  ON public.qr_codes FOR DELETE
  USING (auth.uid() = user_id);

-- Scans: usuários veem scans dos seus QR codes
CREATE POLICY "Users can view scans of own qr_codes"
  ON public.qr_scans FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.qr_codes
      WHERE qr_codes.id = qr_scans.qr_code_id
      AND qr_codes.user_id = auth.uid()
    )
  );

-- Scans: inserção pública (qualquer pessoa pode escanear)
CREATE POLICY "Anyone can insert scans"
  ON public.qr_scans FOR INSERT
  WITH CHECK (true);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_qr_codes_updated_at
  BEFORE UPDATE ON public.qr_codes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
