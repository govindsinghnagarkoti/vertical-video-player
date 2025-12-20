from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import json
import instaloader

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        
        try:
            query = parse_qs(urlparse(self.path).query)
            url = query.get('url', [None])[0]
            
            if not url:
                response = {"error": "Missing 'url' parameter"}
                self.wfile.write(json.dumps(response).encode('utf-8'))
                return

            L = instaloader.Instaloader()
            
            # Extract shortcode
            parsed = urlparse(url)
            path_parts = parsed.path.strip('/').split('/')
            
            shortcode = None
            if 'p' in path_parts:
                try:
                    shortcode = path_parts[path_parts.index('p') + 1]
                except IndexError:
                    pass
            elif 'reel' in path_parts:
                try:
                    shortcode = path_parts[path_parts.index('reel') + 1]
                except IndexError:
                    pass
            elif 'tv' in path_parts:
                try:
                    shortcode = path_parts[path_parts.index('tv') + 1]
                except IndexError:
                    pass
                
            if not shortcode:
                 response = {"error": "Invalid Instagram URL"}
                 self.wfile.write(json.dumps(response).encode('utf-8'))
                 return

            post = instaloader.Post.from_shortcode(L.context, shortcode)
            
            video_url = post.video_url
            if not video_url:
                 # It might be a carousel or image
                 response = {"error": "No video found in this post"}
            else:
                 response = {
                     "video_url": video_url,
                     "thumbnail": post.url,
                     "owner": post.owner_username,
                     "caption": post.caption,
                     "shortcode": shortcode
                 }
            
            self.wfile.write(json.dumps(response).encode('utf-8'))
            
        except Exception as e:
            response = {"error": str(e)}
            self.wfile.write(json.dumps(response).encode('utf-8'))
