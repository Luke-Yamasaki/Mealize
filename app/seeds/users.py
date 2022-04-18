from app.models import db, User
from werkzeug.security import generate_password_hash
import phonenumbers
from random import random, randint
from faker import Faker
fake = Faker(locale='en-US')

def seed_users():
    nonprofit_demo = User(
        organizationId=1,
        isNonprofit=True,
        isManager=True,
        private=False,
        firstName='Nonprofit',
        lastName='Demo',
        email=fake.unique.email(),
        phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
        age=35,
        deaf=False,
        autism=False,
        learningDisabled=False,
        lgbtq=False,
        profileImageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        jobDescription="Hello, my name is Nonprofit Demo! My account will give you a glance into all the features Mealize provides! Thank you and I hope you enjoy Mealize!",
        hashedPassword=generate_password_hash('062651d0-01fe-49c5-aaa1-0829ba3f4ff3')
    )
    db.session.add(nonprofit_demo)

    for i in range(2, 26):
        nonprofit_managers = User(
            organizationId=i,
            isNonprofit=True,
            isManager=True,
            private=False,
            firstName=fake.first_name(),
            lastName=fake.last_name(),
            email=fake.unique.email(),
            phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
            age=randint(18, 91),
            deaf=random() > 0.9,
            autism=random() > 0.9,
            learningDisabled=random() > 0.9,
            lgbtq=random() > 0.5,
            profileImageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            jobDescription=fake.text(max_nb_chars=255),
            hashedPassword=generate_password_hash(fake.password())
        )
        db.session.add(nonprofit_managers)

    business_demo = User(
        organizationId=26,
        isNonprofit=False,
        isManager=True,
        private=False,
        firstName='Business',
        lastName='Demo',
        email='business_demo@testing.com',
        phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
        age=45,
        deaf=False,
        autism=False,
        learningDisabled=False,
        lgbtq=False,
        profileImageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        jobDescription="Hello, my name is Business Demo! My account will give you a glance into all the features Mealize provides! Thank you and I hope you enjoy Mealize!",
        hashedPassword=generate_password_hash('8f08d594-2275-4c8f-93f3-4cb6dbed4b70')
    )
    db.session.add(business_demo)

    for j in range(27, 101):
        business_managers = User(
            organizationId=j,
            isNonprofit=False,
            isManager=True,
            private=False,
            firstName=fake.first_name(),
            lastName=fake.last_name(),
            email=fake.unique.email(),
            phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
            age=randint(18, 91),
            deaf=random() > 0.9,
            autism=random() > 0.9,
            learningDisabled=random() > 0.9,
            lgbtq=random() > 0.5,
            profileImageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            jobDescription=fake.text(max_nb_chars=255),
            hashedPassword=generate_password_hash(fake.password())
        )
        db.session.add(business_managers)

    for k in range(101, 201):
        volunteers = User(
            organizationId=randint(1, 25),
            isNonprofit=True,
            isManager=False,
            private=random() > 0.5,
            firstName=fake.first_name(),
            lastName=fake.last_name(),
            email=fake.unique.email(),
            phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
            age=randint(18, 91),
            deaf=random() > 0.5,
            autism=random() > 0.5,
            learningDisabled=random() > 0.5,
            lgbtq=random() > 0.5,
            profileImageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            jobDescription=fake.text(max_nb_chars=255),
            hashedPassword=generate_password_hash(fake.password())
        )
        db.session.add(volunteers)

    db.session.commit()

def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
