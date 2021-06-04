import csv

def read_csv_lines(file):
    with open(file) as csvfile:
        line_reader = csv.reader(csvfile)
        for row in line_reader:
            yield row