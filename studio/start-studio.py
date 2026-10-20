"""Serve Studio and the invitation catalog artwork on a stable local address."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit, quote
import io
import json
import sys
import threading
import webbrowser
import urllib.request

STUDIO = Path(__file__).resolve().parent
CATALOG = STUDIO.parent
IMAGE_TYPES = {'.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.avif'}


def artwork_roots():
    roots = [(CATALOG / 'assets', 'Catalog assets')]
    roots.extend((folder / 'assets', folder.name.replace('-', ' ').title())
                 for folder in sorted((CATALOG / 'themes').iterdir())
                 if folder.is_dir() and (folder / 'assets').is_dir())
    return [(root.resolve(), label) for root, label in roots if root.is_dir()]


def artwork_index():
    collections = []
    for root, label in artwork_roots():
        groups = {}
        for path in sorted(root.rglob('*')):
            if not path.is_file() or path.suffix.lower() not in IMAGE_TYPES:
                continue
            resolved = path.resolve()
            if not resolved.is_relative_to(root):
                continue
            subfolder = path.parent.relative_to(root).as_posix()
            group_label = label if subfolder == '.' else label + ' / ' + subfolder
            relative = path.relative_to(CATALOG).as_posix()
            groups.setdefault(group_label, []).append({
                'name': path.stem.replace('-', ' '),
                'filename': path.name,
                'path': relative,
                'url': '/catalog-artwork/' + quote(relative, safe='/'),
            })
        for name, items in groups.items():
            collections.append({'id': name, 'label': name, 'items': items})
    return {'collections': collections, 'root': 'invitation_catalog',
            'count': sum(len(c['items']) for c in collections)}


class StudioHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        route = urlsplit(self.path).path
        if route == '/api/artwork':
            data = json.dumps(artwork_index(), ensure_ascii=False).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(data)))
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            return io.BytesIO(data)
        if route.startswith('/catalog-artwork/'):
            relative = unquote(route[len('/catalog-artwork/'):])
            path = (CATALOG / relative).resolve()
            allowed = any(path.is_relative_to(root) for root, _ in artwork_roots())
            if not allowed or not path.is_file() or path.suffix.lower() not in IMAGE_TYPES:
                self.send_error(404, 'Artwork not found')
                return None
            try:
                stream = path.open('rb')
            except OSError:
                self.send_error(404, 'Artwork not found')
                return None
            self.send_response(200)
            self.send_header('Content-Type', self.guess_type(str(path)))
            self.send_header('Content-Length', str(path.stat().st_size))
            self.send_header('Last-Modified', self.date_time_string(path.stat().st_mtime))
            self.send_header('Cache-Control', 'no-cache')
            self.end_headers()
            return stream
        return super().send_head()


if __name__ == '__main__':
    handler = partial(StudioHandler, directory=str(STUDIO))
    try:
        server = ThreadingHTTPServer(('127.0.0.1', 8081), handler)
    except OSError:
        try:
            with urllib.request.urlopen('http://127.0.0.1:8081/api/artwork', timeout=3) as response:
                result = json.load(response)
                if result.get('root') != 'invitation_catalog':
                    raise RuntimeError('Port 8081 belongs to another application.')
            if '--no-browser' not in sys.argv:
                webbrowser.open('http://127.0.0.1:8081/')
        except Exception as error:
            print(f'Close the old Studio server window and run Start Studio.cmd again. {error}')
            raise SystemExit(1)
        raise SystemExit(0)
    with server:
        url = 'http://127.0.0.1:8081/'
        print(f'ivite Studio: {url}\nCatalog artwork connected. Keep this window open. Press Ctrl+C to stop.', flush=True)
        if '--no-browser' not in sys.argv:
            threading.Timer(0.5, lambda: webbrowser.open(url)).start()
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
