BEGIN;

INSERT INTO spaces 
    (name,address,city,type,upCount,downCount) 

VALUES
    ('Location 1','123 place lane','Toronto','Restaurant',5,5),
    ('Location 2','123 place lane','Vancouver','Restaurant',5,5),
    ('Location 3','123 place lane','Toronto','Patio',5,5),
    ('Location 3','123 place lane','Vancouver','Patio',5,5);

INSERT INTO types
    (type)

VALUES
    ('Restaurant'),
    ('Patio'),
    ('Bar'),
    ('Cafe'),
    ('Other');

COMMIT;