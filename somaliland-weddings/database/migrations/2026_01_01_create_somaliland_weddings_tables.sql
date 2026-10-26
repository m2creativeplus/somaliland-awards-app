-- =====================================================================
-- Somaliland Weddings & Events - Master MySQL Schema Migration
-- Target Environment: Hostinger Shared Hosting (MySQL 8.0+ / MariaDB 10.4+)
-- Powered by M2 Creative & Consulting (Hargeisa, Republic of Somaliland)
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Users & RBAC
CREATE TABLE IF NOT EXISTS `slw_users` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `uuid` CHAR(36) NOT NULL UNIQUE,
    `full_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(191) NOT NULL UNIQUE,
    `phone` VARCHAR(50) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('customer', 'provider', 'planner', 'affiliate', 'editor', 'admin') NOT NULL DEFAULT 'customer',
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Providers
CREATE TABLE IF NOT EXISTS `slw_providers` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NULL,
    `slug` VARCHAR(191) NOT NULL UNIQUE,
    `business_name_en` VARCHAR(191) NOT NULL,
    `business_name_so` VARCHAR(191) NOT NULL,
    `category` ENUM('venues', 'photography', 'videography', 'decor', 'catering', 'bridal', 'planners', 'sound_lighting', 'traditional_music') NOT NULL,
    `description_en` TEXT NOT NULL,
    `description_so` TEXT NOT NULL,
    `city` VARCHAR(100) NOT NULL DEFAULT 'Hargeisa',
    `district` VARCHAR(100) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `whatsapp` VARCHAR(50) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `service_areas` JSON NOT NULL,
    `verification_status` ENUM('VERIFIED', 'PENDING', 'UNVERIFIED') NOT NULL DEFAULT 'PENDING',
    `last_verified_date` DATE NULL,
    `verified_by` VARCHAR(150) NULL,
    `rating` DECIMAL(3,2) NOT NULL DEFAULT 5.00,
    `review_count` INT UNSIGNED NOT NULL DEFAULT 0,
    `price_tier` ENUM('$', '$$', '$$$', '$$$$') NOT NULL DEFAULT '$$',
    `starting_price_usd` INT UNSIGNED NOT NULL DEFAULT 0,
    `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
    `languages` JSON NOT NULL,
    `portfolio_images` JSON NOT NULL,
    `lead_response_time_hours` DECIMAL(4,1) NOT NULL DEFAULT 2.0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `slw_users`(`id`) ON DELETE SET NULL,
    INDEX `idx_prov_category` (`category`),
    INDEX `idx_prov_city` (`city`),
    INDEX `idx_prov_verification` (`verification_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Packages
CREATE TABLE IF NOT EXISTS `slw_packages` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `provider_id` INT UNSIGNED NOT NULL,
    `slug` VARCHAR(191) NOT NULL UNIQUE,
    `title_en` VARCHAR(191) NOT NULL,
    `title_so` VARCHAR(191) NOT NULL,
    `category` VARCHAR(50) NOT NULL,
    `price_type` ENUM('fixed', 'starting_at', 'range', 'quotation_required') NOT NULL DEFAULT 'fixed',
    `price_usd` INT UNSIGNED NOT NULL,
    `price_slsh` BIGINT UNSIGNED NOT NULL,
    `deliverables_en` JSON NOT NULL,
    `deliverables_so` JSON NOT NULL,
    `duration_coverage` VARCHAR(100) NOT NULL,
    `guest_capacity_limit` INT UNSIGNED NULL,
    `travel_overtime_terms_en` TEXT NULL,
    `travel_overtime_terms_so` TEXT NULL,
    `deposit_requirement_percent` TINYINT UNSIGNED NOT NULL DEFAULT 30,
    `cancellation_policy_en` TEXT NULL,
    `cancellation_policy_so` TEXT NULL,
    `availability_status` ENUM('available', 'inquiry_required', 'booked_out') NOT NULL DEFAULT 'available',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`provider_id`) REFERENCES `slw_providers`(`id`) ON DELETE CASCADE,
    INDEX `idx_pkg_provider` (`provider_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Inquiries & Request-to-Book Workflow
CREATE TABLE IF NOT EXISTS `slw_inquiries` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `inquiry_code` VARCHAR(50) NOT NULL UNIQUE,
    `provider_id` INT UNSIGNED NOT NULL,
    `package_id` INT UNSIGNED NULL,
    `customer_name` VARCHAR(150) NOT NULL,
    `customer_email` VARCHAR(191) NOT NULL,
    `customer_phone` VARCHAR(50) NOT NULL,
    `event_type` VARCHAR(50) NOT NULL DEFAULT 'wedding',
    `event_date` DATE NOT NULL,
    `event_location` VARCHAR(191) NOT NULL,
    `estimated_guest_count` INT UNSIGNED NOT NULL DEFAULT 400,
    `custom_notes` TEXT NULL,
    `quoted_price_usd` INT UNSIGNED NULL,
    `quotation_version` INT UNSIGNED NOT NULL DEFAULT 1,
    `deposit_status` ENUM('unpaid', 'deposit_recorded', 'fully_paid') NOT NULL DEFAULT 'unpaid',
    `status` ENUM(
        'draft',
        'inquiry_submitted',
        'quotation_sent',
        'accepted',
        'pending_confirmation',
        'confirmed',
        'in_progress',
        'completed',
        'declined',
        'cancelled',
        'disputed'
    ) NOT NULL DEFAULT 'inquiry_submitted',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`provider_id`) REFERENCES `slw_providers`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`package_id`) REFERENCES `slw_packages`(`id`) ON DELETE SET NULL,
    INDEX `idx_inq_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Event Planning Workspaces
CREATE TABLE IF NOT EXISTS `slw_events` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NULL,
    `couple_names` VARCHAR(191) NOT NULL,
    `event_date` DATE NOT NULL,
    `city` VARCHAR(100) NOT NULL DEFAULT 'Hargeisa',
    `guest_count` INT UNSIGNED NOT NULL DEFAULT 450,
    `total_budget_usd` INT UNSIGNED NOT NULL DEFAULT 8500,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `slw_users`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `slw_event_tasks` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `event_id` INT UNSIGNED NOT NULL,
    `title_en` VARCHAR(191) NOT NULL,
    `title_so` VARCHAR(191) NOT NULL,
    `category` VARCHAR(50) NOT NULL,
    `due_date` DATE NOT NULL,
    `assigned_to` VARCHAR(100) NOT NULL,
    `is_completed` TINYINT(1) NOT NULL DEFAULT 0,
    FOREIGN KEY (`event_id`) REFERENCES `slw_events`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `slw_event_expenses` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `event_id` INT UNSIGNED NOT NULL,
    `category_en` VARCHAR(100) NOT NULL,
    `category_so` VARCHAR(100) NOT NULL,
    `allocated_usd` INT UNSIGNED NOT NULL,
    `actual_usd` INT UNSIGNED NOT NULL,
    `is_paid` TINYINT(1) NOT NULL DEFAULT 0,
    `vendor_name` VARCHAR(150) NULL,
    FOREIGN KEY (`event_id`) REFERENCES `slw_events`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Public Events & Expos
CREATE TABLE IF NOT EXISTS `slw_public_events` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(191) NOT NULL UNIQUE,
    `title_en` VARCHAR(191) NOT NULL,
    `title_so` VARCHAR(191) NOT NULL,
    `organizer` VARCHAR(150) NOT NULL,
    `event_date` DATE NOT NULL,
    `time_label` VARCHAR(100) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `venue` VARCHAR(191) NOT NULL,
    `description_en` TEXT NOT NULL,
    `description_so` TEXT NOT NULL,
    `poster_url` VARCHAR(255) NOT NULL,
    `ticket_link` VARCHAR(255) NULL,
    `is_approved` TINYINT(1) NOT NULL DEFAULT 1,
    `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Resource & Template Library
CREATE TABLE IF NOT EXISTS `slw_resource_templates` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `slug` VARCHAR(191) NOT NULL UNIQUE,
    `title_en` VARCHAR(191) NOT NULL,
    `title_so` VARCHAR(191) NOT NULL,
    `category` VARCHAR(50) NOT NULL,
    `description_en` TEXT NOT NULL,
    `description_so` TEXT NOT NULL,
    `format` VARCHAR(20) NOT NULL,
    `download_count` INT UNSIGNED NOT NULL DEFAULT 0,
    `version` VARCHAR(20) NOT NULL DEFAULT '1.0',
    `last_updated` DATE NOT NULL,
    `license` VARCHAR(100) NOT NULL,
    `file_size` VARCHAR(50) NOT NULL,
    `preview_points_en` JSON NOT NULL,
    `preview_points_so` JSON NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. Market Intelligence Observations
CREATE TABLE IF NOT EXISTS `slw_market_observations` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `metric_key` VARCHAR(100) NOT NULL UNIQUE,
    `title_en` VARCHAR(191) NOT NULL,
    `title_so` VARCHAR(191) NOT NULL,
    `metric_value` VARCHAR(100) NOT NULL,
    `change_label_en` VARCHAR(100) NOT NULL,
    `change_label_so` VARCHAR(100) NOT NULL,
    `confidence` ENUM('VERIFIED', 'HIGH-CONFIDENCE ESTIMATE', 'LOW-CONFIDENCE ESTIMATE', 'UNVERIFIED') NOT NULL,
    `sample_size` VARCHAR(100) NOT NULL,
    `reporting_period` VARCHAR(100) NOT NULL,
    `source` VARCHAR(191) NOT NULL,
    `methodology_en` TEXT NOT NULL,
    `methodology_so` TEXT NOT NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. Site Settings & Visual Control Plane
CREATE TABLE IF NOT EXISTS `slw_site_settings` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `setting_key` VARCHAR(100) NOT NULL UNIQUE,
    `setting_value` JSON NOT NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. Audit Logs
CREATE TABLE IF NOT EXISTS `slw_audit_logs` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NULL,
    `action` VARCHAR(100) NOT NULL,
    `entity_type` VARCHAR(50) NOT NULL,
    `entity_id` VARCHAR(50) NOT NULL,
    `details` JSON NULL,
    `ip_address` VARCHAR(45) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. Affiliate Referral Links
CREATE TABLE IF NOT EXISTS `slw_referral_links` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NULL,
    `tag` VARCHAR(100) NOT NULL UNIQUE,
    `target_url` VARCHAR(255) NOT NULL,
    `click_count` INT UNSIGNED NOT NULL DEFAULT 0,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `slw_users`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. Referral Events (Clicks & Attribution)
CREATE TABLE IF NOT EXISTS `slw_referral_events` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `referral_link_id` INT UNSIGNED NOT NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_agent` VARCHAR(255) NULL,
    `event_type` ENUM('click', 'inquiry_created', 'booking_confirmed') NOT NULL DEFAULT 'click',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`referral_link_id`) REFERENCES `slw_referral_links`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. Commission Ledger & Disbursals
CREATE TABLE IF NOT EXISTS `slw_commission_ledger` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `referral_link_id` INT UNSIGNED NOT NULL,
    `inquiry_id` INT UNSIGNED NOT NULL,
    `provider_id` INT UNSIGNED NOT NULL,
    `booking_value_usd` INT UNSIGNED NOT NULL,
    `commission_rate_percent` DECIMAL(4,2) NOT NULL DEFAULT 5.00,
    `commission_usd` INT UNSIGNED NOT NULL,
    `commission_slsh` BIGINT UNSIGNED NOT NULL,
    `payout_status` ENUM('PENDING_CLEARANCE', 'ESCROW_CLEARED', 'APPROVED_PAYOUT', 'DISBURSED', 'CANCELLED') NOT NULL DEFAULT 'PENDING_CLEARANCE',
    `payout_method` ENUM('ZAAD', 'EDAHAB', 'BANK_TRANSFER') NOT NULL DEFAULT 'ZAAD',
    `payout_reference` VARCHAR(100) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`referral_link_id`) REFERENCES `slw_referral_links`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`inquiry_id`) REFERENCES `slw_inquiries`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`provider_id`) REFERENCES `slw_providers`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
