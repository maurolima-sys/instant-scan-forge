DROP POLICY IF EXISTS "Anyone can insert scans" ON public.qr_scans;
CREATE POLICY "Anyone can insert scans for active qr_codes"
ON public.qr_scans
FOR INSERT
TO anon, authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.qr_codes
    WHERE qr_codes.id = qr_scans.qr_code_id
      AND qr_codes.is_active = true
  )
);