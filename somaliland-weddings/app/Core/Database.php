<?php
namespace App\Core;

use PDO;
use Exception;

class Database {
    private static ?PDO $instance = null;

    public static function getConnection(): PDO {
        if (self::$instance === null) {
            $config = require __DIR__ . '/../../config/database.php';
            
            $dsn = sprintf(
                '%s:host=%s;port=%s;dbname=%s;charset=%s',
                $config['driver'],
                $config['host'],
                $config['port'],
                $config['database'],
                $config['charset']
            );

            try {
                self::$instance = new PDO(
                    $dsn,
                    $config['username'],
                    $config['password'],
                    $config['options']
                );
            } catch (Exception $e) {
                // In production, log without leaking database password
                error_log('Database Connection Failed: ' . $e->getMessage());
                die('Database connection error. Please verify Hostinger configuration.');
            }
        }
        return self::$instance;
    }
}
