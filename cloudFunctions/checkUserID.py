import mysql.connector

def UserIDCheck(event, context):
  """Calls the get_customer_info stored procedure."""

  # Connect to the MySQL database.
  conn = mysql.connector.connect(host='35.222.78.138',
                                  user='root',
                                  database='db1')
  # Create a cursor.
  cursor = conn.cursor()
  #cursor.execute("SELECT * FROM Users")
  # Execute the stored procedure.
  cursor.callproc('getUser', (452343,))

  # Get the results of the stored procedure.
  c_results = cursor.stored_results()
  for c_result in c_results:
    results = c_result.fetchall()
  # Close the cursor and connection.
  cursor.close()
  conn.close()

  # Return the results of the stored procedure.
  return results

print(UserIDCheck(1,1))