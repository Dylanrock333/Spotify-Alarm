from flask import Flask, redirect, request, jsonify, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv
import requests
import base64
import urllib
import token_manager
import os

# Load environment variables from .env file
load_dotenv()

# Client ID and Secret for Spotify API authentication
CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

# URIs for redirecting after authentication and for the front-end application
FRONT_END_URI = 'http://localhost:3000'
REDIRECT_URI = 'http://localhost:5000/callback'

# Spotify API scope for permissions
SCOPE = "user-read-private user-read-playback-state streaming user-modify-playback-state playlist-modify-public user-library-modify user-top-read user-read-currently-playing playlist-read-private user-follow-read user-read-recently-played playlist-modify-private user-follow-modify user-library-read user-read-email"

# Flask app setup with CORS enabled
app = Flask(__name__, static_folder='../server')
CORS(app)

# Route to get the current token values from the token manager
@app.route('/')
def getToken():
    token_values = token_manager.get_all_Vlas()
    if token_values:
        return jsonify(token_values)
    else:
        return jsonify({'error': 'No token values found'}), 400

# Route to initiate the login process and redirect to Spotify's authorization page
@app.route('/login', methods=['GET'])
def login():
    auth_url = 'https://accounts.spotify.com/authorize'
    query_parameters = {
        'response_type': 'code',
        'redirect_uri': REDIRECT_URI,
        'scope': SCOPE,
        'client_id': CLIENT_ID
    }
    
    # Redirect to Spotify's authorization URL with the required query parameters
    response = redirect(auth_url + '?' + urllib.parse.urlencode(query_parameters))
    return response

# Callback route that Spotify will redirect to after the user authorizes the app
@app.route('/callback', methods=['GET'])
def callback():
    # Retrieve the authorization code from the callback query parameters
    code = request.args['code']

    # Setup the request to exchange the code for an access token
    auth_options = {
        'url': 'https://accounts.spotify.com/api/token',
        'data': {
            'code': code,
            'redirect_uri': REDIRECT_URI,
            'grant_type': 'authorization_code'
        },
        'headers': {
            'Authorization': 'Basic ' + base64.b64encode((CLIENT_ID + ':' + CLIENT_SECRET).encode()).decode()
        }
    }
    
    # Make the request to Spotify to get the access token
    response = requests.post(auth_options['url'], data=auth_options['data'], headers=auth_options['headers'])
    response_data = response.json()
    
    # If successful, save the token and redirect to the front-end, otherwise log the error and redirect
    if response.status_code == 200:
        token_manager.set_token_Vals(response_data)
        return redirect(FRONT_END_URI)
    else:
        print("Error:", response.status_code, response.text)
        return redirect(FRONT_END_URI)

# Route to refresh the access token using the refresh token
@app.route('/refresh_token', methods=['GET'])
def refresh_token():
    # Get the refresh token from the token manager
    refresh_key = token_manager.get_refresh_token()
    auth_data = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_key
    }
    headers = {
        "Authorization": "Basic " + base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()
    }
    
    # Make the request to Spotify to refresh the access token
    response = requests.post("https://accounts.spotify.com/api/token", data=auth_data, headers=headers)
    response_data = response.json()

    # If successful, return the new access token, otherwise return the error
    if response.status_code == 200:
        access_token = response_data['access_token']
        return jsonify({"access_token": access_token})
    else:
        return jsonify({"error": response_data['error']}), 400
    
# Main entry point for running the Flask app
if __name__ == '__main__':
    app.run()
