from app.models import db, Organization
from werkzeug.security import generate_password_hash
import phonenumbers
from random import random, randint
from faker import Faker
fake = Faker(locale='en-US')

def seed_organizations():
    mealize = Organization(
        federalId='77-7777777',
        isNonprofit=True,
        logoUrl='https://latn.com/wp-content/uploads/2014/12/walmart-logo-vector.png',
        imageUrl='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Walmart_Home_Office_sign.jpg/1024px-Walmart_Home_Office_sign.jpg',
        open='5:00',
        close='22:30',
        name='Mealize',
        description="A nonporfit organization that aims to connect food businesses to nonprofits like food banks!",
        street='1225 17th St',
        unit='406',
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

    bienvdenidos_food_bank = Organization(
        federalId='84-0772672',
        isNonprofit=True,
        logoUrl='http://www.bienvenidosfoodbank.org/wp-content/uploads/2017/12/LogoBienvenidos.png',
        imageUrl='https://media.9news.com/assets/KUSA/images/dc308017-8594-40d0-93c8-e2808c9b9ed5/dc308017-8594-40d0-93c8-e2808c9b9ed5_1140x641.jpg',
        open='11:00',
        close='17:30',
        name='Food Bank of the Rockies',
        description="For more than 40 years, the Bienvenidos Food Bank has offered emergency food assistance to people in need. If a family is in crisis and needs food we are available no matter where they come from.",
        street='3810 N Pecos St',
        zip='80211',
        city='Denver',
        state='Colorado',
        phone='3034336328',
        email='director@bienvenidosfoodbank.org'
    )
    db.session.add(bienvdenidos_food_bank)

    denver_inner_city_parish = Organization(
        federalId='84-0525768',
        isNonprofit=True,
        logoUrl='https://static.wixstatic.com/media/0198fd_29758a36fd2a4afda85e6abfb73e7a56~mv2.png/v1/fill/w_159,h_145,al_c,usm_0.66_1.00_0.01,enc_auto/DICP_logo_White%20Bird_White%20Logo_edited_p.png',
        imageUrl='https://static.wixstatic.com/media/0198fd_3303f729b95c46bd80066fac7d0e3940~mv2.jpg/v1/fill/w_2543,h_787,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/0198fd_3303f729b95c46bd80066fac7d0e3940~mv2.jpg',
        open='9:00',
        close='13:00',
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

    mealize_market = Organization(
        federalId='88-8888888',
        isNonprofit=False,
        logoUrl='https://latn.com/wp-content/uploads/2014/12/walmart-logo-vector.png',
        imageUrl='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Walmart_Home_Office_sign.jpg/1024px-Walmart_Home_Office_sign.jpg',
        open='8:00',
        close='6:00',
        name='Mealize Market',
        description="Your friendly neighborhood market that aims to cut down on food waste by sharing as much as we can by volunteering and donating surplus food to local nonprofits!",
        street='1225 17th St',
        unit='100',
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
        federalId='71-0415188',
        isNonprofit=False,
        logoUrl='https://latn.com/wp-content/uploads/2014/12/walmart-logo-vector.png',
        imageUrl='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Walmart_Home_Office_sign.jpg/1024px-Walmart_Home_Office_sign.jpg',
        open='5:00',
        close='22:30',
        name='Walmart Inc.',
        description="Retail-variety Stores",
        street='702 Southwest 8th St',
        zip='72716',
        city='Bentonville',
        state='Arkansas',
        phone='5012734000',
        email='service@walmartcontacts.com'
    )
    db.session.add(target)

    amazon = Organization(
        federalId='71-0415188',
        isNonprofit=False,
        logoUrl='https://latn.com/wp-content/uploads/2014/12/walmart-logo-vector.png',
        imageUrl='https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Walmart_Home_Office_sign.jpg/1024px-Walmart_Home_Office_sign.jpg',
        open='5:00',
        close='22:30',
        name='Walmart Inc.',
        description="Retail-variety Stores",
        street='702 Southwest 8th St',
        zip='72716',
        city='Bentonville',
        state='Arkansas',
        phone='5012734000',
        email='service@walmartcontacts.com'
    )
    db.session.add(amazon)

    for i in range(6, 27):
        businesses = Organization(
            federalId='84-0525768',
            isNonprofit=False,
            logoUrl='https://static.wixstatic.com/media/0198fd_29758a36fd2a4afda85e6abfb73e7a56~mv2.png/v1/fill/w_159,h_145,al_c,usm_0.66_1.00_0.01,enc_auto/DICP_logo_White%20Bird_White%20Logo_edited_p.png',
            imageUrl='https://static.wixstatic.com/media/0198fd_3303f729b95c46bd80066fac7d0e3940~mv2.jpg/v1/fill/w_2543,h_787,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/0198fd_3303f729b95c46bd80066fac7d0e3940~mv2.jpg',
            open='10:00',
            close='22:00',
            name=fake.company(),
            description=fake.catch_phrase(),
            street=fake.street_address(),
            unit='',
            zip='80218',
            city='Denver',
            state='Colorado',
            phone=fake.unique.phone_number(),
            email=fake.unique.email()
        )
        db.session.add(businesses)

    db.session.commit()

def undo_Organizations():
    db.session.execute('TRUNCATE Organizations RESTART IDENTITY CASCADE;')
    db.session.commit()
