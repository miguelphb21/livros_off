const nodemailer = require('nodemailer'); // Importa o módulo 'nodemailer', que será utilizado para enviar e-mails a partir da aplicação de forma simples e eficiente.

// Configuração do serviço de e-mail
const transporter = nodemailer.createTransport({
 service: 'gmail', // Use o serviço de e-mail de sua escolha
host: 'smtp.gmail.com', // Use o serviço de e-mail de sua escolha
port: 465,
secure: true, //true se utilizar porta 465, false outras portas																   
auth: {
user: process.env.EMAIL_USER, // Seu e-mail definido nas variáveis de ambiente
pass: process.env.EMAIL_PASS // Sua senha de e-mail definida nas variáveis de ambiente
 }
});

// Função para enviar e-mail
const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Erro ao enviar e-mail:', error);
    }
    console.log('E-mail enviado:', info.response);
  });
};


// Exporta a função 'sendEmail' para que ela possa ser utilizada em outros módulos da aplicação, permitindo o envio de e-mails a partir desses módulos.
module.exports = { sendEmail };