
CREATE TABLE public.residence_availability (
  code TEXT PRIMARY KEY,
  availability TEXT NOT NULL CHECK (availability IN ('Available','Reserved','On enquiry')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.residence_availability TO anon, authenticated;
GRANT ALL ON public.residence_availability TO service_role;

ALTER TABLE public.residence_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read residence availability"
  ON public.residence_availability
  FOR SELECT
  USING (true);

INSERT INTO public.residence_availability (code, availability) VALUES
  ('I', 'Available'),
  ('II', 'Available'),
  ('III', 'Reserved'),
  ('IV', 'On enquiry');
