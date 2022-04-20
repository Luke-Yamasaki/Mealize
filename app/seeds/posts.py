from app.models import db, User, Post
from random import choice, randint
from faker import Faker
fake = Faker(locale='en-US')

def seed_posts():
    # for requests
    for i in range(1, 21):
        dairy_requests = Post(
            isItem=False,
            organizationId=randint(1, 25),
            userId=randint(1, 25),
            title=choice(('Need milk', 'Need blocks of cheese', 'Looking for butter', 'Any yogurt', 'Milk or chocolate milk', 'Cheddar cheese')),
            description=choice(('Our food bank needs milk! We would appreciate it if you have any unopened cartons to spare.', "We're looking for blocks of cheddar cheese. If you kept them properly stored, we would love to pick them up. Thanks!", 'Our organization is hosting a temporary soup kitchen and we are looking for butter. Any amount would be greatly appreciated!', "Hello! We're looking for yogurt for lunch boxes! Any unopened containers would be much appreciated!", "If you have any unopened dairy or plant based milk, we would love to reserve a pick up time!", 'Looking for blocks of cheese for boxed meals. Thanks!')),
            quantity=choice(('Anything above 5 pounds!', 'Any', '5kg minimum.', 'Ideally 10 pounds', '~2 kgs')),
            categoryId=1,
            imageUrl='https://mealize.s3.amazonaws.com/dairy_request.png',
            expDate='2022-06-18',
            status = 0
        )
        db.session.add(dairy_requests)

    for j in range(21, 41):
        vegetable_requests = Post(
            isItem=False,
            organizationId=randint(1, 25),
            userId=randint(1, 25),
            title=choice(('Need carrots', 'Need lettuce and cabbage', 'Looking for potatoes', 'Any greens', 'Cucumbers or squash', 'Leftover salad?')),
            description=choice(('Our food bank needs carrots! We would appreciate it if you have any to spare.', "We're looking for heads of lettuce and cabbage. If you kept them properly stored, we would love to pick them up. Thanks!", 'Our organization is hosting a temporary soup kitchen and we are looking for any lefover salad you may have. Any amount would be greatly appreciated!', "Hello! We're looking for cucumbers and squash for lunch boxes! Any amount would be much appreciated!", "If you have any potatoes, we would love to reserve a pick up time!", 'Looking for any fresh greens. Thanks!')),
            quantity=choice(('Anything above 5 pounds!', 'Any', '5kg minimum.', 'Ideally 10 pounds', '~2 kgs')),
            categoryId=2,
            imageUrl='https://mealize.s3.amazonaws.com/vegetables_request.png',
            expDate='2022-07-18',
            status = 0
        )
        db.session.add(vegetable_requests)

    for k in range(41, 61):
        fruits_requests = Post(
            isItem=False,
            organizationId=randint(1, 25),
            userId=randint(1, 25),
            title=choice(('Need bananas', 'Need berries', 'Looking for apples', 'Any citrus fruit', 'Oranges', 'Fresh grapes', 'Pears or peaches')),
            description=choice(('Our food bank needs bananas! We would appreciate it if you have any fresh ones to spare.', "We're looking for packaged berries. Even if they are chopped and stored in containers, we are interested! Thanks!", 'Our organization is hosting a temporary soup kitchen and we are looking for apples. Any amount would be greatly appreciated!', "Hello! We're looking for lemons or limes! Either fruit would be much appreciated!", "If you have any unopened canned peaches or pears, we would love to reserve a pick up time!", 'Looking for oranges for boxed meals. Sliced or whole, we do not mind at all! Thanks!', 'Looking for fresh grapes! We need fruit for our after school programs. Thank you!')),
            quantity=choice(('Anything above 5 pounds!', 'Any', '5kg minimum.', 'Ideally 10 pounds', '~2 kgs')),
            categoryId=3,
            imageUrl='https://mealize.s3.amazonaws.com/fruits_request.png',
            expDate='2022-08-18',
            status = 0
        )
        db.session.add(fruits_requests)

    for l in range(61, 81):
        grains_requests = Post(
            isItem=False,
            organizationId=randint(1, 25),
            userId=randint(1, 25),
            title=choice(('Need dry pasta noodles', 'Need boxes of macaroni', 'Looking for bags of rice', 'Any bread', 'Sandwhich bread, tortillas or wraps', 'Looking for oatmeal')),
            description=choice(('Our food bank needs dry pasta noodles! We would appreciate it if you have any boxes to spare.', "We're looking for boxes of macaroni. We would love to pick them up. Thanks!", 'We are looking to make rice balls for the homeless shelter and we need bags of rice. Any amount would be greatly appreciated!', "Hello! We're looking for yogurt for lunch boxes! Any unopened containers would be much appreciated!", "If you have any bread, we would love to reserve a pick up time!", 'Looking for sandwhich bread, tortillas or wraps. Thanks!', 'Looking for oatmeal!')),
            quantity=choice(('Anything above 5 pounds!', 'Any', '5kg minimum.', 'Ideally 10 pounds', '~2 kgs')),
            categoryId=4,
            imageUrl='https://mealize.s3.amazonaws.com/grains_request.png',
            expDate='2022-09-18',
            status = 0
        )
        db.session.add(grains_requests)

    for m in range(81, 101):
        protein_requests = Post(
            isItem=False,
            organizationId=randint(1, 25),
            userId=randint(1, 25),
            title=choice(('Need chicken breast', 'Need fish', 'Looking for canned tuna', 'Any eggs', 'Tofu or beans', 'Pork chops', 'Burger patties', 'Canned almonds')),
            description=choice(('Our food bank needs chicken breast! We would appreciate it if you have any amount to spare.', "We're looking for fish, we aren't picky. If you kept them properly stored, we would love to pick them up. Thanks!", 'Our organization is hosting a temporary soup kitchen and we are looking for canned tuna. Any amount would be greatly appreciated!', "Hello! We're looking for eggs for lunch boxes! Any amount would be much appreciated!", "If you have any unopened canned almonds, we would love to reserve a pick up time!", 'Looking for pork, ideally pork chops for boxed meals. Thanks!', 'Looking for burger patties. If you have beef or vegan patties, we would love to pick them up. Thanks!', 'We need tofu and black beans. If you have any we would love to pick them up!')),
            quantity=choice(('Anything above 5 pounds!', 'Any', '5kg minimum.', 'Ideally 10 pounds', '~2 kgs')),
            categoryId=5,
            imageUrl='https://mealize.s3.amazonaws.com/protein_request.png',
            expDate='2022-10-18',
            status = 0
        )
        db.session.add(protein_requests)

    # for items
    for i in range(101, 121):
        dairy_items = Post(
            isItem=True,
            organizationId=randint(26, 100),
            userId=randint(26, 100),
            title=choice(('Fresh milk', 'Blocks of cheese', 'Unsalted butter', 'Plain yogurt', 'Cartons of chocolate milk', 'Shredded cheddar cheese')),
            description=choice(('Unopened low fat and whole milk.', '5 pounds of cheddar cheese blocks. Unopened.', '10 boxes of unsalted butter.', '3 pints of plain non-fat yogurt.', '6 cartons of chocholate milk.', '10 pounds of shredded cheddar cheese.')),
            quantity=str(randint(1, 20))+' '+choice(('pounds', 'lbs.', 'kg', 'kgs')),
            categoryId=1,
            imageUrl='https://mealize.s3.amazonaws.com/'+'Dairy-'+str(randint(1, 6))+'.jpg',
            expDate='2022-06-18',
            status = 0
        )
        db.session.add(dairy_items)

    for j in range(121, 201):
        vegetable_items = Post(
            isItem=True,
            organizationId=randint(26, 100),
            userId=randint(26, 100),
            title=choice(('Got carrots', 'Got lettuce and cabbage', 'Tomatoes', 'Some greens', 'Cucumbers and squash', 'Leftover salad')),
            description=choice(('My restaurant has carrots!', "We'be got heads of lettuce and cabbage.", 'Our cafe has lefover salad.', "Hello! We've got cucumbers and squash!", "We've got frest tomatoes, they have about a week left!", 'Got three pounds of fresh greens.')),
            quantity=choice(('Anything above 5 pounds!', 'Any', '5kg minimum.', 'Ideally 10 pounds', '~2 kgs')),
            categoryId=2,
            imageUrl='https://mealize.s3.amazonaws.com/'+'Vegetables-'+str(randint(1, 13))+'.jpg',
            expDate='2022-07-18',
            status = 0
        )
        db.session.add(vegetable_items)

    for k in range(201, 221):
        fruits_items = Post(
            isItem=True,
            organizationId=randint(26, 100),
            userId=randint(26, 100),
            title=choice(('Got bananas', 'Got berries', 'We have apples', 'Plenty of citrus fruit', 'Oranges', 'Fresh grapes', 'Pears and peaches')),
            description=choice(('We have leftover bananas!', "We've got packaged berries.They were chopped and stored in containers!", 'We have a lot of apples!', "Hello! We've got lemonsand limes!", "We have unopened canned peaches and pears!", 'We have twenty whole oranges and about ten worth of sliced ones.', 'Got about five pounds of fresh grapes!')),
            quantity=choice(('Anything above 5 pounds!', 'Any', '5kg minimum.', 'Ideally 10 pounds', '~2 kgs')),
            categoryId=3,
            imageUrl='https://mealize.s3.amazonaws.com/'+'Fruits-'+str(randint(1, 5))+'.jpg',
            expDate='2022-08-18',
            status = 0
        )
        db.session.add(fruits_items)

    for l in range(221, 301):
        grains_items = Post(
            isItem=True,
            organizationId=randint(26, 100),
            userId=randint(26, 100),
            title=choice(('Need dry pasta noodles', 'Need boxes of macaroni', 'Looking for bags of rice', 'Any bread', 'Sandwhich bread, tortillas or wraps', 'Looking for oatmeal')),
            description=choice(('Our food bank needs dry pasta noodles! We would appreciate it if you have any boxes to spare.', "We're looking for boxes of macaroni. We would love to pick them up. Thanks!", 'We are looking to make rice balls for the homeless shelter and we need bags of rice. Any amount would be greatly appreciated!', "Hello! We're looking for yogurt for lunch boxes! Any unopened containers would be much appreciated!", "If you have any bread, we would love to reserve a pick up time!", 'Looking for sandwhich bread, tortillas or wraps. Thanks!', 'Looking for oatmeal!')),
            quantity=choice(('Anything above 5 pounds!', 'Any', '5kg minimum.', 'Ideally 10 pounds', '~2 kgs')),
            categoryId=4,
            imageUrl='https://mealize.s3.amazonaws.com/'+'Grains-'+str(randint(1, 13))+'.jpg',
            expDate='2022-09-18',
            status = 0
        )
        db.session.add(grains_items)

    for m in range(301, 351):
        protein_items = Post(
            isItem=True,
            organizationId=randint(26, 100),
            userId=randint(26, 100),
            title=choice(('Need chicken breast', 'Need fish', 'Looking for canned tuna', 'Any eggs', 'Tofu or beans', 'Pork chops', 'Burger patties', 'Canned almonds')),
            description=choice(('Our food bank needs chicken breast! We would appreciate it if you have any amount to spare.', "We're looking for fish, we aren't picky. If you kept them properly stored, we would love to pick them up. Thanks!", 'Our organization is hosting a temporary soup kitchen and we are looking for canned tuna. Any amount would be greatly appreciated!', "Hello! We're looking for eggs for lunch boxes! Any amount would be much appreciated!", "If you have any unopened canned almonds, we would love to reserve a pick up time!", 'Looking for pork, ideally pork chops for boxed meals. Thanks!', 'Looking for burger patties. If you have beef or vegan patties, we would love to pick them up. Thanks!', 'We need tofu and black beans. If you have any we would love to pick them up!')),
            quantity=choice(('Anything above 5 pounds!', 'Any', '5kg minimum.', 'Ideally 10 pounds', '~2 kgs')),
            categoryId=5,
            imageUrl='https://mealize.s3.amazonaws.com/'+'Fruits-'+str(randint(1, 10))+'.jpg',
            expDate='2022-10-18',
            status = 0
        )
        db.session.add(protein_items)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
