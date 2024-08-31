document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#single-email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  // Turn off default button send behaviour
  document.querySelector('#compose-form').addEventListener("submit", function(evt){
    evt.preventDefault();
    //window.history.back();
  }, true);

  // Add event listener to send email button
  document.querySelector('input[type="submit"]').addEventListener('click', send_email);
}

function load_mailbox(mailbox) {

  // Store current view in variable
  current_view = mailbox;
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#single-email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Add the email list container
  if(document.getElementById("emails-table") == null){
    const element = document.createElement('div');
    element.id = "emails-table";

  document.querySelector('div[id="emails-view"]').append(element);
  }

  let tableBody = document.querySelector('div[id="emails-table"]');

  // Clear old emails
  tableBody.innerHTML = '';

  // Fetch the emails
  fetch(`emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => processEmails(emails));

  let processEmails = (emails) => {
    emails.forEach(function (email){
      console.log(email);
      const temp_element = document.createElement('a');
      temp_element.classList.add('email-link');
      temp_element.innerHTML= `
            <div class="${email.read?'read':'unread'} row border m-1">
                <div class="col-sm-3 email-sender">${email.sender}</div>
                <div class="col-sm-6 email-title">${email.subject}</div>
                <div class="col-sm-3 email-date">${email.timestamp}</div>
            </div>`;
      tableBody.append(temp_element);
      temp_element.addEventListener('click', ()=>display_email(email.id));
    })
  }
}

function send_email(){
  // get email data
  let recipients = document.querySelector('#compose-recipients').value;
  let subject = document.querySelector('#compose-subject').value;
  let body = document.querySelector("#compose-body").value;

  fetch('/emails', {
  method: 'POST',
  body: JSON.stringify({
      recipients: `${recipients}`,
      subject: `${subject}`,
      body: `${body}`
      })
  })
  .then(response => response.json())
  .then(()=>load_mailbox('sent'));
}