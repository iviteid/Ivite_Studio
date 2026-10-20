from pathlib import Path
from PIL import Image

source = Path('C:/Users/LENOVO/Downloads')
target = Path(__file__).parent / 'assets'
target.mkdir(parents=True, exist_ok=True)
names = ['floral-left', 'wayang', 'gunungan', 'floral-right', 'clouds', 'mountain', 'pavilion', 'bouquet', 'ornament', 'blossom']
for number, name in enumerate(names, 1):
    matches = list(source.glob(f'ChatGPT Image Oct 19, 2026, 09_30*PM-{number}.png'))
    if len(matches) != 1:
        raise RuntimeError(f'Expected one source for {name}, got {len(matches)}')
    with Image.open(matches[0]) as im:
        im.thumbnail((1400, 1400))
        im.save(target / f'{name}.webp', 'WEBP', quality=87, method=6)
print('Prepared all ten supplied illustrations, preserving transparency.')
