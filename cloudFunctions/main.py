import mysql.connector

def UserIDCheck(request):
  """Calls the get_customer_info stored procedure."""
  userID = request.args.get('userID')
  headers = {
        'Access-Control-Allow-Origin': '*',  # Set the appropriate origin if not all origins are allowed
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
  if request.method == 'OPTIONS':
        # For preflight requests
        return ('', 204, headers)

  # Connect to the MySQL database.
  conn = mysql.connector.connect(host='35.222.78.138',
                                  user='root',
                                  database='db1')
  # Create a cursor.
  cursor = conn.cursor()
  # Execute the stored procedure.
  cursor.callproc('getUser', (userID,))

  # Get the results of the stored procedure.
  c_results = cursor.stored_results()
  for c_result in c_results:
    results = c_result.fetchall()
  # Close the cursor and connection.
  cursor.close()
  conn.close()

  # Return the results of the stored procedure.
  return (results, 200, headers)

def getAllRooms(request):
  """Calls the get_customer_info stored procedure."""
  bID = request.args.get('bID')
  headers = {
        'Access-Control-Allow-Origin': '*',  # Set the appropriate origin if not all origins are allowed
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
  if request.method == 'OPTIONS':
        # For preflight requests
        return ('', 204, headers)

  # Connect to the MySQL database.
  conn = mysql.connector.connect(host='35.222.78.138',
                                  user='root',
                                  database='db1')
  # Create a cursor.
  cursor = conn.cursor()
  # Execute the stored procedure.
  cursor.callproc('getAllRooms', (bID,))

  # Get the results of the stored procedure.
  c_results = cursor.stored_results()
  for c_result in c_results:
    results = c_result.fetchall()
  # Close the cursor and connection.
  cursor.close()
  conn.close()

  # Return the results of the stored procedure.
  return (results, 200, headers)

def addRoom(request):
  """Calls the get_customer_info stored procedure."""
  userID = request.args.get('userID')
  roomID = request.args.get('roomID')
  headers = {
        'Access-Control-Allow-Origin': '*',  # Set the appropriate origin if not all origins are allowed
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
  if request.method == 'OPTIONS':
        # For preflight requests
        return ('', 204, headers)

  # Connect to the MySQL database.
  conn = mysql.connector.connect(host='35.222.78.138',
                                  user='root',
                                  database='db1')
  # Create a cursor.
  cursor = conn.cursor()
  # Execute the stored procedure.
  cursor.callproc('addRoom', (roomID,userID,))
  # Get the results of the stored procedure.
  # Close the cursor and connection.
  conn.commit()
  cursor.close()
  conn.close()

  # Return the results of the stored procedure.
  return (userID, 200, headers)

def deleteRoom(request):
  """Calls the get_customer_info stored procedure."""
  userID = request.args.get('userID')
  headers = {
        'Access-Control-Allow-Origin': '*',  # Set the appropriate origin if not all origins are allowed
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
  if request.method == 'OPTIONS':
        # For preflight requests
        return ('', 204, headers)

  # Connect to the MySQL database.
  conn = mysql.connector.connect(host='35.222.78.138',
                                  user='root',
                                  database='db1')
  # Create a cursor.
  cursor = conn.cursor()
  # Execute the stored procedure.
  cursor.callproc('deleteRoom', (userID,))
  # Get the results of the stored procedure.
  # Close the cursor and connection.
  conn.commit()
  cursor.close()
  conn.close()

  # Return the results of the stored procedure.
  return (800, 200, headers)

