FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libzip-dev \
    zip \
    && docker-php-ext-install zip intl pdo pdo_mysql opcache

COPY ./conf.d/opcache.ini /usr/local/etc/php/conf.d/opcache.ini
COPY php.ini /usr/local/etc/php/

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/symfony

# Tworzenie katalogu uploadów i nadanie praw
RUN mkdir -p /var/www/symfony/public/uploads/products \
    && chown -R www-data:www-data /var/www/symfony/public/uploads/products \
    && chmod -R 775 /var/www/symfony/public/uploads/products

CMD ["php-fpm"]
