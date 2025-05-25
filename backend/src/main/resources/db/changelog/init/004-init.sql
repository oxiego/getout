-- Tabelle für Packlisten
CREATE TABLE packlist (
    uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT
);

-- Tabelle für die Beziehung zwischen Packliste und Item
CREATE TABLE packlist_item (
    packlist_id UUID NOT NULL,
    item_id UUID NOT NULL,
    PRIMARY KEY (packlist_id, item_id),
    FOREIGN KEY (packlist_id) REFERENCES packlist(uuid) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES item(uuid) ON DELETE CASCADE
);