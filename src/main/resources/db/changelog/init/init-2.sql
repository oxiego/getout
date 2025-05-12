ALTER TABLE public.item
  ALTER COLUMN article_height TYPE numeric(38,2),
  ALTER COLUMN article_length TYPE numeric(38,2),
  ALTER COLUMN article_width TYPE numeric(38,2),
  ALTER COLUMN packed_height TYPE numeric(38,2),
  ALTER COLUMN packed_length TYPE numeric(38,2),
  ALTER COLUMN packed_width TYPE numeric(38,2),
  ALTER COLUMN weight TYPE numeric(38,2);
