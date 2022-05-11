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
        logoUrl='https://mealize.s3.amazonaws.com/Mealize-circle.png',
        imageUrl='https://mealize.s3.amazonaws.com/Mealize-banner.png',
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
        logoUrl='https://media.9news.com/assets/KUSA/images/b75b0ffc-d633-46b1-83e7-36fb5bc9e4a3/b75b0ffc-d633-46b1-83e7-36fb5bc9e4a3_1140x641.png',
        imageUrl='https://media.9news.com/assets/KUSA/images/dc308017-8594-40d0-93c8-e2808c9b9ed5/dc308017-8594-40d0-93c8-e2808c9b9ed5_1140x641.jpg',
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
        federalId='84-0772672',
        isNonprofit=True,
        logoUrl='https://mealize.s3.amazonaws.com/FGCyguIWUAcQOoY.png',
        imageUrl='https://media.9news.com/assets/KUSA/images/dc308017-8594-40d0-93c8-e2808c9b9ed5/dc308017-8594-40d0-93c8-e2808c9b9ed5_1140x641.jpg',
        open='11:00',
        close='17:30',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
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
        logoUrl='https://static.wixstatic.com/media/0198fd_29758a36fd2a4afda85e6abfb73e7a56~mv2.png/v1/fill/w_159,h_145,al_c,usm_0.66_1.00_0.01,enc_auto/DICP_logo_White%20Bird_White%20Logo_edited_p.png',
        imageUrl='https://static.wixstatic.com/media/0198fd_3303f729b95c46bd80066fac7d0e3940~mv2.jpg/v1/fill/w_2543,h_787,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/0198fd_3303f729b95c46bd80066fac7d0e3940~mv2.jpg',
        open='9:00',
        close='13:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
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

    for i in range(5, 26):
        nonprofits = Organization(
            federalId=str(randint(10,99))+'-'+str(randint(1000000, 9999999)),
            isNonprofit=True,
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
        db.session.add(nonprofits)

    mealize_market = Organization(
        federalId='88-8888888',
        isNonprofit=False,
        logoUrl='https://mealize.s3.amazonaws.com/Mealize-circle.png',
        imageUrl='https://mealize.s3.amazonaws.com/Mealize-banner.png',
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
        street='702 Southwest 8th St',
        zip='72716',
        city='Bentonville',
        state='Arkansas',
        phone='5012734000',
        email='service@walmartcontacts.com'
    )
    db.session.add(walmart)

    target = Organization(
        federalId='	41-0215170',
        isNonprofit=False,
        logoUrl='https://corporate.target.com/_media/TargetCorp/Press/B-roll%20and%20Press%20Materials/Logos/Target_Bullseye-Logo_Red.jpg',
        imageUrl='https://corporate.target.com/_media/TargetCorp/news/2020/08/reach/ABV_REACH_Header.jpg',
        open='8:00',
        close='22:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='Target Corp',
        description="We fulfill the needs and fuel the potential of our guests. That means making Target your preferred shopping destination in all channels by delivering outstanding value, continuous innovation and exceptional experiences—consistently fulfilling our Expect More. Pay Less.® brand promise.",
        street='1000 Nicollet Mall',
        zip='55403',
        city='Minneapolis',
        state='Minnesota',
        phone='6123046073',
        email='guest.relations@target.com'
    )
    db.session.add(target)

    amazon = Organization(
        federalId='71-0415188',
        isNonprofit=False,
        logoUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon-logo.jpg',
        imageUrl='https://press.aboutamazon.com/system/files-encrypted/nasdaq_kms/inline-images/Amazon%20Fresh%20Produce%20_0.jpg',
        open='24:00',
        close='24:00',
        timeslot=choice(('Morning', 'Noon', 'Early afternoon', 'Late afternoon')),
        name='Amazon Com Inc',
        description="Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. Amazon strives to be Earth's most customer-centric company, Earth's best employer, and Earth's safest place to work. Customer reviews, 1-Click shopping, personalized recommendations, Prime, Fulfillment by Amazon, AWS, Kindle Direct Publishing, Kindle, Career Choice, Fire tablets, Fire TV, Amazon Echo, Alexa, Just Walk Out technology, Amazon Studios, and The Climate Pledge are some of the things pioneered by Amazon",
        street='410 Terry Avenue North',
        zip='98109',
        city='Seattle',
        state='Washington',
        phone='2062661000',
        email='jeff@amazon.com'
    )
    db.session.add(amazon)

    for i in range(30, 51):
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
