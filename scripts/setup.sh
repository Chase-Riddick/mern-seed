#!/bin/bash
set -x
clear
echo "MERN-SEED Setup"
echo ""
echo "1. Installing dependencies on backend, frontend, root"
echo "2. Configure env variables on backend, frontend, root"
echo ""

prepare() {
  rm -rf ./scripts/log
  mkdir -p ./scripts/log
  mkdir -p ./backend/.env
}

askDepsInstall() {
  echo ""
  read -rp "1. Install dependencies using 'yarn install'? [Y/n] " depsResponse
  depsResponse=${depsResponse:l} # tolower
  if [[ $depsResponse =~ ^(y| ) ]] || [[ -z $depsResponse ]]; then
    depsInstall
  else
    echo "Dependencies not installed!"
  fi
}

depsInstall() {
  echo ""
  echo "Installing backend dependencies... (~1m)"
  yarn --cwd backend/ install &>./scripts/log/backend.setup.log
  echo "Done"
  echo ""
  echo "Installing frontend dependencies... (~5m)"
  yarn --cwd frontend/ install &>./scripts/log/frontend.setup.log
  echo "Done"
  echo ""
  echo "Installing root dependencies... (~1m)"
  yarn install &>./scripts/log/root.setup.log
  echo "Done"
}

askEnvConfig() {
  echo ""
  read -rp "2. Configure env variables? [Y/n] " envResponse
  envResponse=${envResponse:l} # tolower
  if [[ $envResponse =~ ^(y| ) ]] || [[ -z $envResponse ]]; then
    envConfig
  else
    echo "Env variables not configured!"
  fi
}

envConfig() {
  devCookieSecret=$(openssl rand -hex 12)
  prodCookieSecret=$(openssl rand -hex 12)
  envConfigDev
  envConfigProd
  envReview
}

envConfigSsl() {
  echo ""
  read -rp "Generate SSL certificate? [Y/n] " sslResponse
  sslResponse=${sslResponse:l} # tolower
  if [[ $sslResponse =~ ^(y| ) ]] || [[ -z $sslResponse ]]; then
    mkdir -p ./backend/.ssl
    openssl req -x509 -sha256 -newkey rsa:4096 -keyout ./backend/.ssl/key.pem -out ./backend/.ssl/cert.pem -nodes -days 365 -subj '/CN=localhost' &>/dev/null
    sslKey=".ssl/key.pem"
    sslCert=".ssl/cert.pem"
    echo "[DEV] SSL certificate generated"
  else
    read -rp "[DEV] Put your SSL files (key, cert) inside './backend/.ssl/' or a custom folder and press any key!"
    read -rp "[DEV] SSL key file path relative to backend (.ssl/key.pem): " sslKey
    sslKey=${sslKey:-.ssl/key.pem}
    read -rp "[DEV] SSL cert file path relative to backend (.ssl/cert.pem): " sslCert
    sslCert=${sslCert:-.ssl/cert.pem}
  fi
}

envConfigJwt() {
  read -rp "Generate JWT keys? [Y/n] " jwtResponse
  jwtResponse=${jwtResponse:l} # tolower
  if [[ $jwtResponse =~ ^(y| ) ]] || [[ -z $jwtResponse ]]; then
    mkdir -p ./backend/.jwt
    openssl genrsa -out ./backend/.jwt/secret.pem 2048 &>/dev/null
    openssl rsa -in ./backend/.jwt/secret.pem -outform PEM -pubout -out ./backend/.jwt/public.pem &>/dev/null
    jwtSecret=".jwt/secret.pem"
    jwtPublic=".jwt/public.pem"
    echo "[DEV] JWT keys generated"
  else
    read -rp "[DEV] Put your JWT files (secret, public) inside './backend/.jwt/' or a custom folder and press any key!"
    read -rp "[DEV] JWT secret file path relative to backend (.jwt/jwt.secret.pem): " jwtSecret
    jwtSecret=${jwtSecret:-.jwt/secret.pem}
    read -rp "[DEV] JWT public file path relative to backend (.jwt/jwt.public.pem): " jwtPublic
    jwtPublic=${jwtPublic:-.jwt/public.pem}
  fi
}

envConfigSslProd() {
  echo ""
  read -rp "Generate production SSL certificate? [Y/n] " sslResponseProd
  sslResponseProd=${sslResponseProd:l} # tolower
  if [[ $sslResponseProd =~ ^(y| ) ]] || [[ -z $sslResponseProd ]]; then
    openssl req -x509 -sha256 -newkey rsa:4096 -keyout ./backend/.ssl/key.prod.pem -out ./backend/.ssl/cert.prod.pem -nodes -days 365 -subj '/CN=localhost' &>/dev/null
    sslKeyProd=".ssl/key.prod.pem"
    sslCertProd=".ssl/cert.prod.pem"
    echo "[PROD] SSL certificate generated"
  else
    read -rp "[PROD] Put your SSL files (key, cert) inside './backend/.ssl/' or a custom folder and press any key!"
    read -rp "[PROD] SSL key file path relative to backend (.ssl/key.pem): " sslKeyProd
    sslKeyProd=${sslKeyProd:-.ssl/key.pem}
    read -rp "[PROD] SSL cert file path relative to backend (.ssl/cert.pem): " sslCertProd
    sslCertProd=${sslCertProd:-.ssl/cert.pem}
  fi
}

envConfigJwtProd() {
  read -rp "Generate production JWT keys? [Y/n] " jwtResponseProd
  jwtResponseProd=${jwtResponseProd:l} # tolower
  if [[ $jwtResponseProd =~ ^(y| ) ]] || [[ -z $jwtResponseProd ]]; then
    openssl genrsa -out ./backend/.jwt/secret.prod.pem 2048 &>/dev/null
    openssl rsa -in ./backend/.jwt/secret.prod.pem -outform PEM -pubout -out ./backend/.jwt/public.prod.pem &>/dev/null
    depsResponse=${depsResponse:l}
    jwtSecretProd=".jwt/secret.prod.pem"
    jwtPublicProd=".jwt/public.prod.pem"
    echo "[PROD] JWT keys generated"
  else
    read -rp "[PROD] Put your JWT files (secret, public) inside './backend/.jwt/' or a custom folder and press any key!"
    read -rp "[PROD] JWT secret file path relative to backend (.jwt/secret.pem): " jwtSecretProd
    jwtSecretProd=${jwtSecretProd:-.jwt/secret.pem}
    read -rp "[PROD] JWT public file path relative to backend (.jwt/public.pem): " jwtPublicProd
    jwtPublicProd=${jwtPublicProd:-.jwt/public.pem}
  fi
}

envConfigDev() {
  echo ""
  echo "Development setup"
  envConfigSsl
  envConfigJwt
  read -rp "[DEV] Backend port (3001): " backendPort
  backendPort=${backendPort:-3001}
  read -rp "[DEV] Frontend port (3000): " frontendPort
  frontendPort=${frontendPort:-3000}
  read -rp "[DEV] Cookie secret (openssl hex): " cookieSecret
  cookieSecret=${cookieSecret:-$devCookieSecret}
  read -rp "[DEV] Database url: " databaseUrl
  read -rp "[DEV] Email user: " emailUser
  read -rp "[DEV] Email password: " emailPass
  read -rp "[DEV] Email from (noreply@mernseed.com): " emailFrom
  emailFrom=${emailFrom:-noreply@mernseed.com}
  read -rp "[DEV] Email API url: " emailApiUrl
  read -rp "[DEV] Email API token: " emailApiToken
}

envConfigProd() {
  echo ""
  echo "Production setup"
  envConfigSslProd
  envConfigJwtProd
  read -rp "[PROD] Port number (8080): " portProd
  portProd=${portProd:-8080}
  read -rp "[PROD] Cookie secret (openssl hex): " cookieSecretProd
  cookieSecretProd=${cookieSecretProd:-$prodCookieSecret}
  read -rp "[PROD] Database url (copy from dev): " databaseUrlProd
  databaseUrlProd=${databaseUrlProd:-$databaseUrl}
  read -rp "[PROD] Email user (copy from dev): " emailUserProd
  emailUserProd=${emailUserProd:-$emailUser}
  read -rp "[PROD] Email password (copy from dev): " emailPassProd
  emailPassProd=${emailPassProd:-$emailPass}
  read -rp "[PROD] Email from (copy from dev): " emailFromProd
  emailFromProd=${emailFromProd:-$emailFrom}
}

envReview() {
  echo ""
  echo "All done!"
  sleep 1s
  echo ""
  echo "Review your configuration!"
  echo ""
  echo "Development"
  echo "SSL key: $sslKey"
  echo "SSL cert: $sslCert"
  echo "JWT secret: $jwtSecret"
  echo "JWT public: $jwtPublic"
  echo "Backend port: $backendPort"
  echo "Frontend port: $frontendPort"
  echo "Cookie secret: $cookieSecret"
  echo "Database url: $databaseUrl"
  echo "Email user: $emailUser"
  echo "Email password: $emailPass"
  echo "Email from: $emailFrom"
  echo "Email API Url: $emailApiUrl"
  echo "Email API Token: $emailApiToken"
  echo ""
  echo "Production"
  echo "SSL key: $sslKeyProd"
  echo "SSL cert: $sslCertProd"
  echo "JWT secret: $jwtSecretProd"
  echo "JWT public: $jwtPublicProd"
  echo "Port: $portProd"
  echo "Cookie secret: $cookieSecretProd"
  echo "Database url: $databaseUrlProd"
  echo "Email user: $emailUserProd"
  echo "Email password: $emailPassProd"
  echo "Email from: $emailFromProd"
  echo ""
  echo "WARNING! Overwriting any previous configuration!"
  echo ""
  read -rp "Save this configuration? [Y/n] " saveResponse
  saveResponse=${saveResponse:l} # tolower
  if [[ $saveResponse =~ ^(y| ) ]] || [[ -z $saveResponse ]]; then
    envSave
  else
    echo "Configuration not saved!"
  fi
}

envSave() {
  echo "Saving configuration..."
  {
    echo "HOST=0.0.0.0"
    echo "PORT=$backendPort"
    echo "FRONTEND_HOST=localhost"
    echo "FRONTEND_PORT=$frontendPort"
    echo "SSL_KEY=$sslKey"
    echo "SSL_CERT=$sslCert"
    echo "JWT_SECRET=$jwtSecret"
    echo "JWT_PUBLIC=$jwtPublic"
    echo "COOKIE_SECRET=$cookieSecret"
    echo "DATABASE_URL=$databaseUrl"
    echo "EMAIL_USER=$emailUser"
    echo "EMAIL_PASS=$emailPass"
    echo "EMAIL_FROM=$emailFrom"
  } >./backend/.env/.env.development
  {
    echo "HOST=0.0.0.0"
    echo "PORT=$portProd"
    echo "FRONTEND_HOST=localhost"
    echo "FRONTEND_PORT=$portProd"
    echo "SSL_KEY=$sslKeyProd"
    echo "SSL_CERT=$sslCertProd"
    echo "JWT_SECRET=$jwtSecretProd"
    echo "JWT_PUBLIC=$jwtPublicProd"
    echo "COOKIE_SECRET=$cookieSecretProd"
    echo "DATABASE_URL=$databaseUrlProd"
    echo "EMAIL_USER=$emailUserProd"
    echo "EMAIL_PASS=$emailPassProd"
    echo "EMAIL_FROM=$emailFromProd"
  } >./backend/.env/.env.production
  {
    echo "REACT_APP_HOST=0.0.0.0"
    echo "REACT_APP_PORT=$frontendPort"
    echo "REACT_APP_BACKEND_HOST=localhost"
    echo "REACT_APP_BACKEND_PORT=$backendPort"
    echo "SKIP_PREFLIGHT_CHECK=true"
    echo "CHOKIDAR_USEPOLLING=true"
  } >./frontend/.env.development
  {
    echo "REACT_APP_HOST=0.0.0.0"
    echo "REACT_APP_PORT=$portProd"
    echo "REACT_APP_BACKEND_HOST=localhost"
    echo "REACT_APP_BACKEND_PORT=$portProd"
    echo "SKIP_PREFLIGHT_CHECK=true"
    echo "CHOKIDAR_USEPOLLING=true"
  } >./frontend/.env.production
  {
    echo "{"
    echo "  \"EMAIL_API_URL\": \"$emailApiUrl\","
    echo "  \"EMAIL_API_TOKEN\": \"$emailApiToken\""
    echo "}"
  } >./frontend/cypress.env.json
  {
    echo "import { defineConfig } from 'cypress'"
    echo ""
    echo "export default defineConfig({"
    echo "  e2e: {"
    echo "    baseUrl: 'https://localhost:$frontendPort',"
    echo "  },"
    echo "})"
  } >./frontend/cypress.config.ts
  {
    echo "DEVELOPMENT_BACKEND_PORT=$backendPort"
    echo "DEVELOPMENT_FRONTEND_PORT=$frontendPort"
    echo "PRODUCTION_PORT=$portProd"
  } >./.env
  echo ""
  echo "Configuration saved to the following files:"
  echo "./backend/.env/.env.development"
  echo "./backend/.env/.env.production"
  echo "./frontend/.env.development"
  echo "./frontend/.env.production"
  echo "./frontend/cypress.env.json"
  echo "./frontend/cypress.config.ts"
  echo "./.env"
  echo ""
  echo "Run 'yarn docker:dev'"
  echo "Or 'docker-compose -f docker-compose.development.yml up'"
  echo "To start the application!"
  echo ""
  echo "Backend: localhost:$backendPort"
  echo "Frontend: localhost:$frontendPort"
  echo "Production: localhost:$portProd"
  echo ""
}

start() {
  prepare
  askDepsInstall
  askEnvConfig
}

read -rp "Press any key to start!"
start




I want to created a containerized mini-app that sits centered in horizontal center of the web browser; it's max width is 700px to mimic a mobile app; it can shrink down dynamic to 400px; at 400px the inner content doesn't continue to dynamically shrink/ change size; is remains static even if the browser window scrolls past it and it's unseeable. The idea of the app is to show/ allow users to selected letters a - z, and then select associated IPA sounds (English), and view/ understand the sound and view some examples. I'd like to use MUI Material UI as far as possible.

Here's how I'm envionsioning. Can you help me develop my idea into a highly effective prompt? 

Top row: Search bar
Second row/ horizontal section: React tab (list) (forced scroll button variation) with options/buttons letters a - z
Third row/horizontal section: A single letter as a the header (large); centrally aligned/positioned
Fourth row/ horizontal section: Another tab list, not scrollable (flex fit maybe?) of the IPA letters/sounds associated with the selected letter in the top row.
Fifth row/horizontal section: two parts (vertically split, left right); on the left is horizontally and vertically centered is large play button it's a fontawesosme play icon (right-pointing triangle) with a circular background; this left vertical section takes a fixed width of say 80px; the right section is for a video (of a mouth diagram pronouncing that IPA sound); it should expand to take as much width as it can without distorted the h - w proportions of the video; the height of this whole fifth row/horizontal section should be dependent and basically the same as the calculated height of the video.
Sixth row/horizontal section: two parts (vertically split, left right) the left side, say 40% should be a vertically list of the model words for the target/selected IPA sound chosen in the third row. Each word should contain the word and on the right a little font awesome audio play button; the right side, 60% width, should be a correlated video or a person saying the word that the user can click on (on the left side). The video width should take up as much space/width as the right half allows; the height of the whole sixth row/horizontal section is based on the height of the video.

Current data structure of letters: 
"letters": [
	  {
		"englishLetter": "A",
		"sounds": [
		  {
			"IPA": "æ",
			"audioURL": "",
			"modelWords": [
			  {
				"englishSpelling": "apple",
				"IPASpelling": "ˈæpəl",
				"wordAudioURL": "",
				"wordVideoURL": ""
			  },
			  {
				"englishSpelling": "cat",
				"IPASpelling": "kæt",
				"wordAudioURL": "",
				"wordVideoURL": ""
			  }
			]
		  },
		  {
			"IPA": "eɪ",
			"audioURL": "",
			"modelWords": [
			  {
				"englishSpelling": "ape",
				"IPASpelling": "eɪp",
				"wordAudioURL": "",
				"wordVideoURL": ""
			  },
			  {
				"englishSpelling": "cake",
				"IPASpelling": "keɪk",
				"wordAudioURL": "",
				"wordVideoURL": ""
			  }
			]
		  }
		]
	  },
	  {
		"englishLetter": "B",
		"sounds": [
		  {
			"IPA": "b",
			"audioURL": "",
			"modelWords": [
			  {
				"englishSpelling": "bat",
				"IPASpelling": "bæt",
				"wordAudioURL": "",
				"wordVideoURL": ""
			  },
			  {
				"englishSpelling": "baby",
				"IPASpelling": "ˈbeɪbi",
				"wordAudioURL": "",
				"wordVideoURL": ""
			  }
			]
		  }
		]
	  },
	  {
		"englishLetter": "C",
		"sounds": [
		  {
			"IPA": "k",
			"audioURL": "",
			"modelWords": [
			  {
				"englishSpelling": "cat",
				"IPASpelling": "kæt",
				"wordAudioURL": "",
				"wordVideoURL": ""
			  },
			  {
				"englishSpelling": "cake",
				"IPASpelling": "keɪk",
				"wordAudioURL": "",
				"wordVideoURL": ""
			  }
			]
		  },
		  {
			"IPA": "s",
			"audioURL": "",
			"modelWords": [
			  {
				"englishSpelling": "city",
				"IPASpelling": "ˈsɪti",
				"wordAudioURL": "",
				"wordVideoURL": ""
			  },
			  {
				"englishSpelling": "face",
				"IPASpelling": "feɪs",
				"wordAudioURL": "",
				"wordVideoURL": ""
			  }
			]
		  }
		]
	  },......





Prompt for Development
Objective:
Build a containerized mini-app that mimics a mobile app experience, centered horizontally in the browser. The app allows users to explore the English alphabet (A-Z), select associated IPA sounds, and view examples of their pronunciation with visual and audio aids.

Layout and Behavior Requirements
Container Design:
The app container should be horizontally centered in the browser.
Max width: 700px, dynamically shrinks to 400px.
Below 400px, the inner content remains static (does not shrink further) even if the browser window is smaller.
The container should not scroll horizontally; if content overflows, it should remain unseeable.
Component Layout:
Row 1 (Top Row): Search bar (Material UI TextField with a search icon).
Row 2: Horizontal scrollable tab list (Material UI Tabs) for letters A-Z.
Use forced scroll buttons (scrollButtons="auto") for navigation if the tabs overflow.
Row 3: A single, large header displaying the selected letter (e.g., "A").
This should be centrally aligned.
Row 4: A horizontal, non-scrollable tab list (Material UI Tabs) for the IPA sounds of the selected letter.
Dynamically populate tabs with the IPA values from the data structure.
Row 5: Two sections (horizontally split):
Left Section (fixed width: 80px): A large play button (FontAwesome right-pointing triangle icon with a circular background) horizontally and vertically centered.
Right Section: A responsive video player showing a mouth animation for the selected IPA sound.
The height of this row depends on the calculated height of the video to maintain its aspect ratio.
Row 6: Two sections (horizontally split, 40% / 60% width):
Left Section (40%): A vertically scrollable list of model words for the selected IPA sound.
Each word should display:
The word (e.g., "apple").
Its IPA spelling (e.g., "ˈæpəl").
A small audio play button (FontAwesome speaker icon) on the right.
Right Section (60%): A responsive video player showing a person pronouncing the selected word.
The height of this row depends on the calculated height of the video to maintain its aspect ratio.
Styling:
Use Material UI (MUI) components for as much of the interface as possible.
Ensure the app is responsive between 400px and 700px width.
Use a clean, modern design with Material UI's default theme.
Behavior:
Search Bar: Filters the list of letters dynamically as the user types.
Letter Tabs (Row 2): Clicking on a letter updates:
The large header (Row 3).
The IPA sound tabs (Row 4).
The play button and video (Row 5).
The model words and their associated video (Row 6).
IPA Tabs (Row 4): Clicking on an IPA tab updates:
The play button and video (Row 5).
The model words and their associated video (Row 6).
Model Words (Row 6): Clicking a word's play button plays its audio. Clicking the word itself plays its associated video.
Data Integration:
Use the provided data structure for letters, IPA sounds, and model words.
Dynamically populate:
Letter tabs (Row 2).
IPA tabs (Row 4).
Model words list (Row 6).
Use placeholder URLs for audioURL and wordVideoURL until real data is available.
Additional Notes:
Ensure all interactive elements (tabs, buttons) are keyboard-accessible for accessibility.
Add basic error handling for missing or invalid data (e.g., show a "No data available" message if a letter has no IPA sounds).
Use Material UI's Grid or Box components for layout, and Flexbox for alignment where necessary.




Your idea is well thought out and clear! Let me help you refine it into a highly effective prompt for development. This will ensure the app is built efficiently and aligns with your vision. Below is the optimized version of your request, combining structure, behavior, and design requirements in a concise and actionable format.

Prompt for Development
Objective:
Build a containerized mini-app that mimics a mobile app experience, centered horizontally in the browser. The app allows users to explore the English alphabet (A-Z), select associated IPA sounds, and view examples of their pronunciation with visual and audio aids.

Layout and Behavior Requirements
Container Design:
The app container should be horizontally centered in the browser.
Max width: 700px, dynamically shrinks to 400px.
Below 400px, the inner content remains static (does not shrink further) even if the browser window is smaller.
The container should not scroll horizontally; if content overflows, it should remain unseeable.
Component Layout:
Row 1 (Top Row): Search bar (Material UI TextField with a search icon).
Row 2: Horizontal scrollable tab list (Material UI Tabs) for letters A-Z.
Use forced scroll buttons (scrollButtons="auto") for navigation if the tabs overflow.
Row 3: A single, large header displaying the selected letter (e.g., "A").
This should be centrally aligned.
Row 4: A horizontal, non-scrollable tab list (Material UI Tabs) for the IPA sounds of the selected letter.
Dynamically populate tabs with the IPA values from the data structure.
Row 5: Two sections (horizontally split):
Left Section (fixed width: 80px): A large play button (FontAwesome right-pointing triangle icon with a circular background) horizontally and vertically centered.
Right Section: A responsive video player showing a mouth animation for the selected IPA sound.
The height of this row depends on the calculated height of the video to maintain its aspect ratio.
Row 6: Two sections (horizontally split, 40% / 60% width):
Left Section (40%): A vertically scrollable list of model words for the selected IPA sound.
Each word should display:
The word (e.g., "apple").
Its IPA spelling (e.g., "ˈæpəl").
A small audio play button (FontAwesome speaker icon) on the right.
Right Section (60%): A responsive video player showing a person pronouncing the selected word.
The height of this row depends on the calculated height of the video to maintain its aspect ratio.
Styling:
Use Material UI (MUI) components for as much of the interface as possible.
Ensure the app is responsive between 400px and 700px width.
Use a clean, modern design with Material UI's default theme.
Behavior:
Search Bar: Filters the list of letters dynamically as the user types.
Letter Tabs (Row 2): Clicking on a letter updates:
The large header (Row 3).
The IPA sound tabs (Row 4).
The play button and video (Row 5).
The model words and their associated video (Row 6).
IPA Tabs (Row 4): Clicking on an IPA tab updates:
The play button and video (Row 5).
The model words and their associated video (Row 6).
Model Words (Row 6): Clicking a word's play button plays its audio. Clicking the word itself plays its associated video.
Data Integration:
Use the provided data structure for letters, IPA sounds, and model words.
Dynamically populate:
Letter tabs (Row 2).
IPA tabs (Row 4).
Model words list (Row 6).
Use placeholder URLs for audioURL and wordVideoURL until real data is available.
Additional Notes:
Ensure all interactive elements (tabs, buttons) are keyboard-accessible for accessibility.
Add basic error handling for missing or invalid data (e.g., show a "No data available" message if a letter has no IPA sounds).
Use Material UI's Grid or Box components for layout, and Flexbox for alignment where necessary.


Example Data Structure

{  
  "letters": [  
    {  
      "englishLetter": "A",  
      "sounds": [  
        {  
          "IPA": "æ",  
          "audioURL": "placeholder-audio-url",  
          "modelWords": [  
            {  
              "englishSpelling": "apple",  
              "IPASpelling": "ˈæpəl",  
              "wordAudioURL": "placeholder-word-audio-url",  
              "wordVideoURL": "placeholder-word-video-url"  
            },  
            {  
              "englishSpelling": "cat",  
              "IPASpelling": "kæt",  
              "wordAudioURL": "placeholder-word-audio-url",  
              "wordVideoURL": "placeholder-word-video-url"  
            }  
          ]  
        },  
        {  
          "IPA": "eɪ",  
          "audioURL": "placeholder-audio-url",  
          "modelWords": [  
            {  
              "englishSpelling": "ape",  
              "IPASpelling": "eɪp",  
              "wordAudioURL": "placeholder-word-audio-url",  
              "wordVideoURL": "placeholder-word-video-url"  
            },  
            {  
              "englishSpelling": "cake",  
              "IPASpelling": "keɪk",  
              "wordAudioURL": "placeholder-word-audio-url",  
              "wordVideoURL": "placeholder-word-video-url"  
            }  
          ]  
        }  
      ]  
    }  
  ]  
}  


