#token_manager.py

ACCESS_TOKEN = {
    "access_token": None,
    "token_type": None,
    "scope": None,
    "expires_in": None,
    "refresh_token": None
}

def set_token_Vals(data):
    ACCESS_TOKEN["access_token"] = data.get("access_token")
    ACCESS_TOKEN["token_type"] = data.get("token_type")
    ACCESS_TOKEN["scope"] = data.get("scope")
    ACCESS_TOKEN["expires_in"] = data.get("expires_in")
    ACCESS_TOKEN["refresh_token"] = data.get("refresh_token")
    
def get_all_Vlas():
    return ACCESS_TOKEN

def get_access_token():
    return ACCESS_TOKEN["access_token"]
    
def print_token_Vlas():
    print(ACCESS_TOKEN)
    