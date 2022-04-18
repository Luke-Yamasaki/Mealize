from app.models import db, Category

def seed_categories():
    dairy = Category(
        category='Dairy'
    )
    db.session.add(dairy)

    vegetables = Category(
        category='Vegetables'
    )
    db.session.add(vegetables)

    fruits = Category(
        category='Fruits'
    )
    db.session.add(fruits)

    grains = Category(
        category='Grains'
    )
    db.session.add(grains)

    protein=Category(
        category='Protein'
    )
    db.session.add(protein)

    db.session.commit()

def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
