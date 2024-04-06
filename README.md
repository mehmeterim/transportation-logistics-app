## Description

Proje: UberFreight Platformu Backend
Geliştirme
Açıklama:
Şu anda, bir UberFreight platformunda çalışıyorsunuz ve yeni bir özellik eklemek istiyorsunuz.
Müşteriler artık favori taşıyıcılarını takip edebilecek ve bu taşıyıcılarla ilgili indirim veya
promosyonları alabilecekler.
Görev:
Bu özelliği eklemek için backend tarafinda yapmanız gerekenleri aşağıda bulabilirsin:
Veritabanı Şeması ve Modelleri:
• Favori taşıyıcıların saklanması için veritabanı şemasını ve ilgili modelleri tasarlayın.
Hangi bilgiler saklanacak ve nasıl ilişkilendirilecek?
API Endpoints:
• Favori taşıyıcı ekleme, kaldırma ve listeleme işlemlerini gerçekleştirecek
API endpoint'lerini tasarlayın.
• Bu endpoint'ler hangi HTTP metotlarını kullanacak ve hangi veri yapılarıyla iletişim
sağlayacak?
Auth ve Güvenlik:
• Bu özellik için gerekli olan yetkilendirme ve kimlik doğrulama adımlarını belirleyin.
Kullanıcılar sadece kendi favori ürünlerini yönetebilmelidir.
Testler:
• Yazdığınız kodları test etmek için nasıl bir strateji izleyeceksiniz?
• Hangi test senaryolarını düşünüyorsunuz?
Performans ve Ölçeklenebilirlik:
• Sisteminizdeki bu yeni özelliğin performansını ve ölçeklenebilirliğini nasıl optimize
edersiniz?
Dikkat Edilmesi Gereken Noktalar:
• TypeScript ve Nest.js'in kullanımı ve uygunluğu.
• Veritabanı tasarımı ve etkili sorgu yapıları. • RESTful API tasarımı ve güvenlik önlemleri.
• Performans ve ölçeklenebilirlik konularına verilen önem.
• Teststratejisi ve kod kalitesi

## Installation

```bash
$ npm install
```

## Running the app

```bash
# developmentv
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## End Points

### Swagger

- URL : GET - /swagger

### Register

- URL : POST - /users/register
- Payload : {
  "fullName": "test",
  "email": "test@test.com",
  "password": "123"
  }

### Login

- URL : POST - /users/login
- Payload : {
  "email": "test@test.com",
  "password": "123"
  }

### Favorite List

- URL : Get - /favorites

### Add Favorite

- URL : POST - /favorites
- Payload : {
  "transporterId": "66105a4c68e712fc59b7ee3d"
  }

### Delete Favorite

- URL : POST - /favorites/:id

## NOTES

- It was used for user authentication with JWT.
- It was used rate limit (60 request in 60 seconds).
- It was used memory caching in favorites endpoints.
- It was wrote test for only user controller and service.
- It was used mongodb for database.
