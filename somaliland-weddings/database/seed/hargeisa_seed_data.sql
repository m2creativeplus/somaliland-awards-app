-- =====================================================================
-- Somaliland Weddings & Events - Master Seed Data for Hargeisa Marketplace
-- Powered by M2 Creative & Consulting (Hargeisa, Republic of Somaliland)
-- =====================================================================

-- Default Administrator
INSERT INTO `slw_users` (`uuid`, `full_name`, `email`, `phone`, `password_hash`, `role`, `is_active`)
VALUES (
    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    'M2 Creative Administrator',
    'admin@m2creative.sl',
    '+252 63 4400111',
    -- password_hash for secure setup
    '$2y$12$e8Y6/51r5g81k9g7.3wD/eM2CreativeAdminSeedHashReplaceOnInstall',
    'admin',
    1
);

-- Seed Providers
INSERT INTO `slw_providers` (
    `slug`, `business_name_en`, `business_name_so`, `category`, `description_en`, `description_so`,
    `city`, `district`, `address`, `phone`, `whatsapp`, `email`, `service_areas`,
    `verification_status`, `last_verified_date`, `verified_by`, `rating`, `review_count`,
    `price_tier`, `starting_price_usd`, `is_featured`, `languages`, `portfolio_images`, `lead_response_time_hours`
) VALUES 
(
    'mansoor-grand-ballroom',
    'Mansoor Hotel Grand Ballroom',
    'Hoolka Weyn ee Mansoor Hotel',
    'venues',
    'Hargeisas premier luxury wedding venue located in Shaab area. Features high ceilings, climate control, VIP suites, and audiovisual rigging.',
    'Hoolka aroosyada ugu casrisan uguna weyn Hargeysa oo ku yaalla xaafadda Shaab. Waxaa ku jira qaboojiye, qolalka VIP-da, iyo nidaam casri ah.',
    'Hargeisa', 'Sha\'ab', 'Sha\'ab District, Airport Road, Hargeisa',
    '+252 63 4420000', '+252 63 4420000', 'events@mansoorhotel.sl',
    '["Hargeisa", "Berbera"]',
    'VERIFIED', '2026-09-15', 'SNPA & M2 Commerce Audit',
    4.90, 38, '$$$$', 1800, 1,
    '["Soomaali", "English", "Arabic"]',
    '["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"]',
    2.0
),
(
    'guryo-samo-studios',
    'Guryo-Samo Wedding Visuals',
    'Guryo-Samo Sawir & Muuqaal',
    'photography',
    'Award-winning wedding photography and 4K cinema crew based in 26 June District, Hargeisa. Specialized in Somali wedding traditions and couple portraits.',
    'Kooxda ugu sarreysa Hargeysa ee duubista filimada 4K iyo sawirrada aroosyada. Waxay ku xeel-dheeryihiin dhaqanka arooska Soomaalida.',
    'Hargeisa', '26 June', '26 June Main Road, Near National Library, Hargeisa',
    '+252 63 4012345', '+252 63 4012345', 'booking@guryosamovisuals.sl',
    '["Hargeisa", "Borama", "Berbera", "Burao"]',
    'VERIFIED', '2026-09-28', 'M2 Photography QA Lead',
    4.95, 52, '$$$', 750, 1,
    '["Soomaali", "English"]',
    '["https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80"]',
    1.0
),
(
    'xariir-decor-events',
    'Xariir Luxury Décor & Florals',
    'Xariir Naqshadda Masraxa & Ubaxa',
    'decor',
    'Hargeisas foremost bespoke wedding styling studio. Known for cascading fresh floral arches, custom royal thrones, and LED ambient stage lighting.',
    'Shirkadda ugu caansan Hargeysa ee naqshadaynta masraxyada aroosyada, ubaxyada dabiiciga ah, iyo kuraasta boqortooyada.',
    'Hargeisa', 'Ibrahim Koodbuur', 'Koodbuur Boulevard, Next to Somaliland Chamber of Commerce, Hargeisa',
    '+252 63 4789012', '+252 63 4789012', 'contact@xariirdecor.sl',
    '["Hargeisa", "Berbera"]',
    'VERIFIED', '2026-10-02', 'M2 Creative Merchant Review',
    4.88, 44, '$$$', 800, 1,
    '["Soomaali", "English"]',
    '["https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80"]',
    3.0
);

-- Seed Packages
INSERT INTO `slw_packages` (
    `provider_id`, `slug`, `title_en`, `title_so`, `category`, `price_type`, `price_usd`, `price_slsh`,
    `deliverables_en`, `deliverables_so`, `duration_coverage`, `guest_capacity_limit`,
    `deposit_requirement_percent`, `cancellation_policy_en`, `cancellation_policy_so`, `availability_status`
) VALUES 
(
    1, 'royal-evening-reception', 'Royal Evening Reception Package', 'Xidhmada Boqortooyada ee Habeenka',
    'venues', 'fixed', 2500, 21250000,
    '["Full hall access for 7 hours (17:00 - 24:00)", "Seating for 600 guests", "Bride & Groom VIP lounge", "Generator backup & security", "Lighting & PA system"]',
    '["Hoolka oo la isticmaalayo 7 saacadood", "Kuraas loogu talagalay 600 qof", "Qolka VIP-da ee arooska", "Matoor koronto iyo ilaalo", "Iftiinka iyo dhawaaqa"]',
    '7 Hours', 600, 30, 'Full deposit refundable up to 30 days prior.', 'Lacagta hormarka dib ayaa loo celinayaa 30 maalmood ka hor.', 'available'
),
(
    2, 'full-4k-cinema-drone', 'Full 4K Cinema & Drone Master Package', 'Xidhmada Filimka 4K & Duubista Drone-ka',
    'photography', 'fixed', 1200, 10200000,
    '["2 Photographers + 2 Videographers", "4K Drone aerial coverage", "5-min highlight + 90-min full documentary edit", "400+ retouched photos on custom USB", "Private cloud gallery"]',
    '["2 Sawir-qaade + 2 Muuqaal-duube", "Duubista diyaaradda yar (Drone) 4K", "Muuqaal 5-daqiiqo ah iyo filim 90-daqiiqo ah", "400+ sawir oo ku jira USB", "Kayd internet oo gaar ah"]',
    'Full Day', NULL, 35, 'Transferable to any rescheduled date within 6 months.', 'Waxaa loo wareejin karaa taariikh kale 6 bilood gudahood.', 'available'
);

-- Seed Market Observations
INSERT INTO `slw_market_observations` (
    `metric_key`, `title_en`, `title_so`, `metric_value`, `change_label_en`, `change_label_so`,
    `confidence`, `sample_size`, `reporting_period`, `source`, `methodology_en`, `methodology_so`
) VALUES 
(
    'verified_providers', 'Verified Hargeisa Service Providers', 'Shirkadaha La Xaqiijiyay ee Hargeysa',
    '48', '+12 verified this quarter', '+12 shirkadood rubacan',
    'VERIFIED', '48 Businesses Inspected', 'Q3 2026', 'M2 Physical Verification & Municipal Trade Registry',
    'Direct in-person physical premises inspection and commercial license review.',
    'Kormeer dhab ah oo lagu tagay xarumaha shirkadaha iyo hubinta shatiga ganacsiga.'
),
(
    'median_hall_price', 'Median Banquet Hall Booking Price', 'Celceliska Qiimaha Hoolalka Arooska',
    '$1,850', '+4.2% vs 2025 peak season', '+4.2% marka loo eego 2025',
    'HIGH-CONFIDENCE ESTIMATE', '72 Confirmed Hall Contracts', 'Jan - Sept 2026', 'Somaliland Weddings Platform Confirmed Inquiries & Hotel Audits',
    'Calculated median across confirmed booking records for prime evening events.',
    'Xisaabinta dhex-dhexaadka heshiisyada dhabta ah ee hoolalka habeenkii.'
);

-- Seed Global Site Settings
INSERT INTO `slw_site_settings` (`setting_key`, `setting_value`)
VALUES (
    'branding',
    JSON_OBJECT(
        'siteNameEn', 'Somaliland Weddings & Events',
        'siteNameSo', 'Aroosyada & Munaasabadaha Somaliland',
        'taglineEn', 'The Premier Wedding Marketplace & Operating Platform for Somaliland',
        'taglineSo', 'Suuqa Koowaad ee Qabanqaabada Aroosyada & Munaasabadaha Somaliland',
        'primaryColor', '#0f172a',
        'accentColor', '#d97706',
        'showPoweredByM2', true,
        'contactEmail', 'weddings@m2creative.sl',
        'contactPhone', '+252 63 4400111'
    )
);
