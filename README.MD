# Dokumentacja API CPUtopia

## 🚀 Przygotowanie i uruchomienie środowiska
1. **Sklonuj repozytorium**
   ```bash
   git clone https://github.com/Inexpli/CPUtopia.git
   cd CPUtopia/backend
   ```
2. **Skopiuj i skonfiguruj plik środowiskowy**
   ```bash
   cp .env .env.local
   # Edytuj .env.local: ustaw DATABASE_URL, SECRET
   ```
3. **Zainstaluj zależności PHP**
   ```bash
   composer install
   ```
4. **Zbuduj i uruchom kontenery Docker** (jeśli używasz Docker Compose):
   ```bash
   docker-compose up -d
   docker-compose exec php php bin/console doctrine:database:create
   docker-compose exec php php bin/console doctrine:migrations:migrate
   ```
5. **Sprawdź działanie**
   - Backend dostępny pod: `http://localhost:8080`
   - Testuj endpointy zgodnie z dokumentacją poniżej.

---

# Dokumentacja API CPUtopia

Poniżej znajduje się pełna dokumentacja endpointów dostępnych w backendzie aplikacji CPUtopia. Tester powinien korzystać z poniższych informacji, aby poprawnie wykonywać żądania i oceniać odpowiedzi.

---

## 🛒 CART (Koszyk)

### 1. Dodaj produkt do koszyka
**POST** `/api/cart/add/{id}`

- **Opis**: Dodaje produkt o podanym ID do koszyka (sesyjnego lub użytkownika).
- **Parametry URL**:
  - `id` (integer) – ID produktu.
- **Body (JSON)** *(opcjonalnie)*:
  ```json
  {
    "quantity": 2  // liczba sztuk, domyślnie 1
  }
  ```
- **Odpowiedź**:
  - `200 OK`
    ```json
    { "message": "Product added to cart" }
    ```

### 2. Wyświetl zawartość koszyka
**GET** `/api/cart`

- **Opis**: Zwraca listę produktów znajdujących się w koszyku.
- **Odpowiedź**:
  - `200 OK` – tablica pozycji z informacjami:
    ```json
    [
      {
        "product": { /* dane produktu */ },
        "quantity": 2,
        "total": 199.98
      },
      ...
    ]
    ```

### 3. Usuń produkt z koszyka
**POST** `/api/cart/remove/{id}`

- **Opis**: Usuwa produkt o danym ID z koszyka.
- **Parametry URL**:
  - `id` (integer) – ID produktu.
- **Odpowiedź**:
  - `200 OK`  
    ```json
    { "message": "Product removed from cart" }
    ```
  - `404 Not Found`  
    ```json
    { "error": "Product not found in cart" }
    ```

### 4. Wyczyść koszyk
**POST** `/api/cart/clear`

- **Opis**: Usuwa wszystkie produkty z koszyka.
- **Odpowiedź**:
  - `200 OK`
    ```json
    { "message": "Cart cleared" }
    ```

---

## 🏷️ CATEGORY (Kategorie)

Wszystkie operacje CRUD na kategoriach wymagają roli **ADMIN**.

### 1. Lista kategorii
**GET** `/api/category`

- **Opis**: Pobiera wszystkie dostępne kategorie.
- **Odpowiedź**:
  - `200 OK` – tablica obiektów kategorii.

### 2. Dodaj kategorię
**POST** `/api/category/add`

- **Uprawnienia**: `ROLE_ADMIN`
- **Body (JSON)**:
  ```json
  {
    "name": "Nazwa kategorii"
  }
  ```
- **Odpowiedź**:
  - `201 Created`  
    ```json
    { "message": "Category added successfully" }
    ```
  - `400 Bad Request` – walidacja lub niepoprawny JSON

### 3. Edytuj kategorię
**PUT / PATCH** `/api/category/{id}`

- **Uprawnienia**: `ROLE_ADMIN`
- **Parametry URL**:
  - `id` (integer) – ID kategorii.
- **Body (JSON)**: dowolne z pól, np.:
  ```json
  { "name": "Nowa nazwa" }
  ```
- **Odpowiedź**:
  - `200 OK`  
    ```json
    { "message": "Category updated successfully" }
    ```
  - `404 Not Found` / `400 Bad Request`

### 4. Usuń kategorię
**DELETE** `/api/category/{id}`

- **Uprawnienia**: `ROLE_ADMIN`
- **Parametry URL**:
  - `id` (integer)
- **Odpowiedź**:
  - `200 OK`  
    ```json
    { "message": "Category deleted successfully" }
    ```
  - `404 Not Found`

---

## 📦 PRODUCT (Produkty)

Operacje modyfikacji (`add`, `edit`, `delete`) wymagają roli **ADMIN**.

### 1. Lista produktów
**GET** `/api/product`

- **Opis**: Pobiera wszystkie produkty.
- **Odpowiedź**:
  - `200 OK` – tablica produktów.

### 2. Szczegóły produktu
**GET** `/api/product/{id}`

- **Parametry URL**:
  - `id` (integer)
- **Odpowiedź**:
  - `200 OK` – obiekt produktu
  - `404 Not Found`

### 3. Dodaj produkt
**POST** `/api/product/add`

- **Uprawnienia**: `ROLE_ADMIN`
- **Body (JSON)**:
  ```json
  {
    "name": "Laptop",
    "description": "Opis",
    "price": "1550.60",
    "stock": 10,
    "category_id": 1,
    "image": file
  }
  ```
- **Odpowiedź**:
  - `201 Created`  
    ```json
    { "message": "Product added successfully" }
    ```
  - `400 Bad Request`

### 4. Edytuj produkt
**PUT / PATCH** `/api/product/{id}`

- **Uprawnienia**: `ROLE_ADMIN`
- **Parametry URL**:
  - `id` (integer)
- **Body (JSON)**: wszystkie pola lub ich podzbiór
- **Odpowiedź**:
  - `200 OK`  
    ```json
    { "message": "Product updated successfully" }
    ```
  - `404 Not Found` / `400 Bad Request`

### 5. Usuń produkt
**DELETE** `/api/product/{id}`

- **Uprawnienia**: `ROLE_ADMIN`
- **Parametry URL**:
  - `id` (integer)
- **Odpowiedź**:
  - `200 OK`  
    ```json
    { "message": "Product deleted successfully" }
    ```
  - `404 Not Found`

---

## 📄 ORDER (Zamówienia)

### 1. Lista zamówień użytkownika
**GET** `/api/order/`

- **Opis**: Pobiera historię zamówień zalogowanego użytkownika.
- **Odpowiedź**:
  - `200 OK` – tablica zamówień

### 2. Utwórz zamówienie
**POST** `/api/order/create`

- **Opis**: Tworzy zamówienie na podstawie aktualnego koszyka.
- **Odpowiedź**:
  - `200 OK` – obiekt nowego zamówienia
  - `400 Bad Request` – np. pusty koszyk

---

## 📋 ORDER ITEMS (Pozycje zamówienia)

### 1. Lista pozycji zamówień
**GET** `/api/orderItem`

- **Uprawnienia**: `ROLE_ADMIN`
- **Opis**: Zwraca wszystkie pozycje zamówień w systemie.
- **Odpowiedź**:
  - `200 OK` – tablica obiektów `OrderItem`

---

## 👤 USER (Użytkownicy)

### 1. Rejestracja
**POST** `/api/user/register`

- **Body (JSON)**:
  ```json
  {
    "email": "jan@kowalski.pl",
    "password": "haslo123"
  }
  ```
- **Odpowiedź**:
  - `201 Created`
  - `400 Bad Request`

### 2. Logowanie
**POST** `/api/user/login`

- **Body (JSON)**:
  ```json
  {
    "email": "jan@kowalski.pl",
    "password": "haslo123"
  }
  ```
- **Odpowiedź**:
  - `200 OK` – komunikat o sukcesie
  - `400/401` – niepoprawne dane

### 3. Aktualnie zalogowany użytkownik
**GET** `/api/user/me`

- **Opis**: Zwraca dane bieżącego użytkownika.
- **Odpowiedź**:
  - `200 OK`
  - `401 Unauthorized`

### 4. Lista użytkowników
**GET** `/api/user/`

- **Uprawnienia**: `ROLE_ADMIN`
- **Opis**: Zwraca wszystkich użytkowników.
- **Odpowiedź**:
  - `200 OK`

### 5. Promuj na admina
**PATCH** `/api/user/promote/{id}`

- **Uprawnienia**: `ROLE_ADMIN`
- **Parametry URL**:
  - `id` (integer)
- **Odpowiedź**:
  - `200 OK`
  - `404 Not Found`

---

> **Uwaga**: Wszystkie żądania wymagają nagłówka `Content-Type: application/json`.

