import React from 'react'

export const Tounament = () => {
  return (
    <>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cricket Tournaments - Domestic Listings</title>
    <style
      dangerouslySetInnerHTML={{
        __html:
          '\n        * {\n            margin: 0;\n            padding: 0;\n            box-sizing: border-box;\n            font-family: Arial, sans-serif;\n        }\n\n        body {\n            background-color: #f5f5f5;\n            padding: 20px;\n            color: #333;\n        }\n\n        .container {\n            display: flex;\n            max-width: 1200px;\n            margin: 0 auto;\n            gap: 20px;\n        }\n\n        /* Left sidebar styles */\n        .filters {\n            width: 25%;\n            background-color: white;\n            border-radius: 5px;\n            padding: 15px;\n            box-shadow: 0 1px 3px rgba(0,0,0,0.1);\n        }\n\n        .filter-section {\n            margin-bottom: 25px;\n        }\n\n        .filter-section h2 {\n            color: #1a3048;\n            font-size: 18px;\n            margin-bottom: 15px;\n            font-weight: 600;\n        }\n\n        .filter-option {\n            margin-bottom: 10px;\n            display: flex;\n            align-items: center;\n        }\n\n        .filter-option input[type="radio"] {\n            margin-right: 10px;\n            width: 18px;\n            height: 18px;\n            accent-color: #0066cc;\n        }\n\n        .filter-option label {\n            font-size: 15px;\n            cursor: pointer;\n        }\n\n        /* Main content styles */\n        .tournaments {\n            width: 75%;\n        }\n\n        .tournaments-header {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n            margin-bottom: 20px;\n        }\n\n        .tournaments-header h1 {\n            color: #666;\n            font-size: 24px;\n            font-weight: normal;\n        }\n\n        .location-link {\n            color: #cc3333;\n            text-decoration: none;\n            font-weight: bold;\n        }\n\n        /* Tournament cards grid */\n        .tournament-grid {\n            display: grid;\n            grid-template-columns: repeat(2, 1fr);\n            gap: 15px;\n        }\n\n        .tournament-card {\n            background-color: white;\n            border-radius: 5px;\n            overflow: hidden;\n            box-shadow: 0 1px 3px rgba(0,0,0,0.1);\n            position: relative;\n            display: flex;\n            border: 1px solid #eee;\n            cursor: pointer;\n            transition: transform 0.2s, box-shadow 0.2s;\n        }\n\n        .tournament-card:hover {\n            transform: translateY(-3px);\n            box-shadow: 0 4px 8px rgba(0,0,0,0.1);\n        }\n\n        .tournament-card a {\n            display: flex;\n            width: 100%;\n            text-decoration: none;\n            color: inherit;\n        }\n\n        .premium-badge {\n            position: absolute;\n            top: 10px;\n            right: 10px;\n            background-color: #f9a61a;\n            color: white;\n            padding: 3px 8px;\n            border-radius: 3px;\n            font-size: 12px;\n            font-weight: bold;\n            z-index: 1;\n        }\n\n        .tournament-image {\n            width: 100px;\n            height: 100px;\n            padding: 10px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n\n        .tournament-image img {\n            max-width: 100%;\n            max-height: 100%;\n            object-fit: contain;\n        }\n\n        .tournament-details {\n            flex: 1;\n            padding: 15px 15px 15px 5px;\n            position: relative;\n        }\n\n        .ongoing-badge {\n            display: inline-block;\n            background-color: #b63030;\n            color: white;\n            padding: 3px 8px;\n            border-radius: 3px;\n            font-size: 11px;\n            font-weight: bold;\n            margin-bottom: 5px;\n        }\n\n        .tournament-title {\n            font-size: 14px;\n            margin-bottom: 5px;\n            color: #1a3048;\n            font-weight: bold;\n        }\n\n        .tournament-date {\n            color: #666;\n            font-size: 13px;\n            margin-bottom: 3px;\n        }\n\n        .tournament-location {\n            color: #666;\n            font-size: 13px;\n        }\n\n        /* View Scoreboard overlay on hover */\n        .view-scoreboard {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            background-color: rgba(0, 0, 0, 0.7);\n            color: white;\n            display: flex;\n            justify-content: center;\n            align-items: center;\n            opacity: 0;\n            transition: opacity 0.3s;\n            font-weight: bold;\n            z-index: 2;\n        }\n\n        .tournament-card:hover .view-scoreboard {\n            opacity: 1;\n        }\n\n        /* Responsive design */\n        @media (max-width: 768px) {\n            .container {\n                flex-direction: column;\n            }\n\n            .filters, .tournaments {\n                width: 100%;\n            }\n\n            .tournament-grid {\n                grid-template-columns: 1fr;\n            }\n        }\n    '
      }}
    />
    <div className="container">
      {/* Left sidebar with filters */}
      <div className="filters">
        <div className="filter-section">
          <h2>Status</h2>
          <div className="filter-option">
            <input type="radio" id="status-all" name="status" defaultChecked="" />
            <label htmlFor="status-all">All</label>
          </div>
          <div className="filter-option">
            <input type="radio" id="status-ongoing" name="status" />
            <label htmlFor="status-ongoing">Ongoing</label>
          </div>
          <div className="filter-option">
            <input type="radio" id="status-upcoming" name="status" />
            <label htmlFor="status-upcoming">Upcoming</label>
          </div>
          <div className="filter-option">
            <input type="radio" id="status-past" name="status" />
            <label htmlFor="status-past">Past</label>
          </div>
        </div>
        <div className="filter-section">
          <h2>Ball Type</h2>
          <div className="filter-option">
            <input type="radio" id="ball-leather" name="ball-type" />
            <label htmlFor="ball-leather">Leather</label>
          </div>
          <div className="filter-option">
            <input type="radio" id="ball-tennis" name="ball-type" />
            <label htmlFor="ball-tennis">Tennis</label>
          </div>
        </div>
        <div className="filter-section">
          <h2>Category</h2>
          <div className="filter-option">
            <input type="radio" id="category-open" name="category" />
            <label htmlFor="category-open">Open</label>
          </div>
          <div className="filter-option">
            <input type="radio" id="category-corporate" name="category" />
            <label htmlFor="category-corporate">Corporate</label>
          </div>
          <div className="filter-option">
            <input type="radio" id="category-community" name="category" />
            <label htmlFor="category-community">Community</label>
          </div>
          <div className="filter-option">
            <input type="radio" id="category-school" name="category" />
            <label htmlFor="category-school">School</label>
          </div>
          <div className="filter-option">
            <input type="radio" id="category-series" name="category" />
            <label htmlFor="category-series">Series</label>
          </div>
        </div>
      </div>
      {/* Main content area with tournaments */}
      <div className="tournaments">
        <div className="tournaments-header">
          <h1>
            All Domestic Cricket Tournaments{" "}
            <span className="location-link">(Location)</span>
          </h1>
        </div>
        <div className="tournament-grid">
          {/* Tournament Card 1 */}
          <div className="tournament-card">
            <a href="scoreboard.html?tournament=imca-under-14">
              <div className="premium-badge">Premium</div>
              <div className="view-scoreboard">VIEW SCOREBOARD</div>
              <div className="tournament-image">
                <img
                  src="https://via.placeholder.com/80"
                  alt="1st IMCA UNDER 14 CRICKET TOURNAMENT"
                />
              </div>
              <div className="tournament-details">
                <div className="ongoing-badge">ONGOING</div>
                <h3 className="tournament-title">
                  1st IMCA UNDER 14 CRICKET TOURNAMENT
                </h3>
                <div className="tournament-date">18-May-24 To 28-Feb-25</div>
                <div className="tournament-location">New Delhi</div>
              </div>
            </a>
          </div>
          {/* Tournament Card 2 */}
          <div className="tournament-card">
            <a href="scoreboard.html?tournament=bpl-season-4">
              <div className="premium-badge">Premium</div>
              <div className="view-scoreboard">VIEW SCOREBOARD</div>
              <div className="tournament-image">
                <img src="https://via.placeholder.com/80" alt="BPL" />
              </div>
              <div className="tournament-details">
                <div className="ongoing-badge">ONGOING</div>
                <h3 className="tournament-title">BPL (Season 4 ) 2025</h3>
                <div className="tournament-date">08-Feb-25 To 28-Feb-25</div>
                <div className="tournament-location">Ankleshwar</div>
              </div>
            </a>
          </div>
          {/* Tournament Card 3 */}
          <div className="tournament-card">
            <a href="scoreboard.html?tournament=diamond-premier-league">
              <div className="premium-badge">Premium</div>
              <div className="view-scoreboard">VIEW SCOREBOARD</div>
              <div className="tournament-image">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Diamond Premier League"
                />
              </div>
              <div className="tournament-details">
                <div className="ongoing-badge">ONGOING</div>
                <h3 className="tournament-title">
                  Diamond Premier League 2025 Season 5
                </h3>
                <div className="tournament-date">25-Jan-25 To 28-Feb-25</div>
                <div className="tournament-location">Sangli</div>
              </div>
            </a>
          </div>
          {/* Tournament Card 4 */}
          <div className="tournament-card">
            <a href="scoreboard.html?tournament=faizan-memorial-league">
              <div className="premium-badge">Premium</div>
              <div className="view-scoreboard">VIEW SCOREBOARD</div>
              <div className="tournament-image">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Faizan Memorial League"
                />
              </div>
              <div className="tournament-details">
                <div className="ongoing-badge">ONGOING</div>
                <h3 className="tournament-title">
                  Faizan Memorial Nigohi Premier League-9
                </h3>
                <div className="tournament-date">15-Jan-25 To 28-Feb-25</div>
                <div className="tournament-location">Shahjahanpur</div>
              </div>
            </a>
          </div>
          {/* Tournament Card 5 */}
          <div className="tournament-card">
            <a href="scoreboard.html?tournament=ffl-season-8">
              <div className="premium-badge">Premium</div>
              <div className="view-scoreboard">VIEW SCOREBOARD</div>
              <div className="tournament-image">
                <img src="https://via.placeholder.com/80" alt="FFL Season" />
              </div>
              <div className="tournament-details">
                <div className="ongoing-badge">ONGOING</div>
                <h3 className="tournament-title">FFL Season 8 - 2025</h3>
                <div className="tournament-date">05-Feb-25 To 28-Feb-25</div>
                <div className="tournament-location">Mumbai</div>
              </div>
            </a>
          </div>
          {/* Tournament Card 6 */}
          <div className="tournament-card">
            <a href="scoreboard.html?tournament=kosad-ekta-cup">
              <div className="premium-badge">Premium</div>
              <div className="view-scoreboard">VIEW SCOREBOARD</div>
              <div className="tournament-image">
                <img src="https://via.placeholder.com/80" alt="KOSAD EKTA CUP" />
              </div>
              <div className="tournament-details">
                <div className="ongoing-badge">ONGOING</div>
                <h3 className="tournament-title">
                  KOSAD EKTA CUP - 2025 ( KPL- 7 )
                </h3>
                <div className="tournament-date">23-Dec-24 To 28-Feb-25</div>
                <div className="tournament-location">Surat</div>
              </div>
            </a>
          </div>
          {/* Tournament Card 7 */}
          <div className="tournament-card">
            <a href="scoreboard.html?tournament=sports-club-gold">
              <div className="premium-badge">Premium</div>
              <div className="view-scoreboard">VIEW SCOREBOARD</div>
              <div className="tournament-image">
                <img src="https://via.placeholder.com/80" alt="Sports Club" />
              </div>
              <div className="tournament-details">
                <div className="ongoing-badge">ONGOING</div>
                <h3 className="tournament-title">
                  Sports Club 19 - 39 Years Gold (Winter 2024 - 25)
                </h3>
                <div className="tournament-date">15-Jan-25 To 28-Feb-25</div>
                <div className="tournament-location">Ahmedabad</div>
              </div>
            </a>
          </div>
          {/* Tournament Card 8 */}
          <div className="tournament-card">
            <a href="scoreboard.html?tournament=sports-club-platinum">
              <div className="premium-badge">Premium</div>
              <div className="view-scoreboard">VIEW SCOREBOARD</div>
              <div className="tournament-image">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Sports Club Platinum"
                />
              </div>
              <div className="tournament-details">
                <div className="ongoing-badge">ONGOING</div>
                <h3 className="tournament-title">
                  Sports Club 19-39 Years Platinum (Winter 2024 - 25)
                </h3>
                <div className="tournament-date">15-Jan-25 To 28-Feb-25</div>
                <div className="tournament-location">Ahmedabad</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
  
  

  )
}
