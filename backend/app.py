from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import bcrypt

app = Flask(__name__)
CORS(app)

# Direct Postgres connection string
DB_URL = 'postgresql://neondb_owner:npg_TgGqzh2wB9PJ@ep-delicate-fog-a42vzpet-pooler.us-east-1.aws.neon.tech/ammad?sslmode=require'

# Ensure table exists
def create_table():
    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(120) UNIQUE NOT NULL,
            password VARCHAR(128) NOT NULL,
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            gender VARCHAR(10),
            age INTEGER,
            nationality VARCHAR(50),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    cur.close()
    conn.close()

@app.before_request
def log_request_info():
    print(f"\nIncoming {request.method} request to {request.path}")
    print("Headers:", request.headers)
    print("Body:", request.get_data())

@app.route('/')
def home():
    return "Login signin api ✅"

create_table()

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print("Signup data received:", data)

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    try:
        # Check if user exists
        cur.execute("SELECT * FROM users WHERE email = %s", (email,))
        if cur.fetchone():
            return jsonify({'message': 'User already exists'}), 400

        hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        cur.execute("""
            INSERT INTO users (email, password, first_name, last_name, gender, age, nationality)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (
            email,
            hashed_pw.decode('utf-8'),
            data.get('first_name'),
            data.get('last_name'),
            data.get('gender'),
            data.get('age'),
            data.get('nationality')
        ))
        conn.commit()
        return jsonify({'message': 'User created successfully'}), 201

    except Exception as e:
        conn.rollback()
        print("Signup error:", str(e))
        return jsonify({'message': f'Error: {str(e)}'}), 500
    finally:
        cur.close()
        conn.close()

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print("Login data received:", data)

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    conn = psycopg2.connect(DB_URL)
    cur = conn.cursor()

    try:
        cur.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cur.fetchone()
        print("DB user fetched:", user)

        if user:
            hashed_pw = user[2]
            if bcrypt.checkpw(password.encode('utf-8'), hashed_pw.encode('utf-8')):
                return jsonify({
                    'message': 'Login successful',
                    'user': {
                        'email': user[1],
                        'first_name': user[3],
                        'last_name': user[4],
                        'gender': user[5],
                        'age': user[6],
                        'nationality': user[7],
                    }
                }), 200
            else:
                print("Password mismatch")
        else:
            print("User not found")

        return jsonify({'message': 'Invalid credentials'}), 401

    except Exception as e:
        print("Login error:", str(e))
        return jsonify({'message': f'Error: {str(e)}'}), 500
    finally:
        cur.close()
        conn.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
