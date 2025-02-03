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


ESL, ELL, Writing, Production Skills; I'm attempting to create writing and speech templates but by only offering a skeleton of structure/ content/ logical connections. See the A. Student Paragraph and the B. Structure & Content. Analyze and explain what I'm attempting to do in B. Structure & Content; attempt to provide an even more quick, lucid, intelligent but simple refinement of B. Structure & Content. We're going to experiment on refining this before proceeding with my main task.

A. Student Paragraph
I firmly believe that too much homework has negative effects on children's social skills because they do not have enough time to play and interact with others. Through playing, children learn to negotiate, cooperate, and resolve conflicts. These skills are a vital part of childhood development. When homework takes up their time, children miss out on these crucial experiences, leading to a lack of practice in important social abilities.

As a result, nowadays, more and more high school and college students struggle with managing their personal and academic lives. Many are even afraid of making friends due to their lack of social skills. We do not want this issue to affect future generations.

To conclude, it is essential to find a balance between homework and social-related activities. Only then can we ensure children grow into well-rounded adults in the future.


B. Structure & Content
State the Proposition: excessive amounts of homework --[negative affect on]--> the development of adolescent social skills

play --[necessary for]--> development of social skills

increased time spent completing homework --[means]--> decreased time spent playing --[leads to]--> poorer outcome in development of social skills

One visible result --> adolescents (graduated, university age) unequipped to manage responsibilities of adult life
One visible result --> adolescents (graduated, university age) have difficult creating new relationships


Conclusion:
Undesirable results ----> need find balance --> the only way to secure a healthy, holistic development



Regenerate #2 based on #3, creating #2 and a copy for #4 for this sample. See the rest of my prompt.

1. Original Paragraph
2. Revised Paragraph 
3. Concrete Suggestions Table And then giving you my rubric (based on the IELTS writing rubric) you generated the following suggested feedback:
4.Different Sample Original Paragraph Revised Paragraph side by side:

In this conversation the original text I gave you was as follows:

1. Original Paragraph "First of all, substantial amount of homework leads to sleep deprivation which will disrupt their thinking during the day, and it is incredibly stressful for students to finish them accurately and on time. 
Second of all, we've all seen breakdowns from our classmates or on the news, and they don't have any time or ways to release stress, and nobody wants that for their children.
So in order to maintain their mental and physical health, it is crucial that students should not be given a substantial amount of homework."

You generated a suggested improvement as follows:

2. Revised Paragraph I firmly believe that too much homework negatively affects students' physical and mental health.
First, too much homework leads to sleep deprivation, which disrupts students' ability to think clearly during the day. It is also very stressful for students to complete their homework accurately and on time.
Second, many students experience breakdowns because they have no time or ways to release stress. This is something no parent would want for their children.
To maintain students' mental and physical health, it is important that they are not given too much homework.

3. Concrete Suggestions Table And then giving you my rubric (based on the IELTS writing rubric) you generated the following suggested feedback:
Area to Improve	Suggestions
Add more specific details and examples	"1. Use real-life examples or statistics (e.g., "60% of students report feeling overwhelmed by homework").
2. Explain connections (e.g., "Less sleep leads to poor concentration and memory problems").
3. Provide a counterargument and refute it (e.g., "Homework helps practice, but too much causes stress")."
	
	
Use a wider range of vocabulary	"1. Learn synonyms (e.g., "excessive homework," "overwhelming workload").
2. Use descriptive words (e.g., replace "bad" with "harmful" or "detrimental").
3. Practice paraphrasing (e.g., "mental and physical health" → "overall well-being")."
	
	
Work on grammar	"1. Practice articles (e.g., "a substantial amount of homework").
2. Be specific with pronouns (e.g., replace "them" with "homework").
3. Simplify long sentences (e.g., break one long sentence into two shorter ones)."
	
	
Use varied and formal transitions	"1. Replace repetitive transitions (e.g., "First of all" → "To begin with," "Additionally").
2. Use cause-and-effect transitions (e.g., "As a result," "This leads to").
3. Use formal conclusion transitions (e.g., "In conclusion," "To summarize")."

And then, later on I ask you to generate a side by side table comparing and making bold key differences in the original paragraph and updated paragraph of a different sample:

4.Different Sample Original Paragraph Revised Paragraph side by side:
I firmly believe that too much homework does negative effects on children's social skills for the reason that they don't have enough time to play and interact with others.	I firmly believe that too much homework has negative effects on children's social skills because they do not have enough time to play and interact with others.
Through playing, children learn to negotiate, cooperate, and resolve conflicts,so it's a vital component of childhood development.	Through playing, children learn to negotiate, cooperate, and resolve conflicts. These skills are a vital part of childhood development.
When homework takes up their time, children miss out on these crucial experiences, leading to a lack of practice in such necessary social abilities.	When homework takes up their time, children miss out on these crucial experiences, leading to a lack of practice in important social abilities.
As a result,nowdays more and more high school and college students aren't able to manage their lives properly.	As a result, nowadays, more and more high school and college students struggle with managing their personal and academic lives.
They are even afraid of making friend due to a lack of social skills.	They are even afraid of making friends due to their lack of social skills.
I'm sure we don't want the phenomenon to occur to our future generations.	We do not want this issue to affect future generations.
To conclude,it's definitely vital to find a balance between homework and social-related activities.	To conclude, it is essential to find a balance between homework and social-related activities.
Only then can we guarantee children to become a fully grown man in the future.	Only then can we ensure children grow into well-rounded adults in the future.






Rote learning, often criticized as outdated, has undeniable advantages, particularly in building a strong foundation of knowledge. Memorization helps students retain essential information, such as multiplication tables or historical dates, which are necessary for more advanced learning. For instance, studies have shown that students who have memorized basic math facts solve complex problems faster because they don’t need to pause and calculate simple equations. Furthermore, rote learning strengthens memory and discipline, as the process of repetition trains the brain to store and recall information efficiently. These skills can be applied not only in academics but also in real-life situations where quick recall is essential, such as remembering important instructions or procedures. While it may not foster creativity directly, rote learning lays the groundwork for critical thinking by ensuring students have the basic knowledge needed to build deeper understanding.



Although rote learning can be useful in certain contexts, it often stifles creativity and critical thinking, which are essential skills in today’s world. When students focus solely on memorizing facts, they may fail to understand the underlying concepts or how to apply them in real-life situations. For example, a student who memorizes a formula in physics without understanding its purpose may struggle when faced with a problem that requires adapting or modifying that formula. Additionally, rote learning can lead to disengagement and frustration, as it emphasizes repetition over exploration and curiosity. Modern education systems increasingly prioritize problem-solving and collaboration, skills that rote learning does not develop. In a rapidly changing world, where adaptability and innovation are key, relying too heavily on rote memorization risks leaving students ill-prepared for the challenges of the future.




ELL, EAP, EFL, high school, university, B2 - C1 English, discussion, functions, developing ideas

You're an English teacher like me responsible for generating a set of functional phrases that students can use to facilitate and participate in a discussion that's
focussed on developing ideas for a presentation or written piece. The topic isn't very relevant (because I'd like to be able to abstract it and apply it to different topics) but for your information, they're developing very ideas and arguments on the most critical techniques/ and steps for building skills. There's a meeting (or discussion) leader, and they should consider each idea in turn (already generated/supplied) and should attempt to 'build' the idea, thinking about a. Supports in the form of examples, experiences, or research findings, b. should develop explanation / reasoning, and c. Think about counters and how to address counters. Below I give you an example of the set of phrases they're using for brainstorming ideas in a previous stage:

Introducing the Topic (介绍主题)
So, let’s start by discussing some idea about [topic].
We need to brainstorm some points on topic].

Asking for Ideas (询问想法)
[Name], what do you think?
Can anyone suggest another point?
Okay, let’s get one or two more ideas.

Giving Opinions (表达观点)
I think…
One key thing is
In my personal experience, I find..
Another point is
It’s worth mentioning that…
One possible idea…

Asking for Clarification (询问澄清)
Could you explain that point further?
What do you mean by…?
I’m not sure I understand, can you give an example of that?

Summarizing Ideas (总结观点)
So, to summarize, 
In conclusion, there’s several things…

Wrapping Up the Discussion (结束讨论)
Have we covered all the main points?
Is there anything else we should add?
Do we all agree on the main pros and cons?


Okay I find a problem. My page/subapp is embedded in the routes component that has an unsettled div. This div contains all routes/ app, so I want to be careful with how I style it. But I want it to be able to grow up to 1200, down to 400. I want it to stay in the center of the page.

App

// import './app.scss'
import { useEffect } from 'react'
import { RootState } from './core/store/store'
import { useAppDispatch } from './core/hooks/useStore'
import { useSelector } from 'react-redux'
import { homeSlice } from './features/home'
import { authSlice } from './features/auth/auth'
import { toast } from 'react-toastify'
import axios from 'axios'
import useConfig from './core/hooks/useConfig'
import AppContainer from './common/container/AppContainer'
import Navigation from './common/navigation/navigation'
// import Background from './common/background/background'
import Routing from './core/routing/routing'
import Notification from './common/notification/notification'
// import useSocket from './core/hooks/useSocket'

function App() {
  const dispatch = useAppDispatch()
  const { apiUrl, theme } = useSelector((state: RootState) => state.home)

  const { getApiUrl } = useConfig()
  // const { socket } = useSocket()

  // Send cookies with every request
  axios.defaults.withCredentials = true
  // Set default request timeout to 5s
  axios.defaults.timeout = 5000

  // Request error handling middleware for 500 status code
  axios.interceptors.response.use(undefined, (error) => {
    if (error.response.status === 500) {
      console.error(error)
      toast.error('Something went wrong, please try again later!')
    }
    return Promise.reject(error)
  })

  useEffect(() => {
    // Set backend url
    const url = getApiUrl()
    dispatch(homeSlice.actions.setApiUrl(url))

    // Get essential data from server
    getUser()

    // Listen for socket.io connection messages
    // socket.on('connect', connectListener)
    // socket.on('disconnected', disconnectListener)

    // The socket.io the listeners must be removed
    // In order to prevent multiple event registrations
    // https://socket.io/how-to/use-with-react-hooks
    return () => {
      // socket.off('connect', connectListener)
      // socket.off('disconnected', disconnectListener)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Socket.io connected event
   */
  // const connectListener = () => {
  //   console.info('[SOCKET] Connected')
  // }

  /**
   * Socket.io disconnected event
   */
  // const disconnectListener = () => {
  //   console.info('[SOCKET] Disconnected')
  // }

  /**
   * Get user data
   * @returns object
   */
  const getUser = async () => {
    try {
      const response = await axios.get(`${apiUrl}/auth/local/check`)
      const user = response.data.result
      dispatch(authSlice.actions.setUser(user))
    } catch (err: any) {
      dispatch(authSlice.actions.setUser({}))
    }
  }

  return (
    // <div className={`app-container ${theme}`}>
    <AppContainer>
      <Navigation />
        <Routing />
        <Notification />
    </AppContainer>
  )
}

export default App


Routing

import { Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Home from '../../features/home'
import Login from '../../features/auth/login'
import Join from '../../features/auth/join'
import Activation from '../../features/auth/activation'
import Recovery from '../../features/auth/recovery'
import Reset from '../../features/auth/reset'
import Profile from '../../features/user/profile'
import Error from '../../features/error'
import VowelChartContainer from '../../features/ipa/components/VowelChartContainer'
import JsonDisplay from '../../features/ipa/components/JsonDisplay'
import IPAAppContainer from '../../features/ipa/components/IPAAppContainer'

function Routing() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/join" element={<Join />} />
        <Route path="/auth/activation/:id" element={<Activation />} />
        <Route path="/auth/activation/:id/:code" element={<Activation />} />
        <Route path="/auth/recovery" element={<Recovery />} />
        <Route path="/auth/reset/:id" element={<Reset />} />
        <Route path="/auth/reset/:id/:code" element={<Reset />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route  
          path="/ipa"  
          element={  
            <VowelChartContainer />
          }  
        />
        <Route  
          path="/ipa/jsondata"  
          element={  
            <JsonDisplay />
          }  
        />
        <Route  
          path="/ipa/ipaapp"  
          element={  
            <IPAAppContainer/>
          }   
        />      
        <Route
          path="/error/unauthorized"
          element={<Error status={401} message="Unauthorized request" />}
        />


Task: 
Adapt my current React Typescript solution to create a 'mini-program' / 'sub-app',
Under the /IPA route. Specifically, I'd like to integrate the 'Vowel Chart' component and my IPAApp component. 
I'd like to extract the content (everything inside the outer box) in IPAApp. Put it in a new component called 'LetterReference'.
And then I want to add a 'Bottom Navigation' (https://mui.com/material-ui/react-bottom-navigation/) component into my IPAApp component, and and be able to navigate to VowelChat and IPAApp and LetterReference as interior components.I'm not sure whether it's best to handle this integration work inside router, or embed in directly in the definition of the IPAApp commonent. I'm also not sure in this concept, whether it's better to use state or what. Here's relevant parts of my code:

Routing.tsx

import { Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Home from '../../features/home'
import Login from '../../features/auth/login'
import Join from '../../features/auth/join'
import Activation from '../../features/auth/activation'
import Recovery from '../../features/auth/recovery'
import Reset from '../../features/auth/reset'
import Profile from '../../features/user/profile'
import Error from '../../features/error'
import VowelChartContainer from '../../features/ipa/components/VowelChartContainer'
import JsonDisplay from '../../features/ipa/components/JsonDisplay'
import IPAAppContainer from '../../features/ipa/components/IPAAppContainer'

function Routing() {
  return (
    <div 
      style={{  
        marginTop: "50px",
        display: "flex",  
        justifyContent: "center", // Center horizontally  
        alignItems: "center", // Center vertically  
        minHeight: "100vh", // Full height of the viewport  
        backgroundColor: "#f5f5f5", // Optional: Add a background color  
      }}  
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/join" element={<Join />} />
        <Route path="/auth/activation/:id" element={<Activation />} />
        <Route path="/auth/activation/:id/:code" element={<Activation />} />
        <Route path="/auth/recovery" element={<Recovery />} />
        <Route path="/auth/reset/:id" element={<Reset />} />
        <Route path="/auth/reset/:id/:code" element={<Reset />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route  
          path="/ipa/vowelchart"  
          element={  
            <VowelChartContainer />
          }  
        />
        <Route  
          path="/ipa/ipaapp"  
          element={  
            <IPAAppContainer/>
          }   
        />      
        <Route
          path="/error/unauthorized"
          element={<Error status={401} message="Unauthorized request" />}
        />
        <Route
          path="/error/notfound"
          element={<Error status={404} message="Page not found" />}
        />
        <Route path="*" element={<Navigate to="/error/notfound" replace />} />
      </Routes>
    </div>
  )
}

export default Routing


IPAAppContainer


import React, { useState, useEffect } from "react";  
import { Box } from "@mui/material"
import SearchBar from "./SearchBar";
import LetterTabs from "./LetterTabs";
import SelectedLetterHeader from "./SelectedLetterHeader";
import IPATabs from "./IPATabs";
import letterData from "../data/letterData.json";
import PlayAndVideoSection from "./PlayAndVideoSection";
import ModelWordsSection from "./ModelWordSection";

const data = JSON.parse(JSON.stringify(letterData));

const IPAAppContainer: React.FC = () => {
    const [ selectedLetter, setSelectedLetter ] = useState<string>("");
    const [ selectedIPA, setSelectedIPA ] = useState<string>("");
    const [ ipaSounds, setIPASounds ] = useState<string[]>([]);
    const [ currentIPAData, setCurrentIPAData ] = useState<{[key: string]: any}>({});
    const [ currentLetterData, setCurrentLetterData ] = useState<{[key: string]: any}>({});
    const [ lettersData ] = useState<{[key: string]: any}>(data);
    
    const handleSearch = (query: string) => {
        setSelectedLetter(query);
    };

    const handleSelectLetter = (letter: string) => {
        setSelectedLetter(letter);
        setSelectedIPA("");
    };

    const handleSelectIPA = (ipa: string) => {
        setSelectedIPA(ipa);
    };

    useEffect(() => {  
        const currentLetterDataTemp = lettersData.letters.find(  
            (letter: any) => letter.englishLetter === selectedLetter  
        );  
        console.log(currentLetterDataTemp); // Logs the correct data  

        if (currentLetterDataTemp) {  
            setCurrentLetterData(currentLetterDataTemp);  

            // Update IPA sounds for the selected letter  
            const ipaSoundsTemp = currentLetterDataTemp.sounds.map((sound: any) => sound.IPA);  
            setIPASounds(ipaSoundsTemp);  
        } else {  
            // Reset states if no letter matches  
            setCurrentLetterData({});  
            setIPASounds([]);  
        }  
    }, [selectedLetter, lettersData]);  

    useEffect(() => {  
        if (currentLetterData && selectedIPA) {  
            const currentIPADataTemp = currentLetterData.sounds.find(  
                (sound: any) => sound.IPA === selectedIPA  
            );  
            setCurrentIPAData(currentIPADataTemp || {});  
        }  
    }, [selectedIPA, currentLetterData]);  


    return (
        <Box
        sx={{
            margin: "10px",
            padding: "10px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            maxWidth: "700px",
            minWidth: "400px",
            backgroundColor: "#fff",
            boxShadow: 3,
            borderRadius: 2,
            overflow: "hidden",
            // padding: 2, // Optional: Add padding for inner content spacing  
            "@media (max-width: 700px)": {  
            width: "100%", // Allow the width to adjust below 700px  
            },  
            "@media (min-width: 400px)": {  
            width: "100%", // Allow the width to adjust above 400px  
            },  
        }}>
            {/* <> */}
                <SearchBar onSearch={handleSearch} />
                <LetterTabs
                    selectedLetter={selectedLetter}  
                    onSelectLetter={handleSelectLetter}  
                />
                <SelectedLetterHeader letter={selectedLetter} />

                <IPATabs
                    ipaSounds={ipaSounds}
                    selectedIPA={selectedIPA}
                    onSelectIPA={handleSelectIPA}/>
                {Object.keys(currentIPAData).length > 0 ? (  
                <>  
                    <ModelWordsSection  
                        words={currentIPAData.modelWords || []}  
                        onPlayWordAudio={(audioURL) => console.log(`Play audio: ${audioURL}`)}  
                        onPlayWordVideo={(videoURL) =>  
                        console.log(`Play video: ${videoURL}`)  
                        }  
                    />  
                    <PlayAndVideoSection  
                        videoURL={currentIPAData.audioURL || ""}  
                        onPlay={() => console.log("Play IPA audio")}  
                    />  
                    
                </>  
            ) : (  
                <div style={{ padding: "16px", textAlign: "center" }}>  
                No IPA sounds available for this letter.  
                </div>  
            )}  
                    {/* <pre>{JSON.stringify(currentIPAData, null, 2)}</pre> */}
             {/* </> */}
        </Box>
    );
}

export default IPAAppContainer;


VowelChartContainer:


import React from "react";  
import "../styles/VowelChart.scss";  
import VowelChart from "./VowelChart";

// interface VowelChartContainerProps {  
//   children: React.ReactNode;  
// }  

const VowelChartContainer: React.FC = () => {  
  return (  
    <div className="vowel-chart-container">  
      <VowelChart/>
    </div>  
  );  
};  

export default VowelChartContainer;






