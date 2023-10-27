# app.py
from flask import Flask, redirect, request,jsonify, send_from_directory
from flask_cors import CORS
import requests
import base64
import urllib
import token_manager

CLIENT_ID = 'dc40904b525a488fb69aaf6f8f85fef2'
CLIENT_SECRET = '221d9ab6547f47409b37693cbcbaf4ab'
REDIRECT_URI = 'http://localhost:5000/callback'
SCOPE = 'user-read-playback-state user-modify-playback-state'  # Add other scopes if needed


app = Flask(__name__, static_folder='../server')
CORS(app)

@app.route('/login')
def login():
    auth_url = 'https://accounts.spotify.com/authorize'
    query_parameters = {
        'response_type': 'code',
        'redirect_uri': REDIRECT_URI,
        'scope': SCOPE,
        'client_id': CLIENT_ID
    }
    
    #send api authorization request to Spotify
    return redirect(auth_url + '?' + urllib.parse.urlencode(query_parameters))

#Responce from auth request will return a 'code' we use to get the access token
@app.route('/callback')
def callback():
    
    code = request.args['code']

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
    #Request access token from Spotify and store it in variable
    response = requests.post(auth_options['url'], data=auth_options['data'], headers=auth_options['headers'])

    #set access token in token_manager through server
    if (response.status_code == 200):
        token_manager.set_token_Vals(response.json())
    else:
        print("Error:", response.status_code, response.text)
        
    return redirect('http://localhost:3000')


@app.route('/getToken')
def getToken():
    token_values = token_manager.get_all_Vlas()
    if token_values:
        return jsonify(token_values)
    else:
        return jsonify(token_values), 400
   

if __name__ == '__main__':
    #app.debug = True
    app.run()
