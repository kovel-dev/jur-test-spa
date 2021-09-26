# Installation

-   Installing all Composer & NPM dependencies.

```bash
composer install && npm install
```

-   Copy .env.example to .env
-   Generate app key

```bash
php artisan key:generate
```

-   Run database migration

```bash
php artisan migrate:fresh
```

-   Generate JWT secret

```bash
php artisan jwt:secret
```

-   Compiling Assets

```bash
npm run dev
```

-   Boot up a server

```bash
php artisan serve
```
