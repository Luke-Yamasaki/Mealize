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
        email='nonprofit_demo@testing.com',
        phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
        dob=fake.date_of_birth(minimum_age=30, maximum_age=60),
        deaf=False,
        wheelchair=False,
        learningDisabled=False,
        lgbtq=False,
        profileImageUrl="https://mealize.s3.amazonaws.com/user-" + str(randint(1, 29)) + '.png',
        jobDescription="Hello! My account will give you a glance into all the features Mealize provides!",
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
            dob=fake.date_of_birth(minimum_age=18, maximum_age=90),
            deaf=random() > 0.9,
            wheelchair=random() > 0.9,
            learningDisabled=random() > 0.9,
            lgbtq=random() > 0.5,
            profileImageUrl="https://mealize.s3.amazonaws.com/user-" + str(randint(1, 29)) + '.png',
            jobDescription=fake.text(max_nb_chars=99),
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
        dob=fake.date_of_birth(minimum_age=30, maximum_age=50),
        deaf=False,
        wheelchair=False,
        learningDisabled=False,
        lgbtq=False,
        profileImageUrl="https://mealize.s3.amazonaws.com/user-" + str(randint(1, 29)) + '.png',
        jobDescription="Hello! My account will give you a glance into all the features Mealize provides!",
        hashedPassword=generate_password_hash('8f08d594-2275-4c8f-93f3-4cb6dbed4b70')
    )
    db.session.add(business_demo)

    for j in range(27, 51):
        business_managers = User(
            organizationId=j,
            isNonprofit=False,
            isManager=True,
            private=False,
            firstName=fake.first_name(),
            lastName=fake.last_name(),
            email=fake.unique.email(),
            phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
            dob=fake.date_of_birth(minimum_age=18, maximum_age=90),
            deaf=random() > 0.9,
            wheelchair=random() > 0.9,
            learningDisabled=random() > 0.9,
            lgbtq=random() > 0.5,
            profileImageUrl="https://mealize.s3.amazonaws.com/user-" + str(randint(1, 29)) + '.png',
            jobDescription=fake.text(max_nb_chars=99),
            hashedPassword=generate_password_hash(fake.password())
        )
        db.session.add(business_managers)

    volunteer_demo = User(
        organizationId=1,
        isNonprofit=True,
        isManager=False,
        private=False,
        firstName='Volunteer',
        lastName='Demo',
        email='volunteer_demo@testing.com',
        phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
        dob=fake.date_of_birth(minimum_age=30, maximum_age=65),
        deaf=False,
        wheelchair=False,
        learningDisabled=False,
        lgbtq=False,
        profileImageUrl="https://mealize.s3.amazonaws.com/user-" + str(randint(1, 29)) + '.png',
        jobDescription="Hello! My account will give you a glance into all the features Mealize provides!",
        hashedPassword=generate_password_hash('064324651d0-72fe-49c5-aa1-0ba223f4fcmv3')
    )
    db.session.add(volunteer_demo)

    for k in range(52, 76):
        volunteers = User(
            organizationId=randint(1, 25),
            isNonprofit=True,
            isManager=False,
            private=random() > 0.5,
            firstName=fake.first_name(),
            lastName=fake.last_name(),
            email=fake.unique.email(),
            phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
            dob=fake.date_of_birth(minimum_age=18, maximum_age=90),
            deaf=random() > 0.5,
            wheelchair=random() > 0.5,
            learningDisabled=random() > 0.5,
            lgbtq=random() > 0.5,
            profileImageUrl="https://mealize.s3.amazonaws.com/user-" + str(randint(1, 29)) + '.png',
            jobDescription=fake.text(max_nb_chars=99),
            hashedPassword=generate_password_hash(fake.password())
        )
        db.session.add(volunteers)

    db.session.commit()

def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
