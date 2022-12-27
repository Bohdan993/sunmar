import { Email, Micromodal } from "../../../libs/libs.js";

export const initSendForm = (form) => {


    function sendData(form) {
        // Bind the FormData object and the form element
        const FD = new FormData(form);

        let html = `
            <html> 
                <head> 
                    <title>New Lead Form</title> 
                </head> 
                <body>
                  <table>
                    <tr><td><b>Subject:</b></td><td>New Lead</td></tr>`;

        for (const pair of FD.entries()) {
          html += `<tr><td><b>${pair[0].slice(0,1).toUpperCase() + pair[0].slice(1)}:</b></td><td>${pair[1]}</td></tr>`;
        }

        html += `</table></body></html>`;
    
        Email.send({
            SecureToken : "8bba2869-ab94-47b5-a53d-8796e739a5e1",
            To : ['bohdan1trush@gmail.com', 'andrey.balitskyi@4k.com.ua'],
            From : "bohdan1trush@gmail.com",
            Subject : "New lead",
            Body : html
        }).then(
          message => {
            if(message.toLowerCase() === 'ok') {
              Micromodal.close('modal-1');
              Micromodal.show('modal-2');
            }
          }
        )
        .catch(err => {
          console.log(err);
          alert('Oops! Something went wrong. Please, try again later.')
        });
      }
    
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        sendData(form);
      });
}