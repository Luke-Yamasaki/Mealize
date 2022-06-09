from app.models import db, Organization
from .zipcodes import zipcodes
from werkzeug.security import generate_password_hash
import phonenumbers
from random import choice, randint
from faker import Faker
fake = Faker(locale='en-US')


def seed_organizations():
    mealize = Organization(
        federalId='77-7777777',
        isNonprofit=True,
        logoUrl='https://mealizeaa.s3.amazonaws.com/mealize-l.png',
        imageUrl='https://mealizeaa.s3.amazonaws.com/mealize-b.png',
        open='5:00',
        close='22:30',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='Mealize',
        description="A nonporfit organization that aims to connect food businesses to nonprofits like food banks!",
        street='1225 17th St',
        zip='80202',
        city='Denver',
        state='Colorado',
        phone='7201111111',
        email='help_desk@mealize.us'
    )
    db.session.add(mealize)

    food_bank_of_the_rockies = Organization(
        federalId='84-0772672',
        isNonprofit=True,
        logoUrl='https://mealizeaa.s3.amazonaws.com/rockies-l.png',
        imageUrl='https://mealizeaa.s3.amazonaws.com/rockies-b.jpg',
        open='8:00',
        close='16:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='Food Bank of the Rockies',
        description="We are the largest hunger-relief organization in the Rocky Mountain region. That makes us uniquely suited to answer the enormous challenge of hunger, which affects 1 out of 8 people in our communities. Since 1978, we've put the power of community to work for our neighbors in need. Through partnerships. Through programs. Through people. Through you.",
        street='10700 E 45th Ave',
        zip='80239',
        city='Denver',
        state='Colorado',
        phone='3033719250',
        email='donatenow@foodbankrockies.org'
    )
    db.session.add(food_bank_of_the_rockies)

    bienvenidos_food_bank = Organization(
        federalId='74-2543251',
        isNonprofit=True,
        logoUrl='https://mealizeaa.s3.amazonaws.com/bienvenidos-l.png',
        imageUrl='https://mealizeaa.s3.amazonaws.com/bienvenidos-b.jpg',
        open='11:00',
        close='17:30',
        timeslot=choice(('Noon', 'Early afternoon', 'Late afternoon')),
        name='Bienvenidos Food Bank',
        description="For more than 40 years, the Bienvenidos Food Bank has offered emergency food assistance to people in need. If a family is in crisis and needs food we are available no matter where they come from.",
        street='3810 N Pecos St',
        zip='80211',
        city='Denver',
        state='Colorado',
        phone='3034336328',
        email='director@bienvenidosfoodbank.org'
    )
    db.session.add(bienvenidos_food_bank)

    denver_inner_city_parish = Organization(
        federalId='84-0525768',
        isNonprofit=True,
        logoUrl='https://mealizeaa.s3.amazonaws.com/inner-city-parish-l.png',
        imageUrl='https://mealizeaa.s3.amazonaws.com/inner-city-parish-b.jpg',
        open='9:00',
        close='13:00',
        timeslot=choice(('Morning', 'Noon')),
        name='The Denver Inner City Parish',
        description="The Denver Inner City Parish loves and supports individuals and families in our community, empowering them to break the cycle of poverty. The word parish means “community” and the DICP is committed to community. We are a human services nonprofit. The Parish elevates community through its community programs.",
        street='1212 Mariposa Street',
        zip='80204',
        city='Denver',
        state='Colorado',
        phone='3036290636',
        email='communications@dicp.org'
    )
    db.session.add(denver_inner_city_parish)

    north_denver_cares = Organization(
        federalId='27-2622785',
        isNonprofit=True,
        logoUrl='https://mealizeaa.s3.amazonaws.com/north-denver-cares-l.png',
        imageUrl='https://mealizeaa.s3.amazonaws.com/north-denver-cares-b.jpg',
        open='10:00',
        close='16:00',
        timeslot=choice(('Noon', 'Early afternoon')),
        name='North Denver Cares Food Pantry',
        description="The North Denver Cares Food Pantry is located in Broomfield, CO. We provide short-term, stop-gap help by providing food for the hungry and needy people of the North Denver area. Our mission is to model the love and compassion of Jesus Christ by providing this help.",
        street='6900 W. 117th Ave, #700W',
        zip='80020',
        city='Broomfield',
        state='Colorado',
        phone='3034662115',
        email=' info@NorthDenverCares.org'
    )
    db.session.add(north_denver_cares)

    cu_denver_food_pantry = Organization(
        federalId='84-6000555',
        isNonprofit=True,
        logoUrl='https://mealizeaa.s3.amazonaws.com/cu-denver-l.png',
        imageUrl='https://mealizeaa.s3.amazonaws.com/cu-denver-b.jpg',
        open='8:00',
        close='17:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='CU Denver Food Pantry',
        description="The Lynx Food Pantry is a direct response to the need of the CU Denver student body for more resources to fight food and insecurity and the lack of nutritious food.",
        street='1355 12th Street',
        zip='80204',
        city='Denver',
        state='Colorado',
        phone='3033159355',
        email=' lynxwellness@ucdenver.edu'
    )
    db.session.add(cu_denver_food_pantry)

    road_runner_food_pantry = Organization(
        federalId='23-7296162',
        isNonprofit=True,
        logoUrl='https://mealizeaa.s3.amazonaws.com/msu-denver-l.png',
        imageUrl='https://mealizeaa.s3.amazonaws.com/msu-denver-b.jpg',
        open='8:00',
        close='17:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='MSU Food Pantry',
        description="The Road Runner Food Pantry is a direct response to the need of the MSU student body for more resources to fight food and insecurity and the lack of nutritious food.",
        street='890 Auraria Pkwy',
        zip='80204',
        city='Denver',
        state='Colorado',
        phone='3035565740',
        email=' annualfund@msudenver.edu'
    )
    db.session.add(road_runner_food_pantry)

    benefits_in_action = Organization(
        federalId='87-3774775 ',
        isNonprofit=True,
        logoUrl='https://mealizeaa.s3.amazonaws.com/benefits-l.png',
        imageUrl='https://mealizeaa.s3.amazonaws.com/benefits-b.jpg',
        open='10:00',
        close='17:00',
        timeslot=choice(('Noon', 'Early afternoon', 'Late afternoon')),
        name='Benefits in Action',
        description="Benefits in Action is a nonprofit organization located in Lakewood, Colorado that serves individuals throughout the state. We strive to increase understanding, access, and utilization of healthcare resources. Our team of navigators works with constituents to help them recognize the health-related benefits they qualify for, apply to those benefits, and utilize them as effectively as possible.",
        street='8725 W 14th Ave Suite 210',
        zip='80215',
        city='Lakewood',
        state='Colorado',
        phone='7202218354',
        email='info@benefitsinaction.org'
    )
    db.session.add(benefits_in_action)

    denver_dream_center = Organization(
        federalId='46-5337404',
        isNonprofit=True,
        logoUrl='https://mealizeaa.s3.amazonaws.com/dream-center-l.png',
        imageUrl='https://mealizeaa.s3.amazonaws.com/dream-center-b.jpg',
        open='10:00',
        close='17:00',
        timeslot=choice(('Noon', 'Early afternoon', 'Late afternoon')),
        name='Denver Dream Center',
        description="Denver Dream Center works to restore hope to single mothers, children, former inmates, gang members, as well as neighbors and business owners they interact with by sharing donated food and providing healthcare resources.",
        street='2839 West 44th Avenue',
        zip='80211',
        city='Denver',
        state='Colorado',
        phone='7205109113',
        email='info@denverdc.org'
    )
    db.session.add(denver_dream_center)

    we_dont_waste = Organization(
        federalId='27-0585966',
        isNonprofit=True,
        logoUrl='https://mealizeaa.s3.amazonaws.com/we-dont-waste-l.png',
        imageUrl='https://mealizeaa.s3.amazonaws.com/we-dont-waste-b.jpg',
        open='10:00',
        close='17:00',
        timeslot=choice(('Noon', 'Early afternoon', 'Late afternoon')),
        name="We Don't Waste",
        description="We envision a future where good food will not be wasted and negatively impact the environment. Where food-insecure families and individuals can thrive without worrying about where their next meal will come from. And where excess food has an easy and direct line to communities in need.",
        street='5971 Broadway',
        zip='80216',
        city='Denver',
        state='Colorado',
        phone='7204436113',
        email='info@wedontwaste.org'
    )
    db.session.add(we_dont_waste)

    re_vision = Organization(
        federalId='26-1204343',
        isNonprofit=True,
        logoUrl='https://mealizeaa.s3.amazonaws.com/revision-l.png',
        imageUrl='https://mealizeaa.s3.amazonaws.com/revision-b.jpg',
        open='9:00',
        close='16:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon')),
        name="Re:Vision",
        description="The purpose of Re:Vision is to cultivate thriving, resilient communities. Our Mission is to work with people in economically marginalized neighborhoods to develop resident leaders, cultivate community food systems, and create an economy owned by the community.",
        street='3738 Morrison Road ',
        zip='80219',
        city='Denver',
        state='Colorado',
        phone='7204659605',
        email='hello@revision.coop'
    )
    db.session.add(re_vision)

    for i in range(12, 26):
        nonprofits = Organization(
            federalId=str(randint(10,99))+'-'+str(randint(1000000, 9999999)),
            isNonprofit=True,
            logoUrl='https://mealizeaa.s3.amazonaws.com/mealize-l.png',
            imageUrl='https://mealizeaa.s3.amazonaws.com/mealize-b.png',
            open='10:00',
            close='22:00',
            timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
            name=fake.company(),
            description='Hello! Our food bank is located in Denver, CO. We provide short-term support for hungry and needy individuals and families in Denver. We hope to enrich our community through compassion.',
            street=fake.street_address(),
            zip=choice(zipcodes),
            city='Denver',
            state='Colorado',
            phone=choice(('303', '720','719', '970', '983'))+str(randint(100, 999))+str(randint(1000, 9999)),
            email=fake.unique.email()
        )
        db.session.add(nonprofits)

    mealize_market = Organization(
        federalId='88-8888888',
        isNonprofit=False,
        logoUrl='https://mealizeaa.s3.amazonaws.com/mealize-l.png',
        imageUrl='https://mealizeaa.s3.amazonaws.com/mealize-b.png',
        open='8:00',
        close='6:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='Mealize Market',
        description="Your friendly neighborhood market that aims to cut down on food waste by sharing as much as we can by volunteering and donating surplus food to local nonprofits!",
        street='1225 17th St',
        zip='80202',
        city='Denver',
        state='Colorado',
        phone='7202222222',
        email='contact@mealize.us'
    )
    db.session.add(mealize_market)

    walmart = Organization(
        federalId='71-0415188',
        isNonprofit=False,
        logoUrl='https://latn.com/wp-content/uploads/2014/12/walmart-logo-vector.png',
        imageUrl='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Walmart_Home_Office_sign.jpg/1024px-Walmart_Home_Office_sign.jpg',
        open='5:00',
        close='22:30',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='Walmart Inc.',
        description="Retail-variety Stores",
        street='2770 W Evans Ave',
        zip='80219',
        city='Denver',
        state='Colorado',
        phone='3032227043',
        email='service@walmartcontacts.com'
    )
    db.session.add(walmart)

    target = Organization(
        federalId='41-0215170',
        isNonprofit=False,
        logoUrl='https://corporate.target.com/_media/TargetCorp/Press/B-roll%20and%20Press%20Materials/Logos/Target_Bullseye-Logo_Red.jpg',
        imageUrl='https://corporate.target.com/_media/TargetCorp/news/2020/08/reach/ABV_REACH_Header.jpg',
        open='8:00',
        close='22:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='Target Corp',
        description="We fulfill the needs and fuel the potential of our guests. That means making Target your preferred shopping destination in all channels by delivering outstanding value, continuous innovation and exceptional experiences—consistently fulfilling our Expect More. Pay Less.® brand promise.",
        street='4301 E Virginia Ave',
        zip='80246',
        city='Glendale',
        state='Colorado',
        phone='3032090182',
        email='guest.relations@target.com'
    )
    db.session.add(target)

    amazon_fresh = Organization(
        federalId='71-0415188',
        isNonprofit=False,
        logoUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon-logo.jpg',
        imageUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon%20Fresh%20Produce%20_0.jpg',
        open='24:00',
        close='24:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='Amazon Fresh',
        description="Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. Amazon strives to be Earth's most customer-centric company, Earth's best employer, and Earth's safest place to work. Customer reviews, 1-Click shopping, personalized recommendations, Prime, Fulfillment by Amazon, AWS, Kindle Direct Publishing, Kindle, Career Choice, Fire tablets, Fire TV, Amazon Echo, Alexa, Just Walk Out technology, Amazon Studios, and The Climate Pledge are some of the things pioneered by Amazon.",
        street='480 E 55th Ave STE 100',
        zip='80216',
        city='Denver',
        state='Colorado',
        phone='2062661000',
        email='jeff@amazon.com'
    )
    db.session.add(amazon_fresh)

    safeway = Organization(
        federalId='36-7394926',
        isNonprofit=False,
        logoUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon-logo.jpg',
        imageUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon%20Fresh%20Produce%20_0.jpg',
        open='08:00',
        close='21:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='Safeway',
        description="Today, Safeway operates as a banner of Albertsons Companies, one of the largest food and drug retailers in the United States. With both a strong local presence and national scale, the company operates stores across 35 states and the District of Columbia under 20 well-known banners.",
        street='1653 S Colorado Blvd',
        zip='80222',
        city='Denver',
        state='Colorado',
        phone='8775054040',
        email='AlbertsonsCustomerInquiries@albertsons.com'
    )
    db.session.add(safeway)

    king_soopers = Organization(
        federalId='31-0345740',
        isNonprofit=False,
        logoUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon-logo.jpg',
        imageUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon%20Fresh%20Produce%20_0.jpg',
        open='24:00',
        close='24:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='King Soopers',
        description="King Soopers is a supermarket brand of Kroger located in the Rocky Mountains of the United States. It started as its own brand and, today, is headquartered in Denver, Colorado.",
        street='1155 E 9th Ave',
        zip='80218',
        city='Denver',
        state='Colorado',
        phone='3038325262',
        email='corpvps@kroger.com'
    )
    db.session.add(king_soopers)

    sprouts = Organization(
        federalId='32-0331600',
        isNonprofit=False,
        logoUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon-logo.jpg',
        imageUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon%20Fresh%20Produce%20_0.jpg',
        open='07:00',
        close='22:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='Sprouts Farmers Market',
        description="Each Sprouts store participates in our Food Rescue program that provides food to those in need, feed for animals and nutrients for agricultural soil.",
        street='197 E Mississippi Ave',
        zip='80209',
        city='Denver',
        state='Colorado',
        phone='4808148016',
        email='customerrelations@sprouts.com'
    )
    db.session.add(sprouts)

    natural_grocers = Organization(
        federalId='84-1444517',
        isNonprofit=False,
        logoUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon-logo.jpg',
        imageUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon%20Fresh%20Produce%20_0.jpg',
        open='24:00',
        close='24:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='Natural Grocers',
        description="From the smallest detail to the largest, whether it's refrigerating our nuts and seeds for freshness or only selling 100% organic and GMO-free produce, pasture-based dairy, and antibiotic and hormone-free meats… we are, and have always been, your original good4uSM Grocers.",
        street='368 S Broadway',
        zip='80209',
        city='Denver',
        state='Colorado',
        phone='3039864600',
        email='media@naturalgrocers.com'
    )
    db.session.add(natural_grocers)

    costco = Organization(
        federalId='91-1223280',
        isNonprofit=False,
        logoUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon-logo.jpg',
        imageUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon%20Fresh%20Produce%20_0.jpg',
        open='24:00',
        close='24:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='Amazon Fresh',
        description="Costco Wholesale is a multi-billion dollar global retailer with warehouse club operations in eight countries. We are the recognized leader in our field, dedicated to quality in every area of our business and respected for our outstanding business ethics. Despite our large size and explosive international expansion, we continue to provide a family atmosphere in which our employees thrive and succeed.",
        street='1471 S Havana St',
        zip='80012',
        city='Denver',
        state='Colorado',
        phone='18007742678',
        email='customerservice@costco.com'
    )
    db.session.add(costco)

    trader_joes = Organization(
        federalId='95-1987958',
        isNonprofit=False,
        logoUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon-logo.jpg',
        imageUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon%20Fresh%20Produce%20_0.jpg',
        open='24:00',
        close='24:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name="Trader Joe's Company",
        description="Trader Joe's is a national chain of neighborhood grocery stores. We are committed to providing our customers outstanding value in the form of the best quality products at the best everyday prices. Through our rewarding products and knowledgeable, friendly Crew Members, we have been transforming grocery shopping into a welcoming journey full of discovery and fun since 1967.",
        street='750 N Colorado Blvd',
        zip='80206',
        city='Denver',
        state='Colorado',
        phone='3033211003',
        email='nhigh@traderjoes.com'
    )
    db.session.add(trader_joes)

    whole_foods = Organization(
        federalId='71-0415188',
        isNonprofit=False,
        logoUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon-logo.jpg',
        imageUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon%20Fresh%20Produce%20_0.jpg',
        open='07:00',
        close='22:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='Whole Foods Market',
        description="Who are we? Well, we seek out the finest natural and organic foods available, maintain the strictest quality standards in the industry, and have an unshakeable commitment to sustainable agriculture. Add to that the excitement and fun we bring to shopping for groceries, and you start to get a sense of what we’re all about.",
        street='2375 E 1st Ave',
        zip='80206',
        city='Denver',
        state='Colorado',
        phone='15124774455',
        email='customer.questions@wholefoods.com'
    )
    db.session.add(whole_foods)

    for i in range(37, 51):
        businesses = Organization(
            federalId=str(randint(10,99))+'-'+str(randint(1000000, 9999999)),
            isNonprofit=False,
            logoUrl='https://static.wixstatic.com/media/0198fd_29758a36fd2a4afda85e6abfb73e7a56~mv2.png/v1/fill/w_159,h_145,al_c,usm_0.66_1.00_0.01,enc_auto/DICP_logo_White%20Bird_White%20Logo_edited_p.png',
            imageUrl='https://static.wixstatic.com/media/0198fd_3303f729b95c46bd80066fac7d0e3940~mv2.jpg/v1/fill/w_2543,h_787,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/0198fd_3303f729b95c46bd80066fac7d0e3940~mv2.jpg',
            open='10:00',
            close='22:00',
            timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
            name=fake.company(),
            description=fake.catch_phrase(),
            street=fake.street_address(),
            zip=choice(zipcodes),
            city='Denver',
            state='Colorado',
            phone=choice(('303', '720','719', '970', '983'))+str(randint(100, 999))+str(randint(1000, 9999)),
            email=fake.unique.email()
        )
        db.session.add(businesses)

    db.session.commit()

def undo_organizations():
    db.session.execute('TRUNCATE Organizations RESTART IDENTITY CASCADE;')
    db.session.commit()
