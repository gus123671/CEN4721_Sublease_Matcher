from flask import Flask, request, jsonify, session
from flask_cors import CORS
import sqlite3
import bcrypt

app = Flask(__name__)
app.secret_key = "1111" 
CORS(app)

DATABASE = 'mydatabase.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    # Return rows as dictionaries
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/initdb', methods=['GET'])
def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()
    return "Database initialized!"

# --- REGISTER ROUTE ---
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    # Hash the password
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    conn = get_db_connection()
    try:
        conn.execute("INSERT INTO users (username, password) VALUES (?, ?)",
                     (username, hashed_pw))
        conn.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except sqlite3.IntegrityError:
        # This likely means the username is already taken (unique constraint)
        return jsonify({'message': 'Username already exists'}), 409
    finally:
        conn.close()

# --- LOGIN ROUTE ---
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE username = ?", (username,)).fetchone()
    conn.close()

    if user is None:
        return jsonify({'message': 'Invalid username or password'}), 401

    user_password_hashed = user['password']
    # Check password
    if bcrypt.hashpw(password.encode('utf-8'), user_password_hashed) == user_password_hashed:
        # manage the current sesh or JWT tokens here
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

# @app.route('/api/protected', methods=['GET'])
# def protected():
#     # In a real app, you'd check session or token
#     return jsonify({'message': 'This is protected data only for logged in users'})

if __name__ == "__main__":
    app.run(debug=True)
