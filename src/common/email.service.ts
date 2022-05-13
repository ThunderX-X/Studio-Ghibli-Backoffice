import { Inject, Injectable, Scope } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Transporter } from 'nodemailer';
import config from '../config';
const nodemailer = require('nodemailer');

@Injectable({ scope: Scope.DEFAULT })
export class EmailService {
  private transporter: Transporter;

  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {
    const { host, port, secure, user, pass } = configService.email;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });
  }

  async send(to: string, subject: string, text: string) {
    const email = await this.transporter.sendMail({
      from: this.configService.email.user,
      to,
      subject,
      html: this.getMailHTML(text, subject),
    });

    return email.messageId;
  }

  private getMailHTML(text: string, title: string) {
    return `<!DOCTYPE html>
      <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
          <meta charset="utf-8"> 
          <meta name="viewport" content="width=device-width"> 
          <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
          <meta name="x-apple-disable-message-reformatting">  
          <title></title> 
          <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">

          
          <style>

            html,
            body {
                margin: 0 auto !important;
                padding: 0 !important;
                height: 100% !important;
                width: 100% !important;
                background: #f1f1f1;
            }

            * {
                -ms-text-size-adjust: 100%;
                -webkit-text-size-adjust: 100%;
            }

            div[style*="margin: 16px 0"] {
                margin: 0 !important;
            }

            table,
            td {
                mso-table-lspace: 0pt !important;
                mso-table-rspace: 0pt !important;
            }

            table {
                border-spacing: 0 !important;
                border-collapse: collapse !important;
                table-layout: fixed !important;
                margin: 0 auto !important;
            }

            img {
                -ms-interpolation-mode:bicubic;
            }

            a {
                text-decoration: none;
            }

            *[x-apple-data-detectors],  .unstyle-auto-detected-links *,
            .aBn {
                border-bottom: 0 !important;
                cursor: default !important;
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }

            .a6S {
                display: none !important;
                opacity: 0.01 !important;
            }

            .im {
                color: inherit !important;
            }

            img.g-img + div {
                display: none !important;
            }


            @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
                u ~ div .email-container {
                    min-width: 320px !important;
                }
            }
            @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
                u ~ div .email-container {
                    min-width: 375px !important;
                }
            }
            @media only screen and (min-device-width: 414px) {
                u ~ div .email-container {
                    min-width: 414px !important;
                }
            }

                </style>

                

                
                <style>

                  .primary{
              background: #30e3ca;
            }
            .bg_white{
              background: #ffffff;
            }
            .bg_light{
              background: #fafafa;
            }
            .bg_black{
              background: #000000;
            }
            .bg_dark{
              background: rgba(0,0,0,.8);
            }
            .email-section{
              padding:2.5em;
            }

            .btn{
              padding: 10px 15px;
              display: inline-block;
            }
            .btn.btn-primary{
              border-radius: 5px;
              background: #30e3ca;
              color: #ffffff;
            }
            .btn.btn-white{
              border-radius: 5px;
              background: #ffffff;
              color: #000000;
            }
            .btn.btn-white-outline{
              border-radius: 5px;
              background: transparent;
              border: 1px solid #fff;
              color: #fff;
            }
            .btn.btn-black-outline{
              border-radius: 0px;
              background: transparent;
              border: 2px solid #000;
              color: #000;
              font-weight: 700;
            }

            h1,h2,h3,h4,h5,h6{
              font-family: 'Lato', sans-serif;
              color: #000000;
              margin-top: 0;
              font-weight: 400;
            }

            body{
              font-family: 'Lato', sans-serif;
              font-weight: 400;
              font-size: 15px;
              line-height: 1.8;
              color: rgba(0,0,0,.4);
            }

            a{
              color: #30e3ca;
            }

            table{
            }

            .logo h1{
              margin: 0;
            }
            .logo h1 a{
              color: #30e3ca;
              font-size: 28px;
              font-weight: 700;
              font-family: 'Lato', sans-serif;
            }
            
            .logo h2 a{
              color: #30e3ca;
              font-size: 20px;
              font-weight: 700;
              font-family: 'Lato', sans-serif;
            }

            .hero{
              position: relative;
              z-index: 0;
            }

            .hero .text{
              color: rgba(0,0,0,.3);
            }
            .hero .text h2{
              color: #000;
              font-size: 40px;
              margin-bottom: 0;
              font-weight: 400;
              line-height: 1.4;
            }
            .hero .text h3{
              font-size: 24px;
              font-weight: 300;
            }
            .hero .text h2 span{
              font-weight: 600;
              color: #30e3ca;
            }


            .heading-section{
            }
            .heading-section h2{
              color: #000000;
              font-size: 28px;
              margin-top: 0;
              line-height: 1.4;
              font-weight: 400;
            }
            .heading-section .subheading{
              margin-bottom: 20px !important;
              display: inline-block;
              font-size: 13px;
              text-transform: uppercase;
              letter-spacing: 2px;
              color: rgba(0,0,0,.4);
              position: relative;
            }
            .heading-section .subheading::after{
              position: absolute;
              left: 0;
              right: 0;
              bottom: -10px;
              content: '';
              width: 100%;
              height: 2px;
              background: #30e3ca;
              margin: 0 auto;
            }

            .heading-section-white{
              color: rgba(255,255,255,.8);
            }
            .heading-section-white h2{
              font-family: Lato;
              line-height: 1;
              padding-bottom: 0;
            }
            .heading-section-white h2{
              color: #ffffff;
            }
            .heading-section-white .subheading{
              margin-bottom: 0;
              display: inline-block;
              font-size: 13px;
              text-transform: uppercase;
              letter-spacing: 2px;
              color: rgba(255,255,255,.4);
            }


            ul.social{
              padding: 0;
            }
            ul.social li{
              display: inline-block;
              margin-right: 10px;
            }


            .footer{
              border-top: 1px solid rgba(0,0,0,.05);
              color: rgba(0,0,0,.5);
            }
            .footer .heading{
              color: #000;
              font-size: 20px;
            }
            .footer ul{
              margin: 0;
              padding: 0;
            }
            .footer ul li{
              list-style: none;
              margin-bottom: 10px;
            }
            .footer ul li a{
              color: rgba(0,0,0,1);
            }


            @media screen and (max-width: 500px) {


            }


          </style>


      </head>

      <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
        <center style="width: 100%; background-color: #f1f1f1;">
          <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
          </div>
          <div style="max-width: 600px; margin: 0 auto;" class="email-container">
            
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
                <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td class="logo" style="text-align: center;">
                        <h1><a href="#">${title}</a></h1>
                        <h2><a href="#">Studio Ghibli Tracker Backoffice</a></h2>

                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
                  <table>
                    <tr>
                      <td>
                        <div class="text" style="padding: 0 2.5em; text-align: center;">
                          <h2>${text}</h2>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            
            </table>
            <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
              <tr>
                <td valign="middle" class="bg_light footer email-section">
                  <table>
                    <tr>
                      <td valign="top" width="33.333%" style="padding-top: 20px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="text-align: left; padding-right: 10px;">
                              <h3 class="heading">About</h3>
                              <p>Studio Ghibli Backoffice is a Platzi Master [C10] project</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td valign="top" width="33.333%" style="padding-top: 20px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="text-align: center; padding-left: 5px; padding-right: 5px;">
                              <h3 class="heading">Contact Info</h3>
                              <ul>
                                <li><a href="mailto:studioghiblitrackerbackoffice@gmail.com">
                                  <span class="text">
                                    <img width="28" height="28" src="data:image/png;base64,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" alt="Mail Icon" />
                                  </span>
                              </a>
                              </li>
                              </ul>
                            </td>
                          </tr>
                        </table>
                      </td>
                      <td valign="top" width="33.333%" style="padding-top: 20px;">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                          <tr>
                            <td style="text-align: left; padding-left: 10px;">
                              <h3 class="heading">Useful Links</h3>
                              <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About</a></li>
                              </ul>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </center>
      </body>
      </html>`;
  }
}
