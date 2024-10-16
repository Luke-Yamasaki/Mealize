from app.models import db, Post

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
        expDate='2022-09-18',
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
        expDate='2022-11-18',
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
        expDate='2022-11-18',
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
        expDate='2022-11-18',
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
        expDate='2022-10-18',
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
        expDate='2022-11-18',
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
        expDate='2022-11-18',
        status = 0
    )
    db.session.add(vegetable_request1)

    vegetable_request2 = Post(
        isItem=False,
        organizationId=8,
        userId=8,
        title='Lettuce and cabbage',
        description="We're looking for heads of lettuce and cabbage. If you kept them properly stored, we would love to pick them up. Thanks!",
        quantity='50 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/vegetables_request.png',
        expDate='2022-11-18',
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
        expDate='2022-11-18',
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
        expDate='2022-09-30',
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
        expDate='2022-10-18',
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
        expDate='2022-10-18',
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
        expDate='2022-11-10',
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
        expDate='2022-10-18',
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
        expDate='2022-09-18',
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
        expDate='2022-09-18',
        status = 2
    )
    db.session.add(fruits_request7)

    #grains
    grains_request1 = Post(
        isItem=False,
        organizationId=3,
        userId=3,
        title='Need dry pasta',
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
        title='Macaroni boxes',
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
        title='Looking for rice',
        description='We are looking to make rice balls for the homeless shelter and we need bags of rice.',
        quantity='20 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/grains_request.png',
        expDate='2022-11-05',
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
        expDate='2022-10-24',
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
        expDate='2022-09-30',
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
        expDate='2022-09-12',
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
        expDate='2022-10-22',
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
        expDate='2022-09-08',
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
        expDate='2022-11-06',
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
        expDate='2022-11-21',
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
        expDate='2022-11-08',
        status = 0
    )
    db.session.add(protein_request6)

    protein_request7 = Post(
        isItem=False,
        organizationId=2,
        userId=2,
        title='Looking for pork',
        description='Looking for pork, ideally pork chops for boxed meals. Thanks!',
        quantity='20 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/protein_request.png',
        expDate='2022-09-18',
        status = 0
    )
    db.session.add(protein_request7)

    protein_request8 = Post(
        isItem=False,
        organizationId=1,
        userId=1,
        title='Looking for burgers',
        description='Looking for burger patties. If you have beef or vegan patties, we would love to pick them up. Thanks!',
        quantity='300 count',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/protein_request.png',
        expDate='2022-09-20',
        status = 0
    )
    db.session.add(protein_request8)

    #items
    #dairy
    dairy_item1 = Post(
        isItem=True,
        organizationId=12,
        userId=12,
        title='Fresh milk',
        description='Unopened low fat and whole milk.',
        quantity='30 count',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Dairy-1.jpg',
        expDate='2022-11-18',
        status = 0
    )
    db.session.add(dairy_item1)

    dairy_item2 = Post(
        isItem=True,
        organizationId=23,
        userId=23,
        title='Assorted cheese',
        description='100 lbs of assorted cheese. Good for two weeks.',
        quantity='100 lbs',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Dairy-2.jpg',
        expDate='2022-10-22',
        status = 0
    )
    db.session.add(dairy_item2)

    dairy_item3 = Post(
        isItem=True,
        organizationId=24,
        userId=24,
        title='Diced cheese',
        description='We have 30 lbs of diced parmesean cheese. Good for 10 days.',
        quantity='30 lbs',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Dairy-3.jpg',
        expDate='2022-10-18',
        status = 0
    )
    db.session.add(dairy_item3)

    dairy_item4 = Post(
        isItem=True,
        organizationId=13,
        userId=13,
        title='1% Milk',
        description='We have about 100 cartons of one percent fat milk. Expires in 3 weeks',
        quantity='100 count',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Dairy-4.jpg',
        expDate='2022-10-29',
        status = 0
    )
    db.session.add(dairy_item4)

    dairy_item5 = Post(
        isItem=True,
        organizationId=25,
        userId=25,
        title='Mozzarella cheese',
        description='We have about 30 lbs of fresh mozzarella cheese. Thanks!',
        quantity='30 lbs',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Dairy-5.jpg',
        expDate='2022-10-18',
        status = 0
    )
    db.session.add(dairy_item5)

    dairy_item6 = Post(
        isItem=True,
        organizationId=14,
        userId=14,
        title='Blocks of cheese',
        description='We have two boxes full of blocks of cheddar cheese. About 75 lbs.',
        quantity='75 lbs',
        categoryId=1,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Dairy-6.png',
        expDate='2022-09-18',
        status = 0
    )
    db.session.add(dairy_item6)

    #vegetables
    vegetable_item1 = Post(
        isItem=True,
        organizationId=29,
        userId=29,
        title='Assorted vegetables',
        description='We have five boxes of fresh zucchini, squash and potatoes.',
        quantity='100 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-1.jpg',
        expDate='2022-10-18',
        status = 0
    )
    db.session.add(vegetable_item1)

    vegetable_item2 = Post(
        isItem=True,
        organizationId=15,
        userId=15,
        title='Mixed vegetables',
        description='We have about 150 lbs of potatoes, carrots, tomatoes, peppers and cabbage.',
        quantity='150 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-2.jpg',
        expDate='2022-11-05',
        status = 0
    )
    db.session.add(vegetable_item2)

    vegetable_item3 = Post(
        isItem=True,
        organizationId=29,
        userId=29,
        title='Boxes of veggies',
        description='We have ten boxes of peppers, spinach, squash and celery. About 150 lbs',
        quantity='150 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-3.jpg',
        expDate='2022-11-18',
        status = 0
    )
    db.session.add(vegetable_item3)

    vegetable_item4 = Post(
        isItem=True,
        organizationId=24,
        userId=24,
        title='Leftover salad',
        description='Our cafe has about 30 packaged salads. Good for one week.',
        quantity='30 count',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-4.jpg',
        expDate='2022-10-15',
        status = 0
    )
    db.session.add(vegetable_item4)

    vegetable_item5 = Post(
        isItem=True,
        organizationId=16,
        userId=16,
        title='Tomatoes',
        description="We've got frest tomatoes, they have about a week left!",
        quantity='50 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-5.jpg',
        expDate='2022-10-25',
        status = 0
    )
    db.session.add(vegetable_item5)

    vegetable_item6 = Post(
        isItem=True,
        organizationId=24,
        userId=24,
        title='Roasted veggies',
        description='We haveleftover roasted brocolli and carrots from a catering event. About 10 trays.',
        quantity='15 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-6.jpg',
        expDate='2022-10-12',
        status = 0
    )
    db.session.add(vegetable_item6)

    vegetable_item7 = Post(
        isItem=True,
        organizationId=28,
        userId=28,
        title='Sliced avocados',
        description='We have about 30 sliced avocados left over from an event. They have been refrigerated.',
        quantity='30 count',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-7.jpg',
        expDate='2022-10-23',
        status = 0
    )
    db.session.add(vegetable_item7)

    vegetable_item8 = Post(
        isItem=True,
        organizationId=18,
        userId=18,
        title='Fresh artichokes',
        description='We have about 50 whole artichokes. Should be good for a month and a half.',
        quantity='50 count',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-8.jpg',
        expDate='2022-11-18',
        status = 0
    )
    db.session.add(vegetable_item8)

    vegetable_item9 = Post(
        isItem=True,
        organizationId=19,
        userId=19,
        title='Mixed vegetables',
        description="I have romanesco brocolli, beets, raddishes, carrots and sweet potatoes.",
        quantity='50 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-9.jpg',
        expDate='2022-11-01',
        status = 0
    )
    db.session.add(vegetable_item9)

    vegetable_item10 = Post(
        isItem=True,
        organizationId=17,
        userId=17,
        title='Root vegetables',
        description='We have mixed colored carrots, raddishes, beets and cauliflower.',
        quantity='30 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-10.jpg',
        expDate='2022-10-26',
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
        expDate='2022-11-28',
        status = 0
    )
    db.session.add(vegetable_item11)

    vegetable_item12 = Post(
        isItem=True,
        organizationId=29,
        userId=29,
        title="Farmers market",
        description='We have about 200 lbs of leftover veggies. Cucumbers, squash, pumkin, eggplants, tomatoes, etc.',
        quantity='200 lbs',
        categoryId=2,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Vegetables-12.jpg',
        expDate='2022-11-11',
        status = 0
    )
    db.session.add(vegetable_item12)

    #fruits
    fruits_item1 = Post(
        isItem=True,
        organizationId=22,
        userId=22,
        title='Fresh apples',
        description='We have a lot of fresh apples! About 5 boxes, so around 500 of them.',
        quantity='500 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-1.jpg',
        expDate='2022-11-18',
        status = 0
    )
    db.session.add(fruits_item1)

    fruits_item2 = Post(
        isItem=True,
        organizationId=28,
        userId=28,
        title='Fruit cups',
        description='We have about 100 fruit cups left from an event. Good for the rest of the week.',
        quantity='100 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-2.png',
        expDate='2022-10-15',
        status = 0
    )
    db.session.add(fruits_item2)

    fruits_item3 = Post(
        isItem=True,
        organizationId=21,
        userId=21,
        title='Mixed fruit',
        description='We have about 20 lbs of apples, oranges, bananas, pineapples and pears.',
        quantity='20 lbs',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-3.png',
        expDate='2022-11-18',
        status = 0
    )
    db.session.add(fruits_item3)

    fruits_item4 = Post(
        isItem=True,
        organizationId=20,
        userId=20,
        title='Fresh fruit',
        description='We have four boxes of fresh apples, oranges and bananas! Good for at least 2 weeks.',
        quantity='150 lbs',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-4.jpg',
        expDate='2022-10-28',
        status = 0
    )
    db.session.add(fruits_item4)

    fruits_item5 = Post(
        isItem=True,
        organizationId=19,
        userId=19,
        title='Palisade peaches',
        description='We have about 50 Palisade peaches. Should be good for 3 weeks.',
        quantity='50 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-5.png',
        expDate='2022-10-29',
        status = 0
    )
    db.session.add(fruits_item5)

    fruits_item6 = Post(
        isItem=True,
        organizationId=17,
        userId=17,
        title='Boxes of apples',
        description='We have ten boxes of fresh apples! There are about 350 apples.',
        quantity='350 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-6.jpg',
        expDate='2022-11-22',
        status = 0
    )
    db.session.add(fruits_item6)

    fruits_item7 = Post(
        isItem=True,
        organizationId=16,
        userId=16,
        title='Fresh grapes',
        description='We have about 5 crates of fresh grapes. They weigh about 20 lbs per crate.',
        quantity='100 lbs',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-7.jpg',
        expDate='2022-10-25',
        status = 0
    )
    db.session.add(fruits_item7)

    fruits_item8 = Post(
        isItem=True,
        organizationId=15,
        userId=15,
        title='Packaged fruit',
        description='We have about 100 packaged cups of berries, grapes, oranges, pineapples, apples and kiwi.',
        quantity='100 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-8.jpg',
        expDate='2022-11-18',
        status = 0
    )
    db.session.add(fruits_item8)

    fruits_item9 = Post(
        isItem=True,
        organizationId=16,
        userId=16,
        title='Limes',
        description='We have about 200 fresh limes.',
        quantity='200 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-9.jpg',
        expDate='2022-11-24',
        status = 0
    )
    db.session.add(fruits_item9)

    fruits_item10 = Post(
        isItem=True,
        organizationId=17,
        userId=17,
        title='Lemons',
        description='We have about 300 fresh lemons.',
        quantity='300 count',
        categoryId=3,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Fruits-10.jpg',
        expDate='2022-09-09',
        status = 0
    )
    db.session.add(fruits_item10)

    #grains
    grains_item1 = Post(
        isItem=True,
        organizationId=30,
        userId=30,
        title='Assorted bread',
        description='We have about 200 count of assorted bread that was baked two days ago.',
        quantity='200 xount',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-1.jpg',
        expDate='2022-10-18',
        status = 0
    )
    db.session.add(grains_item1)

    grains_item2 = Post(
        isItem=True,
        organizationId=21,
        userId=21,
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
        organizationId=30,
        userId=30,
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
        organizationId=16,
        userId=16,
        title='Baked goods',
        description='We have about 10 different types of baked goods, weighing around 50 lbs.',
        quantity='50 lbs',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-4.jpg',
        expDate='2022-10-18',
        status = 0
    )
    db.session.add(grains_item4)

    grains_item5 = Post(
        isItem=True,
        organizationId=20,
        userId=20,
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
        organizationId=16,
        userId=16,
        title='Macaroni boxes',
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
        organizationId=30,
        userId=30,
        title='Sourdough bread',
        description='We have 50 loaves of sourdough bread. They are good for one week.',
        quantity='50 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-7.jpg',
        expDate='2022-10-15',
        status = 0
    )
    db.session.add(grains_item7)

    grains_item8 = Post(
        isItem=True,
        organizationId=19,
        userId=19,
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
        organizationId=21,
        userId=21,
        title='Jasmine rice',
        description='We have 30 bags of jasmine rice. Good for one month.',
        quantity='30 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-9.jpg',
        expDate='2022-11-08',
        status = 0
    )
    db.session.add(grains_item9)

    grains_item10 = Post(
        isItem=True,
        organizationId=16,
        userId=16,
        title='Basmati rice',
        description='I have about 20 bags of basmati rice that will expire at the end of the month.',
        quantity='20 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-10.jpg',
        expDate='2022-10-30',
        status = 0
    )
    db.session.add(grains_item10)

    grains_item11 = Post(
        isItem=True,
        organizationId=27,
        userId=27,
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
        organizationId=23,
        userId=23,
        title='Cookies',
        description='We have about 300 ginger bread cookies left from an event. They should be good for at least one week.',
        quantity='300 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-12.jpg',
        expDate='2022-10-15',
        status = 0
    )
    db.session.add(grains_item12)

    grains_item13 = Post(
        isItem=True,
        organizationId=15,
        userId=15,
        title='Packaged bread',
        description="Hello! I have about 50 packages of bread like you see here. Everything was baked 2 days ago. Thanks!",
        quantity='50 count',
        categoryId=4,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Grains-13.jpg',
        expDate='2022-10-22',
        status = 0
    )
    db.session.add(grains_item13)

    #protein
    protein_item1 = Post(
        isItem=True,
        organizationId=15,
        userId=15,
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
        organizationId=16,
        userId=16,
        title='Frozen tuna',
        description="I have about 60 pounds of frozen tuna. They won't expire for at least 3 months",
        quantity='60 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-2.png',
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
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-3.jpg',
        expDate='2022-10-15',
        status = 0
    )
    db.session.add(protein_item3)

    protein_item4 = Post(
        isItem=True,
        organizationId=27,
        userId=27,
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
        organizationId=24,
        userId=24,
        title='Roast beef',
        description='We have about 10 containers of roast beef left over from a catering event. The weight is about 50 lbs.',
        quantity='50 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-5.jpg',
        expDate='2022-10-14',
        status = 0
    )
    db.session.add(protein_item5)

    protein_item6 = Post(
        isItem=True,
        organizationId=25,
        userId=25,
        title='Ribeye steak',
        description='We have about 30 lbs of ribeye steak. They have been refrigerated and have about 3 days left.',
        quantity='30 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-6.png',
        expDate='2022-10-11',
        status = 0
    )
    db.session.add(protein_item6)

    protein_item7 = Post(
        isItem=True,
        organizationId=23,
        userId=23,
        title='Mixed protein',
        description='I have leftover chicken, shrimp, salmon and steak. They have all been refrigerated and should last another week.',
        quantity='20 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-7.jpg',
        expDate='2022-10-15',
        status = 0
    )
    db.session.add(protein_item7)

    protein_item8 = Post(
        isItem=True,
        organizationId=13,
        userId=13,
        title='Vienna sausage',
        description='We have about 100 cans of Vienna sausage that expires in 2 months. Thanks!',
        quantity='100 count',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-8.jpg',
        expDate='2022-09-18',
        status = 0
    )
    db.session.add(protein_item8)

    protein_item9 = Post(
        isItem=True,
        organizationId=27,
        userId=27,
        title='Fresh tuna',
        description='We have about 20 lbs of fresh tuna that has been properly stored in a refrigerator.',
        quantity='20 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-9.png',
        expDate='2022-10-28',
        status = 0
    )
    db.session.add(protein_item9)

    protein_item10 = Post(
        isItem=True,
        organizationId=21,
        userId=21,
        title='Rotisserie chicken',
        description='I have six whole rotisserie chicken. They were prepared two days ago and have been frozen now.',
        quantity='6 count',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-10.jpg',
        expDate='2022-10-18',
        status = 0
    )
    db.session.add(protein_item10)

    protein_item11 = Post(
        isItem=True,
        organizationId=26,
        userId=26,
        title='Burger patties',
        description='Hello! I have 100 burger patties that were prepared three days ago. They have been properly refrigerated.',
        quantity='100 count',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-11.jpg',
        expDate='2022-10-21',
        status = 0
    )
    db.session.add(protein_item11)

    protein_item12 = Post(
        isItem=True,
        organizationId=16,
        userId=16,
        title='Pork loin',
        description='Hi! We have 30 packages of pork loin, each weighing 1 pound. They expire in one week.',
        quantity='30 lbs',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-12.jpg',
        expDate='2022-10-15',
        status = 0
    )
    db.session.add(protein_item12)

    protein_item13 = Post(
        isItem=True,
        organizationId=15,
        userId=15,
        title='Beyond burger',
        description='We have 25 packages of Beyond brand plant-based burger patties. Each package has 2 patties.',
        quantity='25 count',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-13.jpg',
        expDate='2022-10-26',
        status = 0
    )
    db.session.add(protein_item13)

    protein_item14 = Post(
        isItem=True,
        organizationId=12,
        userId=12,
        title='Canned tuna',
        description='Our market has about 100 cans of tuna that will expire in two weeks.',
        quantity='100 count',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-14.jpg',
        expDate='2022-10-23',
        status = 0
    )
    db.session.add(protein_item14)

    protein_item15 = Post(
        isItem=True,
        organizationId=14,
        userId=14,
        title='Cinnamon almonds',
        description='We have 30 bags of unopened cinnamon praline almonds. They will expire in three weeks. Thanks!',
        quantity='30 count',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-15.jpg',
        expDate='2022-10-29',
        status = 0
    )
    db.session.add(protein_item15)

    protein_item16 = Post(
        isItem=True,
        organizationId=14,
        userId=14,
        title='Bags of almonds',
        description='Hello, we have 20 bags of whole, unsalted almonds. They will expire in two weeks. Thanks!',
        quantity='20 count',
        categoryId=5,
        imageUrl='https://mealizeaa.s3.amazonaws.com/Protein-16.jpg',
        expDate='2022-10-22',
        status = 0
    )
    db.session.add(protein_item16)

    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
