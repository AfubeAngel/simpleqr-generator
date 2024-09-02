/* 
1. Use the inquirer npm package (easily embeddable and beautiful command line interface for Node.js) to get user input.
2. Use the qr-image npm package (QR Code generator that generate image in png, svg, eps and pdf formats) to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.

REFERENCE LINKS 
npm package for inquirer - https://www.npmjs.com/package/inquirer
npm package for qr-image - https://www.npmjs.com/package/qr-image
fs write to file - https://nodejs.org/docs/latest/api/fs.html#fswritefilefile-data-options-callback
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    {
    message: "What is the url you want to covert to QR ? ",
    name: "URL",
  },
  ])
  .then((answers) => {
    //with the reponse to the prompt, perform the actions below
    console.log(answers);
    const name = answers.URL;

    //create the qr using the url provided in the answer
    var qr_svg = qr.image(name);
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));

    //create a file that stores the answers provided
    fs.writeFile('QRuRL.txt', name, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    }); 
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
