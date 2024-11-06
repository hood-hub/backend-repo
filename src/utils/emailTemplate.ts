// export const verifyEmail = (token: number, firstName: string) => {
//   return `
// <!DOCTYPE html>
// <html xmlns="http://www.w3.org/1999/xhtml">
//   <head>
//     <title></title>
//     <meta content="IE=edge" http-equiv="X-UA-Compatible" />
//     <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
//     <meta content="width=device-width,initial-scale=1" name="viewport" />
//     <style type="text/css">
//       #outlook a {
//         padding: 0;
//       }

//       body {
//         margin: 0;
//         padding: 0;
//         -webkit-text-size-adjust: 100%;
//         -ms-text-size-adjust: 100%;
//       }

//       table,
//       td {
//         border-collapse: collapse;
//       }

//       img {
//         border: 0;
//         height: auto;
//         line-height: 100%;
//         outline: none;
//         text-decoration: none;
//         -ms-interpolation-mode: bicubic;
//       }

//       p {
//         display: block;
//         margin: 13px 0;
//       }
//       .button-verify {
//         z-index: 1000;
//         cursor: pointer;
//       }
//     </style>
//     <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700" rel="stylesheet" type="text/css" />
//     <style type="text/css">
//       @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700);
//     </style>
//     <style type="text/css">
//       @media only screen and (min-width: 480px) {
//         .mj-column-per-100 {
//           width: 100% !important;
//           max-width: 100%;
//         }
//       }
//     </style>
//     <style media="screen and (min-width:480px)">
//       .moz-text-html .mj-column-per-100 {
//         width: 100% !important;
//         max-width: 100%;
//       }
//     </style>
//     <style type="text/css">
//       @media only screen and (max-width: 480px) {
//         table.mj-full-width-mobile {
//           width: 100% !important;
//         }

//         td.mj-full-width-mobile {
//           width: auto !important;
//         }
//       }
//     </style>
//   </head>
//   <body style="word-spacing: normal; background-color: #fafbfc">
//     <div style="background-color: #fafbfc">
//       <div style="margin: 0px auto; max-width: 600px">
//         <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
//           <tbody>
//             <tr>
//               <td style="direction: ltr; font-size: 0px; text-align: center">
//                 <div
//                   class="mj-column-per-100 mj-outlook-group-fix"
//                   style="
//                     font-size: 0px;
//                     text-align: left;
//                     direction: ltr;
//                     display: inline-block;
//                     vertical-align: middle;
//                     width: 100%;
//                   "
//                 >
//                   <table
//                     border="0"
//                     cellpadding="0"
//                     cellspacing="0"
//                     role="presentation"
//                     style="vertical-align: middle"
//                     width="100%"
//                   >
//                     <tbody>
//                       <tr>
//                         <td align="center" style="font-size: 0px; word-break: break-word">
//                           <table
//                             border="0"
//                             cellpadding="0"
//                             cellspacing="0"
//                             role="presentation"
//                             style="border-collapse: collapse; border-spacing: 0px"
//                           >
//                             <tbody>
//                               <tr>
//                                 <td style="width: 125px">
//                                   <img
//                                     height="auto"
//                                     src="https://hoodhub.blob.core.windows.net/hoodhub-container/HoodHubFullLogo-1728671229794-.png"
//                                     style="
//                                       border: 0;
//                                       display: block;
//                                       outline: none;
//                                       text-decoration: none;
//                                       height: auto;
//                                       width: 100%;
//                                       font-size: 13px;
//                                     "
//                                     width="125"
//                                   />
//                                 </td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div style="background: #ffffff; background-color: #ffffff; margin: 0px auto; max-width: 600px">
//         <table
//           align="center"
//           border="0"
//           cellpadding="0"
//           cellspacing="0"
//           role="presentation"
//           style="background: #ffffff; background-color: #ffffff; width: 100%"
//         >
//           <tbody>
//             <tr>
//               <td
//                 style="
//                   direction: ltr;
//                   font-size: 0px;
//                   padding: 20px 0;
//                   padding-bottom: 20px;
//                   padding-top: 20px;
//                   text-align: center;
//                 "
//               >
//                 <div
//                   class="mj-column-per-100 mj-outlook-group-fix"
//                   style="
//                     font-size: 0px;
//                     text-align: left;
//                     direction: ltr;
//                     display: inline-block;
//                     vertical-align: middle;
//                     width: 100%;
//                   "
//                 >
//                   <table
//                     border="0"
//                     cellpadding="0"
//                     cellspacing="0"
//                     role="presentation"
//                     style="vertical-align: middle"
//                     width="100%"
//                   >
//                     <tbody>
//                       <tr>
//                         <td
//                           align="center"
//                           style="
//                             font-size: 0px;
//                             padding: 10px 25px;
//                             padding-right: 25px;
//                             padding-left: 25px;
//                             word-break: break-word;
//                           "
//                         >
//                           <div
//                             style="
//                               font-family: open Sans Helvetica, Arial, sans-serif;
//                               font-size: 16px;
//                               line-height: 1;
//                               text-align: center;
//                               color: #000000;
//                             "
//                           >
//                             <p style="font-size: 14px">Hello User,</p>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td
//                           align="center"
//                           style="
//                             font-size: 0px;
//                             padding: 10px 25px;
//                             padding-right: 25px;
//                             padding-left: 25px;
//                             word-break: break-word;
//                           "
//                         >
//                           <div
//                             style="
//                               font-family: open Sans Helvetica, Arial, sans-serif;
//                               font-size: 16px;
//                               line-height: 1;
//                               text-align: center;
//                               color: #000000;
//                             "
//                           >
//                             <div>Your One Time Password To Verify your Account is:</div>
//                             <h2
//                               style="
//                                 font-family: open Sans Helvetica, Arial, sans-serif;
//                                 font-size: 18px;
//                                 line-height: 1;
//                                 text-align: center;
//                                 color: #000000;
//                               "
//                             >
//                               ${token}
//                             </h2>
//                             <p style="color: grey; font-size: 12px">
//                               The code will expire in 10 mins so please finish your action asap.
//                             </p>
//                             <!-- <div class="button-verify">
//                               <!-- <a href="{{url}}">
//                                 <button style="margin-top: 24px; margin-bottom: 24px; background-color: turquoise; font-size: 16px; border: none; border-radius: 5px; color: #333;  padding: 15px 32px">Verify Account</button>
//                               </a> -->
//                             <!-- </div> -->

//                             <!-- </div> -->
//                             <!-- <div style="font-family: open Sans Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1; text-align: center; color: #000000">
//                           </div> -->
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word">
//                           <div
//                             style="
//                               font-family: open Sans Helvetica, Arial, sans-serif;
//                               font-size: 12px;
//                               font-weight: bold;
//                               line-height: 1;
//                               text-align: center;
//                               color: #000000;
//                             "
//                           ></div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td
//                           align="center"
//                           style="
//                             font-size: 0px;
//                             padding: 10px 25px;
//                             padding-right: 16px;
//                             padding-left: 25px;
//                             word-break: break-word;
//                           "
//                         >
//                           <div
//                             style="
//                               font-family: open Sans Helvetica, Arial, sans-serif;
//                               font-size: 10px;
//                               line-height: 1;
//                               text-align: center;
//                               color: #000000;
//                             "
//                           >
//                             If you didn't request this, you can ignore this email or let us know.
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td
//                           align="center"
//                           style="
//                             font-size: 0px;
//                             padding: 10px 25px;
//                             padding-right: 25px;
//                             padding-left: 25px;
//                             word-break: break-word;
//                           "
//                         >
//                           <div
//                             style="
//                               font-family: open Sans Helvetica, Arial, sans-serif;
//                               font-size: 12px;
//                               line-height: 1;
//                               text-align: center;
//                               color: #000000;
//                             "
//                           >
//                             Thanks!<br /><br />
//                             <p class="copyright">BPC team.</p>
//                           </div>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </body>
// </html>
// `;
// };

export const verifyEmail = (token: number, firstName: string) => {
  return `
    <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title></title>
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta content="width=device-width,initial-scale=1" name="viewport" />
    <style type="text/css">
      #outlook a {
        padding: 0;
      }

      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table,
      td {
        border-collapse: collapse;
      }

      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      p {
        display: block;
        margin: 13px 0;
      }
      .button-verify {
        z-index: 1000;
        cursor: pointer;
      }
    </style>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700" rel="stylesheet" type="text/css" />
    <style type="text/css">
      @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700);
    </style>
    <style type="text/css">
      @media only screen and (min-width: 480px) {
        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
      }
    </style>
    <style media="screen and (min-width:480px)">
      .moz-text-html .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    </style>
    <style type="text/css">
      @media only screen and (max-width: 480px) {
        table.mj-full-width-mobile {
          width: 100% !important;
        }

        td.mj-full-width-mobile {
          width: auto !important;
        }
      }
    </style>
  </head>
  <body style="word-spacing: normal; background-color: #fafbfc">
    <div style="background-color: #fafbfc">
      <div style="margin: 0px auto; max-width: 600px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  padding-bottom: 20px;
                  padding-top: 20px;
                  text-align: center;
                "
              >
                <div
                  class="mj-column-per-100 mj-outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: middle;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: middle"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td align="center" style="font-size: 0px; word-break: break-word">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="border-collapse: collapse; border-spacing: 0px"
                          >
                            <tbody>
                              <tr>
                                <td style="width: 125px">
                                  <img
                                    height="auto"
                                    src="https://hoodhub.blob.core.windows.net/hoodhub-container/HoodHubFullLogo-1728671229794-.png"
                                    style="
                                      border: 0;
                                      display: block;
                                      outline: none;
                                      text-decoration: none;
                                      height: auto;
                                      width: 100%;
                                      font-size: 13px;
                                    "
                                    width="125"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="background: #ffffff; background-color: #ffffff; margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background: #ffffff; background-color: #ffffff; width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  padding-bottom: 20px;
                  padding-top: 20px;
                  text-align: center;
                "
              >
                <div
                  class="mj-column-per-100 mj-outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: middle;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: middle"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-right: 25px;
                            padding-left: 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: open Sans Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              line-height: 1;
                              text-align: center;
                              color: #000000;
                            "
                          >
                            <p style="font-size: 14px">Hi, ${firstName}</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-right: 25px;
                            padding-left: 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: open Sans Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              line-height: 1;
                              text-align: center;
                              color: #000000;
                            "
                          >
                            <div>Welcome to Hoodhub! We're excited to have you join our community. To get started, please verify your email address by entering the code below:</div>
                            <h2
                              style="
                                font-family: open Sans Helvetica, Arial, sans-serif;
                                font-size: 18px;
                                line-height: 1;
                                text-align: center;
                                color: #000000;
                              "
                            >
                              Code: ${token}
                            </h2>
                            <p style="color: grey; font-size: 12px">
                              The code will expire in 24 hours. If you don't verify your email within this time, you'll need to request a new verification code.
                            </p>
                            <p style="color: grey; font-size: 12px">
                              If you didn't sign up for HoodHub, please ignore this email.
                            </p>
                            <p style="color: grey; font-size: 12px">
                              Need help? Contact our support team at support@hoodhub.com
                            </p>
                          </div>
                          <!-- <tr>
                            <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word">
                              <div
                                style="
                                  font-family: open Sans Helvetica, Arial, sans-serif;
                                  font-size: 12px;
                                  font-weight: bold;
                                  line-height: 1;
                                  text-align: center;
                                  color: #000000;
                                "
                              ></div>
                            </td>
                          </tr>
                          <div
                            style="
                              font-family: open Sans Helvetica, Arial, sans-serif;
                              font-size: 12px;
                              line-height: 1;
                              text-align: center;
                              color: #000000;
                            "
                          >
                            
                          </div>
                        </td>
                      </tr> -->
                          <tr>
                            <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word">
                              <div
                                style="
                                  font-family: open Sans Helvetica, Arial, sans-serif;
                                  font-size: 12px;
                                  font-weight: bold;
                                  line-height: 1;
                                  text-align: center;
                                  color: #000000;
                                "
                              ></div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              style="
                                font-size: 0px;
                                padding: 10px 25px;
                                padding-right: 16px;
                                padding-left: 25px;
                                word-break: break-word;
                              "
                            >
                              <div
                                style="
                                  font-family: open Sans Helvetica, Arial, sans-serif;
                                  font-size: 10px;
                                  line-height: 1;
                                  text-align: center;
                                  color: #000000;
                                "
                              >
                                Welcome to the neighborhood!<br /><br />
                                The HoodHub Team <br /><br />
                                This is an automated message, please do not reply
                                to this email.
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              style="
                                font-size: 0px;
                                padding: 10px 25px;
                                padding-right: 25px;
                                padding-left: 25px;
                                word-break: break-word;
                              "
                            >
                              <div
                                style="
                                  font-family: open Sans Helvetica, Arial, sans-serif;
                                  font-size: 12px;
                                  line-height: 1;
                                  text-align: center;
                                  color: #000000;
                                "
                              >
                                <p class="copyright">2024 HoodHub. All rights reserved.</p>
                              </div>
                            </td>
                          </tr>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
</html>

    `;
};

export const forgotPasswordEmail = (token: number, firstName: string) => {
  return `
    <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title></title>
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta content="width=device-width,initial-scale=1" name="viewport" />
    <style type="text/css">
      #outlook a {
        padding: 0;
      }

      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table,
      td {
        border-collapse: collapse;
      }

      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      p {
        display: block;
        margin: 13px 0;
      }
      .button-verify {
        z-index: 1000;
        cursor: pointer;
      }
    </style>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700" rel="stylesheet" type="text/css" />
    <style type="text/css">
      @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700);
    </style>
    <style type="text/css">
      @media only screen and (min-width: 480px) {
        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
      }
    </style>
    <style media="screen and (min-width:480px)">
      .moz-text-html .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    </style>
    <style type="text/css">
      @media only screen and (max-width: 480px) {
        table.mj-full-width-mobile {
          width: 100% !important;
        }

        td.mj-full-width-mobile {
          width: auto !important;
        }
      }
    </style>
  </head>
  <body style="word-spacing: normal; background-color: #fafbfc">
    <div style="background-color: #fafbfc">
      <div style="margin: 0px auto; max-width: 600px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  padding-bottom: 20px;
                  padding-top: 20px;
                  text-align: center;
                "
              >
                <div
                  class="mj-column-per-100 mj-outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: middle;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: middle"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td align="center" style="font-size: 0px; word-break: break-word">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="border-collapse: collapse; border-spacing: 0px"
                          >
                            <tbody>
                              <tr>
                                <td style="width: 125px">
                                  <img
                                    height="auto"
                                    src="https://hoodhub.blob.core.windows.net/hoodhub-container/HoodHubFullLogo-1728671229794-.png"
                                    style="
                                      border: 0;
                                      display: block;
                                      outline: none;
                                      text-decoration: none;
                                      height: auto;
                                      width: 100%;
                                      font-size: 13px;
                                    "
                                    width="125"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="background: #ffffff; background-color: #ffffff; margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background: #ffffff; background-color: #ffffff; width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  padding-bottom: 20px;
                  padding-top: 20px;
                  text-align: center;
                "
              >
                <div
                  class="mj-column-per-100 mj-outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: middle;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: middle"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-right: 25px;
                            padding-left: 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: open Sans Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              line-height: 1;
                              text-align: center;
                              color: #000000;
                            "
                          >
                            <p style="font-size: 14px">Hi, ${firstName}</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-right: 25px;
                            padding-left: 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: open Sans Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              line-height: 1;
                              text-align: center;
                              color: #000000;
                            "
                          >
                            <div>You've requested to reset your password. Here's your verification code:</div>
                            <h2
                              style="
                                font-family: open Sans Helvetica, Arial, sans-serif;
                                font-size: 18px;
                                line-height: 1;
                                text-align: center;
                                color: #000000;
                              "
                            >
                              Code: ${token}
                            </h2>
                            <p style="color: grey; font-size: 12px">
                              Enter this code in the app to set a new password. This code will expire in 15 minutes.
                            </p>
                            <p style="color: grey; font-size: 12px">
                              If you didn't request this, please ignore this email.
                            </p>
                            <p style="color: grey; font-size: 12px">
                              Need help? Contact our support team at support@hoodhub.com
                            </p>
                          </div>
                          <!-- <tr>
                            <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word">
                              <div
                                style="
                                  font-family: open Sans Helvetica, Arial, sans-serif;
                                  font-size: 12px;
                                  font-weight: bold;
                                  line-height: 1;
                                  text-align: center;
                                  color: #000000;
                                "
                              ></div>
                            </td>
                          </tr>
                          <div
                            style="
                              font-family: open Sans Helvetica, Arial, sans-serif;
                              font-size: 12px;
                              line-height: 1;
                              text-align: center;
                              color: #000000;
                            "
                          >
                            
                          </div>
                        </td>
                      </tr> -->
                          <tr>
                            <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word">
                              <div
                                style="
                                  font-family: open Sans Helvetica, Arial, sans-serif;
                                  font-size: 12px;
                                  font-weight: bold;
                                  line-height: 1;
                                  text-align: center;
                                  color: #000000;
                                "
                              ></div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              style="
                                font-size: 0px;
                                padding: 10px 25px;
                                padding-right: 16px;
                                padding-left: 25px;
                                word-break: break-word;
                              "
                            >
                              <div
                                style="
                                  font-family: open Sans Helvetica, Arial, sans-serif;
                                  font-size: 10px;
                                  line-height: 1;
                                  text-align: center;
                                  color: #000000;
                                "
                              >
                                Best regards,<br /><br />
                                The HoodHub Team <br /><br />
                                This is an automated message, please do not reply
                                to this email.
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              style="
                                font-size: 0px;
                                padding: 10px 25px;
                                padding-right: 25px;
                                padding-left: 25px;
                                word-break: break-word;
                              "
                            >
                              <div
                                style="
                                  font-family: open Sans Helvetica, Arial, sans-serif;
                                  font-size: 12px;
                                  line-height: 1;
                                  text-align: center;
                                  color: #000000;
                                "
                              >
                                <p class="copyright">2024 HoodHub. All rights reserved.</p>
                              </div>
                            </td>
                          </tr>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
</html>

    `;
};

export const resendOTPEmail = (token: number, firstName: string) => {
  return `
    <!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title></title>
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta content="width=device-width,initial-scale=1" name="viewport" />
    <style type="text/css">
      #outlook a {
        padding: 0;
      }

      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }

      table,
      td {
        border-collapse: collapse;
      }

      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }

      p {
        display: block;
        margin: 13px 0;
      }
      .button-verify {
        z-index: 1000;
        cursor: pointer;
      }
    </style>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700" rel="stylesheet" type="text/css" />
    <style type="text/css">
      @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700);
    </style>
    <style type="text/css">
      @media only screen and (min-width: 480px) {
        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
      }
    </style>
    <style media="screen and (min-width:480px)">
      .moz-text-html .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    </style>
    <style type="text/css">
      @media only screen and (max-width: 480px) {
        table.mj-full-width-mobile {
          width: 100% !important;
        }

        td.mj-full-width-mobile {
          width: auto !important;
        }
      }
    </style>
  </head>
  <body style="word-spacing: normal; background-color: #fafbfc">
    <div style="background-color: #fafbfc">
      <div style="margin: 0px auto; max-width: 600px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  padding-bottom: 20px;
                  padding-top: 20px;
                  text-align: center;
                "
              >
                <div
                  class="mj-column-per-100 mj-outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: middle;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: middle"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td align="center" style="font-size: 0px; word-break: break-word">
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="border-collapse: collapse; border-spacing: 0px"
                          >
                            <tbody>
                              <tr>
                                <td style="width: 125px">
                                  <img
                                    height="auto"
                                    src="https://hoodhub.blob.core.windows.net/hoodhub-container/HoodHubFullLogo-1728671229794-.png"
                                    style="
                                      border: 0;
                                      display: block;
                                      outline: none;
                                      text-decoration: none;
                                      height: auto;
                                      width: 100%;
                                      font-size: 13px;
                                    "
                                    width="125"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style="background: #ffffff; background-color: #ffffff; margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background: #ffffff; background-color: #ffffff; width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  padding-bottom: 20px;
                  padding-top: 20px;
                  text-align: center;
                "
              >
                <div
                  class="mj-column-per-100 mj-outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: middle;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: middle"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-right: 25px;
                            padding-left: 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: open Sans Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              line-height: 1;
                              text-align: center;
                              color: #000000;
                            "
                          >
                            <p style="font-size: 14px">Hi, ${firstName}</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-right: 25px;
                            padding-left: 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: open Sans Helvetica, Arial, sans-serif;
                              font-size: 14px;
                              line-height: 1;
                              text-align: center;
                              color: #000000;
                            "
                          >
                            <div>We noticed that you requested an OTP. Complete your action by entering the code below:</div>
                            <h2
                              style="
                                font-family: open Sans Helvetica, Arial, sans-serif;
                                font-size: 18px;
                                line-height: 1;
                                text-align: center;
                                color: #000000;
                              "
                            >
                              Code: ${token}
                            </h2>
                            <p style="color: grey; font-size: 12px">
                              The code will expire in 15 minutes.
                            </p>
                            <p style="color: grey; font-size: 12px">
                              If you didn't request this, please ignore this email.
                            </p>
                            <p style="color: grey; font-size: 12px">
                              Need help? Contact our support team at support@hoodhub.com
                            </p>
                          </div>
                          <!-- <tr>
                            <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word">
                              <div
                                style="
                                  font-family: open Sans Helvetica, Arial, sans-serif;
                                  font-size: 12px;
                                  font-weight: bold;
                                  line-height: 1;
                                  text-align: center;
                                  color: #000000;
                                "
                              ></div>
                            </td>
                          </tr>
                          <div
                            style="
                              font-family: open Sans Helvetica, Arial, sans-serif;
                              font-size: 12px;
                              line-height: 1;
                              text-align: center;
                              color: #000000;
                            "
                          >
                            
                          </div>
                        </td>
                      </tr> -->
                          <tr>
                            <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word">
                              <div
                                style="
                                  font-family: open Sans Helvetica, Arial, sans-serif;
                                  font-size: 12px;
                                  font-weight: bold;
                                  line-height: 1;
                                  text-align: center;
                                  color: #000000;
                                "
                              ></div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              style="
                                font-size: 0px;
                                padding: 10px 25px;
                                padding-right: 16px;
                                padding-left: 25px;
                                word-break: break-word;
                              "
                            >
                              <div
                                style="
                                  font-family: open Sans Helvetica, Arial, sans-serif;
                                  font-size: 10px;
                                  line-height: 1;
                                  text-align: center;
                                  color: #000000;
                                "
                              >
                                Welcome to the neighborhood!<br /><br />
                                The HoodHub Team <br /><br />
                                This is an automated message, please do not reply
                                to this email.
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td
                              align="center"
                              style="
                                font-size: 0px;
                                padding: 10px 25px;
                                padding-right: 25px;
                                padding-left: 25px;
                                word-break: break-word;
                              "
                            >
                              <div
                                style="
                                  font-family: open Sans Helvetica, Arial, sans-serif;
                                  font-size: 12px;
                                  line-height: 1;
                                  text-align: center;
                                  color: #000000;
                                "
                              >
                                <p class="copyright">2024 HoodHub. All rights reserved.</p>
                              </div>
                            </td>
                          </tr>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </body>
</html>

    `;
};

// export const resendOTPEmail = (token: number) => {
//   return `
//     <!DOCTYPE html>
// <html xmlns="http://www.w3.org/1999/xhtml">
//   <head>
//     <title></title>
//     <meta content="IE=edge" http-equiv="X-UA-Compatible" />
//     <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
//     <meta content="width=device-width,initial-scale=1" name="viewport" />
//     <style type="text/css">
//       #outlook a {
//         padding: 0;
//       }

//       body {
//         margin: 0;
//         padding: 0;
//         -webkit-text-size-adjust: 100%;
//         -ms-text-size-adjust: 100%;
//       }

//       table,
//       td {
//         border-collapse: collapse;
//       }

//       img {
//         border: 0;
//         height: auto;
//         line-height: 100%;
//         outline: none;
//         text-decoration: none;
//         -ms-interpolation-mode: bicubic;
//       }

//       p {
//         display: block;
//         margin: 13px 0;
//       }
//       .button-verify {
//         z-index: 1000;
//         cursor: pointer;
//       }
//     </style>
//     <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700" rel="stylesheet" type="text/css" />
//     <style type="text/css">
//       @import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700);
//     </style>
//     <style type="text/css">
//       @media only screen and (min-width: 480px) {
//         .mj-column-per-100 {
//           width: 100% !important;
//           max-width: 100%;
//         }
//       }
//     </style>
//     <style media="screen and (min-width:480px)">
//       .moz-text-html .mj-column-per-100 {
//         width: 100% !important;
//         max-width: 100%;
//       }
//     </style>
//     <style type="text/css">
//       @media only screen and (max-width: 480px) {
//         table.mj-full-width-mobile {
//           width: 100% !important;
//         }

//         td.mj-full-width-mobile {
//           width: auto !important;
//         }
//       }
//     </style>
//   </head>
//   <body style="word-spacing: normal; background-color: #fafbfc">
//     <div style="background-color: #fafbfc">
//       <div style="margin: 0px auto; max-width: 600px">
//         <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width: 100%">
//           <tbody>
//             <tr>
//               <td
//                 style="
//                   direction: ltr;
//                   font-size: 0px;
//                   padding: 20px 0;
//                   padding-bottom: 20px;
//                   padding-top: 20px;
//                   text-align: center;
//                 "
//               >
//                 <div
//                   class="mj-column-per-100 mj-outlook-group-fix"
//                   style="
//                     font-size: 0px;
//                     text-align: left;
//                     direction: ltr;
//                     display: inline-block;
//                     vertical-align: middle;
//                     width: 100%;
//                   "
//                 >
//                   <table
//                     border="0"
//                     cellpadding="0"
//                     cellspacing="0"
//                     role="presentation"
//                     style="vertical-align: middle"
//                     width="100%"
//                   >
//                     <tbody>
//                       <tr>
//                         <td align="center" style="font-size: 0px; word-break: break-word">
//                           <table
//                             border="0"
//                             cellpadding="0"
//                             cellspacing="0"
//                             role="presentation"
//                             style="border-collapse: collapse; border-spacing: 0px"
//                           >
//                             <tbody>
//                               <tr>
//                                 <td style="width: 125px">
//                                   <img
//                                     height="auto"
//                                     src="https://hoodhub.blob.core.windows.net/hoodhub-container/HoodHubFullLogo-1728671229794-.png"
//                                     style="
//                                       border: 0;
//                                       display: block;
//                                       outline: none;
//                                       text-decoration: none;
//                                       height: auto;
//                                       width: 100%;
//                                       font-size: 13px;
//                                     "
//                                     width="125"
//                                   />
//                                 </td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       <div style="background: #ffffff; background-color: #ffffff; margin: 0px auto; max-width: 600px">
//         <table
//           align="center"
//           border="0"
//           cellpadding="0"
//           cellspacing="0"
//           role="presentation"
//           style="background: #ffffff; background-color: #ffffff; width: 100%"
//         >
//           <tbody>
//             <tr>
//               <td
//                 style="
//                   direction: ltr;
//                   font-size: 0px;
//                   padding: 20px 0;
//                   padding-bottom: 20px;
//                   padding-top: 20px;
//                   text-align: center;
//                 "
//               >
//                 <div
//                   class="mj-column-per-100 mj-outlook-group-fix"
//                   style="
//                     font-size: 0px;
//                     text-align: left;
//                     direction: ltr;
//                     display: inline-block;
//                     vertical-align: middle;
//                     width: 100%;
//                   "
//                 >
//                   <table
//                     border="0"
//                     cellpadding="0"
//                     cellspacing="0"
//                     role="presentation"
//                     style="vertical-align: middle"
//                     width="100%"
//                   >
//                     <tbody>
//                       <tr>
//                         <td
//                           align="center"
//                           style="
//                             font-size: 0px;
//                             padding: 10px 25px;
//                             padding-right: 25px;
//                             padding-left: 25px;
//                             word-break: break-word;
//                           "
//                         >
//                           <div
//                             style="
//                               font-family: open Sans Helvetica, Arial, sans-serif;
//                               font-size: 14px;
//                               line-height: 1;
//                               text-align: center;
//                               color: #000000;
//                             "
//                           >
//                             <p style="font-size: 14px">Hello User</p>
//                           </div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td
//                           align="center"
//                           style="
//                             font-size: 0px;
//                             padding: 10px 25px;
//                             padding-right: 25px;
//                             padding-left: 25px;
//                             word-break: break-word;
//                           "
//                         >
//                           <div
//                             style="
//                               font-family: open Sans Helvetica, Arial, sans-serif;
//                               font-size: 14px;
//                               line-height: 1;
//                               text-align: center;
//                               color: #000000;
//                             "
//                           >
//                             <div>Your One Time Password is:</div>
//                             <h2
//                               style="
//                                 font-family: open Sans Helvetica, Arial, sans-serif;
//                                 font-size: 18px;
//                                 line-height: 1;
//                                 text-align: center;
//                                 color: #000000;
//                               "
//                             >
//                               ${token}
//                             </h2>
//                             <p style="color: grey; font-size: 12px">
//                               The code will expire in 10 mins so please finish your action asap.
//                             </p>
//                           </div>
//                           <!-- <tr>
//                             <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word">
//                               <div
//                                 style="
//                                   font-family: open Sans Helvetica, Arial, sans-serif;
//                                   font-size: 12px;
//                                   font-weight: bold;
//                                   line-height: 1;
//                                   text-align: center;
//                                   color: #000000;
//                                 "
//                               ></div>
//                             </td>
//                           </tr>
//                           <div
//                             style="
//                               font-family: open Sans Helvetica, Arial, sans-serif;
//                               font-size: 12px;
//                               line-height: 1;
//                               text-align: center;
//                               color: #000000;
//                             "
//                           >

//                           </div>
//                         </td>
//                       </tr> -->
//                           <tr>
//                             <td align="center" style="font-size: 0px; padding: 10px 25px; word-break: break-word">
//                               <div
//                                 style="
//                                   font-family: open Sans Helvetica, Arial, sans-serif;
//                                   font-size: 12px;
//                                   font-weight: bold;
//                                   line-height: 1;
//                                   text-align: center;
//                                   color: #000000;
//                                 "
//                               ></div>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td
//                               align="center"
//                               style="
//                                 font-size: 0px;
//                                 padding: 10px 25px;
//                                 padding-right: 16px;
//                                 padding-left: 25px;
//                                 word-break: break-word;
//                               "
//                             >
//                               <div
//                                 style="
//                                   font-family: open Sans Helvetica, Arial, sans-serif;
//                                   font-size: 10px;
//                                   line-height: 1;
//                                   text-align: center;
//                                   color: #000000;
//                                 "
//                               >
//                                 If you didn't request this, you can ignore this email or let us know.
//                               </div>
//                             </td>
//                           </tr>
//                           <tr>
//                             <td
//                               align="center"
//                               style="
//                                 font-size: 0px;
//                                 padding: 10px 25px;
//                                 padding-right: 25px;
//                                 padding-left: 25px;
//                                 word-break: break-word;
//                               "
//                             >
//                               <div
//                                 style="
//                                   font-family: open Sans Helvetica, Arial, sans-serif;
//                                   font-size: 12px;
//                                   line-height: 1;
//                                   text-align: center;
//                                   color: #000000;
//                                 "
//                               >
//                                 Thanks!<br /><br />
//                                 <p class="copyright">E-lab team.</p>
//                               </div>
//                             </td>
//                           </tr>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   </body>
// </html>

//     `;
// };
