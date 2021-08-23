from django.core.files.storage import default_storage
from fiesta_api.utils.csv.reader import read_csv_lines

def storage_exists(file):
    return default_storage.exists(file)

def storage_read_csv(file, option='r'):
    csvfile = default_storage.open(file, option)
    return csvfile.read()
