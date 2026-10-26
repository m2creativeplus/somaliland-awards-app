<!DOCTYPE html>
<html lang="so">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= isset($title) ? htmlspecialchars($title) . ' — ' : '' ?>Somaliland Weddings & Events | Powered by M2 Creative</title>
    <meta name="description" content="The premier wedding marketplace and operating platform for Somaliland. Discover banquet halls, 4K cinema photography, stage decor, and catering in Hargeisa.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #0f172a;
            --accent: #d97706;
            --accent-hover: #b45309;
            --emerald: #059669;
            --bg: #ffffff;
            --surface: #f8fafc;
            --border: #e2e8f0;
            --text: #0f172a;
            --muted: #64748b;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
        .sl-flag-bar { height: 4px; width: 100%; background: linear-gradient(90deg, #1B5E20 33%, #FFFFFF 33%, #FFFFFF 66%, #C62828 66%); }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 1.25rem; }
        header { background: #ffffff; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 50; }
        .nav-wrap { display: flex; align-items: center; justify-content: space-between; height: 68px; }
        .brand { display: flex; align-items: center; gap: 0.75rem; text-decoration: none; color: inherit; }
        .brand-badge { width: 36px; height: 36px; border-radius: 8px; background: linear-gradient(135deg, var(--accent), #b45309); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 18px; }
        .brand-text h1 { font-size: 15px; font-weight: 800; line-height: 1.1; color: var(--primary); }
        .brand-text span { font-size: 10px; font-weight: 700; color: var(--accent); letter-spacing: 0.05em; text-transform: uppercase; }
        nav { display: flex; align-items: center; gap: 1rem; }
        nav a { font-size: 13px; font-weight: 600; color: var(--muted); text-decoration: none; padding: 6px 12px; border-radius: 6px; transition: color 0.2s; }
        nav a:hover { color: var(--primary); background: var(--surface); }
        .btn { display: inline-flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; padding: 8px 16px; border-radius: 6px; text-decoration: none; cursor: pointer; transition: all 0.2s; border: 1px solid transparent; }
        .btn-primary { background: var(--accent); color: #ffffff; }
        .btn-primary:hover { background: var(--accent-hover); }
        .btn-outline { border-color: var(--border); color: var(--primary); background: transparent; }
        .btn-outline:hover { background: var(--surface); }
        footer { background: #090d16; color: #94a3b8; padding: 60px 0 30px; border-top: 1px solid #1e293b; margin-top: 80px; }
        .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 40px; }
        .footer-col h4 { color: #ffffff; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px; }
        .footer-col ul { list-style: none; }
        .footer-col li { margin-bottom: 10px; font-size: 13px; }
        .footer-col a { color: #94a3b8; text-decoration: none; }
        .footer-col a:hover { color: var(--accent); }
        .footer-bottom { margin-top: 40px; padding-top: 24px; border-top: 1px solid #1e293b; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; font-size: 12px; }
        .badge-verified { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; padding: 2px 8px; border-radius: 9999px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; }
        @media (max-width: 768px) { nav { display: none; } }
    </style>
</head>
<body>
    <div class="sl-flag-bar"></div>
    <header>
        <div class="container nav-wrap">
            <a href="/" class="brand">
                <div class="brand-badge">💍</div>
                <div class="brand-text">
                    <h1>Somaliland Weddings</h1>
                    <span>Powered by M2 Creative</span>
                </div>
            </a>
            <nav>
                <a href="/">Guriga (Home)</a>
                <a href="/providers">Shirkadaha (Providers)</a>
                <a href="/packages">Xirmooyinka (Packages)</a>
                <a href="/plan">Qorshaynta (Planner)</a>
                <a href="/resources">Kheyraadka (Templates)</a>
                <a href="/market-insights">Xogta Suuqa (Insights)</a>
            </nav>
            <div style="display: flex; gap: 8px;">
                <a href="/admin" class="btn btn-outline" style="font-size: 12px;">Admin Suite</a>
                <a href="/plan" class="btn btn-primary" style="font-size: 12px;">Qorshee Aroos</a>
            </div>
        </div>
    </header>

    <main>
        <?= $content ?>
    </main>

    <footer>
        <div class="container">
            <div class="footer-grid">
                <div class="footer-col" style="grid-column: span 1.5;">
                    <h3 style="color:#ffffff; font-size: 16px; margin-bottom: 12px; font-weight: 800;">Somaliland Weddings & Events</h3>
                    <p style="font-size: 13px; line-height: 1.6; margin-bottom: 16px;">
                        Madal casri ah oo ku shaqaynaysa nidaamka M2 Creative, looguna talagalay horumarinta dhaqaalaha iyo adeegyada aroosyada Somaliland.
                    </p>
                    <div class="badge-verified">✓ 100% In-Person Physical Provider Audits</div>
                </div>
                <div class="footer-col">
                    <h4>Marketplace</h4>
                    <ul>
                        <li><a href="/providers">Venues & Ballrooms</a></li>
                        <li><a href="/providers">4K Cinema Visuals</a></li>
                        <li><a href="/providers">Luxury Stage Décor</a></li>
                        <li><a href="/packages">Compare Packages</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Planning & Resources</h4>
                    <ul>
                        <li><a href="/plan">Wedding Budget Calculator</a></li>
                        <li><a href="/resources">Photography Shot List</a></li>
                        <li><a href="/resources">Run Sheet & Timelines</a></li>
                        <li><a href="/market-insights">Hargeisa Market Data</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Governance</h4>
                    <ul>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                        <li><a href="/guidelines">Merchant Standards</a></li>
                        <li><a href="/admin">Visual Control Plane</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; <?= date('Y') ?> M2 Creative & Consulting. All rights reserved.</p>
                <p style="color: var(--accent); font-weight: 700;">Powered by M2 Creative & Consulting</p>
            </div>
        </div>
    </footer>
</body>
</html>
