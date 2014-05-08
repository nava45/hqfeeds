import oauth2 as oauth

"""
reference link: https://github.com/mrgaaron/LinkedIn-Client-Library/blob/master/liclient/__init__.py
documentation: https://developer.linkedin.com/documents/post-network-update
"""


#Constants

key = "752nul9mlkloxy"
skey = "8Mi9xKUq1c7zWvVz"
token="23279d16-f790-4f89-8480-4f804f0a80cf"
stoken="68365abf-c804-4bbc-9949-23bbec4a3588"
url = "http://api.linkedin.com/v1/people/~/shares"
sample_xml = '<share>\n  <comment>Testing LinkedIn Share API!</comment>\n  <content>\n    <title>Testing hqfeeds by codecognition team</title>\n    <description>ignore it :-)</description>\n    <submitted-url>http://navaneethanit.wordpress.com</submitted-url>\n    <submitted-image-url>http://navaneethanit.files.wordpress.com/2012/01/21_tom-the-cat.jpg</submitted-image-url> \n  </content>\n  <visibility> \n    <code>anyone</code> \n  </visibility>\n</share>'

#function

def share_linkedin(url, data, method='GET', \
                    key=None, secret_key=None, \
                    token=None, secret_token=None):
    
    consumer = oauth.Consumer(key=key,
                              secret=secret_key)
    token = oauth.Token(key=token, 
                            secret=secret_token)
    client = oauth.Client(consumer, token)      
    resp, content = client.request(url, method=method, body=data, headers={'Content-Type': 'application/xml'})
    
    return resp,content

print share_linkedin(url, sample_xml, method="POST", key=key, secret_key=skey, token=token, secret_token=stoken)
    

