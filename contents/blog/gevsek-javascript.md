---
name: 'gevsek-javascript'
title: "Gevşek JavaScript"
year: '30 Mart 2019'
color: '#000'
id: 'gevsek-javascript'
description: |
  Life's a beach.
---

Hayır, bu bir küfür değil.

JavaScript gevşek bir dil. Daha doğrusu, gevşek yazılmış bir dil. Size gevşekliği şu şekilde anlatabilirim:

Karanlık bir odadasınız ve bir **kibrit**iniz var. Önünüzde bir *nesne* var. Önünüzdeki nesnenin mum olduğunu düşünüyorsunuz, çünkü oraya mumu siz koymuştunuz. Kibriti **çak**tınız ve önünüzdeki nesneyi **yak**tınız. Mum ise sıkıntı yok, çünkü istediğiniz şey buydu.

Ama eğer önünüzdeki mum değil de perde ise, işte o zaman **yandınız** demektir.

Bu örneği kod ile örnek vermek gerekirse,

```javascript
function eylem(nesne){
  var kibrit = new Kibrit();
  kibrit.cak();
  kibrik.yak(nesne);
}
```

Nesnenin türüyle alakalı bir tanımlama gördünüz mü? Nesnenin mum olup olmadığını kontrol etmiyoruz. Nesne ne olursa olsun, kibrit onu yakacaktır.

Peki biz bu nesnenin türünü nereden bileceğiz?

```javascript
  function tur(nesne){
    return typeof nesne
  }
```

Peki bu örneği biraz daha gerçekleyelim.

Şöyle bir kodumuz olsun:

```javascript
var booleanDeger = true;

function birFonksiyon(){
    if(booleanDeger === true){
        return "doğru";
    }
}
```

Bu kod, aşağıdaki koda eşit midir?

```javascript
var booleanDeger = true;

function birFonksiyon(){
    if(booleanDeger){
        return "doğru";
    }
}
```

Bu kodda `=== true` kısmına gerek olmadığını düşünürsünüz. Çünkü bir `if`'in içerisinde `true` kontrolü yapmak gereksizdir. Sonuçta `true===true` kontrolü `true` dönecektir, bu da denklik işaretinin solundaki değere eşittir.

Peki örneğimizdeki `booleanDeger` kısmını `birDeger` olarak değiştirsek ve dönen verinin ne olduğunu bilmesek ne olur?

```javascript
var birDeger = "Hello World";

function birFonksiyon(){
    if(birDeger){
        return "doğru";
    }
}
```

Bu örnekte eğer `birDeger` değişkeninin `boolean` olup olmadığını kontrol etmek için `birdeger === true` kullanımı gerekli hale geldi. Çünkü JavaScript'te `if` kontrolünün içerisindeki değer sağlanıyor ise her zaman o `if`'in içerisine girer.

Tamam, bu bilgileri cebimize koyalım ve asıl konumuza gelelim.

## #1 typeof kavramı

Bir değişkenin tipinin ne olduğu hakkında şüpheleriniz varsa `typeof` operatörü kullanılır:

```javascript
typeof 1 // number
typeof “1” // string

typeof [1,2,3] // object
typeof {name: "ata", country: "turkey"} // object

typeof true // boolean
typeof (1 === 1) // boolean

typeof undefined // undefined
typeof null // object

const f = () => 2
typeof f // function
```

Toplamda `number`, `string`, `object`, `boolean`, `undefined` `function` olmak üzere 6 tip vardır. ([ECMAScript 2015] ile gelen `symbol` tipini saymazsak) 

## #2 İki Eşittir ve Üç Eşittir

İki eşit ve üç eşit arasındaki fark, tip kontrolüdür. İki eşit tipine bakmazsızın değerleri karşılaştırırken, üç eşit tipi de göz önünde bulundurur.

Aşağıda iki eşit ve üç eşit arasındaki bazı farklar gösteriliyor. 

```javascript
1 == "1" // true, değerler eşit
1 === "1" // false, tipler eşit değil

null == undefined // true, boş
null === undefined // false, tipler eşit değil

0 == false // true, 0 demek false demektir
0 === false // false, tipler eşit değil

"0" == false // true, tip değişimi yapılabiliyor
"0" === false // false, tipler eşit değil
```

İki eşittir'den olduğu kadar kaçınmalısınız. Bunun nedenini aşağıda bulabilirsiniz.

```javascript
0 == false // true, 0 demek false demektir
0 == true // false, üsttekinin tersi

1 == true // true, 1 demek true demektir
1 == false // false, üstekinin tersi

2 == true // false, ???
2 == false // false
```

Peki neden böyle oldu? `2` değerinin güvenilir bir değer olduğunu düşünebilirsiniz. `0`'dan farklı bir değer `true` demektir, değil mi? **DEĞİL.**

### Neden?

JavaScript, `true` değerini bir sayı ile karşılaştırmak için `1`'e dönüştürür. `2===1` olmadığı için de, güzel bir `false` değeri ile karşılaşırız.

## #3 Ünlem Eşittir

Üstte olduğu gibi, burada da üçüncü karakter tip kontrolü yapar.

```javascript
1 != "1" // false
1 !== "1" // true
```

## #4 False Kontrolü

`!` (bang) operatörünü kullanarak false kontrolü yapabilirsiniz:

```javascript
!null // true
!undefined // true
!0 // true
!"" // true
!false // true

![] // false
!42 // false
!"hello world" // false
```

`null`, `undefined`, `0`, `""` ve `false` için `!` operatörünü kullandığımızda true sonucunu aldık.
`[]`, `42` ve `"hello world"` için ise false aldık, çünkü bu değerler [gerçeklenebilir]. 

Detaylı bilgiyi [JavaScript Truthy] adresinden bulabilirsiniz

## #5 Bang bang! Öldün çık.

İki adet `!` kullanımı ile tipiniz ne olursa olsun, veri gerçeklenebiliyor ise `true`'ya, aksi durumda ise `false`'a çevirir.

Örnek:

```javascript
!!true // true
!!{} // true
!![] // true
!!42 // true
!!"0" // true
!!new Date() // true
!!-42 // true
!!3.14 // true
!!-3.14 // true
!!Infinity // true
!!-Infinity // true

!!false // false
!!null // false
!!undefined // false
!!0 // false
!!0n // false
!!NaN // false
!!'' // false
!!"" // false
!!`` // false
!!document.all // false
```

## #6 Null, Undefined ve NaN arasındaki fark

- Null bir objedir. Varlıkla yokluk arasında bir köprüdür.
- Undefined yokluktur. Atanmamıştır. Öğretmendir?
- NaN sayı değildir. 

```javascript
null + 1 // 1. Objelere sayı eklenebilir.
undefined + 1 // NaN. Boşluğa sayı eklenemez.
```

Gerçek hayattan örnek:

- Sepet bir objedir.
- Sepetinde `1` elman var. Sepete bir elma eklersen `2` elman olur. (1 + 1)
- Sadece bir sepetin var. İçi boş. Sepete bir elma eklersen `1` elman olur. (null + 1, obje + 1)
- Sepetin yok. Elmayı ekleyebilecek bir yerin de yok. Elmayı boşluğa attın. Sepetinde kaç elman var? Sayamazsın, çünkü **sepetin yok.** (NaN)

### E iyiymiş, `null`'a veri eklerim o zaman. Sepet falan...

Dur bir dakika ya, bitirmedik daha. `null`'a veri eklemek yapabileceğin en [dingo] iş.

```javascript
null + [1,2,3] // "null1,2,3"
null + ["hello", "world"] // "nullhello,world"
null + {0: "hello", 1: "world"} // "null[object Object]"
```

Kısaca, `null` gördüm diye üzerine veri eklemeye çalışma, başına iş açarsın.

## Özet

- Üç eşittir kullanın. 
- null'a veri atamayın.
- tipe bağlı kalmak istemiyorsanız iki eşittir kullanmak yerine `!!` (bang bang!) kullanın.

[ECMAScript 2015]:https://developer.mozilla.org/tr/docs/Web/JavaScript/Reference/Operat%C3%B6rler/typeof#Description
[gerçeklenebilir]:http://www.tdk.gov.tr/index.php?option=com_bts&view=bts&kategori1=veritbn&kelimesec=306483
[JavaScript Truthy]:https://developer.mozilla.org/en-US/docs/Glossary/Truthy
[dingo]:http://www.tdk.gov.tr/index.php?option=com_ttas&view=ttas&kategori1=acikla2&kod=67904