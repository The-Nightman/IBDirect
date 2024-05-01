# IBDirect

- [Summary](#summary)
- [Live version and Test accounts](#live-version-and-test-accounts)
   - [Patient accounts](#live-version-and-test-accounts)
   - [Staff accounts](#live-version-and-test-accounts)
- [Tech](#tech)
- [Cloning and development instructions](#cloning-and-development-instructions)
   - [Cloning instructions](#clone-instructions)
   - [Installing dependencies](#install-dependencies)
   - [Environment variables](#devlopment-environment-variables-setup)
   - [Launching Vite dev server](#launch-project-in-development-mode-with-vite)
   - [Building a production version](#build-a-production-version)
   - [Hosting with Netlify (optional)](#hosting-with-netlify)
   - [Node minimum requirements](#node-minimum-requirements)


## Summary

IBDirect is a mock NHS webportal designed as a healthcare service platform targeted at Inflammatory Bowel Disease patients and the healthcare professionals responsible for their care. This project is designed to demonstrate the functionality of a healthcare portal specific to the needs of IBD patients, IBD care specialists and general practitioners, with this in mind feedback was sought from NHS healthcare professionals in the frontline of IBD care and used in the development of this project.

This platform was developed to include features such as:

- Appointment scheduling for staff users and appointment history viewing for both patients and staff.

- Prescription management and restrictions on prescription data operations in order to preserve data and ensure that staff cannot abuse the system to write prescription in another staff members name (_all of this was done to best emulate an authentic real world environment and to try and match data law requirements of a real production portal_).

- Carefully designed IBD control surveys that calculate a score based on user input to ensure healthcare professionals can quickly collect the required data and compare against control scores from previous IBD control surveys with visual feedback given through both text and color channels ensure the correct interpretation is being recieved at a glance viewing.

- Real-Time chat using Microsoft SignalR websockets with presence detection to allow both patients and staff to transition away from outdated and archaic answer-machine hotline systems that is unfortunately still currently in use. The implementation of this feature seeks to bridge the care gap by providing better communication between patient-to-staff and staff-to-staff channels as well as providing better privacy for patients discussing the nature of their health condition and its current impact as this feature can silently be used in a public setting.

- Accessibility first, disability is a non-discriminator in whether someone suffers from or is in the frontline treatment of Inflammatory Bowel Disease. This portal was built to be WCAG compliant and offer the best possible user experience for alternative viewing and navigation users and has been tested throughout development with [NVDA screen reader](https://www.nvaccess.org/)

- Device compatibility and responsive design, more and more healthcare settings are equipping staff with brand new tablets and other portable devices to enable them operate more effectively and comfortably outside of their office or when a desktop is otherwise inaccessible, as such the staff portal was designed primarily for iPads and other mobile tablet or small form factor laptop devices however no compromises were made on the staff portals ability to be used on a mobile smartphone device. The patient portal was designed primarily with the focus of being used on a mobile device which would be the most prevalent device type the service would be used on by patients however the patient portal meets all of the device operation requirements and capabilities of the staff portal.

### Live version and Test accounts

Live url: https://ibdirect.net/

Backend Repo: https://github.com/The-Nightman/IBDirectAPI

#### Patient accounts

<details>
<summary>Patient User Accounts</summary>

| Username     | Date Of Birth DD/MM/YYYY | Password | Patient Name          | Diagnosis |
| ------------ | ------------------------ | -------- | --------------------- | --------- |
| DMcCrae      | 30/11/2014               | Password | Dorothea McCrae       | CD        |
| XChristensen | 06/07/1995               | Password | Xavier Christensen    | CD        |
| BVentom      | 11/06/1989               | Password | Ben Ventom            | MC        |
| AYeldon      | 02/03/1961               | Password | Arlana Yeldon         | UC        |
| SRyton       | 20/05/2001               | Password | Sibel Ryton           | IBDU      |
| DHagan       | 06/12/1990               | Password | Donal Hagan           | UC        |
| AHaily       | 18/03/1968               | Password | Aldo Haily            | UC        |
| LLinsay      | 22/08/1997               | Password | Leoine Linsay         | CD        |
| ABashar      | 21/08/1993               | Password | Ahmad Bashar          | UC        |
| FMitroshinov | 10/03/1974               | Password | Forrester Mitroshinov | MC        |
| TRankin      | 28/05/1980               | Password | Trisha Rankin         | MC        |
| CRajput      | 05/01/1969               | Password | Chahna Rajput         | IBDU      |
| KWaye        | 11/07/1971               | Password | Kayle Waye            | CD        |
| HAbdullah    | 13/01/1996               | Password | Hamza Abdullah        | CD        |
| CGaythwaite  | 14/03/1967               | Password | Camilla Gaythwaite    | UC        |
| BThurgood    | 28/06/1957               | Password | Barnie Thurgood       | UC        |
| GBurleton    | 27/11/2011               | Password | Gram Burleton         | UC        |
| GKimble      | 02/11/1984               | Password | Georgia Kimble        | CD        |
| KDevrick     | 02/03/2004               | Password | Kevin Devrick         | CD        |
| KOyley       | 22/03/1975               | Password | Kristan Oyley         | CD        |
| FRuddin      | 08/11/1986               | Password | Farr Ruddin           | CD        |
| NMatthias    | 20/12/1992               | Password | Nataline Matthias     | CD        |
| APratty      | 26/08/1992               | Password | Alex Pratty           | CD        |
| EHollingby   | 20/11/1989               | Password | Eric Hollingby        | UC        |
| BBraycotton  | 31/03/1965               | Password | Bonnie Braycotton     | MC        |
| CRudiger     | 20/12/1987               | Password | Conway Rudiger        | UC        |
| CVerner      | 20/11/1991               | Password | Conrad Verner         | CD        |
| IWesson      | 03/04/1997               | Password | Israel Wesson         | IBDU      |
| JPark        | 06/02/2000               | Password | Ji-eun Park           | UC        |
| FGrigsby     | 27/05/1977               | Password | Forest Grigsby        | MC        |
| EDadge       | 28/09/1977               | Password | Elissa Dadge          | CD        |
| BRogier      | 31/03/1991               | Password | Barrie Rogier         | CD        |
| ABrittian    | 14/10/1976               | Password | Anson Brittian        | UC        |
| NApperley    | 13/08/1992               | Password | Niki Apperley         | IBDU      |
| HWinson      | 06/07/1980               | Password | Hagan Winson          | CD        |
| WMeagh       | 28/02/2000               | Password | Walton Meagh          | CD        |
| KBlanckley   | 13/06/1995               | Password | Kelwin Blanckley      | MC        |
| HBiggs       | 26/02/1954               | Password | Hortense Biggs        | UC        |
| MHaddick     | 10/03/1960               | Password | Maurits Haddick       | UC        |
| JAndress     | 15/05/1964               | Password | Janos Andress         | UC        |
| SDimitriev   | 02/10/1975               | Password | Sharity Dimitriev     | UC        |
| JPaule       | 11/08/2000               | Password | Jordon Paule          | CD        |
| CKelling     | 29/07/1995               | Password | Cristian Kelling      | UC        |
| VCurtis      | 27/02/1989               | Password | Vidovik Curtis        | CD        |
| ADepper      | 19/11/1956               | Password | Art Depper            | UC        |
| TIvanenkov   | 15/04/2000               | Password | Toiboid Ivanenkov     | CD        |
| JGallatly    | 12/08/1991               | Password | Julie Gallatly        | CD        |
| CPaike       | 24/02/1975               | Password | Clementina Paike      | CD        |
| GBelin       | 13/10/1953               | Password | Garwin Belin          | UC        |
| JStraker     | 19/10/1986               | Password | Jeremias Straker      | CD        |

</details>

#### Staff accounts

<details>
<summary>Staff User Accounts</summary>

| Username      | Password | Staff Name         | Staff Role           |
| ------------- | -------- | ------------------ | -------------------- |
| 223BSingh161  | Password | Birindar Singh     | Consultant           |
| 223IRajput179 | Password | Isha Rajput        | Consultant           |
| 223THolt323   | Password | Tim Holt           | Consultant           |
| 223SBarton233 | Password | Sarah Barton       | Nurse                |
| 223KBrand924  | Password | Kathy Brand        | Nurse                |
| 223SBishop269 | Password | Samuel Bishop      | Nurse                |
| 223SBurkst191 | Password | Samantha Burkstein | Stoma Nurse          |
| 223RWard603   | Password | Rebecca Ward       | Stoma Nurse          |
| 223AChukwu797 | Password | Adenike Chukwu     | Stoma Nurse          |
| 223OAdakun327 | Password | Oladele Adakunle   | General Practitioner |
| 223AJackso388 | Password | Adam Jackson       | General Practitioner |
| 223AYousse751 | Password | Andrea Youssef     | General Practitioner |

</details>

### Tech

This project is a Single-Page-Application built with ReactJS 18, TypeScript and TailwindCSS with a focus on good UI/UX connected to an ASP.NET 7 MVC backend with implemented role based auth and SignalR websockets. TypeScript was chosen to match the type-safe nature of the backend system and to match the strict requirements of a health-tech setting.

### Cloning and development instructions
---
#### Clone instructions:

1. copy the following code into your terminal after using `cd` to navigate to your desired directory:

```
git clone https://github.com/The-Nightman/NC-News.git
```

2. navigate into the repo folder using `cd`

3. use the following code to create a new repository with the cloned code:
```
git remote set-url origin YOUR_NEW_REPO_URL_HERE
git branch -M main
git push -u origin main
```

4. open the repo inside VsCode using the following: 
```
code .
```
---
#### install dependencies:

all dependencies can be installed with the following code:
```
npm install
```
---
#### Devlopment Environment Variables Setup:

1. Create two new files within the main directory named: `.env.development` and `.env.production`

2. Within the `.env.development` file add the following code:
```javascript
VITE_APP_API_URL=http://your-api-url.com
VITE_APP_HUB_URL=http://your-api-url.com
```
3. Within the `.env.production` file add the following code:
```javascript
VITE_APP_API_URL=http://your-api-url.com
VITE_APP_HUB_URL=http://your-api-url.com
```
4. Import where required with the following:

```javascript
const ENV_VARIABLE_NAME = import.meta.env.VITE_APP_[your variable name];
```
5. Proceed to development, .env.development will be used in the vite development server and .env.production in the preview server and builds.
---
#### Launch project in development mode with Vite:

1. Run the following code in the terminal to begin development with the dev preview server:
```
npm run dev
```
2. Open the localhost address returned in the terminal in the browser of choice either by Ctrl+Click or copy and paste.

3. Save any code edits to refresh the development server and preview changes.

#### Build a production version:

1. run the following code in the terminal to run the build compiler: 
```
npm run build
```
2. run the following code in the terminal to start the preview server and check the production build for errors or faults (repeat this process from steps 1 and 2 following any changes made to the code):
```
npm run preview
```

3. Deploy to your host of choice follow the instructions given in their documentation

**any images that were imported and used in the project using a filepath will not be compiled by webpack, instead import your images directly into your components using the following syntax**

```
import imageName from "../assets/image.png"
```

#### Hosting with Netlify (optional):

1. Create a file named *_redirects* without a file extension within your public directory and add the following rule inside the file:  
```
/* /index.html 200
```

2. Install the Netlify CLI tool by running the following code in the terminal:
```
npm install netlify-cli -g
```

3. Deploy the project to a draft URL using the following code and following the prompts given by Netlify:
```
netlify deploy
```
ensure the deploy path given to Netlify is the build directoy ./build and if done correctly you should be able to preview a draft deployment of the project in order to test before moving to a production deployment.

4. Deploy to a production URL by using the following code and specifiying the build path again:
```
netlify deploy --prod
```
you should now have a production URL e.g. **https://your-site-name.netlify.com**

5. Redeployment can be done by running the following 3 lines of code in the terminal:

```
npm run build
```
```
netlify deploy
```
```
netlify deploy --prod
```

---


#### Node minimum requirements

Node.js v16