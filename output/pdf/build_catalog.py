from pathlib import Path
from io import BytesIO
from urllib.parse import quote
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).parent / 'Katalog-IVITE-ID.pdf'
ASSETS = ROOT / 'Design/Builder/template_builder/public/templates'
for name, file in [('Sans', 'lato/Lato-Regular.ttf'), ('Bold', 'lato/Lato-Bold.ttf'), ('Serif', 'freefont/FreeSerif.ttf'), ('Italic', 'freefont/FreeSerifItalic.ttf')]:
    pdfmetrics.registerFont(TTFont(name, '/usr/share/fonts/truetype/' + file))
W, H = 540, 960
INK, MUTED, PAPER, GREEN, LINE = '#293C35', '#68756C', '#F8F6F0', '#415C4A', '#D8DED2'
c = canvas.Canvas(str(OUT), pagesize=(W,H), pageCompression=1)
c.setTitle('IVITE.ID | Katalog Website Wedding Invitation')
c.setAuthor('IVITE.ID')
c.setSubject('Delapan pilihan desain undangan pernikahan digital dan informasi pemesanan')

def rect(x,y,w,h,color,r=0):
    c.setFillColor(HexColor(color))
    if r: c.roundRect(x,H-y-h,w,h,r,fill=1,stroke=0)
    else: c.rect(x,H-y-h,w,h,fill=1,stroke=0)

def text(s,x,y,size=13,font='Sans',color=INK):
    c.setFillColor(HexColor(color)); c.setFont(font,size); c.drawString(x,H-y-size,s)

def para(s,x,y,w=452,size=14,color=MUTED,font='Sans',leading=None):
    p=Paragraph(s,ParagraphStyle('p',fontName=font,fontSize=size,leading=leading or size*1.45,textColor=HexColor(color)))
    _,h=p.wrap(w,H); p.drawOn(c,x,H-y-h); return h

def line(y):
    c.setStrokeColor(HexColor(LINE));c.setLineWidth(.7);c.line(44,H-y,496,H-y)

def shot(slug,x,y,w,h=None):
    im=Image.open(ASSETS/slug/'preview-thumbnail.webp').convert('RGB')
    if h is None:h=w*im.height/im.width
    b=BytesIO();im.save(b,format='JPEG',quality=91)
    c.drawImage(ImageReader(b),x,H-y-h,w,h)

def link(label,x,y,w=452,message='Halo IVITE.ID, saya ingin konsultasi undangan pernikahan.',dark=True):
    rect(x,y,w,43,GREEN if dark else '#E8EDE3',8)
    text(label,x+16,y+12,12,'Bold',PAPER if dark else GREEN)
    url='https://wa.me/6281356978503?text='+quote(message)
    c.linkURL(url,(x,H-y-43,x+w,H-y),relative=0,thickness=0)

def base(n,section):
    rect(0,0,W,H,PAPER)
    text('IVITE.ID',44,32,18,'Bold');text('WEDDING INVITATION',319,39,9,'Bold',MUTED)
    line(70)
    line(922);text(section,44,935,9,'Sans',MUTED);text(f'{n:02d} / 06',458,935,9,'Sans',MUTED)

base(1,'KOLEKSI PILIHAN')
text('UNDANGAN DIGITAL UNTUK HARI ISTIMEWA',44,108,10,'Bold',GREEN)
text('Awal indah',42,143,56,'Serif')
text('untuk cerita Anda.',42,201,48,'Italic')
para('Temukan desain yang mencerminkan kisah cinta Anda.<br/>Personal, penuh makna, dan mudah dibagikan.',44,277,size=15)
shot('modern-javanese',44,350,452)
shot('modern-korea',44,620,217)
shot('modern-japan',279,620,217)
text('08 DESAIN PILIHAN',44,768,11,'Bold',GREEN)
para('Korean · Chinese · Islamic · Japanese · Javanese · Garden',44,791,size=12)
link('Konsultasi & minta penawaran',44,843)
c.showPage()

products=[
 ('01','Serene Autumn','korea-style','KOREAN / LEMBUT & TENANG','Cyan lembut dan ivory dengan sentuhan editorial Korea. Untuk perayaan yang terasa hangat dan intim.',['#466568','#FBF9F6','#BDCFCC']),
 ('02','A Little Forever','modern-korea','KOREAN / ROMANTIS & PERSONAL','Detail kertas kenangan dan potret pasangan bernuansa Korea. Manis untuk merangkai cerita berdua.',['#748169','#F2EEDF','#DCCAC0']),
 ('03','Haute Imperial','chinese-style','CHINESE / KLASIK & MEWAH','Warna pearl, detail emas, dan gerbang pembuka. Merayakan tradisi dalam tampilan yang elegan.',['#D4AF37','#FFF8F3','#827157']),
 ('04','Janji','modern-javanese','JAVANESE / TRADISI & EDITORIAL','Ornamen floral dan nuansa tradisi Jawa dalam komposisi editorial yang hangat dan berkesan.',['#8B8C69','#F3F0E7','#BCAD8A']),
 ('05','Islamic Couture','modern-islamic','ISLAMIC / ANGGUN & KHIDMAT','Ivory, champagne gold, dan sentuhan kaligrafi. Pilihan lembut untuk menyampaikan kabar bahagia.',['#BBA452','#FDFBF7','#E7DABE']),
 ('06','Islamic Gold','modern-islamic2','ISLAMIC / HANGAT & ELEGAN','Kartu pembuka berbentuk lengkung dengan aksen emas. Memberi kesan hangat sejak sapaan pertama.',['#D4AF37','#FFF8F3','#6D6351']),
 ('07','Sakura Éternelle','modern-japan','JAPANESE / FLORAL & ROMANTIS','Pesona sakura, nuansa taman Kyoto, dan tipografi klasik. Untuk suasana pernikahan yang puitis.',['#BC929B','#F5EEEB','#829286']),
 ('08','Rustic Garden','rustic-garden','GARDEN / NATURAL & LEMBUT','Dusty blue dengan inspirasi taman dan hutan pinus. Selaras dengan konsep perayaan bernuansa alam.',['#7391A5','#EDF2F2','#CBD7DB']),
]

for page in range(4):
    base(page+2,'TEMUKAN DESAIN ANDA')
    for j,p in enumerate(products[page*2:page*2+2]):
        code,name,slug,tag,desc,palette=p
        y=96+j*401
        text(code,44,y+7,12,'Bold',MUTED)
        text(name,78,y,29,'Serif')
        text(tag,44,y+45,10,'Bold',GREEN)
        shot(slug,44,y+72,452,235)
        para(desc,44,y+322,size=13,w=452,leading=18)
        for k,col in enumerate(palette):rect(44+18*k,y+371,12,12,col,6)
        label='Minta demo & penawaran'
        text(label,310,y+369,12,'Bold',GREEN)
        url='https://wa.me/6281356978503?text='+quote(f'Halo IVITE.ID, saya tertarik desain {code} - {name} dari katalog. Boleh minta demo dan penawarannya?')
        c.linkURL(url,(300,H-y-394,496,H-y-358),relative=0,thickness=0)
    text('Nama, tanggal, dan foto pada contoh merupakan materi ilustrasi.',44,904,9,'Sans',MUTED)
    c.showPage()

base(6,'KONSULTASI & PEMESANAN')
text('Dari pilihan desain',44,99,35,'Serif')
text('menjadi undangan Anda.',44,139,35,'Italic')
para('Sampaikan tema favorit dan kebutuhan acara Anda.<br/>Kami bantu mendiskusikan detailnya.',44,199,size=14)
text('PILIHAN FITUR',44,274,10,'Bold',GREEN)
features=[('Informasi acara','Profil mempelai, jadwal, dan lokasi.'),('Cerita & suasana','Foto, kisah pasangan, serta musik.'),('Interaksi tamu','RSVP, ucapan, dan hadiah digital.')]
for i,(title,body) in enumerate(features):
    y=305+i*57
    text(f'0{i+1}',44,y+1,11,'Bold',MUTED);text(title,78,y,15,'Bold');text(body,78,y+23,12,'Sans',MUTED)
para('Ketersediaan fitur dan penyesuaian mengikuti desain serta layanan yang disepakati.',44,481,size=11)
line(526)
text('CARA MEMESAN',44,551,10,'Bold',GREEN)
para('<b>1. Pilih desain.</b> Kirim nama atau nomor desain favorit.<br/><b>2. Ceritakan kebutuhan.</b> Sampaikan tanggal acara dan fitur pilihan.<br/><b>3. Sepakati penawaran.</b> Konfirmasi harga, jadwal, dan revisi.',44,579,size=13,leading=23)
para('<b>Siapkan:</b> nama mempelai, detail acara, lokasi, dan foto pilihan. Cerita pasangan serta preferensi musik dapat dibahas saat konsultasi.',44,664,size=12)
rect(44,738,452,58,'#E8EDE3',8)
text('Harga sesuai kebutuhan',60,748,16,'Bold',GREEN)
text('Minta penawaran untuk desain dan fitur pilihan Anda.',60,774,11,'Sans',MUTED)
link('Hubungi IVITE.ID melalui WhatsApp',44,815)
text('+62 813-5697-8503  |  iivite@outlook.com',44,874,12,'Sans',GREEN)
c.linkURL('mailto:iivite@outlook.com',(285,H-894,496,H-869),relative=0,thickness=0)
text('Jadwal pengerjaan, masa aktif, dan revisi dikonfirmasi dalam penawaran.',44,900,9,'Sans',MUTED)
c.showPage(); c.save()
print(OUT)
