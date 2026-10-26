<?php
namespace App\Core;

class View {
    public static function render(string $view, array $data = []): void {
        extract($data);
        
        $viewFile = __DIR__ . '/../../resources/views/' . $view . '.php';
        $layoutFile = __DIR__ . '/../../resources/views/layout.php';

        if (!file_exists($viewFile)) {
            die("View [{$view}] not found.");
        }

        ob_start();
        require $viewFile;
        $content = ob_get_clean();

        if (file_exists($layoutFile)) {
            require $layoutFile;
        } else {
            echo $content;
        }
    }

    public static function e(?string $value): string {
        return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
    }
}
