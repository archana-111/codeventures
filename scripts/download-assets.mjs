import fs from 'fs';
import path from 'path';
import https from 'https';

const assets = [
  // Logos
  { url: 'https://www.codeventures.com/assets/revamp_images/f3.svg', dest: 'public/assets/logos/forbes.svg' },
  { url: 'https://www.codeventures.com/assets/revamp_images/f2.svg', dest: 'public/assets/logos/business-insider.svg' },
  { url: 'https://www.codeventures.com/assets/revamp_images/f4.svg', dest: 'public/assets/logos/mint.svg' },
  { url: 'https://www.codeventures.com/assets/revamp_images/f1.svg', dest: 'public/assets/logos/entrepreneur.svg' },
  { url: 'https://www.codeventures.com/assets/revamp_images/f0.svg', dest: 'public/assets/logos/news18.svg' },
  
  // Partners
  { url: 'https://www.codeventures.com/assets/revamp_images/aws-logo.svg', dest: 'public/assets/partners/aws.svg' },
  { url: 'https://www.codeventures.com/assets/revamp_images/zendesk-logo.svg', dest: 'public/assets/partners/zendesk.svg' },
  { url: 'https://www.codeventures.com/assets/revamp_images/stripe-logo.svg', dest: 'public/assets/partners/stripe.svg' },
  { url: 'https://www.codeventures.com/assets/revamp_images/google-cloud-logo.svg', dest: 'public/assets/partners/google-cloud.svg' },
  { url: 'https://www.codeventures.com/assets/revamp_images/hubspot-logo.svg', dest: 'public/assets/partners/hubspot.svg' },
  { url: 'https://www.codeventures.com/assets/revamp_images/apollo-logo.svg', dest: 'public/assets/partners/apollo.svg' },

  // Founder & Testimonials
  { url: 'https://www.codeventures.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Faji_founder.dc187106.webp&w=640&q=75', dest: 'public/assets/team/aji-abraham.webp' },
  { url: 'https://www.codeventures.com/_next/image?url=%2Fassets%2Frevamp_images%2Ftesti_usr1.png&w=128&q=75', dest: 'public/assets/testimonials/chris-zelenka.png' },
  { url: 'https://www.codeventures.com/_next/image?url=%2Fassets%2Frevamp_images%2Ftesti_usr2.png&w=128&q=75', dest: 'public/assets/testimonials/tyler-novae.png' },
  { url: 'https://www.codeventures.com/_next/image?url=%2Fassets%2Frevamp_images%2Ftesti_usr.png&w=128&q=75', dest: 'public/assets/testimonials/shari-morin.png' },

  // Portfolio
  { url: 'https://www.codeventures.com/assets/img/TinyBits.png', dest: 'public/assets/portfolio/tinybits.png' },
  { url: 'https://www.codeventures.com/assets/img/FLEXSHFT.png', dest: 'public/assets/portfolio/flexshft.png' },
  { url: 'https://www.codeventures.com/assets/img/project-2-min.jpg', dest: 'public/assets/portfolio/social-defender.jpg' },
  { url: 'https://www.codeventures.com/assets/img/Carunify.png', dest: 'public/assets/portfolio/carunify.png' },
  { url: 'https://www.codeventures.com/assets/img/Mazeflowerlanding.png', dest: 'public/assets/portfolio/mazeflower.png' },
  { url: 'https://www.codeventures.com/assets/img/Orb-Tattoo-Tattoos.png', dest: 'public/assets/portfolio/orb-tattoo.png' },
  { url: 'https://www.codeventures.com/assets/img/project-5-min.jpg', dest: 'public/assets/portfolio/alice.jpg' },
  { url: 'https://www.codeventures.com/assets/img/project-6-min.jpg', dest: 'public/assets/portfolio/locologic.jpg' },
  { url: 'https://www.codeventures.com/assets/img/project-71-min.jpg', dest: 'public/assets/portfolio/sohive.jpg' },
  { url: 'https://www.codeventures.com/assets/img/project-8-min.jpg', dest: 'public/assets/portfolio/ernie.jpg' },
  { url: 'https://www.codeventures.com/assets/img/casecrush.jpg', dest: 'public/assets/portfolio/casecrush.jpg' },
  { url: 'https://www.codeventures.com/assets/img/antistress.jpg', dest: 'public/assets/portfolio/antistress.jpg' },
  { url: 'https://www.codeventures.com/assets/img/buildez.jpg', dest: 'public/assets/portfolio/buildez.jpg' },
  { url: 'https://www.codeventures.com/assets/img/my-workbalance.png', dest: 'public/assets/portfolio/my-workbalance.png' },
];

async function downloadFile(url, dest) {
  const dir = path.dirname(dest);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        console.error(`Failed ${url}: status ${res.statusCode}`);
        return resolve(false);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Saved: ${dest}`);
        resolve(true);
      });
    }).on('error', (err) => {
      console.error(`Error ${url}:`, err.message);
      resolve(false);
    });
  });
}

async function run() {
  for (const item of assets) {
    await downloadFile(item.url, item.dest);
  }
  console.log('All assets processed!');
}

run();
