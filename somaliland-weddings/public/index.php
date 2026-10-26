<?php
/**
 * Somaliland Weddings & Events - Front Controller
 * Target: Hostinger Shared Hosting (PHP 8.2+)
 * Powered by M2 Creative & Consulting
 */

declare(strict_types=1);

// Autoload classes
spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $baseDir = __DIR__ . '/../app/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relativeClass = substr($class, $len);
    $file = $baseDir . str_replace('\\', '/', $relativeClass) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

use App\Core\Router;
use App\Core\View;

$router = new Router();

// Public routes
$router->get('/', function () {
    View::render('home', [
        'title' => 'Suuqa Aroosyada & Munaasabadaha Hargeysa',
    ]);
});

$router->get('/providers', function () {
    View::render('home', [
        'title' => 'Shirkadaha La Xaqiijiyay ee Hargeysa (Verified Providers)',
    ]);
});

$router->get('/packages', function () {
    View::render('home', [
        'title' => 'Barbardhig Xirmooyinka Arooska (Packages)',
    ]);
});

$router->get('/plan', function () {
    View::render('home', [
        'title' => 'Qorshaynta Arooska & Miisaaniyadda (Planner)',
    ]);
});

$router->get('/resources', function () {
    View::render('home', [
        'title' => 'Maktabadda Kheyraadka & Foomamka (Templates)',
    ]);
});

$router->get('/market-insights', function () {
    View::render('home', [
        'title' => 'Xogta & Tirakoobka Suuqa Aroosyada ee Hargeysa',
    ]);
});

// Dispatch request
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = $_SERVER['REQUEST_URI'] ?? '/';

$router->dispatch($method, $uri);
