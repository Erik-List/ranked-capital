/*
  # Rename investor fields for better clarity

  1. Changes
    - Rename `technologies` to `investmentFocus` in investors table
    - Rename `approachConcept` to `investmentConcept` in investors table

  2. Security
    - Preserves existing RLS policies
    - No data loss during migration
*/

DO $$ 
BEGIN
  -- Rename technologies to investmentFocus
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'investors' AND column_name = 'technologies'
  ) THEN
    ALTER TABLE investors RENAME COLUMN technologies TO investment_focus;
  END IF;

  -- Rename approachConcept to investmentConcept
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'investors' AND column_name = 'approach_concept'
  ) THEN
    ALTER TABLE investors RENAME COLUMN approach_concept TO investment_concept;
  END IF;
END $$;