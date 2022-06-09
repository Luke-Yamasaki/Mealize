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
        firstName='Nonprofit',
        lastName='Demo',
        email='nonprofit_demo@testing.com',
        phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
        dob=fake.date_of_birth(minimum_age=30, maximum_age=60),
        deaf=False,
        wheelchair=False,
        learningDisabled=False,
        lgbtq=False,
        profileImageUrl="https://mealizeaa.s3.amazonaws.com/nonprofit-manager.jpg",
        hashedPassword=generate_password_hash('062651d0-01fe-49c5-aaa1-0829ba3f4ff3')
    )
    db.session.add(nonprofit_demo)

    for i in range(2, 7):
        nonprofit_male_managers = User(
            organizationId=i,
            isNonprofit=True,
            isManager=True,
            firstName=fake.first_name_male(),
            lastName=fake.last_name(),
            email=fake.unique.email(),
            phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
            dob=fake.date_of_birth(minimum_age=18, maximum_age=90),
            deaf=random() > 0.9,
            wheelchair=random() > 0.9,
            learningDisabled=random() > 0.9,
            lgbtq=random() > 0.5,
            profileImageUrl="https://mealizeaa.s3.amazonaws.com/managers-m-" + str(i) + ".jpg",
            hashedPassword=generate_password_hash(fake.password())
        )
        db.session.add(nonprofit_male_managers)

    for j in range(7, 12):
        nonprofit_female_managers = User(
            organizationId=j,
            isNonprofit=True,
            isManager=True,
            firstName=fake.first_name_female(),
            lastName=fake.last_name(),
            email=fake.unique.email(),
            phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
            dob=fake.date_of_birth(minimum_age=18, maximum_age=90),
            deaf=random() > 0.9,
            wheelchair=random() > 0.9,
            learningDisabled=random() > 0.9,
            lgbtq=random() > 0.5,
            profileImageUrl="https://mealizeaa.s3.amazonaws.com/managers-f-" + str(j-6) + ".jpg",
            hashedPassword=generate_password_hash(fake.password())
        )
        db.session.add(nonprofit_female_managers)

    business_demo = User(
        organizationId=12,
        isNonprofit=False,
        isManager=True,
        firstName='Business',
        lastName='Demo',
        email='business_demo@testing.com',
        phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
        dob=fake.date_of_birth(minimum_age=30, maximum_age=50),
        deaf=False,
        wheelchair=False,
        learningDisabled=False,
        lgbtq=False,
        profileImageUrl="https://mealizeaa.s3.amazonaws.com/business-manager.jpg",
        hashedPassword=generate_password_hash('8f08d594-2275-4c8f-93f3-4cb6dbed4b70')
    )
    db.session.add(business_demo)

    for k in range(13, 22):
        business_male_managers = User(
            organizationId=k,
            isNonprofit=False,
            isManager=True,
            firstName=fake.first_name_male(),
            lastName=fake.last_name(),
            email=fake.unique.email(),
            phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
            dob=fake.date_of_birth(minimum_age=18, maximum_age=90),
            deaf=random() > 0.9,
            wheelchair=random() > 0.9,
            learningDisabled=random() > 0.9,
            lgbtq=random() > 0.5,
            profileImageUrl="https://mealize.s3.amazonaws.com/user-" + str(randint(1, 29)) + '.png',
            hashedPassword=generate_password_hash(fake.password())
        )
        db.session.add(business_male_managers)

    for l in range(22, 31):
        business_female_managers = User(
            organizationId=l,
            isNonprofit=False,
            isManager=True,
            firstName=fake.first_name_female(),
            lastName=fake.last_name(),
            email=fake.unique.email(),
            phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
            dob=fake.date_of_birth(minimum_age=18, maximum_age=90),
            deaf=random() > 0.9,
            wheelchair=random() > 0.9,
            learningDisabled=random() > 0.9,
            lgbtq=random() > 0.5,
            profileImageUrl="https://mealize.s3.amazonaws.com/user-" + str(randint(1, 29)) + '.png',
            hashedPassword=generate_password_hash(fake.password())
        )
        db.session.add(business_female_managers)

    volunteer_demo = User(
        organizationId=1,
        isNonprofit=True,
        isManager=False,
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
        hashedPassword=generate_password_hash('064324651d0-72fe-49c5-aa1-0ba223f4fcmv3')
    )
    db.session.add(volunteer_demo)

    for m in range(45, 76):
        volunteers_male = User(
            organizationId=randint(2, 25),
            isNonprofit=True,
            isManager=False,
            firstName=fake.first_name_male(),
            lastName=fake.last_name(),
            email=fake.unique.email(),
            phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
            dob=fake.date_of_birth(minimum_age=18, maximum_age=90),
            deaf=random() > 0.5,
            wheelchair=random() > 0.5,
            learningDisabled=random() > 0.5,
            lgbtq=random() > 0.5,
            profileImageUrl="https://mealize.s3.amazonaws.com/user-" + str(randint(1, 29)) + '.png',
            hashedPassword=generate_password_hash(fake.password())
        )
        db.session.add(volunteers_male)

    for n in range(76, 107):
        volunteers_female = User(
            organizationId=randint(2, 25),
            isNonprofit=True,
            isManager=False,
            firstName=fake.first_name_female(),
            lastName=fake.last_name(),
            email=fake.unique.email(),
            phone=phonenumbers.parse(fake.unique.phone_number(), 'US').national_number,
            dob=fake.date_of_birth(minimum_age=18, maximum_age=90),
            deaf=random() > 0.5,
            wheelchair=random() > 0.5,
            learningDisabled=random() > 0.5,
            lgbtq=random() > 0.5,
            profileImageUrl="https://mealize.s3.amazonaws.com/user-" + str(randint(1, 29)) + '.png',
            hashedPassword=generate_password_hash(fake.password())
        )
        db.session.add(volunteers_female)

    db.session.commit()

def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
