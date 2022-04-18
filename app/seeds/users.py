from app.models import db, User
from werkzeug.security import generate_password_hash
from faker import Faker
from random import random, randint
fake = Faker('en-US')

def seed_users():
    nonprofit_demo = User(
        organizationId=1,
        isNonprofit=True,
        isManager=True,
        private=False,
        firstName=fake.first_name(),
        lastName=fake.last_name(),
        email=fake.unique.email(),
        phone=fake.phone_number(),
        age=35,
        deaf=False,
        autism=False,
        learningDisabled=False,
        lgbtq=False,
        profileImageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        jobDescription="Hello, my name is Nonprofit Demo! My account will give you a glance into all the features Mealize provides! Thank you and I hope you enjoy Mealize!",
        hashed_password=generate_password_hash('062651d0-01fe-49c5-aaa1-0829ba3f4ff3')
    )
    db.session.add(nonprofit_demo)

    business_demo = User(
        organizationId=2,
        isNonprofit=False,
        isManager=True,
        private=False,
        firstName=fake.first_name(),
        lastName=fake.last_name(),
        email='business_demo@testing.com',
        phone=fake.phone_number(),
        age=45,
        deaf=False,
        autism=False,
        learningDisabled=False,
        lgbtq=False,
        profileImageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        jobDescription="Hello, my name is Nonprofit Demo! My account will give you a glance into all the features Mealize provides! Thank you and I hope you enjoy Mealize!",
        hashed_password=generate_password_hash('8f08d594-2275-4c8f-93f3-4cb6dbed4b70')
    )
    db.sesssion.add(business_demo)

    for i in range(3, 27):
        nonprofit_managers = User(
            organizationId=i,
            isNonprofit=True,
            isManager=True,
            private=False,
            firstName=fake.first_name(),
            lastName=fake.last_name(),
            email=fake.unique.email(),
            phone=fake.unique.phone_number(),
            age=randint(18, 91),
            deaf=False,
            autism=False,
            learningDisabled=False,
            lgbtq=random() > 0.5,
            profileImageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            jobDescription=fake.paragraphs(nb=3),
            hashed_password=generate_password_hash(fake.password())
        )
        db.session.add(nonprofit_managers)

    for j in range(27, 100):
        business_managers = User(
            organizationId=j,
            isNonprofit=False,
            isManager=True,
            private=False,
            firstName=fake.first_name(),
            lastName=fake.last_name(),
            email=fake.unique.email(),
            phone=fake.unique.phone_number(),
            age=randint(18, 91),
            deaf=False,
            autism=False,
            learningDisabled=False,
            lgbtq=random() > 0.5,
            profileImageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            jobDescription=fake.paragraphs(nb=3),
            hashed_password=generate_password_hash(fake.password())
        )
        db.session.add(business_managers)

    for k in range(100, 200):
        volunteers = User(
            organizationId=randint(3, 27),
            isNonprofit=True,
            isManager=False,
            private=random() > 0.5,
            firstName=fake.first_name(),
            lastName=fake.last_name(),
            email=fake.unique.email(),
            phone=fake.unique.phone_number(),
            age=randint(18, 91),
            deaf=random() > 0.5,
            autism=random() > 0.5,
            learningDisabled=random() > 0.5,
            lgbtq=random() > 0.5,
            profileImageUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            jobDescription=fake.paragraphs(nb=3),
            hashed_password=generate_password_hash(fake.password())
        )
        db.session.add(volunteers)

    db.session.commit()

def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
