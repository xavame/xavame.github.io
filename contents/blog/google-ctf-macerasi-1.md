---
name: 'google-ctf-macerasi-1'
title: 'Google CTF Macerası #1'
year: '2018'
color: '#19c5c5'
id: 'google-ctf-macerasi-1'
description: |
  Hoppala ve de cuppala, burası XNB.
---

Geçen gün YouTube'da gezerken bir şeye denk geldim. Bir adam, **Google**'ın CTF'ini (Capture The Flag, Bayrak Kapmaca) oynuyordu. Bir **JavaScript** görevini çözmeye çalıştığı için hemen kulaklarım havaya dikildi ve dikkatle izlemeye başladım.

Ancak daha önce hiç _Kriptografi_ veya _Reverse Engineering_ (tersine mühendislik) ile ilgilenmediğim için, bu **Youtuber** arkadaşın çözdüğü bölüm, beynimin kıvrımlarını eritmeye yetmişti.

Daha fazla spoiler (sürpriz kaçıran) almamak için videoyu kapattım ve **Google CTF**'i oynamaya karar verdim. Gerek retro tasarımı, gerekse eğlenceli ilerleyişiyle beni içine çekmeyi başardı.

![](/assets/google-ctf-macerasi-1/1.webp "center")

Haydi başlayalım.

## Bölüm 1 - Letter

![](/assets/google-ctf-macerasi-1/2.webp)

Bize bir **ZIP** dosyası içerisinde bir **PDF** verdi. **PDF**'in içeriği şu şekilde:

![](/assets/google-ctf-macerasi-1/3.webp)

Öncelikle bu dosyayı bir **HEX Editör** olan [Hexed.it] ile açmayı denedim. İstenen şifrenin **_CTF{...}_** şeklinde olduğunu bildiğimden **CTF** ile alakalı bir string aradım.

Ancak dosyanın büyüklüğü **(59KB)** beni benden aldı ve farklı bir yöntem aramaya başladım.

Aklıma bu şifreyi **PDF** dosyasından kopyalamak geldi. Sonuçta dosyanın içerisinde, üzeri siyah bir biçimde çizilmiş bir yazı vardı.

Kopyalayıp bir text editörüne yapıştırdığımda, bu siyah çizginin, şifrenin üzerindeki bir filtre olduğunu, istediğimiz cevabın bu katmanın altında olduğunu gördüm.

    Your credentials to the web interface are:
    ● Username:...........................
    ● Password: CTF{ICanReadDis}

Bu şifreyi, yani **_CTF{ICanReadDis}_** dizgesini boşluğa girdim ve ikinci katmana geçtim.


## Bölüm 2 (Ortadaki, Pembe) - Floppy
![](/assets/google-ctf-macerasi-1/4.webp)

**ZIP** dosyasının içerisinden  bir adet **foo.ico** dosyası çıktı. Dosyayı yine başlangıç olarak [Hexed.it] ile açtım. Biraz incelediğimde içinde iki adet dosyanın, `driver.txt` ve `www.com`'un, gömülü olduğunu gördüm. 

![](/assets/google-ctf-macerasi-1/5.webp)

**7ZIP** programı ile **foo.ico** içerisinde girdim ve dosyaların gerçekten burada olduğunu doğruladım.

![](/assets/google-ctf-macerasi-1/6.webp)

`driver.txt` dosyasının içeriği:
```
This is the driver for the Aluminum-Key Hardware password storage device.
CTF{qeY80sU6Ktko8BJW}
In case of emergency, run `www.com`
```
`www.com` dosyasının içeriği:
```
hD7X-t6ug_hl(]Wh8$^15GG1-hbrX5prPYGW^QFIuxYGFK,1-FGIuqZhHIX%A)I!hSLX4SI!{p*S:eTM'~_?o?V;m;CgAA]Ud)HO;{ l{}9l>jLLP[-`|0gvPY0onQ0geZ0wY5>D0g]h+(X-k&4`P[0/,64"P4APG
The Foobanizer9000 is no longer on the OffHub DMZ.          $
```

Çözüm, `driver.txt` dosyasının **içindeydi**. **_CTF{qeY80sU6Ktko8BJW}_** dizgesini boşluğa girdim ve üçüncü katmana geçtim.


## Bölüm 3 (Ortadaki, Mavi) - JS SAFE

![](/assets/google-ctf-macerasi-1/6.5.webp)

Geçmeden önce şunu söylememde fayda var. Bu bölüm bundan önceki diğer iki bölümden **_ÇOK_** daha zor. Bu yüzden size tavsiyem, sindire sindire okumanız.

Bu bölümü geçebilmek için **Debugging** yapabilirdim, ancak tipik bir **JavaScript** hayranı olduğumu belirtmek için **Tracing** kullanmaya karar verdim. Bazılarına **Debug** işlemi daha kolay gelebilir.

Bu bölümde de bizden istenen şey, her zamanki gibi **CTF** anahtarını bulmamız. Ancak bu sefer elimizde bir bulmaca değil de, bir **şeytan düğümü** var.

Parçalama:

`open_safe()` **Asenkron** bir fonksiyon, kasanın açılması için gerekli komutları bulunduruyor.

`CTF{([0-9a-zA-Z_@!?-]+)}` password değişkenine **CTF**'in regex'ini atıyor.

`!password || !(await x(password[1]))` _true_ dönerse **denied** yemişiz demektir. Yani `password && await x(password[1])`'un _true_ döndürmesi, şifreyi bulduğumuz anlamına gelir.

Stringimiz **_CTF{12345}_** şeklinde olduğunda `password` değişkeninin 1. indexteki değeri **_12345_** olacak. Bu değeri `x`'e gönderip _true_ almamız bekleniyor.

`x` fonksiyonu korkutucu. `code` adında bir değişkenimiz var ve şu değeri tutuyor:
```
icffjcifkciilckfmckincmfockkpcofqcoircqfscoktcsfucsivcufwcooxcwfycwiAcyfBcwkCcBfDcBiEcDfFcwoGcFfHcFiIcHfJcFkKcJfLcJiMcLfNcwwOcNNPcOOQcPORcQNScRkTcSiUcONVcUoWcOwXcWkYcVkЀcYiЁcЀfЂcQoЃcЂkЄcЃfЅcPNІcЅwЇcІoЈcЇiЉcЈfЊcPkЋcЊiЌcІiЍcЌfЎcWoЏcЎkАcЏiБcІkВcБfГcNkДcГfЕcЇkЖcЕiЗcЖfИcRwЙcИoКcЙkЛcUkМcЛiНcМfОcИkПcОiРcПfСcUwТcСiУcQkФcУiХcЃiЦcQwЧcЦoШcЧkЩcШiЪcЩfЫcRiЬcЫfЭcКiЮcЭfЯcСoаcЯiбcГiвcЙiгcRoдcгkеcдiжdТaзcЛfиdзaжcжийcСkкdйaжcжклcйfмdлaжcжмнdТaжcжноdЀaжcжопdNaжcжпрcUiсcрfтdсaуdЁaтcтутcтофcТfхdфaтcтхтcтктcтнтcтмцdсaтcтцтcтктcтутcтнчaaтшdЯaщcйiъcщfыdъaьcжыэcVfюdэaьcьюьcьояdЛaьcьяьcьуьcьыѐчшьёѐшшђcOfѓdђaѓcѓнѓcѓнєcUfѕdєaѓcѓѕіcЯfїdіaѓcѓїјaёѓљaaтњcжшћcЎiќcћfѝdќaњcњѝњcњeўcЏfџdўaњcњџѠdАaњcњѠњcњшњcњѝњcњfњcњџѡљшњѢaaтѣcжшѣcѣѝѣcѣeѣcѣџѤcЯkѥdѤaѣcѣѥѣcѣшѣcѣѝѣcѣfѣcѣџѦѢшѣѧcцнѧcѧїѨdСaѧcѧѨѧcѧкѧcѧуѩaёѧѪcхмѫdрaѪcѪѫѪcѪкѬdYaѪcѪѬѪcѪиѭaѩѪѮcяюѯdНaѮcѮѯѮcѮиѮcѮхѮcѮкѰaѭѮѱdVaѲcхѱѲcѲѕѳcNoѴcѳkѵcѴfѶdѵaѲcѲѶѲcѲiѲcѲlѲcѲmѷјѲgѸјѭѷѹbѰѸѺcXfѻdѺaѻcѻюѻcѻоѻcѻкѻcѻoѼdђaѻcѻѼѻcѻнѻcѻнѻcѻѕѻcѻїѽaёѻѾѽѹшѿceeҀceeҁcee҂ceeѿaѾeҀјѿT҂ѡҀшҁјh҂hѦҁшѿaѾfҀјѿV҂ѡҀшҁјh҂hѦҁшѿaѾiҀјѿU҂ѡҀшҁјh҂hѦҁшѿaѾjҀјѿX҂ѡҀшҁјh҂hѦҁшѿaѾkҀјѿЁ҂ѡҀшҁјh҂hѦҁшѿaѾlҀјѿF҂ѡҀшҁјh҂hѦҁшѿaѾmҀјѿЄ҂ѡҀшҁјh҂hѦҁшѿaѾnҀјѿЉ҂ѡҀшҁјh҂hѦҁшѿaѾoҀјѿЄ҂ѡҀшҁјh҂hѦҁшѿaѾpҀјѿЋ҂ѡҀшҁјh҂hѦҁшѿaѾqҀјѿЍ҂ѡҀшҁјh҂hѦҁшѿaѾrҀјѿА҂ѡҀшҁјh҂hѦҁшѿaѾsҀјѿF҂ѡҀшҁјh҂hѦҁшѿaѾtҀјѿВ҂ѡҀшҁјh҂hѦҁшѿaѾuҀјѿД҂ѡҀшҁјh҂hѦҁшѿaѾvҀјѿЗ҂ѡҀшҁјh҂hѦҁшѿaѾwҀјѿК҂ѡҀшҁјh҂hѦҁшѿaѾxҀјѿН҂ѡҀшҁјh҂hѦҁшѿaѾyҀјѿР҂ѡҀшҁјh҂hѦҁшѿaѾAҀјѿТ҂ѡҀшҁјh҂hѦҁшѿaѾBҀјѿФ҂ѡҀшҁјh҂hѦҁшѿaѾCҀјѿW҂ѡҀшҁјh҂hѦҁшѿaѾDҀјѿХ҂ѡҀшҁјh҂hѦҁшѿaѾEҀјѿЪ҂ѡҀшҁјh҂hѦҁшѿaѾFҀјѿЬ҂ѡҀшҁјh҂hѦҁшѿaѾGҀјѿЮ҂ѡҀшҁјh҂hѦҁшѿaѾHҀјѿа҂ѡҀшҁјh҂hѦҁшѿaѾIҀјѿe҂ѡҀшҁјh҂hѦҁшѿaѾJҀјѿб҂ѡҀшҁјh҂hѦҁшѿaѾKҀјѿв҂ѡҀшҁјh҂hѦҁшѿaѾLҀјѿK҂ѡҀшҁјh҂hѦҁшѿaѾMҀјѿе҂ѡҀшҁјh҂hѦҁшѐceeёceeѓceeјceeљceeњceeѡceeѢceeѣceeѦceeѧceeѩceeѪceeѭceeѮceeѰceeѲceeѷceeѸceeѹceeѻceeѽceeѾceeҀceeҁceeжceeтceeчceeьcee
```
Bir de `env` adında bir değişkenimiz var, bu da bir obje ve içerisinde **fonksiyon**'lar, **integer**'lar, **array'ler** tutuyor. Kısacası ortalık bayağı bir karışık.
```JavaScript
var env = {
    a: (x,y) => x[y],
    b: (x,y) => Function.constructor.apply.apply(x, y),
    c: (x,y) => x+y,
    d: (x) => String.fromCharCode(x),
    e: 0,
    f: 1,
    g: new TextEncoder().encode(password),
    h: 0,
};
```

Burada görüyoruz ki `a`,`b`,`c` ve `d` birer **Function**, `e`,`f` ve `h` birer **Integer** ve `g` bizim şifremizi **Byte Array** şeklinde tutuyor.

Bizden, şu kodun çalıştırılması isteniyor:
```JavaScript
for (var i = 0; i < code.length; i += 4) {
    var [lhs, fn, arg1, arg2] = code.substr(i, 4);
    try {
        env[lhs] = env[fn](env[arg1], env[arg2]);
    } catch(e) {
        env[lhs] = new env[fn](env[arg1], env[arg2]);
    }
    if (env[lhs] instanceof Promise) env[lhs] = await env[lhs];
}
return !env.h;
```

Kodu şu şekilde açıklayabiliriz:
- 0'dan başlayıp sona kadar her 4. karakteri al. yani 0,4,8...1712 indeksler
- Bu dört karakteri lhs, fn, arg1 ve arg2 değişkenlerine ata.
- Eğer zaten böyle bir env değeri varsa çağır
- Eğer böyle bir env değeri yok ise (catch) oluştur
- Üstteki fonksiyonun çalıştığından (promise) emin ol
- Eğer h 0 ise true dön

Bu koddan görüyoruz ki bu işlem sadece `env`'de sayıları işlemiyor, gerektiği zamanda fonksiyonu **yaratıyor**.

İlk iterasyonu inceleyelim.

İlk 4 karakter "icff".
`env[lhs] = env[fn](env[arg1], env[arg2]);`
`i = c(f,f)`
`i = f+f`

Yani f ve f'i c fonksiyonuna sokup çıkanı i'ye atıyor.

Bu işlem bana nedense **Opcode** ve **Operand**'ları hatırlattı.

Üstteki for döngüsünün içerisine şunu yazıp her bir iterasyonda değerlerimizi kontrol edelim:

```JavaScript
console.log(i, Object.assign({},env), env[lhs], env[fn], env[arg1], env[arg2], env["h"]);
```

Burada env'in kopyasını aldığıma dikkat edin. Bunu yapmamın sebebi, env'in sadece bir referans olarak değil, yeni bir obje olarak oluşturulmasını istemem. Eğer referans olarak alsaydık, tüm yazdırılan env'leri aynı görürdük çünkü Chrome konsolu, bu objeyi açmaya çalıştığımızda son düzenlenen veriyi gösteriyor.

İlk iterasyondaki değişim:
![](/assets/google-ctf-macerasi-1/7.webp)

Sondaki `env["h"]`'ı koymamın nedeni, bu değerin nerede değiştiğini ve bizi 0'dan büyük bir değere götürdüğünü anlamak. Eğer `h`'nin neden değiştiğini bulabilirsem, değiştiği yerdeki fonksiyonun ne işe yaradığını çözmeyi deneyebilirim.

![](/assets/google-ctf-macerasi-1/8.webp)

`h` ilk defa değişiyor ve elimizde bir byte array var.

Bu **Byte Array**'i **Hash String**'e dönüştürüyorum...
```JavaScript
function toHexString(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}
toHexString([3, 172, 103, 66, 22, 243, 225, 92, 118, 30, 225, 165, 226, 85, 240, 103, 149, 54, 35, 200, 179, 136, 180, 69, 158, 19, 249, 120, 215, 200, 70, 244])
```
Bize dönen sonuç: 
```
03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4
```
Bunu Google'da arattığımızda şöyle bir şeyle karşılaşıyoruz:
![](/assets/google-ctf-macerasi-1/9.webp)

Eğer hala göremediyseniz, açıklama kısmına bakın. Rastgele denediğimiz şifreyi, **_1234_**'ü gösteriyor.

Bu da demek oluyor ki, bizim **_password_** stringimiz **hash**'e dönüştürülmüş.

Peki bu **hash** ne ile kıyaslanıyor da bizim `h`'ımız artıyor?

Bunun için az önceki `console.log`'a, bu değerleri alan fonksiyonu bulmak adına bir parametre daha ekliyorum.
```JavaScript
console.log(i, Object.assign({},env), env[lhs], env[fn], env[arg1], env[arg2], env["h"], fn);
```

Bütün bunlardan sorumlu olan fonksiyonu arıyorum.

![](/assets/google-ctf-macerasi-1/10.webp)

Burada iki fonksiyon var. Biri XOR, biri OR işlemi yapıyor. Bizim password hashimiz ile işleme giren fonksiyon, `ѡ` fonksiyonu.

Bunun için tüm `ѡ` fonksiyonunun ilk parametresinin 1. indexindeki değerleri bir array'e kaydediyorum.

>Talk is cheap, show me the code.`—Linus Torvalds`

Söylediklerimden hiçbir şey anlamamış, ekrana boş boş bakanlar için, demeye çalıştığım şey şu:
```JavaScript
var arr = [];
...
for(blabla){
    arr.push(env[arg1][1]);
}
...
console.log(arr);
```

Önüme şöyle bir byte array çıkıyor:

```JavaScript
[230, 104, 96, 84, 111, 24, 205, 187, 205, 134, 179, 94, 24, 181, 37, 191, 252, 103, 247, 114, 198, 80, 206, 223, 227, 255, 122, 0, 38, 250, 29, 238]
```

Bunu az önceki gibi dönüştürüp **Google**'da aratıyorum.

![](/assets/google-ctf-macerasi-1/11.webp)

Ve görüldüğü üzere şifremiz **_CTF{Passw0rd!}_**

### **CTF** bitmedi ama ben bittim.
Umarım şu ana kadar olan maceramızı beğenmişsinizdir. Bir sonraki bölümde görüşmek üzere!


[Hexed.it]:https://hexed.it/