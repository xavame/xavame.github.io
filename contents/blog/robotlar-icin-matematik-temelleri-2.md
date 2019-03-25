---
name: 'robotlar-icin-matematik-temelleri-2'
title: 'Robotlar İçin Matematik Temelleri #2'
year: '2018'
color: '#000'
id: 'robotlar-icin-matematik-temelleri-2'
description: |
  '1 Ekim 2018'
---

Bu blog yazısında 1 Ekim 2018 Pazartesi günü işlenen, [Yard. Doç. Dr. A. Burak İNNER]'in anlattığı derste aldığım notları görebilirsiniz. 

Diğer ders notlarını [Yapay Zeka ve Benzetim Sis. Ar. Ge. Lab.] adresinden indirebilirsiniz.

[Bir önceki ders]

## MATLAB ne demektir?

MATLAB, çoğu kişinin sandığının aksine "matematik laboratuvarı" değil, "matrix laboratory" (matris laboratuvarı) anlamına gelir.

MATLAB uygulaması öğrenciye dahi para ile satıldığından biz 30 günlük deneme sürümünü \*göz kırpar\* kullanacağız. İsteyen satın da alabilir.

## Matris oluşturup değişkene atama
`A = [1 2 3 ; 4 5 6 ; 7 8 9]` komutu, 3x3 boyutunda bir matris oluşturup A değişkenine atar. Değişkenin boyutu, içindeki elemanlara göre belirlenir. 

Matrisin oluşturulabilmesi için her satırdaki ve sütundaki eleman sayısının tutarlı olması gerekir. Birinci satır 2 elamanlı, ikinci satır 3 elemanlı olamaz. 3x4 bir matris için toplam eleman sayısı 12 olmalıdır. Kısacası, `[1 2 3 ; 4 5 6 ; 7 8 ]` diye bir matris tanımlamak istersek, **"Array dimensions are not consistent"** hatası alırız.

Burada dikkat edilmesi gereken şey, `;` (noktalı virgül) karakterinin satır atlamak için, ` ` (boşluk) veya `,` (virgül) karakterinin sütunları belirtmek için kullanılmasıdır. Yani bu matrisi, `A = [1 2,3;4 ,    5 6;7 ,  8,     9   ]` olarak da tanımlayabilirdik.

||A Matrisi:||
|---:|:---:|:---|
|1|2|3|
|4|5|6|
|7|8|9|

## Matris'in ilk parametresi satırı temsil eder.

`A(n,m)` bir elemana erişmek için kullanılır. A matrisinin 2. satır 3. sütunundaki veriye erişmek için `A(2,3)` yazarak "6" elemanını bulabiliriz.

`A(n)` fonksiyonuna karşılık gelecek eleman listesi aşağıda verilmiştir. 

|n|eleman|
|:---:|:---:|
|n=1|2|
|n=2|4|
|n=3|7|
|n=4|2|
|n=5|5|
|n=6|8|
|n=7|3|
|n=8|6|
|n=9|9|
|n=10|ERROR|

## Sinüs fonksiyonu tek parametre bekliyor.
`sin(90,30)` fonksiyonunu çalıştırmaya kalktığımızda hata alırız, çünkü matematikteki sinüs fonksiyonu tek bir parametre ile çalışır. Bir açı dizesi (matrisi) göndermek için `sin([90 30])` fonksiyonunu çalıştırabiliriz.

Sinüs fonksiyonu radyan bekliyor, derece değil. Yani `sin(90)` fonksiyonu bize 90 **radyanın** sinüs değerini verir. Derece kullanmak için `sind(90)` fonksiyonunu kullanabiliriz.

## Önceden tanımlı değişkenler
MATLAB'da bazı değişkenler önceden tanımlı gelir. Bu değişkenlerden bazıları `pi` (pi sayısı, 3.1416), `i` ve `j` (karmaşık, sanal sayılar), `inf` (sonsuz), `eps` (epsilon, 2.2204e-16).

Burada bahsedilen `i` ve `j` aynı işi yapıyor. Bunun nedeni, i değişkeni kullanıcı tarafından tanımlandığında j'yi kullanabilmek.

i ve j kullanımı birden fazla şekilde gerçekleşir.
- `5+5*i`
- `5+5*j`
- `5+5i`

Sondaki örnek, i ve j tanımlandığında dahi karmaşık sayıları kullanabilmemizi sağlıyor.

## İki nokta üst üste karakteri
İki nokta üst üste karakteri "joker" karakteridir.
- `B(:,:)` -> Tüm satır ve sütunları gösterir.
- `B(2,:) = []` -> İkinci satırda bulunan tüm sütunları siler.
- `B(:)` -> Satır ve sütunları tek sütuna dönüştürür.

## Yorum satırı ve Mod alma
Bu karakter, C dilinde mod almayı temsil ediyordu, ancak `%` karakteri MATLAB'da yorum satırı başlangıcı olarak kullanılıyor. `%` karakteri ile başlayan dizgeler, yorum satırı olarak gösterilir ve işleme tabii tutulmaz. MATLAB'da Mod almak için `mod(sayi,mod)` fonksiyonunu kullanmamız gerekiyor. `mod(5,2)` fonksiyonunun çıktısı "1" olacaktır.

## Bir matrisin karesi
Bir matrisin karesinin alınabilmesi için matrisin kare matris olması (nxn) gerekir. Bir matrisin karesini `A*A` veya `A^2` şeklinde alabiliriz.

Bir matriste satırı veya sütunu silebiliriz, ancak sadece bir elemanı silemeyiz, çünkü tutarlılık bozulur. (İlk kısmı hatırlayın, 4x3 boyutunda bir matriste tam olarak 12 eleman olması gerekiyor.)

## Exponansiyel
`e` exponansiyel anlamına gelir. Exponansiyel, 10 üzeri n anlamına gelir. `0.123e1` = `0.123x(10^1)` = `1.23`

## Ondalıklı sayıların nokta ile başlaması
Ondalıklı sayıların başında 0 olmak zorunda değil. `0.123` sayısını `.123` olarak da ifade edebiliriz.

## Satıra sığmayan formüller
`...` ile bir satıra sığmayan formülleri bir alt satırda devam ettirebiliriz.

Örnek:
```
A = [1 2 3 ; 4 5 6 ; ...
     7 8 9 ]
```

## Dışarıdan bir komut çalıştırmak
`!` karakteri ile başlayan satırlar bir konsol (terminal, cmd, dos) komutu çağırır. Örneğin robotunuzun sunucudan bir zip dosyası çekmesi ve bunu bir klasöre çıkartması gerekiyor. Bunu, dışarıdan bir CLI (command line interface, komut satırı arayüzü) ile unzip edebilir, veriyi kullanabilirsiniz.

## Otomatik "artan" matris oluşturma
- `1:10` 1'den 10'a kadar artan bir matris döndürür. **[1 2 ... 10]** (10 adet).
- `1:2:10` 10'dan küçük, ikişer ikişer artan bir matris oluşturur. **[1 3 5 7 9]** (5 adet).
- `35:2:61` 35 ile 61 arasıdaki tüm tek sayıları gösterir. **[35 37 ... 61]** (14 adet).
- `36:2:61` 36 ile 61 arasıdaki tüm çift sayıları gösterir. **[36 38 ... 60]** (13 adet).
- `10:2:1` Boş küme döndürür. 10'dan 1'e, ikişer ikişer artarak gidemez. **[]** (0 adet).

## Ekrana yazdırmanın engellenmesi
`A=...;` satırının sonundaki noktalı virgül, bu satırın çalıştıktan sonra ekrana çıktı vermesini engeller.

## Bir diğer joker, "end"
Sonuncunun indexini bilmeden işlem yapmamıza yarar.

`A(end,:)` -> Buradaki "end", en son satırı ifade eder. A matrisi için çıktımız şu şekilde olacaktır:

||A(end,:)||
|---:|:---:|:---|
|7|8|9|

`A(end)` -> en son elemanı, yani `9` elemanını çıktı olarak verir. `A(end,end)` ile aynıdır.

`A(end-1)` -> en son elemanının bir üst satırındaki elemanı çıktı olarak verir. Matris üzerinde tek parametreli işlem yapmamızı hatırlayın (ilk başlık, A(n) tablosu). Tüm matrisi sütun olarak, önce yukarıdan aşağıya, sonra soldan sağa yazdırıyorduk. Yani `6` elemanını çıktı çıktı olarak verir. `A(end-1,end)` ile aynıdır.

`A(end/2,end/2)` -> 4x6 boyutundaki bir matris için, 2x3teki elemanı ifade eder.

`A(end/2,end/2)` -> 4x3 boyutundaki için hata verir, çünkü "ikinci" satır "bir buçuğuncu" sütun gibi bir şey yoktur. Tam sayıya çevirmek için `round(sayi)` formülünü kullanabiliriz. 

## Matrisin transpozu
Satır ile sütunun yer değiştirilmesi demektir. `M'` fonksiyonu, matrisin transpozunu alır.

## İsimlendirmeler
### camelCaseNotation (deveHörgücüNotasyonu)
Değişken adlandırmalarında kullanılır.

### PascalNotation (PaskalNotasyonu)
Dosya isimlendirmelerinde kullanılır.

## Sonsuzluk ve Hiçlik
`Inf` sonsuzluğu, `NaN` ise "sayı olmadığını" temsil ediyor. Açılımları, "Infinite" ve "Not a Number".

Bu iki tanım, bir işlemin sonucunun ne olduğunu belirtiyor. Örneğin sonsuzu sonsuza bölerseniz "NaN" sonucunu alırsınız. Sonsuzu bir sayıya bölerseniz "Inf" sonucunu alırsınız.

|İşlem|Çıktı|
|---|---|
|inf/9|Inf|
|1/0|Inf|
|exp(1000)|Inf|
|log(0)|-Inf|
|0/9|NaN|
|0/0|NaN|
|inf/inf|NaN|

## Otomatik matris oluşturma
- `zeros(10)` => 10x10 boyutunda bir kare matris oluşturup tamamını 0 ile doldurur.
- `ones(10)` => 10x10 boyutunda bir kare matris oluşturup tamamını 1 ile doldurur.
- `rand(10)` => 10x10 boyutunda bir kare matris oluşturup elemanlarını 0 ile 1 arasında, 0 ve 1 dahil olmayan rastgele sayılar ile doldurur.
- `round(rand(5,3)*100)` => 5x3 boyutunda bir matris oluşturur ve içerisine 0 ve 100 dahil rastgele tam sayılar atar. 0 ve 100'ün dahil olmasının nedeni, 99.8'in 100'e, 0.03'ün 0'a yuvarlanmasıdır.
- `randi(5,3)` => 0 ile 5 arasındaki (0 ve 5 dahil) rastgele tam sayıları 3x3 boyutunda bir matrise atar.
- `randi(5,3,5)` => 0 ile 5 arasındaki (0 ve 5 dahil) rastgele tam sayıları 3x5 boyutunda bir matrise atar.
- `randi([-10,10], 10, 15)` => -10 ile 10 arasındaki (-10 ve 10 dahil) rastgele tam sayıları 10x15 boyutunda matrise atar.

## Logaritma işlemleri
Doğal logaritma e tabanındadır. Bu yüzden `log(10^5)` fonksiyonunun çıktısı "11.5129" olacaktır (e=2.7183). Logaritma 10 için `log10(10^5)` kullanabiliriz. Bu fonksiyonun çıktısı "5" olacaktır.

## Diğer bilgiler
- **Overload**, aynı fonksiyonun farklı parametre sayıları ile zenginleştirilmesine denir.
- MATLAB'da, sağ üstteki arama kısmı sayesinde fonksiyon ve ön tanımlı değişken aramalarını yapabiliyoruz.

## Haftanın ödevi
Salı veya çarşamba günü, ders onaylandıktan sonra [Uzaktan Eğitim Araştırma ve Uygulama Merkezi] adresinde bulabilirsiniz. Üzerinde formüller olan bir kağıt paylaşılacak, bu formülleri MATLAB'da çözmeye çalışacağız.

[Bir sonraki ders]

[Yard. Doç. Dr. A. Burak İNNER]:http://akademikpersonel.kocaeli.edu.tr/binner/
[Yapay Zeka ve Benzetim Sis. Ar. Ge. Lab.]:http://yapbenzet.kocaeli.edu.tr/robotlar-icin-matematik-temelleri/
[Uzaktan Eğitim Araştırma ve Uygulama Merkezi]:http://edestek.kocaeli.edu.tr/
[Bir önceki ders]:/lecture/robotlar-icin-matematik-temelleri-1
[Bir sonraki ders]:/lecture/robotlar-icin-matematik-temelleri-3