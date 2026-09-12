-- Carga idempotente para a demonstração do Meu Dog.
-- Execute depois que o backend tiver criado a tabela "meu-dog".
INSERT INTO "meu-dog".animais
    (id, nome, especie, idade, raca, sexo, porte, descricao, status, data_cadastro)
VALUES
    ('00000000-0000-0000-0000-000000000001', 'Amora', 'Cachorro', 3, 'SRD', 'FEMEA', 'MEDIO', 'Brincalhona e carinhosa.', 'DISPONIVEL', '2026-09-12 09:00:00'),
    ('00000000-0000-0000-0000-000000000002', 'Tobias', 'Gato', 2, 'SRD', 'MACHO', 'PEQUENO', 'Curioso e tranquilo.', 'ADOTADO', '2026-09-12 08:30:00'),
    ('00000000-0000-0000-0000-000000000003', 'Nina', 'Cachorro', 5, 'Beagle', 'FEMEA', 'MEDIO', 'Dócil e muito companheira.', 'DISPONIVEL', '2026-09-12 08:00:00'),
    ('00000000-0000-0000-0000-000000000004', 'Pipoca', 'Coelho', 1, 'Mini Lion', 'FEMEA', 'PEQUENO', 'Calma e acostumada com crianças.', 'DISPONIVEL', '2026-09-12 07:30:00'),
    ('00000000-0000-0000-0000-000000000005', 'Bento', 'Cachorro', 4, 'Labrador', 'MACHO', 'GRANDE', 'Energético e amigável.', 'ADOTADO', '2026-09-12 07:00:00'),
    ('00000000-0000-0000-0000-000000000006', 'Luna', 'Gato', 3, 'Siamês', 'FEMEA', 'PEQUENO', 'Independente e afetuosa.', 'DISPONIVEL', '2026-09-12 06:30:00'),
    ('00000000-0000-0000-0000-000000000007', 'Chico', 'Ave', 2, 'Calopsita', 'MACHO', 'PEQUENO', 'Sociável e vocal.', 'DISPONIVEL', '2026-09-12 06:00:00'),
    ('00000000-0000-0000-0000-000000000008', 'Cacau', 'Cachorro', 6, 'Poodle', 'FEMEA', 'PEQUENO', 'Inteligente e carinhosa.', 'ADOTADO', '2026-09-12 05:30:00'),
    ('00000000-0000-0000-0000-000000000009', 'Theo', 'Gato', 1, 'SRD', 'MACHO', 'PEQUENO', 'Brincalhão e curioso.', 'DISPONIVEL', '2026-09-12 05:00:00'),
    ('00000000-0000-0000-0000-000000000010', 'Jade', 'Coelho', 2, 'Angorá', 'FEMEA', 'PEQUENO', 'Gentil e tranquila.', 'DISPONIVEL', '2026-09-12 04:30:00'),
    ('00000000-0000-0000-0000-000000000011', 'Max', 'Cachorro', 7, 'Pastor Alemão', 'MACHO', 'GRANDE', 'Leal e protetor.', 'ADOTADO', '2026-09-12 04:00:00')
ON CONFLICT (id) DO NOTHING;
