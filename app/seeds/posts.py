from app.models import db, User, Post
from random import choice, randint
from faker import Faker
fake = Faker(locale='en-US')

def seed_posts():
    # for requests
    for i in range(1, 6):
        dairy_requests = Post(
            isItem=False,
            organizationId=randint(1, 25),
            userId=randint(1, 25),
            title=choice(('Need milk', 'Need blocks of cheese', 'Looking for butter', '1kg yogurt', 'Milk or chocolate milk', 'Cheddar cheese')),
            description=choice(('Our food bank needs milk! We would appreciate it if you have 1kg unopened cartons to spare.', "We're looking for blocks of cheddar cheese. If you kept them properly stored, we would love to pick them up. Thanks!", 'Our organization is hosting a temporary soup kitchen and we are looking for butter.', "Hello! We're looking for yogurt for lunch boxes! 1kg unopened containers would be much appreciated!", "If you have 1kg unopened dairy or plant based milk, we would love to reserve a pick up time!", 'Looking for blocks of cheese for boxed meals. Thanks!')),
            quantity=choice(('5 pounds', '1kg', '5kg', '10 pounds', '3 kgs', '3 lbs.')),
            categoryId=1,
            imageUrl='https://mealizeaa.s3.amazonaws.com/dairy_request.png',
            expDate='2022-06-18',
            status = randint(0, 2)
        )
        db.session.add(dairy_requests)

    for j in range(6, 11):
        vegetable_requests = Post(
            isItem=False,
            organizationId=randint(1, 25),
            userId=randint(1, 25),
            title=choice(('Need carrots', 'Need lettuce and cabbage', 'Looking for potatoes', '1kg greens', 'Cucumbers or squash', 'Leftover salad?')),
            description=choice(('Our food bank needs carrots! We would appreciate it if you have 1kg to spare.', "We're looking for heads of lettuce and cabbage. If you kept them properly stored, we would love to pick them up. Thanks!", 'Our organization is hosting a temporary soup kitchen and we are looking for 1kg lefover salad you may have.', "Hello! We're looking for cucumbers and squash for lunch boxes! 1kg amount would be much appreciated!", "If you have 1kg potatoes, we would love to reserve a pick up time!", 'Looking for 1kg fresh greens. Thanks!')),
            quantity=choice(('5 pounds', '1kg', '5kg', '10 pounds', '3 kgs', '3 lbs.')),
            categoryId=2,
            imageUrl='https://mealizeaa.s3.amazonaws.com/vegetables_request.png',
            expDate='2022-07-18',
            status = randint(0, 2)
        )
        db.session.add(vegetable_requests)

    for k in range(11, 16):
        fruits_requests = Post(
            isItem=False,
            organizationId=randint(1, 25),
            userId=randint(1, 25),
            title=choice(('Need bananas', 'Need berries', 'Looking for apples', '1kg citrus fruit', 'Oranges', 'Fresh grapes', 'Pears or peaches')),
            description=choice(('Our food bank needs bananas! We would appreciate it if you have 1kg fresh ones to spare.', "We're looking for packaged berries. Even if they are chopped and stored in containers, we are interested! Thanks!", 'Our organization is hosting a temporary soup kitchen and we are looking for apples.', "Hello! We're looking for lemons or limes! Either fruit would be much appreciated!", "If you have 1kg unopened canned peaches or pears, we would love to reserve a pick up time!", 'Looking for oranges for boxed meals. Sliced or whole, we do not mind at all! Thanks!', 'Looking for fresh grapes! We need fruit for our after school programs. Thank you!')),
            quantity=choice(('5 pounds', '1kg', '5kg', '10 pounds', '3 kgs', '3 lbs.')),
            categoryId=3,
            imageUrl='https://mealizeaa.s3.amazonaws.com/fruits_request.png',
            expDate='2022-08-18',
            status = randint(0, 2)
        )
        db.session.add(fruits_requests)

    for l in range(16, 21):
        grains_requests = Post(
            isItem=False,
            organizationId=randint(1, 25),
            userId=randint(1, 25),
            title=choice(('Need dry pasta noodles', 'Need boxes of macaroni', 'Looking for bags of rice', '1kg bread', 'Sandwhich bread', 'Looking for oatmeal')),
            description=choice(('Our food bank needs dry pasta noodles! We would appreciate it if you have 1kg boxes to spare.', "We're looking for boxes of macaroni. We would love to pick them up. Thanks!", 'We are looking to make rice balls for the homeless shelter and we need bags of rice.', "Hello! We're looking for yogurt for lunch boxes! 1kg unopened containers would be much appreciated!", "If you have 1kg bread, we would love to reserve a pick up time!", 'Looking for sandwhich bread, tortillas or wraps. Thanks!', 'Looking for oatmeal!')),
            quantity=choice(('5 pounds', '1kg', '5kg', '10 pounds', '3 kgs', '3 lbs.')),
            categoryId=4,
            imageUrl='https://mealizeaa.s3.amazonaws.com/grains_request.png',
            expDate='2022-09-18',
            status = randint(0, 2)
        )
        db.session.add(grains_requests)

    for m in range(21, 26):
        protein_requests = Post(
            isItem=False,
            organizationId=randint(1, 25),
            userId=randint(1, 25),
            title=choice(('Need chicken breast', 'Need fish', 'Looking for canned tuna', '1kg eggs', 'Tofu or beans', 'Pork chops', 'Burger patties', 'Canned almonds')),
            description=choice(('Our food bank needs chicken breast! We would appreciate it if you have 1kg amount to spare.', "We're looking for fish, we aren't picky. If you kept them properly stored, we would love to pick them up. Thanks!", 'Our organization is hosting a temporary soup kitchen and we are looking for canned tuna.', "Hello! We're looking for eggs for lunch boxes! 1kg amount would be much appreciated!", "If you have 1kg unopened canned almonds, we would love to reserve a pick up time!", 'Looking for pork, ideally pork chops for boxed meals. Thanks!', 'Looking for burger patties. If you have beef or vegan patties, we would love to pick them up. Thanks!', 'We need tofu and black beans. If you have 1kg we would love to pick them up!')),
            quantity=choice(('5 pounds', '1kg', '5kg', '10 pounds', '3 kgs', '3 lbs.')),
            categoryId=5,
            imageUrl='https://mealizeaa.s3.amazonaws.com/protein_request.png',
            expDate='2022-10-18',
            status = randint(0, 2)
        )
        db.session.add(protein_requests)

    # for items
    for i in range(26, 31):
        dairy_items = Post(
            isItem=True,
            organizationId=randint(26, 50),
            userId=randint(26, 50),
            title=choice(('Fresh milk', 'Blocks of cheese', 'Unsalted butter', 'Plain yogurt', 'Cartons of chocolate milk', 'Shredded cheddar cheese')),
            description=choice(('Unopened low fat and whole milk.', '5 pounds of cheddar cheese blocks. Unopened.', '10 boxes of unsalted butter.', '3 pints of plain non-fat yogurt.', '6 cartons of chocholate milk.', '10 pounds of shredded cheddar cheese.')),
            quantity=str(randint(1, 20))+' '+choice(('pounds', 'lbs.', 'kg', 'kgs', '3 lbs.')),
            categoryId=1,
            imageUrl='https://mealizeaa.s3.amazonaws.com/'+'Dairy-'+str(randint(1, 5))+'.jpg',
            expDate='2022-06-18',
            status = randint(0, 2)
        )
        db.session.add(dairy_items)

    for j in range(31, 45):
        vegetable_items = Post(
            isItem=True,
            organizationId=randint(26, 50),
            userId=randint(26, 50),
            title=choice(('Got carrots', 'Got lettuce and cabbage', 'Tomatoes', 'Some greens', 'Cucumbers and squash', 'Leftover salad')),
            description=choice(('My restaurant has carrots!', "We'be got heads of lettuce and cabbage.", 'Our cafe has lefover salad.', "Hello! We've got cucumbers and squash!", "We've got frest tomatoes, they have about a week left!", 'Got three pounds of fresh greens.')),
            quantity=choice(('5 pounds', '1kg', '5kg', '10 pounds', '3 kgs', '3 lbs.')),
            categoryId=2,
            imageUrl='https://mealizeaa.s3.amazonaws.com/'+'Vegetables-'+str(randint(1, 12))+'.jpg',
            expDate='2022-07-18',
            status = randint(0, 2)
        )
        db.session.add(vegetable_items)

    for k in range(45, 51):
        fruits_items = Post(
            isItem=True,
            organizationId=randint(26, 50),
            userId=randint(26, 50),
            title=choice(('Got bananas', 'Got berries', 'We have apples', 'Plenty of citrus fruit', 'Oranges', 'Fresh grapes', 'Pears and peaches')),
            description=choice(('We have leftover bananas!', "We've got packaged berries.They were chopped and stored in containers!", 'We have a lot of apples!', "Hello! We've got lemonsand limes!", "We have unopened canned peaches and pears!", 'We have twenty whole oranges and about ten worth of sliced ones.', 'Got about five pounds of fresh grapes!')),
            quantity=choice(('5 pounds', '1kg', '5kg', '10 pounds', '3 kgs', '3 lbs.')),
            categoryId=3,
            imageUrl=choice(('https://mealizeaa.s3.amazonaws.com/Fruits-1.jpg', 'https://mealizeaa.s3.amazonaws.com/Fruits-2.png', 'https://mealizeaa.s3.amazonaws.com/Fruits-3.png', 'https://mealizeaa.s3.amazonaws.com/Fruits-4.jpg', 'https://mealizeaa.s3.amazonaws.com/Fruits-5.png' )),
            expDate='2022-08-18',
            status = randint(0, 2)
        )
        db.session.add(fruits_items)

    for l in range(51, 65):
        grains_items = Post(
            isItem=True,
            organizationId=randint(26, 50),
            userId=randint(26, 50),
            title=choice(('Got dry pasta noodles', 'Got boxes of macaroni', 'Stocked on bags of rice', 'Got bread', 'Sandwhich bread', 'Got tortillas and wraps', 'Got oatmeal')),
            description=choice(('We have boxed of dry pasta noodles!', "We have boxes of macaroni.", 'We have about thirty rice balls and we have bags of rice!', "Hello! We have ten bags of sandwhich bread that have several days left.", "We have a lot of flour and corn tortillas!", 'we have about 3 pounds of tortillas and wraps.', 'We have ten boxes of oatmeal!')),
            quantity=choice(('5 pounds', '1kg', '5kg', '10 pounds', '3 kgs', '3 lbs.')),
            categoryId=4,
            imageUrl='https://mealizeaa.s3.amazonaws.com/'+'Grains-'+str(randint(1, 13))+'.jpg',
            expDate='2022-09-18',
            status = randint(0, 2)
        )
        db.session.add(grains_items)

    for m in range(65, 76):
        protein_items = Post(
            isItem=True,
            organizationId=randint(26, 50),
            userId=randint(26, 50),
            title=choice(('Got chicken breast', 'Got fish', 'Plenty of canned tuna', 'Got eggs', 'Tofu and soy beans', 'Pork chops', 'Burger patties', 'Canned almonds')),
            description=choice(('We have five 2 lb. frozen packs of chicken breast!', "We have frozen fish. We kept them properly stored.", 'Our market has about 50 cans of tuna that is past the shelf life by a week.', "Hello! We have 120 eggs (10 packs).", "We have fifteen unopened canned almonds.", 'We have five pork chops and ten pounds of minced pork.', 'We have ten beef and ten vegan patties.', 'We have tofu and soy beans.')),
            quantity=choice(('5 pounds', '1kg', '5kg', '10 pounds', '3 kgs', '3 lbs.')),
            categoryId=5,
            imageUrl=choice(('https://mealizeaa.s3.amazonaws.com/Protein-1.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-2.png', 'https://mealizeaa.s3.amazonaws.com/Protein-3.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-4.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-5.jpg')),
            expDate='2022-10-18',
            status = randint(0, 2)
        )
        db.session.add(protein_items)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
