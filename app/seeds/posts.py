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
        quantity='50 lbs',
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
        status = 2
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
        status = 2
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
        status = 2
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
        title='Looking for bread',
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
        status = 2
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
        status = 2
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
        title='Looking for tofu',
        description='Our organization is making boxed meals and we are looking for tofu.',
        quantity='250 count',
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
        title='Canned tuna',
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
        title='Looking for beef patties.',
        description='Looking for burger patties. If you have beef or vegan patties, we would love to pick them up. Thanks!',
        quantity='300 count',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/protein_request.png',
        expDate='2022-08-20',
        status = 0
    )
    db.session.add(protein_request8)

    #items
    #dairy
    dairy_item1 = Post(
        isItem=True,
        organizationId=26,
        userId=26,
        title='Fresh milk',
        description='Unopened low fat and whole milk.',
        quantity='30 count',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Dairy-1.jpg',
        expDate='2022-07-18',
        status = 0
    )
    db.session.add(dairy_item1)

    dairy_item2 = Post(
        isItem=True,
        organizationId=27,
        userId=27,
        title='Assorted cheese',
        description='100 lbs of assorted cheese. Good for two weeks.',
        quantity='100 lbs',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Dairy-2.jpg',
        expDate='2022-06-22',
        status = 0
    )
    db.session.add(dairy_item2)

    dairy_item3 = Post(
        isItem=True,
        organizationId=28,
        userId=28,
        title='Diced cheese',
        description='We have 30 lbs of diced parmesean cheese. Good for 10 days.',
        quantity='30 lbs',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Dairy-3.jpg',
        expDate='2022-06-18',
        status = 0
    )
    db.session.add(dairy_item3)

    dairy_item4 = Post(
        isItem=True,
        organizationId=29,
        userId=29,
        title='1% Milk',
        description='We have about 100 cartons of one percent fat milk. Expires in 3 weeks',
        quantity='100 count',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Dairy-4.jpg',
        expDate='2022-06-29',
        status = 0
    )
    db.session.add(dairy_item4)

    dairy_item5 = Post(
        isItem=True,
        organizationId=30,
        userId=30,
        title='Mozzarella cheese',
        description='We have about 30 lbs of fresh mozzarella cheese. Thanks!',
        quantity='30 lbs',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Dairy-5.jpg',
        expDate='2022-06-18',
        status = 0
    )
    db.session.add(dairy_item5)

    dairy_item6 = Post(
        isItem=True,
        organizationId=31,
        userId=31,
        title='Blocks of cheese',
        description='We have two boxes full of blocks of cheddar cheese. About 75 lbs.',
        quantity='75 lbs',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Dairy-6.jpg',
        expDate='2022-09-18',
        status = 0
    )
    db.session.add(dairy_item6)

    #vegetables
    vegetable_item1 = Post(
        isItem=True,
        organizationId=32,
        userId=32,
        title='Assorted vegetables',
        description='We have five boxes of fresh zucchini, squash and potatoes.',
        quantity='100 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-1.jpg',
        expDate='2022-07-18',
        status = 0
    )
    db.session.add(vegetable_item1)

    vegetable_item2 = Post(
        isItem=True,
        organizationId=33,
        userId=33,
        title='Mixed vegetables',
        description='We have about 150 lbs of potatoes, carrots, tomatoes, peppers and cabbage.',
        quantity='150 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-2.jpg',
        expDate='2022-07-05',
        status = 0
    )
    db.session.add(vegetable_item2)

    vegetable_item3 = Post(
        isItem=True,
        organizationId=34,
        userId=34,
        title='Boxes of veggies',
        description='We have ten boxes of peppers, spinach, squash and celery. About 150 lbs',
        quantity='150 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-3.jpg',
        expDate='2022-07-18',
        status = 0
    )
    db.session.add(vegetable_item3)

    vegetable_item4 = Post(
        isItem=True,
        organizationId=35,
        userId=35,
        title='Leftover salad',
        description='Our cafe has about 30 packaged salads. Good for one week.',
        quantity='30 count',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-4.jpg',
        expDate='2022-06-15',
        status = 0
    )
    db.session.add(vegetable_item4)

    vegetable_item5 = Post(
        isItem=True,
        organizationId=36,
        userId=36,
        title='Tomatoes',
        description="We've got frest tomatoes, they have about a week left!",
        quantity='50 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-5.jpg',
        expDate='2022-06-25',
        status = 0
    )
    db.session.add(vegetable_item5)

    vegetable_item6 = Post(
        isItem=True,
        organizationId=37,
        userId=37,
        title='Roasted veggies',
        description='My restaurant has leftover roasted brocolli and carrots from a catering event. About 10 trays.',
        quantity='15 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-6.jpg',
        expDate='2022-06-12',
        status = 0
    )
    db.session.add(vegetable_item6)

    vegetable_item7 = Post(
        isItem=True,
        organizationId=38,
        userId=38,
        title='Sliced avocados',
        description='We have about 30 sliced avocados left over from an event. They have been refrigerated.',
        quantity='30 count',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-7.jpg',
        expDate='2022-06-23',
        status = 0
    )
    db.session.add(vegetable_item7)

    vegetable_item8 = Post(
        isItem=True,
        organizationId=39,
        userId=39,
        title='Fresh artichokes',
        description='We have about 50 whole artichokes. Should be good for a month and a half.',
        quantity='50 count',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-8.jpg',
        expDate='2022-07-18',
        status = 0
    )
    db.session.add(vegetable_item8)

    vegetable_item9 = Post(
        isItem=True,
        organizationId=26,
        userId=26,
        title='Mixed vegetables',
        description="I have romanesco brocolli, beets, raddishes, carrots and sweet potatoes.",
        quantity='50 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-9.jpg',
        expDate='2022-07-01',
        status = 0
    )
    db.session.add(vegetable_item9)

    vegetable_item10 = Post(
        isItem=True,
        organizationId=27,
        userId=27,
        title='Root vegetables',
        description='We have mixed colored carrots, raddishes, beets and cauliflower.',
        quantity='30 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-10.jpg',
        expDate='2022-06-26',
        status = 0
    )
    db.session.add(vegetable_item10)

    vegetable_item11 = Post(
        isItem=True,
        organizationId=28,
        userId=28,
        title='Got carrots',
        description='My restaurant has carrots, about 100 of them!',
        quantity='100 count',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-11.jpg',
        expDate='2022-07-28',
        status = 0
    )
    db.session.add(vegetable_item11)

    vegetable_item12 = Post(
        isItem=True,
        organizationId=29,
        userId=29,
        title="Farmer's market",
        description='We have about 200 lbs of leftover veggies. Cucumbers, squash, pumkin, eggplants, tomatoes, etc.',
        quantity='200 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-12.jpg',
        expDate='2022-07-11',
        status = 0
    )
    db.session.add(vegetable_item12)

    #fruits
    fruits_item1 = Post(
        isItem=True,
        organizationId=30,
        userId=30,
        title='Fresh apples',
        description='We have a lot of fresh apples! About 5 boxes, so around 500 of them.',
        quantity='500 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-1.jpg',
        expDate='2022-07-18',
        status = 0
    )
    db.session.add(fruits_item1)

    fruits_item2 = Post(
        isItem=True,
        organizationId=31,
        userId=31,
        title='Fruit cups',
        description='We have about 100 fruit cups left from an event. Good for the rest of the week.',
        quantity='100 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-2.jpg',
        expDate='2022-06-15',
        status = 0
    )
    db.session.add(fruits_item2)

    fruits_item3 = Post(
        isItem=True,
        organizationId=32,
        userId=32,
        title='Mixed fruit',
        description='We have about 20 lbs of apples, oranges, bananas, pineapples and pears.',
        quantity='20 lbs',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-3.jpg',
        expDate='2022-07-18',
        status = 0
    )
    db.session.add(fruits_item3)

    fruits_item4 = Post(
        isItem=True,
        organizationId=33,
        userId=33,
        title='Fresh fruit',
        description='We have four boxes of fresh apples, oranges and bananas! Good for at least 2 weeks.',
        quantity='150 lbs',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-4.jpg',
        expDate='2022-06-28',
        status = 0
    )
    db.session.add(fruits_item4)

    fruits_item5 = Post(
        isItem=True,
        organizationId=34,
        userId=34,
        title='Palisade peaches',
        description='We have about 50 Palisade peaches. Should be good for 3 weeks.',
        quantity='50 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-5.jpg',
        expDate='2022-06-29',
        status = 0
    )
    db.session.add(fruits_item5)

    fruits_item6 = Post(
        isItem=True,
        organizationId=35,
        userId=35,
        title='Boxes of apples',
        description='We have ten boxes of fresh apples! There are about 350 apples.',
        quantity='350 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-6.jpg',
        expDate='2022-07-22',
        status = 0
    )
    db.session.add(fruits_item6)

    fruits_item7 = Post(
        isItem=True,
        organizationId=36,
        userId=36,
        title='Fresh grapes',
        description='We have about 5 crates of fresh grapes. They weigh about 20 lbs per crate.',
        quantity='100 lbs',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-7.jpg',
        expDate='2022-06-25',
        status = 0
    )
    db.session.add(fruits_item7)

    fruits_item8 = Post(
        isItem=True,
        organizationId=37,
        userId=37,
        title='Packaged fruit',
        description='We have about 100 packaged cups of berries, grapes, oranges, pineapples, apples and kiwi.',
        quantity='100 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-8.jpg',
        expDate='2022-07-18',
        status = 0
    )
    db.session.add(fruits_item8)

    fruits_item9 = Post(
        isItem=True,
        organizationId=38,
        userId=38,
        title='Limes',
        description='We have about 200 fresh limes.',
        quantity='200 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-9.jpg',
        expDate='2022-07-24',
        status = 0
    )
    db.session.add(fruits_item9)

    fruits_item10 = Post(
        isItem=True,
        organizationId=39,
        userId=39,
        title='Lemons',
        description='We have about 300 fresh lemons.',
        quantity='300 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-10.jpg',
        expDate='2022-08-09',
        status = 0
    )
    db.session.add(fruits_item10)

    #grains
    grains_item1 = Post(
        isItem=True,
        organizationId=26,
        userId=26,
        title='Assorted bread',
        description='We have about 200 count of assorted bread that was baked two days ago.',
        quantity='200 xount',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-1.jpg',
        expDate='2022-06-18',
        status = 0
    )
    db.session.add(grains_item1)

    grains_item2 = Post(
        isItem=True,
        organizationId=27,
        userId=27,
        title='Bags of rice',
        description='We have about 100 bags of long grain rice.',
        quantity='100 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-2.jpg',
        expDate='2022-09-18',
        status = 0
    )
    db.session.add(grains_item2)

    grains_item3 = Post(
        isItem=True,
        organizationId=28,
        userId=28,
        title='Loaves of bread',
        description='Hello! We have about 50 loaves of white bread that were baked 3 days ago.',
        quantity='50 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-3.jpg',
        expDate='2022-09-18',
        status = 0
    )
    db.session.add(grains_item3)

    grains_item4 = Post(
        isItem=True,
        organizationId=29,
        userId=29,
        title='Baked goods',
        description='We have about 10 different types of baked goods, weighing around 50 lbs.',
        quantity='50 lbs',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-4.jpg',
        expDate='2022-06-18',
        status = 0
    )
    db.session.add(grains_item4)

    grains_item5 = Post(
        isItem=True,
        organizationId=30,
        userId=30,
        title='Got dry pasta noodles',
        description='We have 100 boxes of dry pasta noodles!',
        quantity='100 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-5.jpg',
        expDate='2023-01-18',
        status = 0
    )
    db.session.add(grains_item5)

    grains_item6 = Post(
        isItem=True,
        organizationId=31,
        userId=31,
        title='David Pastrňák macaroni',
        description='We have David Pastrňák macaroni boxes! We were fortunate enough to receive surplus cases.',
        quantity='300 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-6.jpg',
        expDate='2023-02-18',
        status = 0
    )
    db.session.add(grains_item6)

    grains_item7 = Post(
        isItem=True,
        organizationId=32,
        userId=32,
        title='Sourdough bread',
        description='We have 50 loaves of sourdough bread. They are good for one week.',
        quantity='50 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-7.jpg',
        expDate='2022-06-15',
        status = 0
    )
    db.session.add(grains_item7)

    grains_item8 = Post(
        isItem=True,
        organizationId=33,
        userId=33,
        title='Assorted package',
        description="We have a mix of rice, couscous, chickpeas, nuts and seeds. There are four boxes and they are good for several months.",
        quantity='60 lbs',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-8.jpg',
        expDate='2022-09-08',
        status = 0
    )
    db.session.add(grains_item8)

    grains_item9 = Post(
        isItem=True,
        organizationId=34,
        userId=34,
        title='Jasmine rice',
        description='We have 30 bags of jasmine rice. Good for one month.',
        quantity='30 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-9.jpg',
        expDate='2022-07-08',
        status = 0
    )
    db.session.add(grains_item9)

    grains_item10 = Post(
        isItem=True,
        organizationId=35,
        userId=35,
        title='Basmati rice',
        description='I have about 20 bags of basmati rice that will expire at the end of the month.',
        quantity='20 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-10.jpg',
        expDate='2022-06-30',
        status = 0
    )
    db.session.add(grains_item10)

    grains_item11 = Post(
        isItem=True,
        organizationId=36,
        userId=36,
        title='White rice',
        description='I have 50 bags of white rice.',
        quantity='50 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-11.jpg',
        expDate='2020-12-11',
        status = 4
    )
    db.session.add(grains_item11)

    grains_item12 = Post(
        isItem=True,
        organizationId=37,
        userId=37,
        title='Cookies',
        description='We have about 300 ginger bread cookies left from an event. They should be good for at least one week.',
        quantity='300 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-12.jpg',
        expDate='2022-06-15',
        status = 0
    )
    db.session.add(grains_item12)

    grains_item13 = Post(
        isItem=True,
        organizationId=38,
        userId=38,
        title='Packaged bread',
        description="Hello! I have about 50 packages of bread like you see here. Everything was baked 2 days ago. Thanks!",
        quantity='50 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-13.jpg',
        expDate='2022-06-22',
        status = 0
    )
    db.session.add(grains_item13)

    #protein
    protein_item1 = Post(
        isItem=True,
        organizationId=39,
        userId=39,
        title='Frozen salmon',
        description='We have 40 pounds of frozen Alaskan salmon.',
        quantity='40 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-1.jpg',
        expDate='2022-12-18',
        status = 0
    )
    db.session.add(protein_item1)

    protein_item2 = Post(
        isItem=True,
        organizationId=26,
        userId=26,
        title='Frozen tuna',
        description="I have about 60 pounds of frozen tuna. They won't expire for at least 3 months",
        quantity='60 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-2.jpg',
        expDate='2022-9-08',
        status = 0
    )
    db.session.add(protein_item2)

    protein_item3 = Post(
        isItem=True,
        organizationId=27,
        userId=27,
        title='Frozen sashimi',
        description='We have about 10 lbs of yellowtail sashimi. They have been frozen and will last for another week.',
        quantity='10 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-2.jpg',
        expDate='2022-06-15',
        status = 0
    )
    db.session.add(protein_item3)

    protein_item4 = Post(
        isItem=True,
        organizationId=28,
        userId=28,
        title='Fresh fish',
        description='We have 50 pounds of red snapper and horse mackerel.',
        quantity='50 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-4.jpg',
        expDate='2022-6-23',
        status = 0
    )
    db.session.add(protein_item4)

    protein_item5 = Post(
        isItem=True,
        organizationId=29,
        userId=29,
        title='Roast beef',
        description='We have about 10 containers of roast beef left over from a catering event. The weight is about 50 lbs.',
        quantity='50 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-5.jpg',
        expDate='2022-06-14',
        status = 0
    )
    db.session.add(protein_item5)

    protein_item6 = Post(
        isItem=True,
        organizationId=30,
        userId=30,
        title='Ribeye steak',
        description='We have about 30 lbs of ribeye steak. They have been refrigerated and have about 3 days left.',
        quantity='30 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-6.jpg',
        expDate='2022-06-11',
        status = 0
    )
    db.session.add(protein_item6)

    protein_item7 = Post(
        isItem=True,
        organizationId=31,
        userId=31,
        title='Mixed protein',
        description='I have leftover chicken, shrimp, salmon and steak. They have all been refrigerated and should last another week.',
        quantity='20 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-7.jpg',
        expDate='2022-06-15',
        status = 0
    )
    db.session.add(protein_item7)

    protein_item8 = Post(
        isItem=True,
        organizationId=32,
        userId=32,
        title='Vienna sausage',
        description='We have about 100 cans of Vienna sausage that expires in 2 months. Thanks!',
        quantity='100 cans',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-8.jpg',
        expDate='2022-08-18',
        status = 0
    )
    db.session.add(protein_item8)

    protein_item1 = Post(
        isItem=True,
        organizationId=39,
        userId=39,
        title=choice(('Got chicken breast', 'Got fish', 'Plenty of canned tuna', 'Got eggs', 'Tofu and soy beans', 'Pork chops', 'Burger patties', 'Canned almonds')),
        description=choice(('We have five 2 lb. frozen packs of chicken breast!', "We have frozen fish. We kept them properly stored.", 'Our market has about 50 cans of tuna that is past the shelf life by a week.', "Hello! We have 120 eggs (10 packs).", "We have fifteen unopened canned almonds.", 'We have five pork chops and ten pounds of minced pork.', 'We have ten beef and ten vegan patties.', 'We have tofu and soy beans.')),
        quantity=choice(('5 lbs', '1kg', '5kg', '10 lbs', '3 kgs', '3 lbs')),
        categoryId=5,
        imageUrl=choice(('https://mealizeaa.s3.amazonaws.com/Protein-1.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-2.png', 'https://mealizeaa.s3.amazonaws.com/Protein-3.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-4.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-5.jpg')),
        expDate='2022-10-18',
        status = 0
    )
    db.session.add(protein_item1)

    protein_item1 = Post(
        isItem=True,
        organizationId=39,
        userId=39,
        title=choice(('Got chicken breast', 'Got fish', 'Plenty of canned tuna', 'Got eggs', 'Tofu and soy beans', 'Pork chops', 'Burger patties', 'Canned almonds')),
        description=choice(('We have five 2 lb. frozen packs of chicken breast!', "We have frozen fish. We kept them properly stored.", 'Our market has about 50 cans of tuna that is past the shelf life by a week.', "Hello! We have 120 eggs (10 packs).", "We have fifteen unopened canned almonds.", 'We have five pork chops and ten pounds of minced pork.', 'We have ten beef and ten vegan patties.', 'We have tofu and soy beans.')),
        quantity=choice(('5 lbs', '1kg', '5kg', '10 lbs', '3 kgs', '3 lbs')),
        categoryId=5,
        imageUrl=choice(('https://mealizeaa.s3.amazonaws.com/Protein-1.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-2.png', 'https://mealizeaa.s3.amazonaws.com/Protein-3.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-4.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-5.jpg')),
        expDate='2022-10-18',
        status = 0
    )
    db.session.add(protein_item1)

    protein_item1 = Post(
        isItem=True,
        organizationId=39,
        userId=39,
        title=choice(('Got chicken breast', 'Got fish', 'Plenty of canned tuna', 'Got eggs', 'Tofu and soy beans', 'Pork chops', 'Burger patties', 'Canned almonds')),
        description=choice(('We have five 2 lb. frozen packs of chicken breast!', "We have frozen fish. We kept them properly stored.", 'Our market has about 50 cans of tuna that is past the shelf life by a week.', "Hello! We have 120 eggs (10 packs).", "We have fifteen unopened canned almonds.", 'We have five pork chops and ten pounds of minced pork.', 'We have ten beef and ten vegan patties.', 'We have tofu and soy beans.')),
        quantity=choice(('5 lbs', '1kg', '5kg', '10 lbs', '3 kgs', '3 lbs')),
        categoryId=5,
        imageUrl=choice(('https://mealizeaa.s3.amazonaws.com/Protein-1.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-2.png', 'https://mealizeaa.s3.amazonaws.com/Protein-3.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-4.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-5.jpg')),
        expDate='2022-10-18',
        status = 0
    )
    db.session.add(protein_item1)

    protein_item1 = Post(
        isItem=True,
        organizationId=39,
        userId=39,
        title=choice(('Got chicken breast', 'Got fish', 'Plenty of canned tuna', 'Got eggs', 'Tofu and soy beans', 'Pork chops', 'Burger patties', 'Canned almonds')),
        description=choice(('We have five 2 lb. frozen packs of chicken breast!', "We have frozen fish. We kept them properly stored.", 'Our market has about 50 cans of tuna that is past the shelf life by a week.', "Hello! We have 120 eggs (10 packs).", "We have fifteen unopened canned almonds.", 'We have five pork chops and ten pounds of minced pork.', 'We have ten beef and ten vegan patties.', 'We have tofu and soy beans.')),
        quantity=choice(('5 lbs', '1kg', '5kg', '10 lbs', '3 kgs', '3 lbs')),
        categoryId=5,
        imageUrl=choice(('https://mealizeaa.s3.amazonaws.com/Protein-1.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-2.png', 'https://mealizeaa.s3.amazonaws.com/Protein-3.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-4.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-5.jpg')),
        expDate='2022-10-18',
        status = 0
    )
    db.session.add(protein_item1)

    protein_item1 = Post(
        isItem=True,
        organizationId=39,
        userId=39,
        title=choice(('Got chicken breast', 'Got fish', 'Plenty of canned tuna', 'Got eggs', 'Tofu and soy beans', 'Pork chops', 'Burger patties', 'Canned almonds')),
        description=choice(('We have five 2 lb. frozen packs of chicken breast!', "We have frozen fish. We kept them properly stored.", 'Our market has about 50 cans of tuna that is past the shelf life by a week.', "Hello! We have 120 eggs (10 packs).", "We have fifteen unopened canned almonds.", 'We have five pork chops and ten pounds of minced pork.', 'We have ten beef and ten vegan patties.', 'We have tofu and soy beans.')),
        quantity=choice(('5 lbs', '1kg', '5kg', '10 lbs', '3 kgs', '3 lbs')),
        categoryId=5,
        imageUrl=choice(('https://mealizeaa.s3.amazonaws.com/Protein-1.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-2.png', 'https://mealizeaa.s3.amazonaws.com/Protein-3.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-4.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-5.jpg')),
        expDate='2022-10-18',
        status = 0
    )
    db.session.add(protein_item1)

    protein_item1 = Post(
        isItem=True,
        organizationId=39,
        userId=39,
        title=choice(('Got chicken breast', 'Got fish', 'Plenty of canned tuna', 'Got eggs', 'Tofu and soy beans', 'Pork chops', 'Burger patties', 'Canned almonds')),
        description=choice(('We have five 2 lb. frozen packs of chicken breast!', "We have frozen fish. We kept them properly stored.", 'Our market has about 50 cans of tuna that is past the shelf life by a week.', "Hello! We have 120 eggs (10 packs).", "We have fifteen unopened canned almonds.", 'We have five pork chops and ten pounds of minced pork.', 'We have ten beef and ten vegan patties.', 'We have tofu and soy beans.')),
        quantity=choice(('5 lbs', '1kg', '5kg', '10 lbs', '3 kgs', '3 lbs')),
        categoryId=5,
        imageUrl=choice(('https://mealizeaa.s3.amazonaws.com/Protein-1.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-2.png', 'https://mealizeaa.s3.amazonaws.com/Protein-3.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-4.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-5.jpg')),
        expDate='2022-10-18',
        status = 0
    )
    db.session.add(protein_item1)

    protein_item1 = Post(
        isItem=True,
        organizationId=39,
        userId=39,
        title=choice(('Got chicken breast', 'Got fish', 'Plenty of canned tuna', 'Got eggs', 'Tofu and soy beans', 'Pork chops', 'Burger patties', 'Canned almonds')),
        description=choice(('We have five 2 lb. frozen packs of chicken breast!', "We have frozen fish. We kept them properly stored.", 'Our market has about 50 cans of tuna that is past the shelf life by a week.', "Hello! We have 120 eggs (10 packs).", "We have fifteen unopened canned almonds.", 'We have five pork chops and ten pounds of minced pork.', 'We have ten beef and ten vegan patties.', 'We have tofu and soy beans.')),
        quantity=choice(('5 lbs', '1kg', '5kg', '10 lbs', '3 kgs', '3 lbs')),
        categoryId=5,
        imageUrl=choice(('https://mealizeaa.s3.amazonaws.com/Protein-1.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-2.png', 'https://mealizeaa.s3.amazonaws.com/Protein-3.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-4.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-5.jpg')),
        expDate='2022-10-18',
        status = 0
    )
    db.session.add(protein_item1)

    protein_item1 = Post(
        isItem=True,
        organizationId=39,
        userId=39,
        title=choice(('Got chicken breast', 'Got fish', 'Plenty of canned tuna', 'Got eggs', 'Tofu and soy beans', 'Pork chops', 'Burger patties', 'Canned almonds')),
        description=choice(('We have five 2 lb. frozen packs of chicken breast!', "We have frozen fish. We kept them properly stored.", 'Our market has about 50 cans of tuna that is past the shelf life by a week.', "Hello! We have 120 eggs (10 packs).", "We have fifteen unopened canned almonds.", 'We have five pork chops and ten pounds of minced pork.', 'We have ten beef and ten vegan patties.', 'We have tofu and soy beans.')),
        quantity=choice(('5 lbs', '1kg', '5kg', '10 lbs', '3 kgs', '3 lbs')),
        categoryId=5,
        imageUrl=choice(('https://mealizeaa.s3.amazonaws.com/Protein-1.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-2.png', 'https://mealizeaa.s3.amazonaws.com/Protein-3.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-4.jpg', 'https://mealizeaa.s3.amazonaws.com/Protein-5.jpg')),
        expDate='2022-10-18',
        status = 0
    )
    db.session.add(protein_item1)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
