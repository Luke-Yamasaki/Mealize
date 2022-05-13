import boto3
import botocore
import os
import uuid

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"https://{BUCKET_NAME}.s3.amazonaws.com/"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
from botocore.config import Config

my_config = Config(
    region_name = 'us-east-1',
    signature_version = 'v3',
    retries = {
        'max_attempts': 10,
        'mode': 'standard'
    }
)

s3 = boto3.client(
    "s3",
    aws_access_key_id=os.environ.get("S3_KEY"),
    aws_secret_access_key=os.environ.get("S3_SECRET"),
    config=my_config
)

def accepted_file(file):
    return "." in file and \
           file.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def generate_unique_file(file):
    ext = file.rsplit(".", 1)[1].lower()
    unique_file = uuid.uuid4().hex
    return f"{unique_file}.{ext}"


def upload_to_s3_bucket(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}
