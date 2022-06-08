from app.models import db, User, Post
from random import choice, randint
from faker import Faker
fake = Faker(locale='en-US')

def seed_posts():
    # dairy
    dairy_request1 = Post(
        isItem=False,
        organizationId=1,
        userId=1,
        title='Need milk',
        description='Our food bank needs milk! We would appreciate it if you have at least 50 unopened cartons to spare.',
        quantity='50 count',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/dairy_request.png',
        expDate='2022-08-18',
        status = 0
    )
    db.session.add(dairy_request1)

    dairy_request2 = Post(
        isItem=False,
        organizationId=2,
        userId=2,
        title='Need blocks of cheese',
        description="We're looking for blocks of cheddar cheese. If you kept them properly stored, we would love to pick them up. Thanks!",
        quantity='10 lbs',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/dairy_request.png',
        expDate='2022-07-18',
        status = 0
    )
    db.session.add(dairy_request2)

    dairy_request3 = Post(
        isItem=False,
        organizationId=3,
        userId=3,
        title='Looking for butter',
        description='Our organization is hosting a temporary soup kitchen and we are looking for butter.',
        quantity='10 lbs',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/dairy_request.png',
        expDate='2022-07-18',
        status = 1
    )
    db.session.add(dairy_request3)

    dairy_request4 = Post(
        isItem=False,
        organizationId=4,
        userId=4,
        title='Looking for yogurt',
        description="Hello! We're looking for yogurt for lunch boxes! 1kg unopened containers would be much appreciated!",
        quantity='250 count',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/dairy_request.png',
        expDate='2022-07-18',
        status = 1
    )
    db.session.add(dairy_request4)

    dairy_request5 = Post(
        isItem=False,
        organizationId=5,
        userId=5,
        title='Cheddar cheese',
        description='Looking for blocks of cheese for boxed meals. Thanks!',
        quantity='30 lbs',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/dairy_request.png',
        expDate='2022-06-18',
        status = 2
    )
    db.session.add(dairy_request5)

    dairy_request6 = Post(
        isItem=False,
        organizationId=6,
        userId=6,
        title='Milk or chocolate milk',
        description="If you have unopened dairy or plant based regular or chocolate milk, we would love to pick up!",
        quantity='100 count',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/dairy_request.png',
        expDate='2022-07-18',
        status = 2
    )
    db.session.add(dairy_request6)

    #vegetables
    vegetable_request1 = Post(
        isItem=False,
        organizationId=7,
        userId=7,
        title='Need carrots',
        description='Our food bank needs carrots! We would appreciate it if you have at least 100 to spare.',
        quantity='100 count',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/vegetables_request.png',
        expDate='2022-07-18',
        status = 0
    )
    db.session.add(vegetable_request1)

    vegetable_request2 = Post(
        isItem=False,
        organizationId=8,
        userId=8,
        title='Need lettuce and cabbage',
        description="We're looking for heads of lettuce and cabbage. If you kept them properly stored, we would love to pick them up. Thanks!",
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/vegetables_request.png',
        expDate='2022-07-18',
        status = 0
    )
    db.session.add(vegetable_request2)

    vegetable_request3 = Post(
        isItem=False,
        organizationId=9,
        userId=9,
        title='Looking for potatoes',
        description="If you have 20 lbs potatoes, we would love to reserve a pick up time!",
        quantity='20 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/vegetables_request.png',
        expDate='2022-07-18',
        status = 0
    )
    db.session.add(vegetable_request3)

    vegetable_request4 = Post(
        isItem=False,
        organizationId=10,
        userId=10,
        title='1kg greens',
        description='Looking for 50 lbs of fresh greens. Lettuce, cabbage, spinach, kale, or any leafs will be appreciated.',
        quantity='50 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/vegetables_request.png',
        expDate='2022-09-18',
        status = 0
    )
    db.session.add(vegetable_request4)

    vegetable_request5 = Post(
        isItem=False,
        organizationId=4,
        userId=4,
        title='Cucumbers or squash',
        description="We're looking for cucumbers and squash for lunch boxes! If you have more than 50, that would be much appreciated!",
        quantity='50 count',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/vegetables_request.png',
        expDate='2022-08-30',
        status = 0
    )
    db.session.add(vegetable_request5)

    vegetable_request6 = Post(
        isItem=False,
        organizationId=11,
        userId=11,
        title='Leftover salad?',
        description='Our organization is hosting a temporary soup kitchen and we are looking for any lefover salad you may have.',
        quantity='10 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/vegetables_request.png',
        expDate='2022-06-18',
        status = 0
    )
    db.session.add(vegetable_request6)

    #fruits
    fruits_request1 = Post(
        isItem=False,
        organizationId=10,
        userId=10,
        title='Need bananas',
        description='Our food bank needs bananas! We would appreciate it if you have 1kg fresh ones to spare.',
        quantity='30 lbs',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/fruits_request.png',
        expDate='2022-09-18',
        status = 0
    )
    db.session.add(fruits_request1)

    fruits_request2 = Post(
        isItem=False,
        organizationId=9,
        userId=9,
        title='Need berries',
        description="We're looking for packaged berries. Even if they are chopped and stored in containers, we are interested! Thanks!",
        quantity='200 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/fruits_request.png',
        expDate='2022-06-18',
        status = 0
    )
    db.session.add(fruits_request2)

    fruits_request3 = Post(
        isItem=False,
        organizationId=8,
        userId=8,
        title='Looking for apples',
        description='Our organization is hosting a temporary soup kitchen and we are looking for apples.',
        quantity='10 lbs',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/fruits_request.png',
        expDate='2022-07-10',
        status = 0
    )
    db.session.add(fruits_request3)

    fruits_request4 = Post(
        isItem=False,
        organizationId=7,
        userId=7,
        title='Citrus fruit',
        description="Hello! We're looking for lemons or limes! Either fruit would be much appreciated!",
        quantity='5 lbs',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/fruits_request.png',
        expDate='2022-06-18',
        status = 0
    )
    db.session.add(fruits_request4)

    fruits_request5 = Post(
        isItem=False,
        organizationId=6,
        userId=6,
        title='Oranges',
        description='Looking for oranges for boxed meals. Sliced or whole, we do not mind at all! Thanks!',
        quantity='50 lbs',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/fruits_request.png',
        expDate='2022-08-18',
        status = 0
    )
    db.session.add(fruits_request5)

    fruits_request6 = Post(
        isItem=False,
        organizationId=5,
        userId=5,
        title='Fresh grapes',
        description='Looking for fresh grapes! We need fruit for our summer school programs. Thank you!',
        quantity='100 lbs',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/fruits_request.png',
        expDate='2022-09-01',
        status = 0
    )
    db.session.add(fruits_request6)

    fruits_request7 = Post(
        isItem=False,
        organizationId=4,
        userId=4,
        title='Pears or peaches',
        description="If you have 1kg unopened canned peaches or pears, we would love to reserve a pick up time!",
        quantity='100 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/fruits_request.png',
        expDate='2022-08-18',
        status = 0
    )
    db.session.add(fruits_request7)

    #grains
    grains_request1 = Post(
        isItem=False,
        organizationId=3,
        userId=3,
        title='Need dry pasta noodles',
        description='Our food bank needs dry pasta noodles! We would appreciate it if you have 50 boxes to spare.',
        quantity='50 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/grains_request.png',
        expDate='2022-09-18',
        status = 0
    )
    db.session.add(grains_request1)

    grains_request2 = Post(
        isItem=False,
        organizationId=2,
        userId=2,
        title='Need boxes of macaroni',
        description="We're looking for boxes of macaroni. We would love to pick them up. Thanks!",
        quantity='200 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/grains_request.png',
        expDate='2022-09-18',
        status = 0
    )
    db.session.add(grains_request2)

    grains_request3 = Post(
        isItem=False,
        organizationId=1,
        userId=1,
        title='Looking for bags of rice',
        description='We are looking to make rice balls for the homeless shelter and we need bags of rice.',
        quantity='20 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/grains_request.png',
        expDate='2022-07-05',
        status = 0
    )
    db.session.add(grains_request3)

    grains_request4 = Post(
        isItem=False,
        organizationId=11,
        userId=11,
        title='10kg bread',
        description="If you have 10kgs of bread we would love to reserve a pick up time!",
        quantity='10 kg',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/grains_request.png',
        expDate='2022-06-24',
        status = 0
    )
    db.session.add(grains_request4)

    grains_request5 = Post(
        isItem=False,
        organizationId=10,
        userId=10,
        title='Sandwhich bread',
        description='Looking for sandwhich bread, tortillas or wraps. Thanks!',
        quantity='100 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/grains_request.png',
        expDate='2022-08-30',
        status = 0
    )
    db.session.add(grains_request5)

    grains_request6 = Post(
        isItem=False,
        organizationId=9,
        userId=9,
        title='Looking for oatmeal',
        description='Looking for oatmeal!',
        quantity='200 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/grains_request.png',
        expDate='2022-08-12',
        status = 0
    )
    db.session.add(grains_request6)

    #protein
    protein_request1 = Post(
        isItem=False,
        organizationId=8,
        userId=8,
        title='Need chicken breast',
        description='Our food bank needs chicken breast! We would appreciate it if you have 10 lbs to spare.',
        quantity='10 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/protein_request.png',
        expDate='2022-06-22',
        status = 0
    )
    db.session.add(protein_request1)

    protein_request2 = Post(
        isItem=False,
        organizationId=7,
        userId=7,
        title='Need fish',
        description="We're looking for fish, we aren't picky. If you kept them properly stored, we would love to pick them up. Thanks!",
        quantity='10 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/protein_request.png',
        expDate='2022-08-08',
        status = 0
    )
    db.session.add(protein_request2)

    protein_request3 = Post(
        isItem=False,
        organizationId=6,
        userId=6,
        title='Looking for canned tuna',
        description='Our organization is hosting a temporary soup kitchen and we are looking for canned tuna.',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/protein_request.png',
        expDate='2022-10-18',
        status=0
    )
    db.session.add(protein_request3)

    protein_request4 = Post(
        isItem=False,
        organizationId=5,
        userId=5,
        title='Looking for canned tuna',
        description='Our organization is hosting a temporary soup kitchen and we are looking for canned tuna.',
        quantity='200 count',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/protein_request.png',
        expDate='2022-07-06',
        status = 0
    )
    db.session.add(protein_request4)

    protein_request5 = Post(
        isItem=False,
        organizationId=4,
        userId=4,
        title='Looking for eggs',
        description="Hello! We're looking for eggs for lunch boxes, ideally 200 eggs. Thanks!",
        quantity='200 count',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/protein_request.png',
        expDate='2022-07-21',
        status = 0
    )
    db.session.add(protein_request5)

    protein_request6 = Post(
        isItem=False,
        organizationId=3,
        userId=3,
        title='Canned almonds',
        description="If you have unopened canned almonds, we would love to reserve a pick up time!",
        quantity='100 count',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/protein_request.png',
        expDate='2022-07-08',
        status = 0
    )
    db.session.add(protein_request6)

    protein_request7 = Post(
        isItem=False,
        organizationId=2,
        userId=2,
        title='Looking for pork.',
        description='Looking for pork, ideally pork chops for boxed meals. Thanks!',
        quantity='20 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/protein_request.png',
        expDate='2022-08-18',
        status = 0
    )
    db.session.add(protein_request7)

    protein_request8 = Post(
        isItem=False,
        organizationId=1,
        userId=1,
        title='Looking for burger patties.',
        description='Looking for burger patties. If you have beef or vegan patties, we would love to pick them up. Thanks!',
        quantity='300 count',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/protein_request.png',
        expDate='2022-08-20',
        status = 0
    )
    db.session.add(protein_request8)


    # for items
    for i in range(26, 31):
        dairy_items = Post(
            isItem=True,
            organizationId=i,
            userId=i,
            title=choice(('Fresh milk', 'Blocks of cheese', 'Unsalted butter', 'Plain yogurt', 'Cartons of chocolate milk', 'Shredded cheddar cheese')),
            description=choice(('Unopened low fat and whole milk.', '5 lbs of cheddar cheese blocks. Unopened.', '10 boxes of unsalted butter.', '3 pints of plain non-fat yogurt.', '6 cartons of chocholate milk.', '10 lbs of shredded cheddar cheese.')),
            quantity=str(randint(1, 20))+' '+choice(('pounds', 'lbs.', 'kg', 'kgs', '3 lbs')),
            categoryId=1,
            imageUrl='https://mealizeaa.s3.amazonaws.com/'+'Dairy-'+str(randint(1, 5))+'.jpg',
            expDate='2022-06-18',
            status = randint(0, 2)
        )
        db.session.add(dairy_items)

    for j in range(31, 45):
        vegetable_items = Post(
            isItem=True,
            organizationId=j,
            userId=j,
            title=choice(('Got carrots', 'Got lettuce and cabbage', 'Tomatoes', 'Some greens', 'Cucumbers and squash', 'Leftover salad')),
            description=choice(('My restaurant has carrots!', "We'be got heads of lettuce and cabbage.", 'Our cafe has lefover salad.', "Hello! We've got cucumbers and squash!", "We've got frest tomatoes, they have about a week left!", 'Got three pounds of fresh greens.')),
            quantity=choice(('5 lbs', '1kg', '5kg', '10 lbs', '3 kgs', '3 lbs')),
            categoryId=2,
            imageUrl='https://mealizeaa.s3.amazonaws.com/'+'Vegetables-'+str(randint(1, 12))+'.jpg',
            expDate='2022-07-18',
            status = randint(0, 2)
        )
        db.session.add(vegetable_items)

    for k in range(45, 51):
        fruits_items = Post(
            isItem=True,
            organizationId=k,
            userId=k,
            title=choice(('Got bananas', 'Got berries', 'We have apples', 'Plenty of citrus fruit', 'Oranges', 'Fresh grapes', 'Pears and peaches')),
            description=choice(('We have leftover bananas!', "We've got packaged berries.They were chopped and stored in containers!", 'We have a lot of apples!', "Hello! We've got lemonsand limes!", "We have unopened canned peaches and pears!", 'We have twenty whole oranges and about ten worth of sliced ones.', 'Got about five pounds of fresh grapes!')),
            quantity=choice(('5 lbs', '1kg', '5kg', '10 lbs', '3 kgs', '3 lbs')),
            categoryId=3,
            imageUrl=choice(('https://mealizeaa.s3.amazonaws.com/Fruits-1.jpg', 'https://mealizeaa.s3.amazonaws.com/Fruits-2.png', 'https://mealizeaa.s3.amazonaws.com/Fruits-3.png', 'https://mealizeaa.s3.amazonaws.com/Fruits-4.jpg', 'https://mealizeaa.s3.amazonaws.com/Fruits-5.png' )),
            expDate='2022-08-18',
            status = randint(0, 2)
        )
        db.session.add(fruits_items)

    for l in range(51, 65):
        grains_items = Post(
            isItem=True,
            organizationId=l-26,
            userId=l-26,
            title=choice(('Got dry pasta noodles', 'Got boxes of macaroni', 'Stocked on bags of rice', 'Got bread', 'Sandwhich bread', 'Got tortillas and wraps', 'Got oatmeal')),
            description=choice(('We have boxed of dry pasta noodles!', "We have boxes of macaroni.", 'We have about thirty rice balls and we have bags of rice!', "Hello! We have ten bags of sandwhich bread that have several days left.", "We have a lot of flour and corn tortillas!", 'we have about 3 pounds of tortillas and wraps.', 'We have ten boxes of oatmeal!')),
            quantity=choice(('5 lbs', '1kg', '5kg', '10 lbs', '3 kgs', '3 lbs')),
            categoryId=4,
            imageUrl='https://mealizeaa.s3.amazonaws.com/'+'Grains-'+str(randint(1, 13))+'.jpg',
            expDate='2022-09-18',
            status = randint(0, 2)
        )
        db.session.add(grains_items)

    for m in range(65, 76):
        protein_items = Post(
            isItem=True,
            organizationId=m-26,
            userId=m-26,
            title=choice(('Got chicken breast', 'Got fish', 'Plenty of canned tuna', 'Got eggs', 'Tofu and soy beans', 'Pork chops', 'Burger patties', 'Canned almonds')),
            description=choice(('We have five 2 lb. frozen packs of chicken breast!', "We have frozen fish. We kept them properly stored.", 'Our market has about 50 cans of tuna that is past the shelf life by a week.', "Hello! We have 120 eggs (10 packs).", "We have fifteen unopened canned almonds.", 'We have five pork chops and ten pounds of minced pork.', 'We have ten beef and ten vegan patties.', 'We have tofu and soy beans.')),
            quantity=choice(('5 lbs', '1kg', '5kg', '10 lbs', '3 kgs', '3 lbs')),
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
