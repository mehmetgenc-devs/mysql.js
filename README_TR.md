# MySQL Sorgu Modülü

Bu Node.js modülü, MySQL veritabanı ile etkileşimde bulunmak için kullanılır. Modül, bağlantı yönetimi, sorgu işlemleri ve olay takibi gibi temel özellikleri sunar.

## Kurulum

Bu modülü kurmak için aşağıdaki komutu çalıştırın:

```bash
npm install @imehmetgenc/mysql.js
```

## Kullanım

Modülün kullanımı aşağıdaki gibi adımları içerir:

1. **Modülü İçe Aktarın:**

```javascript
 const { Mysql } = require("./mysqlClient.js");

 const mysql = new Mysql({
   host: "localhost",
   user: "your_user",
   password: "your_password",
   database: "your_database",
 });
```

2. **Sorgu Yapma:**

```javascript
 mysql.query("SELECT * FROM users WHERE id = ?", [1])
   .then((results) => {
     console.log("Sorgu Sonuçları:", results);
   })
   .catch((error) => {
     console.error("Sorgu Hatası:", error);
   });
```

3. **Temel MySQL İşlemleri:**

```javascript
 // Veritabanından bir kullanıcıyı seçme
 mysql.selectOne("users", "*", "id = 1")
   .then((user) => {
     console.log("Kullanıcı:", user);
   })
   .catch((error) => {
     console.error("Hata:", error);
   });

 // Yeni bir kullanıcı ekleme
 const newUser = { username: "new_user", email: "new_user@example.com" };
 mysql.insert("users", newUser)
   .then((result) => {
     console.log("Ekleme Sonucu:", result);
   })
   .catch((error) => {
     console.error("Hata:", error);
   });

 // Diğer işlemler için benzer adımlar izlenir.
```

4. **Bağlantı Havuzunu Kapatma:**

```javascript
  mysql.closePool();
```

Bu örnekler, MySQL veritabanı ile etkileşimde bulunmak için bu modülü nasıl kullanacağınızı gösterir.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE dosyasına](LICENSE) göz atabilirsiniz.
