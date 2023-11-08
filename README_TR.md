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
const { Mysql } = require("@imehmetgenc/mysql.js");

const mysql = new Mysql({
 host: "localhost",
 user: "your_user",
 password: "your_password",
 database: "your_database",
});

//Event Kullanımı
mysql.on("ready", (db) => {
  console.log("I'm ready");
});
mysql.on("error", (error) => {
  console.log("Mysql Error: ", error);
});
mysql.on("disconnected", (db) => {
  console.log("Mysql disconnected.");
});
```

2. **Sorgu Yapma:**

```javascript
mysql.query("SELECT * FROM users WHERE ?", {'id': 1}) // "SELECT * FROM users WHERE id = 1"
 .then((results) => {
  console.log("Sorgu Sonuçları:", results);
 })
 .catch((error) => {
  console.error("Sorgu Hatası:", error);
 });
```

3. **Temel MySQL İşlemleri:**

```javascript
// Yeni bir kullanıcı ekleme
const newUser = { username: "Mehmet", email: "mehmet@muzik.red" };
mysql.insert("users", newUser)
 .then((result) => {
  console.log("Ekleme Sonucu:", result);
 })
 .catch((error) => {
  console.error("Hata:", error);
 });

// Veritabanından bir kullanıcıyı seçme
mysql.selectOne("users", "*", "id = 1")
.then((result) => {
 console.log("Kullanıcı:", result);
})
.catch((error) => {
 console.error("Hata:", error);
});

// Bir tablodaki tüm verileri seç
mysql.selectAll("user", "*")
 .then((result) => {
  console.log("Bütün Kullanıcılar:", result);
 })
 .catch((error) => {
  console.error("Hata:", error);
 });

// Bir tablodaki verileri güncelleme
const updatedData = { name: "Mehmet Genç" };
mysql.update("users", updatedData, "id = 1")
 .then((result) => {
  console.log("Güncelleme Sonucu:", result);
 })
 .catch((error) => {
  console.error("Hata:", error);
 });

// Verileri tablodan kaldırma
mysql.remove("users", "id = 1")
 .then((result) => {
  console.log("Silinme Sonucu:", result);
 })
 .catch((error) => {
  console.error("Hata:", error);
 });
```

4. **Bağlantı Havuzunu Kapatma:**

```javascript
 mysql.destroy();
```

Bu örnekler, MySQL veritabanı ile etkileşimde bulunmak için bu modülü nasıl kullanacağınızı gösterir.

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE dosyasına](LICENSE) göz atabilirsiniz.
