from app.models import db, User, Post
from random import choice, randint
from faker import Faker
fake = Faker(locale='en-US')

def seed_posts():
    for i in range(1, 21):
        dairy_requests = Post(
            isItem=False,
            organizationId=randint(1, 25),
            userId=randint(1, 25),
            title=choice(('Need milk', 'Need blocks of cheese', 'Looking for butter', 'Any yogurt', 'Milk or chocolate milk', 'Cheddar cheese')),
            description=choice(('Our food bank needs milk! We would appreciate it if you have any unopened cartons to spare.', "We're looking for blocks of cheddar cheese. If you kept them properly stored, we would love to pick them up. Thanks!", 'Our organization is hosting a temporary soup kitchen and we are looking for butter. Any amount would be greatly appreciated!', "Hello! We're looking for yogurt for lunch boxes! Any unopened containers would be much appreciated!", "If you have any unopened dairy or plant based milk, we would love to reserve a pick up time!", 'Looking for blocks of cheese for boxed meals. Thanks!')),
            quantity=choice(('Anything above 5 pounds!', 'Any', '5kg minimum.', 'Ideally 10 pounds', '~2 kgs'))
            categoryId=1,
            imageUrl='',
            expirationDate='06-18-2022 00:00:00',
            status = 0
        )
        db.session.add(dairy_requests)

    for j in range(21, 41):
        vegetable_requests = Post(
            isItem=False,
            organizationId=randint(1, 25),
            userId=randint(1, 25),
            title=choice(('Need milk', 'Need blocks of cheese', 'Looking for butter', 'Any yogurt', 'Milk or chocolate milk', 'Cheddar cheese')),
            description=choice(('Our food bank needs milk! We would appreciate it if you have any unopened cartons to spare.', "We're looking for blocks of cheddar cheese. If you kept them properly stored, we would love to pick them up. Thanks!", 'Our organization is hosting a temporary soup kitchen and we are looking for butter. Any amount would be greatly appreciated!', "Hello! We're looking for yogurt for lunch boxes! Any unopened containers would be much appreciated!", "If you have any unopened dairy or plant based milk, we would love to reserve a pick up time!", 'Looking for blocks of cheese for boxed meals. Thanks!')),
            quantity=choice(('Anything above 5 pounds!', 'Any', '5kg minimum.', 'Ideally 10 pounds', '~2 kgs'))
            categoryId=2,
            imageUrl='',
            expirationDate='07-18-2022 00:00:00',
            status = 0
        )
        db.session.add(vegetables_requests)

    for k in range(41, 61):
        fruits_requests = Post(
            isItem=False,
            organizationId=randint(1, 25),
            userId=randint(1, 25),
            title=choice(('Need milk', 'Need blocks of cheese', 'Looking for butter', 'Any yogurt', 'Milk or chocolate milk', 'Cheddar cheese')),
            description=choice(('Our food bank needs milk! We would appreciate it if you have any unopened cartons to spare.', "We're looking for blocks of cheddar cheese. If you kept them properly stored, we would love to pick them up. Thanks!", 'Our organization is hosting a temporary soup kitchen and we are looking for butter. Any amount would be greatly appreciated!', "Hello! We're looking for yogurt for lunch boxes! Any unopened containers would be much appreciated!", "If you have any unopened dairy or plant based milk, we would love to reserve a pick up time!", 'Looking for blocks of cheese for boxed meals. Thanks!')),
            quantity=choice(('Anything above 5 pounds!', 'Any', '5kg minimum.', 'Ideally 10 pounds', '~2 kgs'))
            categoryId=3,
            imageUrl='',
            expirationDate='08-18-2022 00:00:00',
            status = 0
        )
        db.session.add(fruits_requests)

    for l in range(61, 81):
        grains_requests = Post(
            isItem=False,
            organizationId=randint(1, 25),
            userId=randint(1, 25),
            title=choice(('Need milk', 'Need blocks of cheese', 'Looking for butter', 'Any yogurt', 'Milk or chocolate milk', 'Cheddar cheese')),
            description=choice(('Our food bank needs milk! We would appreciate it if you have any unopened cartons to spare.', "We're looking for blocks of cheddar cheese. If you kept them properly stored, we would love to pick them up. Thanks!", 'Our organization is hosting a temporary soup kitchen and we are looking for butter. Any amount would be greatly appreciated!', "Hello! We're looking for yogurt for lunch boxes! Any unopened containers would be much appreciated!", "If you have any unopened dairy or plant based milk, we would love to reserve a pick up time!", 'Looking for blocks of cheese for boxed meals. Thanks!')),
            quantity=choice(('Anything above 5 pounds!', 'Any', '5kg minimum.', 'Ideally 10 pounds', '~2 kgs'))
            categoryId=4,
            imageUrl='',
            expirationDate='09-18-2022 00:00:00',
            status = 0
        )
        db.session.add(grains_requests)

    for m in range(81, 101):
        grains_requests = Post(
            isItem=False,
            organizationId=randint(1, 25),
            userId=randint(1, 25),
            title=choice(('Need milk', 'Need blocks of cheese', 'Looking for butter', 'Any yogurt', 'Milk or chocolate milk', 'Cheddar cheese')),
            description=choice(('Our food bank needs milk! We would appreciate it if you have any unopened cartons to spare.', "We're looking for blocks of cheddar cheese. If you kept them properly stored, we would love to pick them up. Thanks!", 'Our organization is hosting a temporary soup kitchen and we are looking for butter. Any amount would be greatly appreciated!', "Hello! We're looking for yogurt for lunch boxes! Any unopened containers would be much appreciated!", "If you have any unopened dairy or plant based milk, we would love to reserve a pick up time!", 'Looking for blocks of cheese for boxed meals. Thanks!')),
            quantity=choice(('Anything above 5 pounds!', 'Any', '5kg minimum.', 'Ideally 10 pounds', '~2 kgs'))
            categoryId=5,
            imageUrl='',
            expirationDate='10-18-2022 00:00:00',
            status = 0
        )
        db.session.add(grains_requests)

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
