<?php
/**
 * Somaliland Weddings & Events - Database Configuration
 * Hostinger Shared Hosting (PHP 8.2+ / MySQL 8.0 / MariaDB)
 * Powered by M2 Creative & Consulting
 */

return [
    'driver'    => getenv('DB_DRIVER') ?: 'mysql',
    'host'      => getenv('DB_HOST') ?: '127.0.0.1',
    'port'      => getenv('DB_PORT') ?: '3306',
    'database'  => getenv('DB_NAME') ?: 'u123456789_weddings',
    'username'  => getenv('DB_USER') ?: 'u123456789_m2user',
    'password'  => getenv('DB_PASS') ?: '',
    'charset'   => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'prefix'    => 'slw_',
    'options'   => [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]
];
