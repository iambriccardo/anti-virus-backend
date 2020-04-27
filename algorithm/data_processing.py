#!/usr/bin/python
import psycopg2
import numpy as np
import pandas as pd
from config import config


def getConnection():
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # read connection parameters
        params = config()

        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)

        # create a cursor
        return conn

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)


if __name__ == '__main__':
    conn = getConnection()

    med_temp = 36.7
    max_tiredness = 5
    max_cough = 5

    cursor = conn.cursor()

    for x in range(1, 5):
        result = pd.read_sql_query('SELECT * FROM symptom where patient_fk = {0}'.format(x), conn)

        median_temp = result["body_temperature"].mean()
        median_tiredness = result["tiredness"].mean()
        median_cough = result["cough"].mean()

        print(result.head(20))
        #print("median:", median_temp, median_tiredness, median_cough)

        std_dev = (abs(median_temp - med_temp) / 1.4) /3


        risk_factor = std_dev * 0.5 + median_tiredness / max_tiredness *0.25 + median_cough/max_cough * 0.25

        print("risk factor:", risk_factor)

        risk = ""

        if(risk_factor < 0.2):
            risk = "LOW"
        elif(risk_factor < 0.4):
            risk = "MEDIUM"
        elif(risk_factor < 0.6):
            risk = "HIGH"
        else:
            risk = "CRITICAL"

        print('UPDATE patient SET risk_score = \'{0}\' WHERE id = {1}'.format(risk, x))
        
        cursor.execute('UPDATE patient SET risk_score = \'{0}\' WHERE id = {1}'.format(risk, x))
        conn.commit()

    cursor.close()

